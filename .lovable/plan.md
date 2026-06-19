## Revenue Sol — exact Clay homepage clone

Mirror clay.com's homepage structure, section order, and composition 1:1, but rebrand to **Revenue Sol** (AI CRM for US local service businesses) and use only the strict palette + fonts from your spec. Single-page, visual only.

### Branding & tokens
- Wordmark: **REVENUE SOL**
- Palette (only these, mapped to semantic tokens in `src/styles.css` under `@theme inline`):
  - Brand `#635BFF` / hover `#4F46E5`
  - Bg `#F6F9FC`, surface `#FFFFFF`, border `#E6EBF1`, tint `#EEF0FF`
  - Heading `#0A2540`, body `#425466`, muted `#697386`
  - Vivid accents: blurple `#635BFF`, violet `#7C3AED`, cyan `#00D4FF`, sky `#0A84FF`
- Fonts (no CDN): `@fontsource/inter` (body/UI), `@fontsource/eb-garamond` (display) — installed via bun, imported in `src/router.tsx`, mapped to `--font-sans` / `--font-display`.

### Sections — match Clay's order exactly
1. **Top nav (sticky)** — REVENUE SOL logo · Product · Use Cases · Solutions · Resources · Company · Pricing · ⌘K search pill · Log in · Get a demo (outline) · Start free trial (solid brand)
2. **Hero** — EB Garamond H1 "Run your service business with unique data — and the AI to act on it." Sub copy + "Start building for free →". Subtle clay-blob SVG shapes flanking.
3. **Trust line** — "TRUSTED BY THOUSANDS OF LOCAL SERVICE BUSINESSES" + a 4.9★ chip · "10K+ operator community" chip · 5.0★ chip. (Generic, no fake named customers.)
4. **Integrations strip** — labeled "Integrations" (not customers): Twilio, Stripe, QuickBooks, Google, RingCentral as text wordmarks in muted color. Two rows like Clay's logo wall, but using only these 5 rotated/repeated as integration tiles.
5. **Feature row 1 — "Every data point about every job, in one place"** — left copy + 3 bullets (Enrichments → contact + property data; Intent signals → missed calls, form fills, review mentions; AI research → Claygent-style lookup). Right: rounded tint panel with inline-SVG inbox/table mockup. Small stat callout card "2x — Sample pilot doubled booked-job rate (illustrative)".
6. **Feature row 2 — "AI that's contextual, consistent, and scalable"** — 3 bullets (Chat to build workflows; Reusable AI employees; Bring your own context via integrations). Mock: agent + workflow nodes. Stat card "3x — illustrative".
7. **Feature row 3 — "Orchestrate and act on your data, at scale"** — 3 bullets (sync CRM records; build dynamic audiences; trigger outreach in native sequencer). Mock: audience builder. Stat card "3M+ — illustrative".
8. **Section break headline** — "Turn data into action with flexible, iterable workflows" with a highlighted phrase (lilac/tint marker), centered + CTA.
9. **Three stacked feature cards** (Clay's AI Formatting / Conditional Logic / Destinations pattern):
   - **AI Formatting** — normalize company/customer names table mock
   - **AI Conditional Logic** — formula chip + conditional table mock
   - **Destinations** — list of integration actions (Upsert to HubSpot, Push to QuickBooks, Send via Twilio, etc.)
10. **Pull-quote testimonial** — large EB Garamond quote, placeholder author "Sample Owner — Operations Lead, Placeholder HVAC". 3 stat tiles (4h/week, 100+, 100%) clearly framed as illustrative. "Read case study →" (non-functional).
11. **Use-case toggle** — "Data enrichments / AI agents" tabs + list: CRM enrichment, TAM sourcing, Inbound lead routing, Intent-based outreach, AI outbound campaigns, ABM.
12. **"Cut costs, one central platform"** — split row, copy on left, inline-SVG clay-toolbox illustration on right (abstract SVG shapes only), two CTAs.
13. **Security/scale row** — generic capability tiles (Encryption in transit, Role-based access, Audit logs, Data residency, SSO-ready) — NO SOC2/ISO/GDPR/CCPA badges since not real.
14. **Customer quote carousel** — 3–4 placeholder quote cards with arrow controls (static).
15. **Final CTA** — "Turn your growth ideas into reality today" + "Start for free →" + "Get a demo →".
16. **Big footer** — giant repeat headline "Run your service business with unique data — and the AI to act on it." + REVENUE SOL logo + two CTAs + social icons (inline SVG) + multi-column link grid (Use cases / Product / Blog / Resources / Company / Customers / Legal) + © Revenue Sol 2026.

### Tech & files
- Route: `src/routes/index.tsx` with SEO `head()`.
- Components under `src/components/landing/`: `Nav`, `Hero`, `TrustChips`, `IntegrationsStrip`, `FeatureRow`, `StatCard`, `SectionBreak`, `FeatureCardLarge`, `Testimonial`, `UseCaseTabs`, `CentralPlatform`, `SecurityRow`, `QuoteCarousel`, `FinalCta`, `Footer`, plus `icons.tsx` for inline SVGs (stars, social, integration wordmarks, blob shapes, UI primitives).
- All visuals are inline SVG / CSS — no external images, no external font URLs (CSP-safe).
- Mobile-first responsive (single column → 2/3 cols at `md`/`lg`); sticky nav collapses to hamburger.

### Strict rules honored
- ONLY the listed hex values; no other colors.
- No external image URLs or font CDNs.
- No invented customer logos, no fake-as-fact stats (all numbers labeled illustrative/placeholder), no SOC2/ISO badges.

### Out of scope
- Backend, auth, real forms (CTAs are non-functional).
- Sub-routes for nav (anchor links only).
- Heavy animation (subtle hover transitions only).
