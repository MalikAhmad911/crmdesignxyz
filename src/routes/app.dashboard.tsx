import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap, DollarSign, Send, ChevronRight,
  Calendar as CalendarIcon, Plus, Activity, Wifi, WifiOff,
} from "lucide-react";
import brandLogo from "@/assets/infinite-rankers-logo.jpg.asset.json";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

/* ============================================================ tokens (scoped, inherit brand) */
const scope: React.CSSProperties = {
  // Alias local dashboard tokens to the app-wide Infinite Rankers brand
  ["--dx-canvas" as string]: "#F6F9FC",
  ["--dx-ink" as string]: "#0A2540",
  ["--dx-muted" as string]: "rgba(10,37,64,0.62)",
  ["--dx-soft" as string]: "rgba(10,37,64,0.40)",
  ["--dx-hairline" as string]: "#E3E8EE",
  ["--dx-primary" as string]: "var(--color-primary)",       // #408FDF azure
  ["--dx-primary-deep" as string]: "var(--color-primary-deep)", // #7738D4 violet
  ["--dx-success" as string]: "var(--color-success)",
  ["--dx-accent" as string]: "var(--color-primary-deep)",   // brand violet as accent
  ["--dx-warn" as string]: "var(--color-warning)",
  ["--dx-gradient" as string]: "var(--color-brand-gradient-2)",
  fontFamily: "var(--font-sans)",
  color: "var(--dx-ink)",
};

const display: React.CSSProperties = {
  fontFamily: "var(--font-display)",
};

/* ============================================================ data */
const KPIS = [
  { label: "Open Conversations", value: "23", meta: "1 needs reply", delta: "↓ 85%", tone: "danger" as const },
  { label: "AI Resolution", value: "92%", meta: "12 / 13 handled", delta: "+4%", tone: "success" as const },
  { label: "Reviews / mo", value: "0", meta: "No reviews yet", delta: "—", tone: "neutral" as const },
  { label: "Revenue / mo", value: "$0", meta: "0 pending", delta: "—", tone: "neutral" as const },
];

const CHART = [
  { day: "Mon", m: 40, p: 10 },
  { day: "Tue", m: 60, p: 20 },
  { day: "Wed", m: 30, p: 15 },
  { day: "Thu", m: 50, p: 40 },
  { day: "Fri", m: 45, p: 25 },
  { day: "Sat", m: 12, p: 6 },
  { day: "Sun", m: 18, p: 8 },
];

const PIPELINE = [
  { stage: "New", value: 16, hot: true },
  { stage: "Contacted", value: 1, hot: true },
  { stage: "Qualified", value: 0 },
  { stage: "Won", value: 0 },
  { stage: "Lost", value: 0 },
];

const HOT_LEADS = [
  { name: "Sarah Jenkins", meta: "Called · 2m", hot: 1 },
  { name: "Mike Thompson", meta: "SMS · 14m", hot: 1 },
  { name: "Ahmad zoom", meta: "Call log · Jul 2", hot: 0 },
  { name: "Malik Ahmad", meta: "New · Jun 30", hot: 0 },
  { name: "Adil", meta: "ai_assistant · Jun 24", hot: 0 },
];

const CHIPS = ["Follow up leads", "Review requests", "Payment reminders", "Weekly report", "Reply unread"];

const INTEGRATIONS = [
  { name: "Twilio", status: "healthy" as const },
  { name: "RingCentral", status: "degraded" as const },
  { name: "Retell", status: "healthy" as const },
];

/* ============================================================ page */
function DashboardPage() {
  return (
    <div style={scope} className="min-h-full bg-[var(--dx-canvas)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* ============ Header ============ */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p style={display} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dx-primary)] mb-1.5">
              Thursday, July 16
            </p>
            <h1 style={display} className="truncate text-2xl sm:text-[30px] font-bold tracking-tight text-[var(--dx-ink)] leading-[1.1]">
              Good morning, Infinite Rankers LLC
            </h1>
            <p className="mt-1.5 text-[13.5px] text-[var(--dx-muted)]">
              Your AI agent handled 12 conversations while you were away.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-xl bg-white border border-[var(--dx-hairline)] px-4 text-[13px] font-semibold text-[var(--dx-ink)] shadow-[0_1px_2px_rgba(10,37,64,0.04)] hover:border-[var(--dx-primary)]/40 transition">
              <DollarSign className="h-4 w-4" /> Request payment
            </button>
            <button
              style={{ background: "var(--dx-primary)" }}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-[13px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(99,91,255,0.55)] hover:brightness-110 transition"
            >
              <Plus className="h-4 w-4" /> New message
            </button>
          </div>
        </header>

        {/* ============ Trial banner ============ */}
        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[var(--dx-accent)]/25 bg-[var(--dx-accent)]/[0.06] px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--dx-accent)]/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--dx-accent)]" />
            </span>
            <p className="text-[13px] font-medium text-[var(--dx-ink)] truncate">
              Your free trial ends in <span className="font-bold">331 days</span> — keep every feature active.
            </p>
          </div>
          <button style={display} className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--dx-accent)] hover:underline">
            Upgrade now →
          </button>
        </div>

        {/* ============ Bento Grid ============ */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5 pb-32 lg:pb-8">
          {/* LEFT column (span-8) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 lg:gap-5">

            {/* Infinite Agent */}
            <Tile>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="grid h-9 w-9 place-items-center rounded-xl overflow-hidden ring-1 ring-white/40 shadow-[0_6px_18px_-6px_rgba(119,56,212,0.55)]"
                  style={{ background: "var(--dx-gradient)" }}
                >
                  <img src={brandLogo.url} alt="Infinite Rankers" className="h-full w-full object-cover" />
                </div>
                <h2 style={display} className="text-[17px] font-bold text-[var(--dx-ink)]">Infinite Agent</h2>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[var(--dx-success)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--dx-success)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--dx-success)]" /> Ready
                </span>
              </div>
              <div className="relative">
                <input
                  className="w-full h-14 rounded-2xl bg-[var(--dx-canvas)] border border-[var(--dx-hairline)] pl-5 pr-16 text-[14px] text-[var(--dx-ink)] placeholder:text-[var(--dx-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--dx-primary)]/25 focus:border-[var(--dx-primary)] transition"
                  placeholder="Tell the AI what to do — you'll preview every action first…"
                />
                <button
                  style={{ background: "var(--dx-primary)" }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-xl text-white hover:brightness-110 transition"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHIPS.map(c => (
                  <button
                    key={c}
                    className="px-3 py-1.5 rounded-full bg-white border border-[var(--dx-hairline)] text-[12px] font-medium text-[var(--dx-muted)] hover:border-[var(--dx-primary)]/50 hover:text-[var(--dx-primary)] transition"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Tile>

            {/* Weekly Pulse */}
            <Tile>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 style={display} className="text-[17px] font-bold text-[var(--dx-ink)]">Weekly pulse</h2>
                  <p className="text-[12px] text-[var(--dx-muted)] mt-0.5">Messages & payments · last 7 days</p>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[var(--dx-primary)]" /> Messages
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[var(--dx-success)]" /> Payments
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 sm:gap-3 h-44 items-end">
                {CHART.map((d, i) => (
                  <div key={d.day} className="flex flex-col items-center gap-1.5 group">
                    <div className="w-full flex flex-col justify-end gap-1 h-full">
                      <div
                        className="w-full rounded-t-md transition-all duration-500 group-hover:brightness-110"
                        style={{
                          background: "var(--dx-primary)",
                          height: `${d.m}%`,
                          animation: `dxRise 700ms cubic-bezier(.2,.9,.3,1) ${i * 60}ms both`,
                        }}
                      />
                      <div
                        className="w-full rounded-b-md transition-all duration-500"
                        style={{
                          background: "var(--dx-success)",
                          height: `${d.p}%`,
                          animation: `dxRise 700ms cubic-bezier(.2,.9,.3,1) ${i * 60 + 120}ms both`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--dx-soft)]">{d.day}</span>
                  </div>
                ))}
              </div>
            </Tile>

            {/* Pipeline + System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              <Tile>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={display} className="text-[15px] font-bold text-[var(--dx-ink)]">Pipeline snapshot</h3>
                  <Link to="/app/leads" className="text-[11px] font-bold uppercase tracking-wider text-[var(--dx-primary)] hover:underline">
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {PIPELINE.map(p => (
                    <div
                      key={p.stage}
                      className={`rounded-xl border p-3 text-center transition ${
                        p.value > 0
                          ? "bg-[var(--dx-canvas)] border-[var(--dx-hairline)]"
                          : "bg-transparent border-dashed border-[var(--dx-hairline)] opacity-60"
                      }`}
                    >
                      <p style={display} className="text-[22px] font-bold tabular-nums leading-none text-[var(--dx-ink)]">{p.value}</p>
                      <p className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[var(--dx-muted)]">{p.stage}</p>
                    </div>
                  ))}
                </div>
              </Tile>

              <Tile>
                <div className="flex items-center justify-between mb-4">
                  <h3 style={display} className="text-[15px] font-bold text-[var(--dx-ink)]">System health</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--dx-warn)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--dx-warn)]">
                    <Activity className="h-3 w-3" /> Degraded
                  </span>
                </div>
                <ul className="space-y-2">
                  {INTEGRATIONS.map(i => (
                    <li key={i.name} className="flex items-center justify-between rounded-xl bg-[var(--dx-canvas)] px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        {i.status === "healthy" ? (
                          <Wifi className="h-4 w-4 text-[var(--dx-success)]" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-[var(--dx-warn)]" />
                        )}
                        <span className="text-[13px] font-semibold text-[var(--dx-ink)]">{i.name}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          i.status === "healthy"
                            ? "bg-[var(--dx-success)]/10 text-[var(--dx-success)]"
                            : "bg-[var(--dx-warn)]/10 text-[var(--dx-warn)]"
                        }`}
                      >
                        {i.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </Tile>
            </div>
          </div>

          {/* RIGHT column (span-4) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-4 lg:gap-5">
            {/* KPI 2x2 */}
            <div className="grid grid-cols-2 gap-3">
              {KPIS.map(k => (
                <KpiCard key={k.label} {...k} />
              ))}
            </div>

            {/* AI Autopilot — dark */}
            <div
              className="relative overflow-hidden rounded-2xl p-5 text-white"
              style={{ background: "linear-gradient(135deg,#0A2540 0%,#122F52 100%)" }}
            >
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[var(--dx-primary)]/25 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p style={display} className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/60">AI Autopilot</p>
                  <p style={display} className="mt-1 text-[26px] font-bold leading-none tabular-nums">0</p>
                  <p className="mt-1 text-[12px] text-white/70">automated actions today</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--dx-success)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--dx-success)] ring-1 ring-inset ring-[var(--dx-success)]/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--dx-success)] animate-pulse" /> Active
                </span>
              </div>
              <div className="relative mt-4 flex gap-2">
                <button className="flex-1 h-9 rounded-lg bg-white/10 text-[12px] font-semibold text-white hover:bg-white/15 transition">
                  View log
                </button>
                <button className="flex-1 h-9 rounded-lg bg-white text-[12px] font-semibold text-[var(--dx-ink)] hover:brightness-95 transition">
                  Pause
                </button>
              </div>
            </div>

            {/* Needs your reply */}
            <Tile padding="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 style={display} className="text-[13px] font-bold uppercase tracking-wider text-[var(--dx-muted)]">Needs your reply</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--dx-primary)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--dx-primary)]">1 NEW</span>
              </div>
              <Link
                to="/app/inbox"
                className="group flex items-center gap-3 rounded-xl bg-[var(--dx-canvas)] p-3 hover:bg-[var(--dx-primary)]/[0.05] transition"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-[var(--dx-hairline)] text-[12px] font-bold text-[var(--dx-primary)]">
                  AA
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-[var(--dx-ink)] truncate">Ahmad Amir</p>
                  <p className="text-[11.5px] text-[var(--dx-muted)] truncate">✉️ Hi — Jun 28</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--dx-soft)] group-hover:text-[var(--dx-primary)] group-hover:translate-x-0.5 transition" />
              </Link>
            </Tile>

            {/* Hot leads */}
            <Tile padding="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 style={display} className="text-[13px] font-bold uppercase tracking-wider text-[var(--dx-muted)]">Hot leads</h3>
                <Link to="/app/leads" className="text-[11px] font-bold uppercase tracking-wider text-[var(--dx-primary)] hover:underline">All →</Link>
              </div>
              <ul className="space-y-1">
                {HOT_LEADS.map(l => (
                  <li key={l.name} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-[var(--dx-canvas)] transition cursor-pointer">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{
                        background: l.hot ? "var(--dx-accent)" : "var(--dx-soft)",
                        boxShadow: l.hot ? "0 0 8px rgba(236,72,153,0.6)" : "none",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-semibold text-[var(--dx-ink)] truncate">{l.name}</p>
                      <p className="text-[10.5px] text-[var(--dx-muted)] truncate">{l.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Tile>

            {/* Today's schedule (empty state) */}
            <Tile padding="p-4">
              <h3 style={display} className="text-[13px] font-bold uppercase tracking-wider text-[var(--dx-muted)] mb-3">Today's schedule</h3>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--dx-canvas)] mb-2">
                  <CalendarIcon className="h-5 w-5 text-[var(--dx-soft)]" />
                </div>
                <p className="text-[12.5px] font-semibold text-[var(--dx-ink)]">No appointments today</p>
                <p className="text-[11px] text-[var(--dx-muted)] mt-0.5">Enjoy the quiet ☕</p>
              </div>
            </Tile>
          </aside>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes dxRise { from { transform: scaleY(0); transform-origin: bottom; opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ============================================================ primitives */
function Tile({ children, padding = "p-5" }: { children: React.ReactNode; padding?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-[var(--dx-hairline)] ${padding} transition hover:-translate-y-[1px]`}
      style={{ boxShadow: "0 1px 2px rgba(10,37,64,0.04), 0 4px 12px -6px rgba(10,37,64,0.06)" }}
    >
      {children}
    </div>
  );
}

function KpiCard({
  label, value, meta, delta, tone,
}: { label: string; value: string; meta: string; delta: string; tone: "success" | "danger" | "neutral" }) {
  const deltaColor =
    tone === "success" ? "text-[var(--dx-success)] bg-[var(--dx-success)]/10"
    : tone === "danger" ? "text-[var(--dx-accent)] bg-[var(--dx-accent)]/10"
    : "text-[var(--dx-soft)] bg-black/[0.04]";
  return (
    <div
      className="rounded-2xl bg-white border border-[var(--dx-hairline)] p-4 transition hover:-translate-y-[1px]"
      style={{ boxShadow: "0 1px 2px rgba(10,37,64,0.04)" }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--dx-muted)]">{label}</p>
      <div className="mt-1.5 flex items-baseline justify-between gap-1">
        <span style={display} className="text-[22px] font-bold tabular-nums leading-none text-[var(--dx-ink)]">{value}</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${deltaColor}`}>{delta}</span>
      </div>
      <p className="mt-1.5 text-[10.5px] text-[var(--dx-muted)] truncate">{meta}</p>
    </div>
  );
}
