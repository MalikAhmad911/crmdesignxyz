import { createFileRoute, Link } from "@tanstack/react-router";
import infiniteRankersLogo from "@/assets/infinite-rankers-logo.jpg.asset.json";
import {
  ArrowUpRight,
  Check,
  Phone,
  Calendar,
  Sparkles,
  Mic,
  Wrench,
  Hammer,
  Droplets,
  Plug,
  Home,
  Brush,
  Star,
  Menu,
  Inbox,
  BarChart3,
  Shield,
  Workflow,
  Bot,
  Globe,
  CreditCard,
  Users,
} from "lucide-react";
import { IntegrationsStrip } from "@/components/landing/Header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revenue Sol — The AI CRM for service businesses" },
      {
        name: "description",
        content:
          "Revenue Sol picks up calls, replies to texts and forms, and books jobs onto your calendar — built for HVAC, plumbing, electrical, roofing, and cleaning shops.",
      },
      { property: "og:title", content: "Revenue Sol — The AI CRM for service businesses" },
      {
        property: "og:description",
        content:
          "We pick up calls, reply to texts and forms, and book jobs onto your calendar — so you can stop chasing the phone.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

/* ---------- Primitives ---------- */

function BtnPrimary({
  children,
  to,
  invert,
}: {
  children: React.ReactNode;
  to?: string;
  invert?: boolean;
}) {
  const cls = invert
    ? "bg-white text-[color:var(--color-ink)] hover:bg-white/90"
    : "bg-[color:var(--color-ink)] text-white hover:bg-black";
  return (
    <Link
      to={to ?? "/signup"}
      className={`inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

function BtnSecondary({ children, to }: { children: React.ReactNode; to?: string }) {
  return (
    <Link
      to={to ?? "/signin"}
      className="inline-flex h-11 items-center justify-center rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)] px-5 text-sm font-semibold text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-surface-card)]"
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

/* ---------- Nav ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-[color:var(--color-canvas)]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-tight text-[color:var(--color-ink)]">
            <img src={infiniteRankersLogo.url} alt="Infinite Rankers" className="h-7 w-7 rounded-sm object-contain" />
            <span>revenue<span className="text-[color:var(--color-brand-pink)]">.sol</span></span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {["Product", "Solutions", "Customers", "Resources", "Pricing"].map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-[color:var(--color-body)] hover:text-[color:var(--color-ink)]">
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/signin" className="hidden text-sm font-medium text-[color:var(--color-body)] hover:text-[color:var(--color-ink)] sm:inline-flex">
            Sign in
          </Link>
          <BtnPrimary>Try free</BtnPrimary>
          <button className="grid h-10 w-10 place-items-center rounded-xl text-[color:var(--color-ink)] lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-card)] px-3 py-1 text-xs font-medium text-[color:var(--color-body)]">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--color-brand-pink)]" />
              New — AI receptionist that books jobs while you work
            </div>
            <h1 className="display-xl text-[color:var(--color-ink)]">
              Never miss a service <span className="italic font-normal text-[color:var(--color-brand-pink)]">call</span> again.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-body)]">
              Revenue Sol picks up the phone, replies to texts and web forms, and books the
              job straight onto your calendar — so your truck stays full and your office
              stays quiet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BtnPrimary>Start free trial</BtnPrimary>
              <BtnSecondary>Book a demo</BtnSecondary>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[color:var(--color-muted)]">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--color-ink)]" /> No credit card</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--color-ink)]" /> Live in 10 minutes</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--color-ink)]" /> Cancel anytime</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroProductCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cleaner SaaS-style product mockup for the hero */
function HeroProductCard() {
  return (
    <div className="relative">
      {/* soft cream backdrop */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[color:var(--color-surface-soft)]" />

      {/* main dashboard card */}
      <div className="rounded-2xl border border-[color:var(--color-hairline)] bg-white p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="rounded-full bg-[color:var(--color-surface-card)] px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--color-ink)]">
            Inbox · Today
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {[
            { name: "Maria Lopez", msg: "AC not cooling — booked 9–11am", color: "var(--color-brand-pink)", icon: Phone, tag: "Call" },
            { name: "Jordan Reyes", msg: "Furnace won't ignite — sent ETA", color: "var(--color-brand-teal)", icon: Inbox, tag: "SMS", light: true },
            { name: "Tasha Wallace", msg: "Roof leak — estimate sent", color: "var(--color-brand-lavender)", icon: Globe, tag: "Form" },
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)] p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: r.color, color: r.light ? "white" : "var(--color-ink)" }}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-[13px] font-semibold text-[color:var(--color-ink)]">{r.name}</div>
                    <span className="rounded-full bg-[color:var(--color-surface-card)] px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--color-muted)]">{r.tag}</span>
                  </div>
                  <div className="truncate text-[12px] text-[color:var(--color-muted)]">{r.msg}</div>
                </div>
                <Check className="h-4 w-4 text-[color:var(--color-brand-teal)]" />
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ["Booked today", "12"],
            ["Avg reply", "8s"],
            ["Revenue", "$4.2k"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-[color:var(--color-surface-card)] p-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-muted)]">{k}</div>
              <div className="mt-0.5 text-base font-semibold text-[color:var(--color-ink)]">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* floating live call chip */}
      <div className="absolute -left-4 -top-4 hidden rounded-2xl border border-[color:var(--color-hairline)] bg-white p-3 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.4)] sm:block">
        <div className="flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[color:var(--color-brand-pink)] text-white">
            <Mic className="h-3.5 w-3.5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[color:var(--color-brand-mint)] ring-2 ring-white" />
          </span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-muted)]">Live · 00:42</div>
            <div className="text-[12px] font-semibold text-[color:var(--color-ink)]">AI Receptionist</div>
          </div>
        </div>
      </div>

      {/* floating calendar chip */}
      <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-[color:var(--color-hairline)] bg-white p-3 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.4)] sm:block">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[color:var(--color-brand-ochre)]">
            <Calendar className="h-4 w-4 text-[color:var(--color-ink)]" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-muted)]">Booked</div>
            <div className="text-[12px] font-semibold text-[color:var(--color-ink)]">Tomorrow · 9–11am</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Feature card grid (6 colors) ---------- */

type FeatureCard = {
  title: string;
  body: string;
  bg: string;
  text: "light" | "dark";
  visual: React.ReactNode;
};

function FeatureGrid() {
  const cards: FeatureCard[] = [
    {
      title: "An AI receptionist that picks up every call",
      body: "Answers in a natural voice, qualifies the job, and writes a clean summary straight to your CRM.",
      bg: "var(--color-brand-pink)",
      text: "light",
      visual: <VoiceVisual />,
    },
    {
      title: "Replies to texts and web forms in seconds",
      body: "Two-way SMS, Facebook leads, and contact forms — answered, scheduled, and logged.",
      bg: "var(--color-brand-teal)",
      text: "light",
      visual: <ChatVisual />,
    },
    {
      title: "Books straight onto your calendar",
      body: "Knows your service area, hours, and crew capacity before it offers a window.",
      bg: "var(--color-brand-lavender)",
      text: "dark",
      visual: <CalendarVisual />,
    },
    {
      title: "Follows up so leads don't go cold",
      body: "Auto-nurtures estimates with text and email until the customer says yes or no.",
      bg: "var(--color-brand-peach)",
      text: "dark",
      visual: <FollowupVisual />,
    },
    {
      title: "Brings every customer record together",
      body: "Past jobs, equipment, property details, and notes — one tidy page per customer.",
      bg: "var(--color-brand-ochre)",
      text: "dark",
      visual: <RecordsVisual />,
    },
    {
      title: "Plugs into the tools you already pay for",
      body: "ServiceTitan, Housecall Pro, Jobber, QuickBooks, Google Calendar — no rip-and-replace.",
      bg: "var(--color-surface-card)",
      text: "dark",
      visual: <IntegrationsVisual />,
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-14 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Everything your front desk does — automatically</Eyebrow>
            <h2 className="display-lg mt-3 max-w-2xl text-[color:var(--color-ink)]">
              One workspace for every <span className="italic font-normal">job</span>, every channel, every truck.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[color:var(--color-body)]">
              Stop juggling sticky notes, voicemail, and three different inboxes. Revenue Sol is
              the operating system shops use to capture, qualify, and book work — without hiring.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const textColor = c.text === "light" ? "#ffffff" : "var(--color-ink)";
            const muted = c.text === "light" ? "rgba(255,255,255,0.78)" : "var(--color-body)";
            return (
              <article
                key={i}
                className="flex min-h-[420px] flex-col justify-between rounded-3xl p-7"
                style={{ background: c.bg, color: textColor }}
              >
                <div>
                  <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em]" style={{ color: textColor }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>
                    {c.body}
                  </p>
                </div>
                <div className="mt-6">{c.visual}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Embedded product-fragment visuals */

function MiniCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/5 bg-white p-3 text-[color:var(--color-ink)] shadow-[0_18px_36px_-20px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function VoiceVisual() {
  return (
    <MiniCard>
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-brand-pink)] text-white">
          <Mic className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[11px] font-medium text-[color:var(--color-muted)]">Live call · 00:42</div>
          <div className="text-[13px] font-semibold">Outbound caller — water heater leak</div>
        </div>
      </div>
      <div className="mt-3 flex items-end gap-1">
        {[12, 22, 30, 14, 28, 36, 18, 24, 10, 32, 20, 26].map((h, i) => (
          <span key={i} className="w-1.5 rounded-full bg-[color:var(--color-brand-pink)]" style={{ height: h }} />
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-[color:var(--color-surface-card)] px-2.5 py-1.5 text-[12px] text-[color:var(--color-body)]">
        "I can have Mark out tomorrow 8–10am — does that work?"
      </div>
    </MiniCard>
  );
}

function ChatVisual() {
  return (
    <MiniCard>
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold">SMS · (415) 555-0142</div>
        <span className="rounded-full bg-[color:var(--color-brand-mint)]/40 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--color-surface-dark)]">AI</span>
      </div>
      <div className="mt-3 space-y-2 text-[12px]">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[color:var(--color-ink)] px-3 py-1.5 text-white">Need someone to look at my furnace</div>
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[color:var(--color-surface-card)] px-3 py-1.5">Sorry to hear that. Address & what's it doing?</div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[color:var(--color-ink)] px-3 py-1.5 text-white">812 Oak. Won't ignite.</div>
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[color:var(--color-surface-card)] px-3 py-1.5">Booked for today 3–5pm ✓</div>
      </div>
    </MiniCard>
  );
}

function CalendarVisual() {
  return (
    <MiniCard>
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold">This week</div>
        <Calendar className="h-3.5 w-3.5 text-[color:var(--color-muted)]" />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {["M", "T", "W", "T", "F"].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-[color:var(--color-muted)]">{d}</div>
        ))}
        {[
          ["pink", "teal", "ochre", "lavender", "peach"],
          ["lavender", "ochre", "pink", "teal", "ochre"],
          ["", "lavender", "peach", "pink", ""],
        ].flat().map((c, i) => (
          <div
            key={i}
            className="h-5 rounded-md"
            style={{
              background: c ? `var(--color-brand-${c})` : "var(--color-surface-card)",
            }}
          />
        ))}
      </div>
      <div className="mt-3 text-[11px] text-[color:var(--color-muted)]">23 jobs booked · 4 open slots</div>
    </MiniCard>
  );
}

function FollowupVisual() {
  return (
    <MiniCard>
      <div className="text-[12px] font-semibold">Estimate #4821 · $2,140</div>
      <ol className="mt-3 space-y-1.5 text-[12px]">
        {[
          ["Sent estimate", true],
          ["Day 2 — text reminder", true],
          ["Day 5 — email recap", true],
          ["Day 7 — call back", false],
        ].map(([label, done], i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="grid h-4 w-4 place-items-center rounded-full"
              style={{ background: done ? "var(--color-brand-mint)" : "var(--color-surface-card)" }}
            >
              {done ? <Check className="h-3 w-3 text-[color:var(--color-surface-dark)]" /> : null}
            </span>
            <span className={done ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-muted)]"}>{label as string}</span>
          </li>
        ))}
      </ol>
    </MiniCard>
  );
}

function RecordsVisual() {
  return (
    <MiniCard>
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-brand-ochre)] text-[color:var(--color-ink)] text-[12px] font-bold">JR</div>
        <div>
          <div className="text-[13px] font-semibold">Jordan Reyes</div>
          <div className="text-[11px] text-[color:var(--color-muted)]">812 Oak St · Customer since 2021</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px]">
        {[
          ["Furnace", "Carrier 80k"],
          ["Last job", "Mar 12"],
          ["LTV", "$4,820"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-[color:var(--color-surface-card)] p-1.5">
            <div className="text-[color:var(--color-muted)]">{k}</div>
            <div className="font-semibold text-[color:var(--color-ink)]">{v}</div>
          </div>
        ))}
      </div>
    </MiniCard>
  );
}

function IntegrationsVisual() {
  const items = [
    ["ServiceTitan", "var(--color-brand-pink)"],
    ["Jobber", "var(--color-brand-teal)"],
    ["QuickBooks", "var(--color-brand-lavender)"],
    ["Google", "var(--color-brand-peach)"],
    ["Twilio", "var(--color-brand-ochre)"],
    ["Stripe", "var(--color-brand-mint)"],
  ];
  return (
    <MiniCard>
      <div className="text-[12px] font-semibold">6 of 40+ integrations</div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {items.map(([name, c]) => (
          <div key={name} className="flex items-center gap-1.5 rounded-lg bg-[color:var(--color-surface-card)] px-2 py-1.5 text-[11px] font-semibold">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            {name}
          </div>
        ))}
      </div>
    </MiniCard>
  );
}

/* ---------- Capabilities grid (replaces pricing) ---------- */

function Capabilities() {
  const items = [
    { icon: Bot, t: "Custom AI voice", b: "Match your greeting, tone, and brand. Sounds like the person you'd hire." },
    { icon: Workflow, t: "Smart routing", b: "Send emergencies to on-call, quotes to sales, billing to office — automatically." },
    { icon: Shield, t: "Spam & robocall filter", b: "Only real customers get through. Junk never wastes a minute of your day." },
    { icon: BarChart3, t: "Owner dashboard", b: "Calls, bookings, revenue, and missed-opportunity money — one daily glance." },
    { icon: Users, t: "Team handoff", b: "Loop in a tech with one tap. Full call summary, customer history, and job context." },
    { icon: CreditCard, t: "Deposits & invoicing", b: "Collect a deposit on the booking call. Send the invoice when the job's done." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>More inside the platform</Eyebrow>
          <h2 className="display-lg mt-3 text-[color:var(--color-ink)]">
            A full front office, <span className="italic font-normal">without the front office</span>.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, b }) => (
            <div key={t} className="bg-[color:var(--color-canvas)] p-7">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-surface-card)]">
                <Icon className="h-5 w-5 text-[color:var(--color-ink)]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-ink)]">{t}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-body)]">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

function HowItWorks() {
  const steps = [
    { n: "01", title: "Forward your phone & connect your tools", body: "Set it up in 10 minutes. Point your business line at Revenue Sol and link your CRM and calendar." },
    { n: "02", title: "We listen, type, and book — in your voice", body: "Tell us how you greet customers and what info you need. We'll match it on every call, text, and form." },
    { n: "03", title: "You wake up to a full calendar", body: "Every conversation lands in one inbox with a summary, the customer record, and the booked job." },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="display-lg mt-3 text-[color:var(--color-ink)]">
              Live in an <span className="italic font-normal">afternoon</span>. Booking jobs by morning.
            </h2>
            <p className="mt-5 text-base text-[color:var(--color-body)]">
              No new software for your techs to learn. No three-month implementation. Forward
              your line, link a calendar, and let Revenue Sol cover the phones tonight.
            </p>
            <div className="mt-7"><BtnPrimary>Try it free</BtnPrimary></div>
          </div>

          <ol className="lg:col-span-7 space-y-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)] p-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[34px] font-medium tracking-tight text-[color:var(--color-brand-pink)]">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-[color:var(--color-body)]">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pull quote ---------- */

function PullQuote() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 text-center lg:px-8">
        <div className="mx-auto mb-6 flex items-center justify-center gap-1 text-[color:var(--color-brand-ochre)]">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>
        <blockquote className="display-md text-[color:var(--color-ink)]">
          "We were missing about <span className="italic font-normal text-[color:var(--color-brand-pink)]">eight calls a day</span>.
          Revenue Sol caught every one of them in the first week — that's the difference between
          a quiet month and a great one."
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-brand-peach)] font-bold text-[color:var(--color-ink)]">DR</div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[color:var(--color-ink)]">Diego Ramirez</div>
            <div className="text-xs text-[color:var(--color-muted)]">Owner · Ramirez HVAC, Austin TX</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */

function UseCases() {
  const trades = [
    { icon: Wrench, label: "HVAC", c: "var(--color-brand-pink)" },
    { icon: Droplets, label: "Plumbing", c: "var(--color-brand-teal)", light: true },
    { icon: Plug, label: "Electrical", c: "var(--color-brand-ochre)" },
    { icon: Home, label: "Roofing", c: "var(--color-brand-lavender)" },
    { icon: Brush, label: "Cleaning", c: "var(--color-brand-peach)" },
    { icon: Hammer, label: "Handyman", c: "var(--color-surface-card)" },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Built for the trades</Eyebrow>
          <h2 className="display-lg mt-3 text-[color:var(--color-ink)]">
            Made for shops with <span className="italic font-normal">trucks on the road</span>.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map(({ icon: Icon, label, c, light }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl p-5" style={{ background: c, color: light ? "white" : "var(--color-ink)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: light ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.55)" }}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold">{label}</div>
                <div className="text-[13px] opacity-80">Templates, scripts, and price lists ready to go.</div>
              </div>
              <ArrowUpRight className="ml-auto h-5 w-5 opacity-70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats band ---------- */

function StatsBand() {
  const stats = [
    ["+38%", "more jobs booked in month one"],
    ["<8s", "average reply to a new lead"],
    ["24/7", "phone & text coverage"],
    ["10 min", "from sign-up to live"],
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid divide-y divide-[color:var(--color-hairline)] overflow-hidden rounded-3xl border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-soft)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map(([k, v]) => (
            <div key={k} className="p-8 text-center">
              <div className="display-md text-[color:var(--color-ink)]">{k}</div>
              <div className="mt-2 text-sm text-[color:var(--color-muted)]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const items = [
    { quote: "It's like hiring a front-desk person who never sleeps and never forgets to follow up.", who: "Sarah Patel", role: "Co-owner, Patel Plumbing" },
    { quote: "Our after-hours bookings tripled. The kicker — customers think it's a real person.", who: "Mike O'Brien", role: "Ops Manager, BrightVolt Electric" },
    { quote: "Setup took one afternoon. The next morning we had four new tune-ups on the board.", who: "Tasha Wallace", role: "Owner, Wallace Roofing" },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Owners on Revenue Sol</Eyebrow>
          <h2 className="display-lg mt-3 text-[color:var(--color-ink)]">
            Loved by the people who <span className="italic font-normal">run the trucks</span>.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.who} className="rounded-2xl bg-[color:var(--color-surface-card)] p-6">
              <div className="mb-3 flex gap-0.5 text-[color:var(--color-brand-ochre)]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="text-base leading-relaxed text-[color:var(--color-ink)]">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-brand-lavender)] text-xs font-bold text-[color:var(--color-ink)]">
                  {t.who.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[color:var(--color-ink)]">{t.who}</div>
                  <div className="text-xs text-[color:var(--color-muted)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band (clean, no mountains) ---------- */

function CtaBand() {
  return (
    <section className="pb-24 pt-10">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--color-brand-teal)] px-8 py-16 text-white lg:px-16 lg:py-20">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[color:var(--color-brand-pink)] opacity-40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[color:var(--color-brand-lavender)] opacity-30 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">Stop chasing the phone</div>
              <h2 className="display-lg mt-3 text-white">
                Turn every missed call into <span className="italic font-normal text-[color:var(--color-brand-peach)]">booked revenue</span>, starting tonight.
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/80">
                Forward your line, link your calendar, and watch the first job land in your inbox before dinner.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
              <BtnPrimary invert>Start free trial</BtnPrimary>
              <Link to="/signin" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10">
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const cols = [
    { h: "Product", links: ["AI Receptionist", "SMS Inbox", "Booking", "Follow-ups", "Integrations"] },
    { h: "Solutions", links: ["HVAC", "Plumbing", "Electrical", "Roofing", "Cleaning", "Handyman"] },
    { h: "Resources", links: ["Customer stories", "Help center", "Changelog", "Onboarding", "API docs"] },
    { h: "Company", links: ["About", "Careers", "Contact", "Security", "Privacy", "Terms"] },
  ];
  return (
    <footer className="bg-[color:var(--color-canvas)]">
      <div className="mx-auto max-w-[1280px] px-5 pt-20 lg:px-8">
        <div className="rounded-[28px] bg-white border border-[color:var(--color-hairline)] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-[color:var(--color-ink)]">
                <img src={infiniteRankersLogo.url} alt="Infinite Rankers" className="h-9 w-9 rounded-md object-contain" />
                <span>revenue<span className="text-[color:var(--color-brand-pink)]">.sol</span></span>
              </Link>
              <p className="mt-5 max-w-sm text-sm text-[color:var(--color-body)]">
                The AI CRM for service businesses. Built in Austin for the shops that keep
                America running.
              </p>
              <div className="mt-6 flex gap-2"><BtnPrimary>Try free</BtnPrimary></div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              {cols.map((c) => (
                <div key={c.h}>
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-muted)]">{c.h}</div>
                  <ul className="space-y-2.5">
                    {c.links.map((l) => (
                      <li key={l}><a href="#" className="text-sm text-[color:var(--color-body)] hover:text-[color:var(--color-ink)]">{l}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--color-hairline)] pt-6">
            <div className="flex items-center gap-2.5">
              <img src={infiniteRankersLogo.url} alt="Infinite Rankers" className="h-7 w-7 rounded-md object-contain" />
              <span className="text-[12px] font-bold tracking-[0.18em] text-[color:var(--color-ink)]">REVENUE SOL</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[color:var(--color-muted)]">
              <img src={infiniteRankersLogo.url} alt="Infinite Rankers" className="h-6 w-6 rounded-sm object-contain" />
              <span>Powered by Infinite Rankers LLC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Giant brand mark */}
      <div className="select-none px-5 pb-6 pt-8 lg:px-8" aria-hidden="true">
        <svg viewBox="0 0 1000 200" className="block h-auto w-full" preserveAspectRatio="xMidYMid meet">
          <text
            x="500"
            y="172"
            textAnchor="middle"
            textLength="980"
            lengthAdjust="spacingAndGlyphs"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "230px", fill: "var(--color-ink)", letterSpacing: "-0.04em" }}
          >
            REVENUE SOL
          </text>
        </svg>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Page() {
  return (
    <div className="min-h-screen bg-[color:var(--color-canvas)]">
      <Nav />
      <main>
        <Hero />
        <IntegrationsStrip />
        <FeatureGrid />
        <HowItWorks />
        <PullQuote />
        <Capabilities />
        <UseCases />
        <StatsBand />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
