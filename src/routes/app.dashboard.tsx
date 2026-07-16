import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Send, Sparkles, Wallet, CalendarCheck2, Bot, PhoneCall, MessageSquare,
  Receipt, CheckSquare, TrendingUp, TrendingDown, ArrowUpRight, Activity,
  DollarSign, Mic, Users, Zap, Star, Timer, Gauge, Clock, ChevronRight,
  Plus, PhoneIncoming, PhoneOutgoing, Mail, Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

/* ------------------------------------------------------------------ data */

const HERO_STATS = [
  { key: "revenue",       label: "Revenue today",   value: "$4,280",  delta: "+18%", tone: "success" as const, icon: DollarSign },
  { key: "appointments",  label: "Appointments",    value: "12",      delta: "3 next", tone: "primary" as const, icon: CalendarCheck2 },
  { key: "agents",        label: "AI agents",       value: "4",       delta: "Live",  tone: "ai" as const, icon: Bot },
  { key: "calls",         label: "Calls waiting",   value: "2",       delta: "1m avg", tone: "warning" as const, icon: PhoneCall },
  { key: "messages",      label: "Unread msgs",     value: "7",       delta: "AI drafted", tone: "primary" as const, icon: MessageSquare },
  { key: "pending",       label: "Pending pay",     value: "$1,940",  delta: "3 invoices", tone: "warning" as const, icon: Receipt },
  { key: "tasks",         label: "Today's tasks",   value: "4",       delta: "2 done", tone: "neutral" as const, icon: CheckSquare },
];

const METRICS = [
  { label: "MRR",              value: "$28.4K", delta: "+12%", spark: [4,6,5,8,7,9,10,12,11,14],       tone: "success" as const },
  { label: "Pipeline",         value: "$142K",  delta: "+8%",  spark: [2,3,5,4,6,7,7,8,9,10],           tone: "success" as const },
  { label: "Open jobs",        value: "38",     delta: "+5",   spark: [10,12,11,14,13,15,16,17,18,20],  tone: "success" as const },
  { label: "Bookings",         value: "64",     delta: "+22%", spark: [3,4,4,6,7,7,9,10,11,13],         tone: "success" as const },
  { label: "Missed calls",     value: "3",      delta: "-40%", spark: [8,7,6,6,5,4,3,3,3,3],            tone: "success" as const },
  { label: "AI conversations", value: "182",    delta: "+34%", spark: [20,28,35,40,55,68,80,110,140,182], tone: "ai" as const },
  { label: "Voice minutes",    value: "412",    delta: "+18%", spark: [60,80,100,140,180,220,260,300,340,412], tone: "ai" as const },
  { label: "Conversion rate",  value: "37%",    delta: "+3pt", spark: [22,24,26,28,30,31,33,34,35,37],  tone: "success" as const },
  { label: "Response time",    value: "42s",    delta: "-58%", spark: [180,140,110,90,80,70,60,55,48,42], tone: "success" as const },
  { label: "CSAT",             value: "4.9",    delta: "+0.2", spark: [4.4,4.5,4.5,4.6,4.6,4.7,4.7,4.8,4.9,4.9], tone: "success" as const },
  { label: "Outstanding",      value: "$1.9K",  delta: "-12%", spark: [3,2.8,2.6,2.5,2.4,2.3,2.1,2.0,1.95,1.9], tone: "success" as const },
  { label: "Inbound calls",    value: "94",     delta: "+11%", spark: [40,45,50,55,60,68,72,80,88,94],  tone: "primary" as const },
];

const AI_INSIGHTS = [
  { title: "Revenue at risk", detail: "3 appointments unconfirmed for tomorrow — $1,200 exposure.", action: "Send AI reminders", tone: "warning" as const, icon: TrendingDown },
  { title: "Hot follow-ups",  detail: "5 leads went cold in 48h. AI drafted personalized SMS.",   action: "Review drafts",     tone: "primary" as const, icon: TrendingUp },
  { title: "Missed opportunity", detail: "2 missed calls after hours — AI can auto-book them.", action: "Enable auto-book", tone: "ai" as const, icon: PhoneCall },
  { title: "Forecast",        detail: "You'll close ~$18.4K this week (+22% vs last).",           action: "See forecast",      tone: "success" as const, icon: Gauge },
];

const ACTIVITY = [
  { t: "just now", who: "AI Agent · Nova",  what: "Booked appointment for Sarah Jenkins (HVAC install)", icon: CalendarCheck2, tone: "success" as const },
  { t: "2m",       who: "Payment",          what: "Invoice #1042 paid · $840 · Visa ••4242",             icon: DollarSign,     tone: "success" as const },
  { t: "6m",       who: "Voice AI",         what: "Answered call from (415) 555-0198 · booked in 42s",   icon: PhoneIncoming,  tone: "ai" as const },
  { t: "12m",      who: "SMS",              what: "Follow-up sent to Mike Thompson · delivered",         icon: MessageSquare,  tone: "primary" as const },
  { t: "24m",      who: "Review",           what: "New 5★ from Rachel P. · Google Business",             icon: Star,           tone: "warning" as const },
  { t: "38m",      who: "AI Agent · Atlas", what: "Transferred call to Malik · customer requested owner", icon: PhoneOutgoing,  tone: "info" as const },
  { t: "1h",       who: "Automation",       what: "Sent review request to 6 completed jobs",              icon: Mail,           tone: "primary" as const },
];

const PIPELINE = [
  { stage: "New",       count: 16, value: "$18.2K", tone: "primary" as const },
  { stage: "Contacted", count: 8,  value: "$12.4K", tone: "info" as const },
  { stage: "Qualified", count: 5,  value: "$34.0K", tone: "warning" as const },
  { stage: "Proposal",  count: 3,  value: "$41.5K", tone: "ai" as const },
  { stage: "Won",       count: 12, value: "$36.0K", tone: "success" as const },
];

const CHIPS = [
  "Follow up cold leads",
  "Draft weekly report",
  "Send review requests",
  "Reschedule tomorrow",
  "Chase unpaid invoices",
];

const QUICK_ACTIONS = [
  { l: "New Contact",      icon: Users },
  { l: "Book Appointment", icon: CalendarCheck2 },
  { l: "Send Invoice",     icon: Receipt },
  { l: "Start Campaign",   icon: Zap },
  { l: "Create AI Agent",  icon: Bot },
  { l: "Send SMS",         icon: MessageSquare },
  { l: "Make Call",        icon: PhoneCall },
];

/* ------------------------------------------------------------------ page */

function DashboardPage() {
  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* ============ Hero ============ */}
        <Hero />

        {/* ============ Today overview strip ============ */}
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {HERO_STATS.map(({ key, ...rest }) => (
            <TodayStat key={key} {...rest} />
          ))}
        </section>

        {/* ============ AI Insight signature card ============ */}
        <section className="mt-6">
          <AIInsightPanel />
        </section>

        {/* ============ Metrics grid ============ */}
        <section className="mt-6">
          <SectionHeader
            eyebrow="Performance"
            title="Business metrics"
            hint="This month · updated 2 min ago"
          />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
            {METRICS.map(m => <MetricCard key={m.label} {...m} />)}
          </div>
        </section>

        {/* ============ Two-column: pipeline + voice AI ============ */}
        <section className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          <div className="xl:col-span-2 space-y-4 lg:space-y-5">
            <PipelineSnapshot />
            <LiveActivity />
          </div>
          <div className="space-y-4 lg:space-y-5">
            <VoiceAILive />
            <QuickActions />
          </div>
        </section>

      </div>

      <style>{`
        @keyframes rs-rise { from { transform: scaleY(0); transform-origin: bottom; opacity:0; } to { transform: scaleY(1); opacity:1; } }
        @keyframes rs-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes rs-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes rs-wave { 0%,100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        .rs-fade-up { animation: rs-fade-up 500ms cubic-bezier(.2,.9,.3,1) both; }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 30_000); return () => clearInterval(id); }, []);
  const hour = now.getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <header className="rs-fade-up grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[--color-primary-deep] mb-1.5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-primary] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[--color-primary]" />
          </span>
          {dateStr}
        </p>
        <h1 className="truncate text-2xl sm:text-[32px] font-bold tracking-tight text-[--color-ink] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
          {greet}, Malik <span className="inline-block">👋</span>
        </h1>
        <p className="mt-1.5 text-[13.5px] text-[--color-muted]">
          Your AI handled <span className="font-semibold text-[--color-ink]">14 conversations</span>, booked <span className="font-semibold text-[--color-ink]">3 jobs</span>, and collected <span className="font-semibold text-[--color-ink]">$840</span> while you were away.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="h-10 inline-flex items-center gap-1.5 rounded-xl bg-white border border-[--color-hairline] px-4 text-[13px] font-semibold text-[--color-ink] hover:border-[--color-primary]/40 transition" style={{ boxShadow: "var(--shadow-card)" }}>
          <Wallet className="h-4 w-4" /> Request payment
        </button>
        <button
          className="h-10 inline-flex items-center gap-1.5 rounded-xl px-4 text-[13px] font-semibold text-white transition hover:brightness-110"
          style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }}
        >
          <Sparkles className="h-4 w-4" /> Ask AI
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ Today stat */

function TodayStat({
  label, value, delta, tone, icon: Icon,
}: {
  label: string; value: string; delta: string;
  tone: "success" | "primary" | "ai" | "warning" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const iconBg: Record<string, string> = {
    success:  "bg-[--color-success-subtle] text-[--color-success]",
    primary:  "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    ai:       "bg-[--color-ai-subtle] text-[--color-ai]",
    warning:  "bg-[--color-warning-subtle] text-[--color-warning]",
    neutral:  "bg-[--color-surface-strong] text-[--color-body]",
  };
  return (
    <div
      data-tile
      className="rounded-xl bg-white border border-[--color-hairline] p-3 transition"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`h-7 w-7 grid place-items-center rounded-lg ${iconBg[tone]}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-[10px] font-bold text-[--color-muted]">{delta}</span>
      </div>
      <p className="text-[18px] font-bold tabular-nums leading-none text-[--color-ink]" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
      <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-wider text-[--color-muted] truncate">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ AI Insight signature glass card */

function AIInsightPanel() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10"
      style={{
        background: "linear-gradient(135deg, #0A0F2C 0%, #1E1B4B 60%, #312E81 100%)",
        boxShadow: "0 20px 60px -20px rgba(10,15,44,0.55)",
      }}
    >
      {/* aurora blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(closest-side, #635BFF, transparent)" }} />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(closest-side, #A78BFA, transparent)" }} />
      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/15">
              <Sparkles className="h-3 w-3" /> AI Insight · updated live
            </div>
            <h2 className="mt-3 text-[22px] sm:text-[24px] font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Nova sees <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A5B4FC, #F0ABFC)" }}>4 opportunities</span> for you today.
            </h2>
            <p className="mt-1.5 text-[13.5px] text-white/70 max-w-xl">
              Business summary, revenue forecast, and one-click actions — reviewed and ready to run.
            </p>
          </div>

          {/* Ask AI composer */}
          <div className="w-full sm:w-[380px] shrink-0">
            <div className="relative">
              <input
                aria-label="Ask AI"
                placeholder="Ask Nova anything…"
                className="w-full h-11 rounded-xl bg-white/[0.08] backdrop-blur ring-1 ring-white/15 pl-4 pr-12 text-[13.5px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              <button
                aria-label="Send"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg text-white transition hover:brightness-110"
                style={{ background: "var(--color-brand-gradient-2)" }}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CHIPS.slice(0, 3).map(c => (
                <button key={c} className="px-2.5 py-1 rounded-full bg-white/[0.06] ring-1 ring-white/10 text-[11px] text-white/85 hover:bg-white/[0.12] transition">
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Insight cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {AI_INSIGHTS.map((i, idx) => {
            const I = i.icon;
            const accent: Record<string, string> = {
              warning: "#F59E0B",
              primary: "#A5B4FC",
              ai: "#C4B5FD",
              success: "#4ADE80",
            };
            return (
              <div
                key={i.title}
                className="group relative rounded-2xl bg-white/[0.06] backdrop-blur-xl ring-1 ring-white/10 p-4 hover:bg-white/[0.10] hover:ring-white/20 transition cursor-pointer rs-fade-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 grid place-items-center rounded-lg ring-1 ring-white/15" style={{ background: `${accent[i.tone]}22`, color: accent[i.tone] }}>
                    <I className="h-4 w-4" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white/90 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[13px] font-bold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>{i.title}</p>
                <p className="mt-1 text-[11.5px] text-white/65 leading-snug line-clamp-2">{i.detail}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90">
                  {i.action} <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Section header */

function SectionHeader({ eyebrow, title, hint }: { eyebrow?: string; title: string; hint?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 flex-wrap">
      <div>
        {eyebrow && <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[--color-primary-deep]" style={{ fontFamily: "var(--font-display)" }}>{eyebrow}</p>}
        <h2 className="text-[18px] font-bold text-[--color-ink] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{title}</h2>
      </div>
      {hint && <span className="text-[11.5px] text-[--color-muted]">{hint}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ Metric card w/ sparkline + count-up */

function useCountUp(target: string) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    const numeric = Number(target.replace(/[^0-9.-]/g, ""));
    if (!isFinite(numeric) || numeric === 0) { setDisplay(target); return; }
    const prefix = target.match(/^[^\d-]*/)?.[0] ?? "";
    const suffix = target.match(/[^\d.]*$/)?.[0] ?? "";
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = numeric * eased;
      const decimals = (target.split(".")[1]?.length ?? 0);
      setDisplay(`${prefix}${cur.toFixed(decimals)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return display;
}

function MetricCard({
  label, value, delta, spark, tone,
}: { label: string; value: string; delta: string; spark: number[]; tone: "success" | "ai" | "primary" | "neutral" }) {
  const display = useCountUp(value);
  const stroke: Record<string, string> = {
    success: "#22C55E",
    ai:      "#635BFF",
    primary: "#4F46E5",
    neutral: "#697386",
  };
  const isNeg = delta.trim().startsWith("-");
  const deltaCls = isNeg
    ? "text-[--color-error] bg-[--color-error-subtle]"
    : "text-[--color-success] bg-[--color-success-subtle]";

  const w = 120, h = 36;
  const min = Math.min(...spark), max = Math.max(...spark);
  const range = max - min || 1;
  const points = spark.map((v, i) => {
    const x = (i / (spark.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const areaPoints = `0,${h} ${points} ${w},${h}`;
  const gradId = `sp-${label.replace(/\s/g, "-")}`;

  return (
    <div
      data-tile
      className="rounded-2xl bg-white border border-[--color-hairline] p-4 transition"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[--color-muted]">{label}</p>
        <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-md ${deltaCls}`}>{delta}</span>
      </div>
      <p className="mt-1.5 text-[22px] font-bold tabular-nums text-[--color-ink] leading-none" style={{ fontFamily: "var(--font-display)" }}>
        {display}
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full h-9" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor={stroke[tone]} stopOpacity="0.28" />
            <stop offset="100%" stopColor={stroke[tone]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#${gradId})`} />
        <polyline points={points} fill="none" stroke={stroke[tone]} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ Live activity */

function LiveActivity() {
  return (
    <div className="rounded-2xl bg-white border border-[--color-hairline] p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-success] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[--color-success]" />
          </span>
          <h3 className="text-[15px] font-bold text-[--color-ink] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Live activity</h3>
        </div>
        <Link to="/app/inbox" className="text-[11px] font-bold uppercase tracking-wider text-[--color-primary-deep] hover:underline">
          Open feed →
        </Link>
      </div>
      <ol className="relative">
        <span className="absolute left-[15px] top-1 bottom-1 w-px bg-[--color-hairline]" />
        {ACTIVITY.map((a, i) => {
          const I = a.icon;
          const bg: Record<string, string> = {
            success:  "bg-[--color-success-subtle] text-[--color-success]",
            primary:  "bg-[--color-primary-subdued] text-[--color-primary-deep]",
            ai:       "bg-[--color-ai-subtle] text-[--color-ai]",
            warning:  "bg-[--color-warning-subtle] text-[--color-warning]",
            info:     "bg-[--color-info-subtle] text-[--color-info]",
          };
          return (
            <li key={i} className="relative flex gap-3 py-2.5 rs-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`relative z-10 h-8 w-8 grid place-items-center rounded-full ring-4 ring-white shrink-0 ${bg[a.tone]}`}>
                <I className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12.5px] font-semibold text-[--color-ink]">{a.who}</span>
                  <span className="text-[10.5px] text-[--color-muted-soft] font-mono">{a.t}</span>
                </div>
                <p className="text-[12.5px] text-[--color-body] leading-snug">{a.what}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ Pipeline snapshot */

function PipelineSnapshot() {
  const total = PIPELINE.reduce((a, b) => a + b.count, 0);
  const colors: Record<string, string> = {
    primary: "#635BFF",
    info:    "#3B82F6",
    warning: "#F59E0B",
    ai:      "#8B5CF6",
    success: "#22C55E",
  };
  return (
    <div className="rounded-2xl bg-white border border-[--color-hairline] p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[--color-ink] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Pipeline snapshot</h3>
          <p className="text-[11.5px] text-[--color-muted] mt-0.5">{total} deals · $142.1K weighted</p>
        </div>
        <Link to="/app/jobs" className="text-[11px] font-bold uppercase tracking-wider text-[--color-primary-deep] hover:underline">
          Kanban →
        </Link>
      </div>

      {/* stacked progress bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[--color-surface-strong]">
        {PIPELINE.map(p => (
          <div key={p.stage} style={{ width: `${(p.count / total) * 100}%`, background: colors[p.tone] }} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
        {PIPELINE.map((p, i) => (
          <div key={p.stage}
            className="group rounded-xl border border-[--color-hairline] p-3 hover:border-[--color-primary]/40 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition cursor-pointer rs-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: colors[p.tone] }} />
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[--color-muted]">{p.stage}</span>
            </div>
            <p className="mt-1.5 text-[20px] font-bold tabular-nums text-[--color-ink] leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {p.count}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[--color-body] tabular-nums">{p.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Voice AI live */

function VoiceAILive() {
  const bars = Array.from({ length: 22 });
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 text-white"
      style={{ background: "linear-gradient(135deg,#0A2540 0%, #10305C 60%, #1E1B4B 100%)" }}
    >
      <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "#635BFF" }} />
      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 grid place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <Mic className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60">Voice AI · Live</p>
            <p className="text-[13px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>Nova · Nova is speaking</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[--color-success]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7EE8A2] ring-1 ring-inset ring-[--color-success]/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[--color-success] animate-pulse" /> Positive
        </span>
      </div>

      {/* Waveform */}
      <div className="relative flex items-center gap-[3px] h-14 my-2">
        {bars.map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full"
            style={{
              background: "linear-gradient(180deg,#A5B4FC,#635BFF)",
              animation: `rs-wave ${900 + (i % 5) * 130}ms ease-in-out ${i * 40}ms infinite`,
              height: "100%",
            }}
          />
        ))}
      </div>

      {/* Transcript */}
      <div className="relative rounded-xl bg-white/[0.06] ring-1 ring-white/10 p-3">
        <div className="flex items-center gap-1.5 mb-1 text-[10.5px] uppercase tracking-wider text-white/50 font-bold">
          <Volume2 className="h-3 w-3" /> Transcript · (415) 555-0198
        </div>
        <p className="text-[12.5px] text-white/85 leading-snug">
          "…yes, Thursday at 2pm works. Please confirm my address is 1240 Oak Street."
        </p>
        <p className="mt-1.5 text-[11.5px] text-white/55 leading-snug">
          <span className="inline-flex items-center gap-1 text-[--color-ai]"><Sparkles className="h-3 w-3" /></span> Nova is thinking · booking appointment…
        </p>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <button className="h-9 rounded-lg bg-white/10 text-[12px] font-semibold hover:bg-white/15 transition">
          <Timer className="inline h-3.5 w-3.5 mr-1" /> 01:24
        </button>
        <button className="h-9 rounded-lg bg-white text-[12px] font-semibold text-[--color-ink] hover:brightness-95 transition">
          Take over
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Quick actions */

function QuickActions() {
  return (
    <div className="rounded-2xl bg-white border border-[--color-hairline] p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[--color-ink] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Quick actions</h3>
          <p className="text-[11.5px] text-[--color-muted] mt-0.5">Command ⌘K for more</p>
        </div>
        <button className="h-8 w-8 grid place-items-center rounded-lg bg-[--color-primary-subdued] text-[--color-primary-deep] hover:bg-[--color-primary]/15 transition">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((a, i) => {
          const I = a.icon;
          return (
            <button
              key={a.l}
              className="group flex items-center gap-2 rounded-xl border border-[--color-hairline] px-3 py-2.5 text-left hover:border-[--color-primary]/40 hover:bg-[--color-primary-subdued]/40 transition rs-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="h-7 w-7 grid place-items-center rounded-lg bg-[--color-surface-strong] text-[--color-primary-deep] group-hover:bg-white transition">
                <I className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12.5px] font-semibold text-[--color-ink]">{a.l}</span>
            </button>
          );
        })}
      </div>
      <button className="mt-3 w-full h-10 rounded-xl text-[13px] font-semibold text-white transition hover:brightness-110 flex items-center justify-center gap-1.5"
        style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }}
      >
        <Activity className="h-4 w-4" /> Open Command Palette
      </button>
    </div>
  );
}
