# Stripe-inspired SaaS Redesign — Dashboard + App Shell

Rebuild the `/app/*` surface with Stripe.com's signature SaaS look: aurora gradient hero band, floating white cards, indigo primary, dense responsive grid.

## 1. Design tokens (`src/styles.css` → `.app-scope`)

Replace the Clay cream palette with Stripe's signature system:

- **Canvas**: `#F6F9FC` (Stripe's cool off-white, not cream)
- **Primary**: `#635BFF` (Stripe indigo) · **Deep**: `#0A2540` · **Hover**: `#0A46E4`
- **Ink**: `#0A2540` (Stripe navy) · **Body**: `#425466` · **Muted**: `#697386`
- **Hairline**: `#E3E8EE` · **Surface strong**: `#EFF4FA`
- **Aurora gradient**: `linear-gradient(150deg, #A5B4FC 0%, #635BFF 25%, #7C3AED 50%, #EC4899 75%, #F59E0B 100%)` — the signature Stripe hero mesh
- **Card shadow**: `0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)` — Stripe's signature layered elevation
- **Status**: green `#00D924`, warning `#F5A623`, danger `#CD3D64`, info `#3297FD`

## 2. App shell (`AppShell.tsx`)

- **Sidebar**: white, hairline border, indigo active pill (`bg-primary/8 text-primary`), 240px desktop / collapsible mobile drawer
- **Top bar**: white, sticky, `⌘K` command palette input center-mounted (Stripe pattern), notification bell + org switcher chip + avatar right
- **Mobile**: bottom tab bar stays, top bar shows hamburger + condensed search icon
- Ensure header row uses `grid-cols-[minmax(0,1fr)_auto]` + `min-w-0` + `truncate` so titles survive 320px widths

## 3. Dashboard redesign (`app.dashboard.tsx`)

Sectioned like Stripe's own dashboard, mobile-first:

**A. Aurora hero band** (full-bleed inside content area)
- Background: aurora mesh gradient with subtle noise texture
- Left: greeting eyebrow, "Good afternoon, ABC Plumbing" in 32px semibold white, subtitle in 14px `white/70`
- Right: two floating white pill CTAs (Request payment · New message)
- Height: 200px desktop / 160px mobile, corners `rounded-2xl` inset with 24px margin

**B. Trial banner** — floating white card with amber left accent bar, upgrade CTA, dismiss

**C. Getting Started** — white card with progress bar in indigo, 5 checklist items in a 5-col grid → 2-col tablet → 1-col mobile

**D. KPI row (4 cards)** — Open Convos · Reviews · Revenue · AI Resolution
- Each: white card with hairline, `shadow-sm`, icon in colored soft chip (indigo/amber/green/violet), 28px value, trend chip with sparkline mini-line
- Grid: `grid-cols-2 lg:grid-cols-4`

**E. Two-column workhorse zone** (`lg:grid-cols-3`)

Left col (`lg:col-span-2`):
- **Weekly Pulse** chart card — 7-day stacked bar (messages indigo / payments green) with hover tooltip
- **Pipeline Snapshot** — segmented progress bar + 5 metric tiles below
- **Needs your reply** — inbox list with avatar / preview / reply button
- **Today's schedule** — timeline with time chips
- **Hot leads** — avatar list with score chip

Right col:
- **Infinite Agent** — indigo gradient header card with input + 5 chips
- **AI Autopilot** — status card with active toggle, 4 stat rows, activate button
- **Quick actions** — 3 icon rows
- **Reviews** — rating with distribution bars
- **Integrations health** — 5 rows with status pills

**F. Needs attention** — 5-tile horizontal scroll on mobile, grid on desktop

## 4. Responsive rules applied everywhere

- All header rows: `grid-cols-[minmax(0,1fr)_auto] sm:flex sm:justify-between`
- Every text container: `min-w-0` + `truncate` on single-line headings
- Every icon/avatar: `shrink-0`
- KPI grid: `grid-cols-2 lg:grid-cols-4`
- Workhorse grid: `grid-cols-1 lg:grid-cols-3`
- Cards use consistent `p-4 sm:p-5 lg:p-6` padding scale
- Bottom tab bar `pb-safe` for iOS notch

## 5. Dialogs

Keep the 3 existing dialogs (New Message · Request Payment · Send Review) but restyle with Stripe form aesthetic: 44px indigo-focused inputs, `rounded-lg`, primary indigo CTA at footer.

## 6. Files touched

- `src/styles.css` — swap `.app-scope` token block (Clay → Stripe)
- `src/components/app-shell/AppShell.tsx` — refine sidebar/topbar for Stripe density + responsive grid guards
- `src/routes/app.dashboard.tsx` — restructure with aurora hero, add sparklines to KPIs, tighten grid rhythm

## Out of scope

- Other app routes (inbox, contacts, etc.) — I'll only wire the dashboard + shared shell; other pages inherit tokens automatically. If you want them individually restyled, we'll do a second pass.
- No new dependencies. Sparklines drawn inline with SVG.
