# Visual regression snapshots

Lightweight Playwright + pixelmatch suite for the app shell typography rules.

## What it guards

- **Caption weight**: every 10–12.5px text node inside `.app-scope` must render at `font-weight >= 500`.
- **Eyebrow tokens**: uppercase captions must resolve to `--color-body-strong` / `--color-ink` and weight ≥ 600.
- **Truncation**: no element should render an ellipsis (`…`) unless it explicitly carries the `truncate` class.
- **Token drift**: `--color-body` must resolve to `#2A3B5B`.
- **Pixel diff**: at most 0.5% of pixels may change vs baseline per case.

## Cases

| Route          | Mobile (390×1600) | Tablet (820×1400) |
| -------------- | ----------------- | ----------------- |
| `/app/contacts`| ✓                 | ✓                 |
| `/app/inbox`   | ✓                 | ✓                 |
| `/app/reviews` | ✓                 | ✓                 |

## Commands

```sh
# Diff current preview vs committed baselines. Exits non-zero on regression.
node tests/visual/visual.mjs

# Regenerate baselines after an intentional design change.
node tests/visual/visual.mjs --update
```

The dev server must be running on `http://localhost:8080` (override via `VISUAL_BASE_URL`).

## Layout

- `baselines/` — committed reference PNGs.
- `diffs/` — generated on failure: `<case>.actual.png` and `<case>.diff.png`. Gitignored.
