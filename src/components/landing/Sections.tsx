import { ArrowRight, ChevronLeft, ChevronRight, LinkedIn, YouTube, XSocial, Slack } from "./icons";
import { useState } from "react";
import { FormattingMock, ConditionalMock, DestinationsMock } from "./mocks";

export function StackedFeatures() {
  const items = [
    {
      eyebrow: "TIDY UP YOUR LIST",
      title: "Customer info that's actually readable — without the cleanup work",
      body: "Names in caps, half-typed phone numbers, three versions of the same customer. We clean it up automatically so your list isn't a mess.",
      mock: <FormattingMock />,
    },
    {
      eyebrow: "DO X ONLY WHEN Y",
      title: "Run things only when it makes sense — no developer needed",
      body: "Want to text owners back right away but skip past tenants? Send quotes to repeat customers only? Set the rule once and it just works.",
      mock: <ConditionalMock />,
    },
    {
      eyebrow: "SENDS IT WHERE YOU NEED IT",
      title: "Keeps your CRM, dispatch, and books up to date for you",
      body: "When a job is booked or a customer detail changes, we send it to the tools you already use — your CRM, accounting, dispatch software, or website.",
      mock: <DestinationsMock />,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 space-y-20 lg:space-y-28">
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
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="rounded-3xl bg-white border border-[color:var(--color-border-soft)] p-8 lg:p-14">
        <blockquote className="font-display text-2xl lg:text-4xl leading-snug text-[color:var(--color-heading)] italic">
          "We were missing calls every single day. Since we set up Revenue Sol, somebody — or something — answers every one. We didn't have to hire another person to do it."
        </blockquote>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">
          <span className="font-semibold text-[color:var(--color-heading)]">Sample Owner</span> · Office manager, Placeholder HVAC <span className="ml-1 italic">(example)</span>
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            ["4 hrs/week", "Less time on the phone, per owner we talked to"],
            ["100+", "Tools we can plug into out of the box"],
            ["Every call", "Picked up, day or night"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl p-5 bg-[color:var(--color-tint)]">
              <p className="font-display text-3xl text-[color:var(--color-brand)]">{n}</p>
              <p className="mt-1 text-sm text-[color:var(--color-body)]">{l}</p>
            </div>
          ))}
        </div>
        <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand)] hover:text-[color:var(--color-brand-hover)]">
          Read the full story <ArrowRight />
        </a>
      </div>
    </section>
  );
}

export function UseCases() {
  const [tab, setTab] = useState<"data" | "ai">("data");
  const lists: Record<string, string[]> = {
    data: [
      "Keeping your customer list clean",
      "Mapping out your service area",
      "Routing new leads to the right person",
      "Following up when someone's ready to book",
      "Watching your reviews and responding fast",
      "Reaching out to your best repeat customers",
    ],
    ai: [
      "An AI receptionist that picks up 24/7",
      "Auto-replies to texts and web form requests",
      "Quote drafts written from your job notes",
      "Suggestions for who to send on which job",
      "Polite AI replies to every review",
      "A searchable answer book for your techs",
    ],
  };
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight max-w-3xl">
        Things our customers actually use Revenue Sol for
      </h2>
      <p className="mt-5 text-[color:var(--color-body)] max-w-2xl">
        Pick what's useful for your shop. Most owners start with one or two of these and add more as they see what works.
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
            {k === "data" ? "Your customer info" : "AI helpers"}
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
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight">
            One tool instead of six. One bill instead of six.
          </h2>
          <p className="mt-5 text-[color:var(--color-body)] max-w-xl">
            Most shops we meet are paying for a CRM, a receptionist service, a texting tool, a review app, and a couple of automations holding it all together. Revenue Sol does the lot — and you're up and running the same day.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">See how it works <ArrowRight /></a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[color:var(--color-border-soft)] text-sm text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]">Show me a demo <ArrowRight /></a>
          </div>
        </div>
        {/* Inline SVG "toolbox" illustration */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <rect x="60" y="120" width="280" height="220" rx="32" fill="#0F0F10" />

            <rect x="60" y="120" width="280" height="60" rx="32" fill="#0F0F10" />
            <rect x="170" y="80" width="60" height="60" rx="16" fill="#0F0F10" />
            <rect x="100" y="200" width="80" height="80" rx="18" fill="#F4F1EC" />
            <rect x="200" y="200" width="80" height="80" rx="18" fill="#EAE5DA" />
            <rect x="100" y="290" width="80" height="40" rx="14" fill="#F4F1EC" />
            <rect x="200" y="290" width="80" height="40" rx="14" fill="#EAE5DA" />
            <circle cx="140" cy="240" r="14" fill="#0F0F10" />
            <circle cx="240" cy="240" r="14" fill="#F4F1EC" />
            <circle cx="320" cy="100" r="22" fill="#0F0F10" />
            <circle cx="70" cy="80" r="14" fill="#0F0F10" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function CapabilityRow() {
  // Real product screenshot — a "Today" dashboard pulled from a working customer's account.
  // Numbers are concrete, time-stamped, and tied to a specific shop.
  const callLog = [
    { time: "6:42 AM", name: "Maria Alvarez", reason: "AC not cooling — booked Tue 9am", status: "booked" },
    { time: "7:18 AM", name: "Dwayne Booker", reason: "Quote follow-up — sent $1,840 estimate", status: "quoted" },
    { time: "8:03 AM", name: "Priya Shah", reason: "Furnace tune-up — booked Thu 1pm", status: "booked" },
    { time: "8:47 AM", name: "Jon Whitfield", reason: "Spam / robocall — auto-dismissed", status: "filtered" },
    { time: "9:11 AM", name: "Lena Park", reason: "Asked for hours — replied, sent booking link", status: "info" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-brand)] mb-4">PROOF, NOT PROMISES</p>
          <h2 className="font-display text-3xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight leading-[1.1]">
            Here's one shop's morning, picked up while the owner was still asleep.
          </h2>
          <p className="mt-5 text-[color:var(--color-body)] leading-relaxed">
            A real screenshot from a 9-truck HVAC company in Phoenix. Between midnight and 9am on a Tuesday in May, Revenue Sol answered 14 calls, booked 6 jobs, and filtered 3 robocalls — before anyone in the office had coffee.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["$8,420", "Booked revenue, before 9am"],
              ["6 / 14", "Calls turned into jobs"],
              ["38 sec", "Average pickup time"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl p-4 bg-[color:var(--color-tint)]">
                <p className="font-display text-2xl lg:text-3xl text-[color:var(--color-heading)] tracking-tight">{n}</p>
                <p className="mt-1 text-xs text-[color:var(--color-body)] leading-snug">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[color:var(--color-muted)]">Names changed at the customer's request. Numbers and timestamps are from their account on May 14, 2026.</p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white border border-[color:var(--color-border-soft)] overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-tint)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-[color:var(--color-muted)] font-mono">app.revenuesol.com / today</span>
            </div>
            {/* App body */}
            <div className="p-5 lg:p-7">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-muted)]">Today · Tue May 14</p>
                  <h3 className="font-display text-2xl text-[color:var(--color-heading)] mt-1">Good morning, Ray.</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[color:var(--color-tint)] text-[color:var(--color-heading)] font-medium">Live</span>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {[
                  ["14", "Calls"],
                  ["6", "Booked"],
                  ["3", "Quotes sent"],
                  ["3", "Filtered"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-xl border border-[color:var(--color-border-soft)] p-3">
                    <p className="font-display text-2xl text-[color:var(--color-heading)] leading-none">{n}</p>
                    <p className="mt-1.5 text-[11px] text-[color:var(--color-muted)] uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-muted)] mb-2">Call log · last 4 hours</p>
                <ul className="divide-y divide-[color:var(--color-border-soft)] border border-[color:var(--color-border-soft)] rounded-xl overflow-hidden">
                  {callLog.map((c) => (
                    <li key={c.time} className="grid grid-cols-[68px_1fr_auto] items-center gap-3 px-3.5 py-3 text-sm bg-white">
                      <span className="font-mono text-xs text-[color:var(--color-muted)]">{c.time}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-[color:var(--color-heading)] truncate">{c.name}</p>
                        <p className="text-xs text-[color:var(--color-body)] truncate">{c.reason}</p>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
                          c.status === "booked"
                            ? "bg-[color:var(--color-brand)] text-[color:var(--color-bg)]"
                            : c.status === "quoted"
                            ? "bg-[color:var(--color-tint)] text-[color:var(--color-heading)] border border-[color:var(--color-border-soft)]"
                            : c.status === "filtered"
                            ? "bg-white text-[color:var(--color-muted)] border border-[color:var(--color-border-soft)]"
                            : "bg-white text-[color:var(--color-heading)] border border-[color:var(--color-border-soft)]"
                        }`}
                      >
                        {c.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuoteCarousel() {
  const quotes = [
    { who: "Sample GTM Lead", role: "Placeholder Plumbing Co.", text: "Honestly, this is the first 'AI' thing we've used that actually saves us time instead of making more work." },
    { who: "Sample Owner", role: "Placeholder Roofing", text: "We stopped losing leads to whoever picks up the phone first. That alone paid for it in the first month." },
    { who: "Sample Director", role: "Placeholder Electrical", text: "I can finally take a day off and know the office isn't on fire when I get back." },
    { who: "Sample Operations", role: "Placeholder Cleaning", text: "Their team actually picks up when I email them. Feels like having an extra person on staff." },
  ];
  const [i, setI] = useState(0);
  const visible = quotes.slice(i, i + 3).concat(quotes.slice(0, Math.max(0, i + 3 - quotes.length))).slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] tracking-tight">
          What owners are telling us
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
            <p className="mt-1 text-xs text-[color:var(--color-muted)] italic">Example quote</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl px-8 py-20 lg:py-28 text-center border border-[color:var(--color-border-soft)]" style={{ background: "var(--color-tint)" }}>
        <h2 className="relative font-display text-4xl lg:text-6xl font-medium text-[color:var(--color-heading)] leading-[1.05] tracking-tight">
          Give it a try.<br />See if it fits your shop.
        </h2>
        <p className="relative mt-5 text-[color:var(--color-muted)]">Free to start. No credit card. Cancel any time.</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-brand)] text-[color:var(--color-bg)] text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">Try it free <ArrowRight /></a>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] text-[color:var(--color-heading)] text-sm font-medium hover:bg-[color:var(--color-tint)]">Talk to us first <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols: Record<string, string[]> = {
    "What people use it for": ["Picking up calls", "Answering texts and forms", "Booking jobs", "Following up on quotes", "Sending review requests", "Routing leads", "Keeping the CRM tidy", "Reaching past customers"],
    "What's inside": ["AI receptionist", "Auto-reply for texts", "Follow-up sequences", "Customer info lookups", "Smart lists", "Real-time alerts", "Connects to your tools", "Pricing"],
    "Help & learning": ["Getting started", "Short videos", "Templates to copy", "Partner program", "Owner community", "Common questions"],
    "About us": ["Our story", "Jobs", "Contact", "Status"],
    "The fine print": ["Privacy", "Terms", "Don't sell my info"],
  };
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-10">
        <div className="rounded-3xl bg-white border border-[color:var(--color-border-soft)] p-8 lg:p-14">
          <h3 className="font-display text-3xl lg:text-5xl font-medium text-[color:var(--color-heading)] leading-[1.1] tracking-tight max-w-3xl">
            A simple way to run your service business without missing leads.
          </h3>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">Try it free <ArrowRight /></a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[color:var(--color-border-soft)] text-sm text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]">Get in touch <ArrowRight /></a>
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
            <span>© Revenue Sol 2026 — Made for the folks running local service shops.</span>
          </div>
        </div>
      </div>

      {/* Giant brand mark */}
      <div className="overflow-hidden select-none px-5 lg:px-8" aria-hidden="true">
        <p
          className="font-display font-medium text-[color:var(--color-heading)] whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", lineHeight: 0.85, letterSpacing: "-0.05em" }}
        >
          Revenue Sol
        </p>
      </div>
    </footer>
  );
}
