# Revenue Sol — App Shell Rebuild (Interior Only)

Rebuild the authenticated `/app/*` product surface to the new indigo/purple spec. **Homepage (`/`) is untouched.** Frontend only, dummy data everywhere.

## Design tokens (`src/styles.css`, `.app-scope` only)

Replace current interior tokens — do NOT touch homepage tokens:
- Primary `#6366F1`, Deep `#4F46E5`, Light `#EEF2FF`, Glow `rgba(99,102,241,0.15)`
- Surfaces `#FFFFFF` / `#FAFAFA` / `#F4F4F5`, border `#E4E4E7`
- Text `#09090B` / `#52525B` / `#A1A1AA`
- Success `#22C55E`, Warning `#F59E0B`, Error `#EF4444`, Info `#3B82F6` (+ light variants)
- Gradients: g1 indigo→violet, g2 indigo→cyan, subtle indigo-tint
- Sidebar: bg `#09090B`, active `#6366F1`, text white/80, muted white/40
- Radii 6/10/14/20/full. Inter already loaded.

## App shell (`src/components/app-shell/AppShell.tsx`)

- 240px fixed dark sidebar (`#09090B`), grouped: Main / Engage / AI / Field Service / Insights + bottom Settings
- Nav item 38px, active pill `#6366F1` with glow shadow, unread + NEW badges
- Sidebar footer: user row (avatar + name + role) + amber "11 days left" trial badge with Upgrade link
- Topbar 56px: page title, ⌘K search, `+ New ▼`, bell (with dot), help, avatar
- Responsive: <768px hides sidebar → bottom tab bar (Home/Inbox/Reviews/Pay/More); 768–1024px collapses to 64px icon rail; ≥1024px full 240px

## App routes (each dedicated file, replacing current `/app/*`)

1. `/app/dashboard` — greeting, purple AI Command bar (chips + Autopilot mini-card), 4 stat cards, 60/40 split (Recent Activity timeline · Reviews overview + Autopilot Today), 3 quick-action cards.
2. `/app/ai-brain` — sticky header + master Autopilot toggle, chat command center (400px scroll) + quick chips, 4 stats, 58/42 split (Autopilot module toggles + behavior · AI Suggestions + Pending Approvals), full-width Live Activity Log.
3. `/app/inbox` — 3-column (280/flex/260): thread list with tabs + channel chips, conversation with AI-mode pill + internal-note composer, contact rail with quick actions, tags, previous convos, notes.
4. `/app/contacts` — 4 stats, filter pills, table with checkbox bulk-action bar.
5. `/app/reviews` — 4 stats, source + rating + status filters, review cards with AI Reply / Needs Reply.
6. `/app/payments` — 3 stats, status tabs, transactions table with Remind.
7. `/app/jobs` — 4 stats, 5-column Kanban (Scheduled / En Route / In Progress / Completed / Invoiced).
8. `/app/voice-agent` — status badge, 4 stats, 2-column (Agent config with per-day hours · Recent Calls table with outcome tags).
9. `/app/ai-employee` — 5 tabs (Overview / Knowledge / Persona / Q&A Pairs / Analytics): activity table, knowledge card grid, tone selector, blocklist tags.
10. `/app/settings` — left sub-nav (Business Profile / Connectors / Team / Billing / Notifications / Security). Connectors: 9 integration cards (Twilio, Retell, Stripe, Google, QuickBooks connected; Meta, Zapier, SendGrid, RingCentral not) + Website snippet card with copyable JS. Billing: plan card, usage bars, invoice table.
11. `/app/ai-search` — 6 tabs; Overview shows AI Visibility hero (4/8 engines + engine grid), 3 score bars, 3 quick-win cards, Recent AI Checks + Issues Summary.

Old routes (`app.ai.*`, `app.money.*`, `app.calendar`, `app.jobs`, `app.contacts`, `app.inbox`, `app.dashboard`, `app.index`) will be replaced/renamed to match this list. Nav in AppShell updated accordingly.

## Modals & overlays (`src/components/app-shell/modals/`)

- Send Review Request, Request Payment, New Conversation, Add Contact (dialogs)
- Notification dropdown (8 items, mark all read)
- User menu (Profile / Settings / Billing / Help / Sign Out)
- `+ New` dropdown (6 actions)

Wired to topbar + relevant page buttons with dummy state only.

## Motion & polish

- Page enter: opacity 0→1, y 8→0, 200ms
- Card hover: translateY(-2px) + shadow
- Button tap: scale(0.97)
- Stat count-up on mount, 50ms stagger for lists/grids
- Sidebar collapse 200ms

## Out of scope

- Homepage (`/`) and landing components — untouched
- `/onboarding`, `/inbox` (public dialpad demo), `/dialpad`, `/mobile-preview`, `/signin`, `/signup`, `/auth`
- Mobile Expo project

## Technical notes

- All colors as `@theme` vars scoped to `.app-scope`; no hex literals in components
- Route files follow `app.<segment>.tsx` with `createFileRoute("/app/<segment>")`
- Dummy data in `src/lib/rs-mocks.ts`
- `lucide-react` icons; emojis only where spec calls for them
- Per-route `head()` with real title + description
