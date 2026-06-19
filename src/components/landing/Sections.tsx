import { ArrowRight, ChevronLeft, ChevronRight, LinkedIn, YouTube, XSocial, Slack } from "./icons";
import { useState } from "react";
import { FormattingMock, ConditionalMock, DestinationsMock } from "./mocks";

export function StackedFeatures() {
  const items = [
    {
      eyebrow: "AI FORMATTING",
      title: "Clean and format customer data with AI in seconds",
      body: "Use AI to transform any record into the format you need — normalize names, deduplicate lists, strip emoji and stray punctuation.",
      mock: <FormattingMock />,
    },
    {
      eyebrow: "AI CONDITIONAL LOGIC",
      title: "Run action steps conditionally — no engineering needed",
      body: "Conditionally run workflows based on any logic. Use different providers for different jobs, enrich only your best leads, or build fallbacks.",
      mock: <ConditionalMock />,
    },
    {
      eyebrow: "DESTINATIONS",
      title: "Constantly update any tool — CRM, dispatch, accounting, or more",
      body: "Push enriched data to your CRM, accounting, SMS tool, or website — on a recurring basis. Use HTTP for anything custom.",
      mock: <DestinationsMock />,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-8 space-y-20 lg:space-y-28">
      {items.map((it, i) => (
        <div key={it.eyebrow} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-brand)] mb-4">{it.eyebrow}</p>
            <h3 className="font-display text-3xl lg:text-4xl font-medium text-[color:var(--color-heading)] leading-[1.15] tracking-tight">
              {it.title}
            </h3>
            <p className="mt-5 text-[color:var(--color-body)] leading-relaxed">{it.body}</p>
          </div>
          <div className="rounded-3xl p-6 lg:p-10 bg-[color:var(--color-tint)]">{it.mock}</div>
        </div>
      ))}
    </section>
  );
}

export function PullQuote() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
      <div className="rounded-3xl bg-white border border-[color:var(--color-border-soft)] p-8 lg:p-14 shadow-[0_20px_60px_-30px_rgba(10,37,64,0.15)]">
        <blockquote className="font-display text-2xl lg:text-4xl leading-snug text-[color:var(--color-heading)] italic">
          "Revenue Sol has helped us answer every lead and book jobs without growing our office team. We've consolidated our tools to the essentials — our CRM, Revenue Sol, and our dispatch software."
        </blockquote>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">
          <span className="font-semibold text-[color:var(--color-heading)]">Sample Owner</span> · Operations Lead, Placeholder HVAC <span className="ml-1 italic">(illustrative)</span>
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            ["4h/week", "Saved on inbound lead handling (illustrative)"],
            ["100+", "Integrations available via Revenue Sol"],
            ["100%", "Of inbound calls answered after hours (illustrative)"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl p-5 bg-[color:var(--color-tint)]">
              <p className="font-display text-3xl text-[color:var(--color-brand)]">{n}</p>
              <p className="mt-1 text-sm text-[color:var(--color-body)]">{l}</p>
            </div>
          ))}
        </div>
        <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand)] hover:text-[color:var(--color-brand-hover)]">
          Read case study <ArrowRight />
        </a>
      </div>
    </section>
  );
}

export function UseCases() {
  const [tab, setTab] = useState<"data" | "ai">("data");
  const lists: Record<string, string[]> = {
    data: [
      "CRM enrichment & maintenance",
      "Service-area & territory planning",
      "Inbound lead enrichment & routing",
      "Intent-based follow-up flows",
      "Review monitoring & response",
      "Account-based marketing",
    ],
    ai: [
      "24/7 AI voice receptionist",
      "AI auto-reply for SMS & web forms",
      "AI quote drafting from job notes",
      "AI dispatch suggestions",
      "AI review responder",
      "AI knowledge hub for techs",
    ],
  };
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight max-w-3xl">
        Revenue Sol's data + AI unlocks any growth use case
      </h2>
      <p className="mt-5 text-[color:var(--color-body)] max-w-2xl">
        Use the best data foundation alongside flexible AI agents to turn any growth idea into reality — from CRM enrichment to after-hours booking.
      </p>
      <div className="mt-8 inline-flex p-1 rounded-full bg-[color:var(--color-tint)]">
        {(["data", "ai"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === k ? "bg-white text-[color:var(--color-heading)] shadow-sm" : "text-[color:var(--color-muted)]"
            }`}
          >
            {k === "data" ? "Data enrichments" : "AI agents"}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {lists[tab].map((l) => (
          <li key={l} className="px-5 py-4 rounded-2xl bg-white border border-[color:var(--color-border-soft)] text-[color:var(--color-heading)] hover:border-[color:var(--color-brand)] transition">
            {l}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CentralPlatform() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight">
            Cut costs, access data faster in one central platform
          </h2>
          <p className="mt-5 text-[color:var(--color-body)] max-w-xl">
            Stop stitching together six different tools. Revenue Sol gives you immediate access to dozens of data sources, AI employees, and your existing stack — one subscription, no implementation hassle.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">Read more <ArrowRight /></a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[color:var(--color-border-soft)] text-sm text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]">Get a demo <ArrowRight /></a>
          </div>
        </div>
        {/* Inline SVG "toolbox" illustration */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <rect x="60" y="120" width="280" height="220" rx="32" fill="#635BFF" />
            <rect x="60" y="120" width="280" height="60" rx="32" fill="#4F46E5" />
            <rect x="170" y="80" width="60" height="60" rx="16" fill="#4F46E5" />
            <rect x="100" y="200" width="80" height="80" rx="18" fill="#FFFFFF" />
            <rect x="200" y="200" width="80" height="80" rx="18" fill="#00D4FF" />
            <rect x="100" y="290" width="80" height="40" rx="14" fill="#7C3AED" />
            <rect x="200" y="290" width="80" height="40" rx="14" fill="#FFFFFF" />
            <circle cx="140" cy="240" r="14" fill="#635BFF" />
            <circle cx="240" cy="240" r="14" fill="#FFFFFF" />
            <circle cx="320" cy="100" r="22" fill="#7C3AED" />
            <circle cx="70" cy="80" r="14" fill="#0A84FF" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function CapabilityRow() {
  const items = [
    ["Encryption in transit", "TLS 1.2+ everywhere — your data is encrypted on every hop."],
    ["Role-based access", "Granular roles for owners, dispatchers, and field techs."],
    ["Audit logs", "Every action recorded, exportable, and searchable."],
    ["Data residency", "Choose where your customer data lives."],
    ["SSO ready", "Bring your own identity provider via SAML / OIDC."],
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <h2 className="font-display text-3xl lg:text-4xl font-medium text-[color:var(--color-heading)] tracking-tight">
        Built for the scale of a multi-branch operation
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {items.map(([t, d]) => (
          <div key={t} className="rounded-2xl p-5 bg-white border border-[color:var(--color-border-soft)]">
            <div className="w-9 h-9 rounded-xl bg-[color:var(--color-tint)] grid place-items-center text-[color:var(--color-brand)]">●</div>
            <p className="mt-4 font-semibold text-[color:var(--color-heading)]">{t}</p>
            <p className="mt-2 text-sm text-[color:var(--color-body)]">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function QuoteCarousel() {
  const quotes = [
    { who: "Sample GTM Lead", role: "Placeholder Plumbing Co.", text: "Revenue Sol is one of the most practical applications of AI we've put into our shop in years." },
    { who: "Sample Owner", role: "Placeholder Roofing", text: "Revenue Sol should be a pillar of every service company's stack — outbound and inbound on the highest quality data." },
    { who: "Sample Director", role: "Placeholder Electrical", text: "This job has always been about creativity. Revenue Sol lets me answer more 'what if we could…' questions than ever before." },
    { who: "Sample Operations", role: "Placeholder Cleaning", text: "I love the team's support — they treat our problems like their own." },
  ];
  const [i, setI] = useState(0);
  const visible = quotes.slice(i, i + 3).concat(quotes.slice(0, Math.max(0, i + 3 - quotes.length))).slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight">
          What customers say about us
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setI((p) => (p - 1 + quotes.length) % quotes.length)} className="w-10 h-10 rounded-full border border-[color:var(--color-border-soft)] bg-white grid place-items-center text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]"><ChevronLeft /></button>
          <button onClick={() => setI((p) => (p + 1) % quotes.length)} className="w-10 h-10 rounded-full border border-[color:var(--color-border-soft)] bg-white grid place-items-center text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]"><ChevronRight /></button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((q, idx) => (
          <div key={idx} className="rounded-3xl p-7 bg-white border border-[color:var(--color-border-soft)]">
            <p className="font-display text-xl text-[color:var(--color-heading)] leading-snug">"{q.text}"</p>
            <p className="mt-6 text-sm">
              <span className="font-semibold text-[color:var(--color-heading)]">{q.who}</span>
              <span className="text-[color:var(--color-muted)]"> · {q.role}</span>
            </p>
            <p className="mt-1 text-xs text-[color:var(--color-muted)] italic">Placeholder testimonial</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
      <div className="relative overflow-hidden rounded-3xl px-8 py-20 lg:py-28 text-center" style={{ background: "#0A2540" }}>
        <div aria-hidden className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ background: "#635BFF" }} />
        <div aria-hidden className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-40" style={{ background: "#7C3AED" }} />
        <h2 className="relative font-display text-4xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight">
          Turn your growth ideas<br />into reality today
        </h2>
        <p className="relative mt-5 text-white/70">Start for free. No credit card required.</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">Start building for free <ArrowRight /></a>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[color:var(--color-heading)] text-sm font-medium hover:bg-[color:var(--color-tint)]">Get a demo <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols: Record<string, string[]> = {
    "Use cases": ["Automated inbound", "Account research", "ABM", "PLG assist", "Rep assist", "Reverse ETL", "Outbound", "CRM enrichment"],
    "Product": ["AI receptionist", "AI auto-reply", "Sequencer", "Data enrichment", "Audiences", "Signals", "Integrations", "Pricing"],
    "Resources": ["Getting started", "University", "Templates", "Partner program", "Community", "FAQ"],
    "Company": ["About", "Careers", "Contact", "Status"],
    "Legal": ["Privacy policy", "Terms of service", "Do not sell my data"],
  };
  return (
    <footer className="mx-auto max-w-7xl px-5 lg:px-8 pb-10">
      <div className="rounded-3xl bg-white border border-[color:var(--color-border-soft)] p-8 lg:p-14">
        <h3 className="font-display text-3xl lg:text-5xl font-medium text-[color:var(--color-heading)] leading-[1.1] tracking-tight max-w-3xl">
          Run your service business with unique data — and the AI to act on it.
        </h3>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">Start building for free <ArrowRight /></a>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[color:var(--color-border-soft)] text-sm text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]">Contact us <ArrowRight /></a>
        </div>
        <div className="mt-10 flex gap-3 text-[color:var(--color-muted)]">
          <a href="#" className="w-9 h-9 grid place-items-center rounded-full border border-[color:var(--color-border-soft)] hover:text-[color:var(--color-brand)]"><LinkedIn /></a>
          <a href="#" className="w-9 h-9 grid place-items-center rounded-full border border-[color:var(--color-border-soft)] hover:text-[color:var(--color-brand)]"><YouTube /></a>
          <a href="#" className="w-9 h-9 grid place-items-center rounded-full border border-[color:var(--color-border-soft)] hover:text-[color:var(--color-brand)]"><Slack /></a>
          <a href="#" className="w-9 h-9 grid place-items-center rounded-full border border-[color:var(--color-border-soft)] hover:text-[color:var(--color-brand)]"><XSocial /></a>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 border-t border-[color:var(--color-border-soft)] pt-10">
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-muted)] mb-4">{h}</p>
              <ul className="space-y-2.5">
                {items.map((i) => (
                  <li key={i}><a href="#" className="text-sm text-[color:var(--color-heading)] hover:text-[color:var(--color-brand)]">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[color:var(--color-border-soft)] flex flex-wrap justify-between gap-3 text-xs text-[color:var(--color-muted)]">
          <span className="font-display text-base text-[color:var(--color-heading)]">revenue<span className="text-[color:var(--color-brand)]">.sol</span></span>
          <span>© Revenue Sol 2026 — Built for local service businesses.</span>
        </div>
      </div>
    </footer>
  );
}
