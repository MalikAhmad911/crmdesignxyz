#!/usr/bin/env node
/**
 * Lightweight visual regression suite for Revenue Sol app routes.
 *
 * Usage:
 *   node tests/visual/visual.mjs            # diff current preview vs baselines (fails on regression)
 *   node tests/visual/visual.mjs --update   # regenerate baselines
 *
 * Requires the dev server to be running on http://localhost:8080.
 *
 * Guards:
 *  - Typography weight/color: caption elements (10-12.5px) rendered on cards
 *  - Truncation: no `text…` clipping on labels that should wrap
 *  - Caption weight: uppercase eyebrows render at font-weight 700
 *
 * Snapshots cover Contacts, Inbox, Reviews on mobile (390) and tablet (820).
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASELINE_DIR = path.join(__dirname, "baselines");
const DIFF_DIR = path.join(__dirname, "diffs");
const BASE_URL = process.env.VISUAL_BASE_URL ?? "http://localhost:8080";
const UPDATE = process.argv.includes("--update");
const THRESHOLD = 0.1; // pixelmatch per-pixel tolerance
const MAX_DIFF_RATIO = 0.005; // 0.5% of pixels may differ before we flag it

const CASES = [
  { name: "contacts", path: "/app/contacts" },
  { name: "inbox", path: "/app/inbox" },
  { name: "reviews", path: "/app/reviews" },
];
const VIEWPORTS = [
  { tag: "mobile", width: 390, height: 1600 },
  { tag: "tablet", width: 820, height: 1400 },
];

// Assertions run in-page against each route to catch typography regressions
// that a pixel diff might miss (e.g. weight drift from 500 -> 400).
const IN_PAGE_ASSERTIONS = `
  (() => {
    const problems = [];
    const scope = document.querySelector(".app-scope");
    if (!scope) return ["missing .app-scope wrapper"];

    // 1. Caption weight: any 10-12.5px text inside .app-scope must be >= 500.
    const captionSizes = ["10px", "10.5px", "11px", "11.5px", "12px", "12.5px"];
    for (const el of scope.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (!captionSizes.includes(cs.fontSize)) continue;
      if (!el.textContent.trim()) continue;
      const w = parseInt(cs.fontWeight, 10);
      if (w < 500) problems.push(\`caption <\${el.tagName.toLowerCase()}> "\${el.textContent.trim().slice(0, 30)}" weight=\${w} size=\${cs.fontSize}\`);
    }

    // 2. Uppercase eyebrows must hit --color-body-strong (dark ink family).
    const inkRe = /rgb\\(10,\\s*37,\\s*64\\)|rgb\\(26,\\s*46,\\s*79\\)/;
    for (const el of scope.querySelectorAll(".uppercase")) {
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      if (size > 12) continue;
      if (!el.textContent.trim()) continue;
      if (!inkRe.test(cs.color)) problems.push(\`eyebrow "\${el.textContent.trim().slice(0, 30)}" color=\${cs.color}\`);
      if (parseInt(cs.fontWeight, 10) < 600) problems.push(\`eyebrow "\${el.textContent.trim().slice(0, 30)}" weight=\${cs.fontWeight}\`);
    }

    // 3. Truncation guard: no element that renders "…" ellipsis unless it has the truncate class.
    for (const el of scope.querySelectorAll("*")) {
      if (el.children.length) continue;
      const text = el.textContent;
      if (!text || !text.includes("…")) continue;
      if (!el.classList.contains("truncate")) problems.push(\`unmarked ellipsis in "\${text.slice(0, 40)}"\`);
    }

    // 4. Body text token must be dark: --color-body should resolve to #2A3B5B.
    const bodyColor = getComputedStyle(scope).getPropertyValue("--color-body").trim();
    if (bodyColor && bodyColor.toLowerCase() !== "#2a3b5b") {
      problems.push(\`--color-body drift: \${bodyColor}\`);
    }

    return problems;
  })()
`;

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function capture(page, url, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: "networkidle" });
  // Wait for skeletons to resolve — inbox has a 900ms delay.
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  const buf = await page.screenshot({ fullPage: false });
  const assertions = await page.evaluate(IN_PAGE_ASSERTIONS);
  return { buf, assertions };
}

function readPng(buf) {
  return PNG.sync.read(buf);
}

function diffPngs(a, b) {
  if (a.width !== b.width || a.height !== b.height) {
    return { mismatched: Infinity, ratio: 1, size: { w: a.width, h: a.height } };
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const mismatched = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: THRESHOLD });
  const ratio = mismatched / (a.width * a.height);
  return { mismatched, ratio, diff };
}

async function main() {
  ensureDir(BASELINE_DIR);
  ensureDir(DIFF_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const failures = [];
  const runLog = [];

  for (const c of CASES) {
    for (const v of VIEWPORTS) {
      const key = `${c.name}_${v.tag}`;
      const url = `${BASE_URL}${c.path}`;
      const baselinePath = path.join(BASELINE_DIR, `${key}.png`);
      const diffPath = path.join(DIFF_DIR, `${key}.diff.png`);
      const actualPath = path.join(DIFF_DIR, `${key}.actual.png`);

      const { buf, assertions } = await capture(page, url, v);
      runLog.push({ key, assertions });

      if (assertions.length) failures.push({ key, kind: "assertion", details: assertions });

      if (UPDATE || !fs.existsSync(baselinePath)) {
        fs.writeFileSync(baselinePath, buf);
        console.log(`✓ baseline written: ${key}`);
        continue;
      }

      const baseline = readPng(fs.readFileSync(baselinePath));
      const actual = readPng(buf);
      const { mismatched, ratio, diff } = diffPngs(baseline, actual);
      if (!Number.isFinite(mismatched) || ratio > MAX_DIFF_RATIO) {
        fs.writeFileSync(actualPath, buf);
        if (diff && diff.data) fs.writeFileSync(diffPath, PNG.sync.write(diff));
        failures.push({
          key,
          kind: "pixel",
          details: `mismatched=${mismatched} ratio=${ratio.toFixed(4)} threshold=${MAX_DIFF_RATIO}`,
        });
        console.log(`✗ ${key}: pixel diff ${ratio.toFixed(4)} (see ${diffPath})`);
      } else {
        console.log(`✓ ${key}: ${(ratio * 100).toFixed(3)}% diff`);
      }
    }
  }

  await browser.close();

  console.log("\n--- in-page assertion summary ---");
  for (const r of runLog) console.log(r.key, r.assertions.length ? r.assertions : "OK");

  if (failures.length) {
    console.error(`\n${failures.length} visual failure(s):`);
    for (const f of failures) console.error(` - ${f.key} [${f.kind}]:`, f.details);
    process.exit(1);
  }
  console.log("\nAll visual snapshots pass.");
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
