import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount, upgradeToPaid, resetAccount } from "@/lib/account-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Revenue Sol" },
      { name: "description", content: "Your shop's operator OS — calls, jobs, invoices, and revenue, in one calm view." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const acc = useAccount();
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const isPaid = acc.plan === "paid";
  const firstName = acc.firstName || "Alex";
  const company = acc.company || "Your shop";

  return (
    <div className="min-h-dvh bg-[color:var(--color-bg)] text-[color:var(--color-heading)]">
      {/* Plan banner */}
      <div className={[
        "border-b",
        isPaid
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-[color:var(--color-border-soft)] bg-[color:var(--color-heading)] text-[color:var(--color-bg)]",
      ].join(" ")}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-3 text-sm sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <span className={["grid h-6 w-6 place-items-center rounded-full text-[11px] font-medium",
              isPaid ? "bg-emerald-600 text-white" : "bg-white/15 text-white"
            ].join(" ")}>{isPaid ? "✓" : "★"}</span>
            <p>
              {isPaid ? (
                <>You're on the <span className="font-semibold">Operator plan</span> — every feature unlocked.</>
              ) : (
                <>You're on a free trial — <span className="font-semibold">{acc.trialDaysLeft} days left</span>. Upgrade anytime to keep your numbers.</>
              )}
            </p>
          </div>
          {!isPaid && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="inline-flex h-9 items-center rounded-full bg-[color:var(--color-bg)] px-5 text-xs font-medium text-[color:var(--color-heading)] hover:bg-white"
            >
              Upgrade now →
            </button>
          )}
          {isPaid && (
            <button
              onClick={() => { resetAccount(); navigate({ to: "/signin" }); }}
              className="text-xs underline-offset-4 hover:underline"
            >
              Reset demo
            </button>
          )}
        </div>
      </div>

      {/* Top app bar */}
      <header className="border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)]/85 backdrop-blur">
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold tracking-tight sm:text-lg">
            Revenue<span className="text-[color:var(--color-muted)]">.sol</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[color:var(--color-muted)] md:inline">{company}</span>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-heading)] text-sm font-medium text-[color:var(--color-bg)]">
              {firstName.charAt(0)}
            </div>
          </div>
        </div>
        {/* Scrollable section nav */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Today","Calls","Jobs","Clients","Invoices","Reports"].map((t,i) => (
            <button key={t} className={[
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm",
              i === 0 ? "bg-[color:var(--color-heading)] text-[color:var(--color-bg)]" : "text-[color:var(--color-body)] hover:bg-[color:var(--color-tint)]"
            ].join(" ")}>{t}</button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Friday · June 19</p>
            <h1 className="font-display text-[26px] font-medium leading-tight tracking-tight sm:text-4xl">
              Good morning, {firstName}.
            </h1>
            <p className="mt-1 text-[14px] text-[color:var(--color-body)] sm:text-[15px]">Your operator answered 12 calls overnight. 4 turned into booked jobs.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="h-10 flex-1 rounded-full bg-[color:var(--color-heading)] px-5 text-sm font-medium text-[color:var(--color-bg)] hover:bg-black sm:flex-none">+ New job</button>
            <button className="h-10 flex-1 rounded-full border border-[color:var(--color-border-soft)] bg-white px-5 text-sm font-medium hover:bg-[color:var(--color-tint)] sm:flex-none">+ Quote</button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Kpi label="Calls answered" value="12" delta="+3 vs avg" />
          <Kpi label="Jobs booked" value="4" delta="$2,840 added" />
          <Kpi label="Outstanding" value="$6,120" delta={isPaid ? "Auto‑chasing 3" : "Upgrade to auto‑chase"} muted={!isPaid} />
          <Kpi label="Revenue · MTD" value="$48,210" delta="+18% vs last mo" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Today's schedule */}
          <section className="rounded-3xl border border-[color:var(--color-border-soft)] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-medium">Today's route</h2>
              <span className="text-xs text-[color:var(--color-muted)]">3 stops · 18 mi</span>
            </div>
            <ol className="space-y-3">
              {SCHEDULE.map((s) => (
                <li key={s.time} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-2xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] p-3 sm:p-4">
                  <div className="text-center">
                    <p className="font-display text-base font-medium">{s.time}</p>
                    <p className="text-[11px] uppercase tracking-widest text-[color:var(--color-muted)]">{s.ampm}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.client}</p>
                    <p className="truncate text-xs text-[color:var(--color-muted)]">{s.job} · {s.tech}</p>
                  </div>
                  <span className={["rounded-full px-2.5 py-1 text-[11px] font-medium",
                    s.status === "Booked" ? "bg-emerald-100 text-emerald-800" :
                    s.status === "En route" ? "bg-amber-100 text-amber-800" :
                    "bg-[color:var(--color-tint)] text-[color:var(--color-heading)]"
                  ].join(" ")}>{s.status}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Live call feed */}
          <section className="rounded-3xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-heading)] p-5 text-[color:var(--color-bg)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-medium">Live calls</h2>
              <span className="inline-flex items-center gap-2 text-xs text-white/60">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            </div>
            <ul className="space-y-3">
              {CALLS.map((c) => (
                <li key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>{c.when}</span>
                    <span>{c.dur}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-white/70">“{c.intent}”</p>
                  <p className="mt-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[12px] leading-relaxed text-white/80">
                    Agent: {c.reply}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Locked panel for trial */}
        {!isPaid && (
          <section className="mt-10 overflow-hidden rounded-3xl border border-[color:var(--color-border-soft)] bg-white">
            <div className="grid gap-6 p-6 sm:grid-cols-[1.2fr_1fr] sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-tint)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-heading)]">
                  Upgrade · Operator
                </span>
                <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                  Unlock auto‑chasing, AI dispatch & unlimited seats.
                </h3>
                <p className="mt-2 text-[15px] text-[color:var(--color-body)]">
                  Your trial keeps every conversation. Upgrade to keep them working for you after day 14.
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-[color:var(--color-body)]">
                  <li>• 24/7 AI dispatcher with custom scripts</li>
                  <li>• Auto‑chase invoices, deposits & no‑shows</li>
                  <li>• Unlimited seats and crews</li>
                  <li>• Reporting + QuickBooks two‑way sync</li>
                </ul>
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="mt-6 inline-flex h-12 items-center rounded-full bg-[color:var(--color-heading)] px-6 text-sm font-medium text-[color:var(--color-bg)] hover:bg-black"
                >
                  See plans →
                </button>
              </div>
              <div className="relative rounded-2xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Operator</p>
                <p className="mt-1 font-display text-4xl font-medium tracking-tight">$149<span className="text-base text-[color:var(--color-muted)]">/mo</span></p>
                <p className="mt-1 text-sm text-[color:var(--color-body)]">Billed monthly. Cancel anytime.</p>
                <div className="mt-5 space-y-2 text-sm">
                  <Row label="AI calls / month" value="Unlimited" />
                  <Row label="Seats" value="Unlimited" />
                  <Row label="Integrations" value="QuickBooks, Stripe, Twilio" />
                  <Row label="Support" value="Priority chat + phone" />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}

function Kpi({ label, value, delta, muted }: { label: string; value: string; delta: string; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border-soft)] bg-white p-4 sm:p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">{value}</p>
      <p className={["mt-1 text-xs", muted ? "text-[color:var(--color-muted)]" : "text-emerald-700"].join(" ")}>{delta}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[color:var(--color-border-soft)] pt-2 first:border-t-0 first:pt-0">
      <span className="text-[color:var(--color-muted)]">{label}</span>
      <span className="font-medium text-[color:var(--color-heading)]">{value}</span>
    </div>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e)=>e.stopPropagation()} className="w-full max-w-md rounded-3xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Confirm upgrade</p>
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tight">Operator plan · $149/mo</h3>
        <p className="mt-2 text-sm text-[color:var(--color-body)]">You'll keep every call, job and client from your trial. Cancel anytime — no penalties.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="h-11 flex-1 rounded-full border border-[color:var(--color-border-soft)] bg-white text-sm font-medium hover:bg-[color:var(--color-tint)]">Not yet</button>
          <button
            onClick={() => { upgradeToPaid(); onClose(); }}
            className="h-11 flex-1 rounded-full bg-[color:var(--color-heading)] text-sm font-medium text-[color:var(--color-bg)] hover:bg-black"
          >
            Confirm & upgrade
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-[color:var(--color-muted)]">Demo only — no real charge.</p>
      </div>
    </div>
  );
}

const SCHEDULE = [
  { time: "9:30", ampm: "AM", client: "Priya R.", job: "AC tune‑up (recurring)", tech: "Marcus", status: "Booked" },
  { time: "11:00", ampm: "AM", client: "Northside Bakery", job: "Walk‑in cooler — not cooling", tech: "Jess", status: "En route" },
  { time: "2:15", ampm: "PM", client: "Reyes Family", job: "Estimate · ductless install", tech: "You", status: "Quoted" },
];

const CALLS = [
  { id: 1, when: "Just now", dur: "0:42", name: "Hannah W.", intent: "Kitchen sink leaking under cabinet", reply: "I can have a tech to you between 2–4 PM today. Shall I book it?" },
  { id: 2, when: "12 min ago", dur: "1:08", name: "Diego M.", intent: "Quote for water heater replacement", reply: "Got it — I'll text three install windows for this week and a ballpark." },
  { id: 3, when: "37 min ago", dur: "0:31", name: "Sam K.", intent: "Recurring lawn cancel — moving", reply: "No problem. I've paused billing and emailed a final invoice." },
];
