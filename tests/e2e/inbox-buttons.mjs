#!/usr/bin/env node
/**
 * E2E: click every Inbox button and assert the resulting UI state / toast.
 *
 * Usage:
 *   node tests/e2e/inbox-buttons.mjs
 *
 * Requires the dev server on http://localhost:8080 (VISUAL_BASE_URL overrides).
 * Uses viewport >= 1280px so the desktop-only header "More" button is visible.
 */
import { chromium } from "playwright";

const BASE_URL = process.env.VISUAL_BASE_URL ?? "http://localhost:8080";
const INBOX_URL = `${BASE_URL}/app/inbox`;
const VIEWPORT = { width: 1440, height: 900 };
const TOAST_SELECTOR = '[role="status"][aria-live="polite"]';

const results = [];
let failed = 0;

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  if (!ok) failed++;
  const mark = ok ? "✓" : "✗";
  console.log(`  ${mark} ${name}${detail ? " — " + detail : ""}`);
}

/** Wait for a toast whose text includes `needle`; short-lived (~1.8s) so poll fast. */
async function expectToast(page, needle, name) {
  try {
    await page
      .locator(TOAST_SELECTOR, { hasText: needle })
      .first()
      .waitFor({ state: "visible", timeout: 2500 });
    record(name, true, `toast "${needle}"`);
  } catch {
    // Dump current toasts (if any) for debugging.
    const seen = await page.locator(TOAST_SELECTOR).allTextContents().catch(() => []);
    record(name, false, `expected toast containing "${needle}", saw ${JSON.stringify(seen)}`);
  }
}

async function waitForToastGone(page) {
  await page.locator(TOAST_SELECTOR).first().waitFor({ state: "detached", timeout: 3000 }).catch(() => {});
}

async function openFirstThread(page) {
  await page.goto(INBOX_URL, { waitUntil: "domcontentloaded" });
  // Wait for the thread list skeleton to resolve (list-loading = 900ms).
  const firstThread = page.locator("button:has(> div.relative)").first();
  await firstThread.waitFor({ state: "visible", timeout: 5000 });
  await firstThread.click();
  // Wait for conversation header (thread-loading = 600ms).
  await page.getByLabel("Open customer details").waitFor({ state: "visible", timeout: 5000 });
  // Wait for the AI suggested reply to render (proves messages loaded).
  await page.getByText("AI suggested reply", { exact: false }).waitFor({ timeout: 5000 });
}

async function testHeaderButtons(page) {
  console.log("\n[header] Call / Info / More");

  await page.getByLabel("Call customer").click();
  await expectToast(page, "Calling", "header Call → toast");
  await waitForToastGone(page);

  // Context panel toggles via Info button. Panel content is inside a heading "Customer".
  const info = page.getByLabel("Toggle customer details");
  await info.click();
  const panel = page.locator('div.hidden.xl\\:flex:has-text("Quick Actions")');
  await panel.waitFor({ state: "visible", timeout: 2000 }).catch(() => {});
  const opened = await panel.isVisible();
  record("header Info → opens context panel", opened, opened ? "aria-pressed=true, panel visible" : "panel not visible");
  const pressed = await info.getAttribute("aria-pressed");
  record("header Info aria-pressed=true when open", pressed === "true", `aria-pressed=${pressed}`);

  await info.click();
  const closed = await panel.isHidden().catch(() => true);
  record("header Info (2nd click) → closes context panel", closed);

  await page.getByLabel("More actions").click();
  await expectToast(page, "More actions", "header More → toast");
  await waitForToastGone(page);
}

async function testAiCardSend(page) {
  console.log("\n[ai card] Send removes card and fires toast");
  await openFirstThread(page);
  await page.getByRole("button", { name: /^Send$/ }).first().click();
  await expectToast(page, "Reply sent", "AI Send → toast");
  const aiGone = await page
    .getByText("AI suggested reply", { exact: false })
    .isHidden()
    .catch(() => true);
  record("AI card hidden after Send", aiGone);
  await waitForToastGone(page);
}

async function testAiCardEdit(page) {
  console.log("\n[ai card] Edit copies suggestion into composer");
  await openFirstThread(page);
  await page.getByRole("button", { name: "Edit" }).click();
  const draft = await page.locator("textarea").inputValue();
  record("AI Edit → composer populated", draft.includes("Mike will arrive at 2pm"), `draft="${draft.slice(0, 40)}…"`);
}

async function testAiCardDismiss(page) {
  console.log("\n[ai card] Dismiss hides card silently");
  await openFirstThread(page);
  await page.getByRole("button", { name: "Dismiss" }).click();
  const aiGone = await page
    .getByText("AI suggested reply", { exact: false })
    .isHidden()
    .catch(() => true);
  record("AI Dismiss → card hidden", aiGone);
}

async function testComposer(page) {
  console.log("\n[composer] Paperclip / Emoji / AI Draft / Send");
  await openFirstThread(page);

  await page.getByLabel("Attach file").click();
  await expectToast(page, "Attachments", "composer Paperclip → toast");
  await waitForToastGone(page);

  const textarea = page.locator("textarea");
  await textarea.fill("");
  await page.getByLabel("Insert emoji").click();
  const afterEmoji = await textarea.inputValue();
  record("composer Emoji → appends 👍", afterEmoji.includes("👍"), `draft="${afterEmoji}"`);

  await textarea.fill("");
  await page.getByRole("button", { name: /AI Draft/ }).click();
  await expectToast(page, "AI draft ready", "composer AI Draft → toast");
  const afterAi = await textarea.inputValue();
  record("composer AI Draft → composer populated", afterAi.includes("Mike will arrive at 2pm"), `draft="${afterAi.slice(0, 40)}…"`);
  await waitForToastGone(page);

  // Send with content triggers the "Message sent" toast.
  await textarea.fill("Hello there");
  await page.getByRole("button", { name: /^Send$/ }).last().click();
  await expectToast(page, "Message sent", "composer Send (with text) → toast");
  const cleared = (await textarea.inputValue()) === "";
  record("composer Send clears draft", cleared);
  await waitForToastGone(page);

  // Send with empty draft is a no-op.
  await textarea.fill("");
  await page.getByRole("button", { name: /^Send$/ }).last().click();
  const noToast = (await page.locator(TOAST_SELECTOR).count()) === 0;
  record("composer Send (empty) → no toast", noToast);
}

async function testQuickActions(page) {
  console.log("\n[context panel] Quick Actions Call / Book / Quote / Charge");
  await openFirstThread(page);
  await page.getByLabel("Toggle customer details").click();
  const panel = page.locator('div.hidden.xl\\:flex:has-text("Quick Actions")');
  await panel.waitFor({ state: "visible", timeout: 2000 });

  const cases = [
    ["Call", "Calling"],
    ["Book", "booking"],
    ["Quote", "quote"],
    ["Charge", "charge"],
  ];
  for (const [label, needle] of cases) {
    await panel.getByRole("button", { name: label }).click();
    await expectToast(page, needle, `Quick Action ${label} → toast`);
    await waitForToastGone(page);
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
  });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    await openFirstThread(page);
    await testHeaderButtons(page);
    await testAiCardSend(page);
    await testAiCardEdit(page);
    await testAiCardDismiss(page);
    await testComposer(page);
    await testQuickActions(page);
  } catch (err) {
    console.error("\nFatal test error:", err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log("\n--- summary ---");
  console.log(`${results.length - failed} / ${results.length} checks passed.`);
  if (failed) {
    console.error(`${failed} failure(s):`);
    for (const r of results) if (!r.ok) console.error(` - ${r.name}: ${r.detail}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
