import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, PhoneMissed, CalendarCheck, DollarSign, Star, TrendingUp, TrendingDown,
  Phone, MessageSquare, UserPlus, Briefcase, Receipt, ArrowUpRight, ArrowRight,
  Users, Zap, Clock, CheckCircle2, AlertCircle, MoreHorizontal, Filter, Download,
  Activity, Target, Wallet, Bot, ChevronRight, Plus, Eye, PhoneCall,
} from "lucide-react";
import { Card, Btn, Avatar } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

/* ============================================================ data */

const KPIS = [
  {
    label: "Revenue",
    value: "$48,265",
    delta: "+18.2%",
    positive: true,
    hint: "vs last month",
    icon: DollarSign,
    tone: "success" as const,
    spark: [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 36, 44],
  },
  {
    label: "New Leads",
    value: "284",
    delta: "+12.4%",
    positive: true,
    hint: "vs last month",
    icon: Users,
    tone: "primary" as const,
    spark: [8, 12, 10, 15, 14, 18, 16, 22, 20, 24, 26, 28],
  },
  {
    label: "Booked Jobs",
    value: "127",
    delta: "+8.1%",
    positive: true,
    hint: "vs last month",
    icon: CalendarCheck,
    tone: "info" as const,
    spark: [14, 16, 15, 18, 17, 19, 21, 20, 22, 24, 23, 27],
  },
  {
    label: "AI Resolutions",
    value: "1,842",
    delta: "-3.2%",
    positive: false,
    hint: "vs last month",
    icon: Bot,
    tone: "ai" as const,
    spark: [30, 34, 32, 36, 40, 38, 35, 33, 30, 28, 27, 26],
  },
];

const REVENUE_CHART = [
  { day: "Mon", revenue: 3200, jobs: 2400 },
  { day: "Tue", revenue: 4100, jobs: 2900 },
  { day: "Wed", revenue: 3800, jobs: 3100 },
  { day: "Thu", revenue: 5200, jobs: 3600 },
  { day: "Fri", revenue: 6100, jobs: 4200 },
  { day: "Sat", revenue: 4800, jobs: 3400 },
  { day: "Sun", revenue: 3900, jobs: 2800 },
];

const PIPELINE = [
  { stage: "New",         count: 42, value: "$18.4K", tone: "info" as const,    pct: 100 },
  { stage: "Contacted",   count: 28, value: "$12.1K", tone: "primary" as const, pct: 66 },
  { stage: "Qualified",   count: 19, value: "$9.7K",  tone: "ai" as const,      pct: 45 },
  { stage: "Proposal",    count: 12, value: "$6.2K",  tone: "warning" as const, pct: 28 },
  { stage: "Closed Won",  count:  8, value: "$4.8K",  tone: "success" as const, pct: 19 },
];

const LEADS = [
  { id: "l1", name: "Priya Rao",     source: "Website form", score: 92, need: "AC not cooling — urgent visit today.",     time: "2m ago" },
  { id: "l2", name: "Jordan Pike",   source: "Missed call",  score: 78, need: "Quote request: bathroom repipe.",           time: "12m ago" },
  { id: "l3", name: "Maya Sørensen", source: "Google Ads",   score: 64, need: "Furnace tune-up, flexible schedule.",       time: "1h ago" },
  { id: "l4", name: "Aisha Otieno",  source: "Referral",     score: 88, need: "Water heater replacement estimate.",        time: "2h ago" },
];

const ACTIVITY = [
  { id: "ac1", who: "AI Receptionist", what: "Booked 2pm today for Priya Rao",             time: "2m",  icon: Bot,           tone: "ai" as const },
  { id: "ac2", who: "Marcus L.",       what: "Marked Furnace tune-up as en-route",         time: "18m", icon: Briefcase,     tone: "info" as const },
  { id: "ac3", who: "Stripe",          what: "Collected $1,450 from Aisha O.",             time: "1h",  icon: Wallet,        tone: "success" as const },
  { id: "ac4", who: "AI Employee",     what: "Sent review request to Nina B.",             time: "2h",  icon: Sparkles,      tone: "ai" as const },
  { id: "ac5", who: "You",             what: "Approved invoice #INV-2044",                 time: "3h",  icon: Receipt,       tone: "primary" as const },
  { id: "ac6", who: "AI Brain",        what: "Created 3 follow-ups for unpaid invoices",   time: "5h",  icon: Zap,           tone: "warning" as const },
];

const TASKS = [
  { id: "t1", label: "Call back Jordan Pike",           due: "Today, 3:00pm", done: false, priority: "high" as const },
  { id: "t2", label: "Send quote to Maya Sørensen",      due: "Today, 5:00pm", done: false, priority: "med"  as const },
  { id: "t3", label: "Review AI drafts (4 pending)",    due: "Tomorrow",      done: false, priority: "high" as const },
  { id: "t4", label: "Approve payroll for this week",   due: "Fri",           done: true,  priority: "low"  as const },
  { id: "t5", label: "Team sync — Q3 planning",         due: "Fri, 10:00am",  due2: true,  done: false, priority: "med" as const },
];

const CHANNELS = [
  { name: "Website form", value: 42, pct: 34, color: "var(--color-primary)" },
  { name: "Google Ads",   value: 28, pct: 23, color: "var(--color-info)" },
  { name: "Referral",     value: 22, pct: 18, color: "var(--color-success)" },
  { name: "Missed call",  value: 18, pct: 14, color: "var(--color-warning)" },
  { name: "Other",        value: 14, pct: 11, color: "var(--color-ai)" },
];

const QUICK = [
  { label: "New Contact",   icon: UserPlus,      to: "/app/contacts" },
  { label: "New Job",       icon: Briefcase,     to: "/app/jobs" },
  { label: "Send Invoice",  icon: Receipt,       to: "/app/payments" },
  { label: "Send Message",  icon: MessageSquare, to: "/app/inbox" },
  { label: "Log a Call",    icon: PhoneCall,     to: "/app/calls" },
  { label: "Ask AI",        icon: Sparkles,      to: "/app/ai-search" },
];

/* ============================================================ helpers */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
function today() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

const TONE_BG: Record<string, string> = {
  primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
  success: "bg-[--color-success-subtle] text-[--color-success]",
  warning: "bg-[--color-warning-subtle] text-[--color-warning]",
  info:    "bg-[--color-info-subtle]    text-[--color-info]",
  ai:      "bg-[--color-ai-subtle]      text-[--color-ai]",
  neutral: "bg-[--color-surface-strong] text-[--color-body]",
};

const TONE_STROKE: Record<string, string> = {
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  info:    "var(--color-info)",
  ai:      "var(--color-ai)",
};

/* ============================================================ atoms */

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 96, h = 32, pad = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => `${pad + i * step},${h - pad - ((v - min) / range) * (h - pad * 2)}`);
  const path = `M ${pts.join(" L ")}`;
  const area = `${path} L ${w - pad},${h - pad} L ${pad},${h - pad} Z`;
  const stroke = positive ? "var(--color-success)" : "var(--color-error)";
  const id = `sg-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KpiCard({ k }: { k: typeof KPIS[number] }) {
  const Icon = k.icon;
  const Trend = k.positive ? TrendingUp : TrendingDown;
  return (
    <div
      className="bg-white rounded-2xl border border-[--color-hairline] p-5 min-w-0 relative overflow-hidden transition hover:shadow-[var(--shadow-elev)] hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[--color-muted] truncate">{k.label}</div>
          <div className="text-[28px] font-semibold tracking-tight text-[--color-ink] tabular-nums mt-2 leading-none truncate">{k.value}</div>
        </div>
        <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${TONE_BG[k.tone]}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 mt-4">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-semibold ${k.positive ? "bg-[--color-success-subtle] text-[--color-success]" : "bg-[--color-error-subtle] text-[--color-error]"}`}>
            <Trend size={11} />
            {k.delta}
          </div>
          <span className="text-[11.5px] text-[--color-muted] truncate">{k.hint}</span>
        </div>
        <div className="shrink-0">
          <Sparkline data={k.spark} positive={k.positive} />
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const w = 620, h = 220, padL = 36, padR = 12, padT = 16, padB = 28;
  const iw = w - padL - padR, ih = h - padT - padB;
  const max = Math.max(...REVENUE_CHART.map(d => d.revenue)) * 1.15;
  const step = iw / REVENUE_CHART.length;
  const barW = Math.min(18, step * 0.32);
  const yTicks = 4;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" style={{ aspectRatio: `${w} / ${h}` }}>


        {/* grid */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const y = padT + (ih / yTicks) * i;
          const val = Math.round((max / yTicks) * (yTicks - i));
          return (
            <g key={i}>
              <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="var(--color-hairline)" strokeDasharray="3 4" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="var(--color-muted)">
                ${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
              </text>
            </g>
          );
        })}
        {/* bars + line */}
        {REVENUE_CHART.map((d, i) => {
          const x = padL + step * i + step / 2;
          const bh = (d.jobs / max) * ih;
          const rh = (d.revenue / max) * ih;
          return (
            <g key={d.day}>
              <rect x={x - barW - 1} y={padT + ih - bh} width={barW} height={bh} rx="4" fill="var(--color-primary-subdued)" />
              <rect x={x + 1}        y={padT + ih - rh} width={barW} height={rh} rx="4" fill="var(--color-primary)" />
              <text x={x} y={h - 10} textAnchor="middle" fontSize="10.5" fill="var(--color-muted)">{d.day}</text>
            </g>
          );
        })}
        {/* trend line over revenue */}
        <path
          d={REVENUE_CHART.map((d, i) => {
            const x = padL + step * i + step / 2 + 1 + 18 / 2;
            const y = padT + ih - (d.revenue / max) * ih;
            return `${i === 0 ? "M" : "L"} ${x},${y}`;
          }).join(" ")}
          fill="none"
          stroke="var(--color-primary-deep)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function ChannelDonut() {
  const size = 148, stroke = 18, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  let acc = 0;
  const total = CHANNELS.reduce((s, x) => s + x.value, 0);
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>

        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-surface-strong)" strokeWidth={stroke} fill="none" />
          {CHANNELS.map((s, i) => {
            const pct = s.value / total;
            const dash = c * pct;
            const gap = c - dash;
            const offset = -c * acc;
            acc += pct;
            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
                fill="none"
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-[11px] text-[--color-muted] font-medium">Total</div>
            <div className="text-[22px] font-semibold text-[--color-ink] tabular-nums leading-none mt-0.5">{total}</div>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 w-full space-y-2">
        {CHANNELS.map(s => (
          <div key={s.name} className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[12.5px] text-[--color-body] truncate flex-1">{s.name}</span>
            <span className="text-[12px] font-semibold tabular-nums text-[--color-ink] shrink-0">{s.value}</span>
            <span className="text-[11px] text-[--color-muted] tabular-nums shrink-0 w-8 text-right">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action, to }: { title: string; subtitle?: string; action?: string; to?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-[--color-ink] tracking-tight truncate">{title}</h2>
        {subtitle && <p className="text-[12px] text-[--color-muted] mt-0.5 truncate">{subtitle}</p>}
      </div>
      {action && to && (
        <Link to={to} className="text-[12.5px] font-semibold text-[--color-primary-deep] hover:underline shrink-0 inline-flex items-center gap-0.5">
          {action} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

function AiCallout() {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden border border-[--color-primary]/25"
      style={{ background: "linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 45%, #FFFFFF 100%)" }}
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-40" style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }} />
      <div className="relative flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl grid place-items-center shrink-0 shadow-[0_6px_16px_rgba(99,91,255,0.35)]" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-ai))" }}>
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold text-[--color-ink]">AI Assistant · 4 pending approvals</div>
          <p className="text-[12.5px] text-[--color-body] mt-1 leading-relaxed">
            "Hi Priya — we can be there at <b>3pm today</b>. I'll send a confirmation text with the tech's ETA."
          </p>
          <div className="flex gap-2 mt-3">
            <Btn variant="primary" size="sm">Approve &amp; send</Btn>
            <Btn variant="secondary" size="sm">Edit draft</Btn>
            <Btn variant="ghost" size="sm">Skip</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, to }: { label: string; icon: typeof Phone; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 rounded-xl border border-[--color-hairline] bg-white px-3 py-2.5 hover:border-[--color-primary]/40 hover:shadow-[var(--shadow-card)] transition group min-w-0"
    >
      <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0 group-hover:scale-105 transition">
        <Icon size={15} />
      </div>
      <span className="text-[12.5px] font-medium text-[--color-ink] truncate flex-1">{label}</span>
      <ArrowUpRight size={13} className="text-[--color-muted] group-hover:text-[--color-primary-deep] shrink-0" />
    </Link>
  );
}

function LeadRow({ l }: { l: typeof LEADS[number] }) {
  const tone = l.score >= 80 ? "success" : l.score >= 60 ? "warning" : "info";
  return (
    <div className="flex items-center gap-3 py-3 min-w-0 border-b border-[--color-hairline-soft] last:border-0">
      <Avatar name={l.name} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-semibold text-[--color-ink] truncate">{l.name}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${TONE_BG[tone]}`}>{l.score}</span>
        </div>
        <div className="text-[11.5px] text-[--color-muted] truncate">{l.source} · {l.time}</div>
      </div>
      <div className="hidden sm:flex items-center gap-1 shrink-0">
        <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]" title="Call">
          <Phone size={14} />
        </button>
        <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]" title="Message">
          <MessageSquare size={14} />
        </button>
        <button className="h-8 px-2.5 rounded-lg text-[11.5px] font-semibold text-white shrink-0" style={{ background: "var(--color-primary)" }}>Book</button>
      </div>
      <ArrowRight size={15} className="sm:hidden text-[--color-muted] shrink-0" />
    </div>
  );
}

function ActivityRow({ a }: { a: typeof ACTIVITY[number] }) {
  const Icon = a.icon;
  return (
    <div className="flex items-start gap-3 py-3 min-w-0 border-b border-[--color-hairline-soft] last:border-0">
      <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${TONE_BG[a.tone]}`}>
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] text-[--color-body] leading-snug">
          <span className="font-semibold text-[--color-ink]">{a.who}</span>{" "}
          <span className="text-[--color-body]">{a.what}</span>
        </div>
      </div>
      <span className="text-[11px] text-[--color-muted] shrink-0 pt-0.5 tabular-nums">{a.time}</span>
    </div>
  );
}

function TaskRow({ t }: { t: typeof TASKS[number] }) {
  const prioCls = t.priority === "high" ? "text-[--color-error] bg-[--color-error-subtle]"
                : t.priority === "med"  ? "text-[--color-warning] bg-[--color-warning-subtle]"
                : "text-[--color-muted] bg-[--color-surface-strong]";
  return (
    <div className="flex items-center gap-3 py-2.5 min-w-0 border-b border-[--color-hairline-soft] last:border-0">
      <button
        className={`w-4 h-4 rounded border shrink-0 grid place-items-center transition ${
          t.done ? "bg-[--color-success] border-[--color-success]" : "border-[--color-hairline] hover:border-[--color-primary]"
        }`}
        aria-label="Toggle task"
      >
        {t.done && <CheckCircle2 size={12} className="text-white" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className={`text-[12.5px] truncate ${t.done ? "line-through text-[--color-muted]" : "text-[--color-ink] font-medium"}`}>{t.label}</div>
        <div className="text-[11px] text-[--color-muted] truncate flex items-center gap-1">
          <Clock size={10} /> {t.due}
        </div>
      </div>
      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md shrink-0 ${prioCls}`}>
        {t.priority}
      </span>
    </div>
  );
}

function PipelineBar() {
  return (
    <div className="space-y-3">
      {PIPELINE.map(p => (
        <div key={p.stage} className="min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0`} style={{ background: TONE_STROKE[p.tone] }} />
              <span className="text-[12.5px] font-medium text-[--color-ink] truncate">{p.stage}</span>
              <span className="text-[11px] text-[--color-muted] tabular-nums shrink-0">{p.count}</span>
            </div>
            <span className="text-[12px] font-semibold tabular-nums text-[--color-ink] shrink-0">{p.value}</span>
          </div>
          <div className="h-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${p.pct}%`, background: TONE_STROKE[p.tone] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================ page */

function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1400px] mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[--color-primary-deep] truncate">{today()}</div>
          <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-tight text-[--color-ink] truncate mt-1">
            {greeting()}, Alex 👋
          </h1>
          <p className="hidden sm:block text-[13px] text-[--color-muted] mt-1 truncate">
            Here's what's happening across your business today.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Btn variant="secondary" size="sm" icon={<Filter size={13} />} className="hidden md:inline-flex">Last 30 days</Btn>
          <Btn variant="secondary" size="sm" icon={<Download size={13} />} className="hidden lg:inline-flex">Export</Btn>
          <Btn variant="secondary" size="sm" className="md:hidden !px-2" aria-label="Filter"><Filter size={14} /></Btn>
          <Btn variant="primary"   size="sm" icon={<Plus size={13} />}>New</Btn>
        </div>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {KPIS.map(k => <KpiCard key={k.label} k={k} />)}
      </div>

      {/* AI Callout */}
      <AiCallout />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Revenue chart — 2 cols */}
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold text-[--color-ink] tracking-tight truncate">Revenue overview</h2>
                <p className="text-[12px] text-[--color-muted] mt-0.5">Last 7 days · Revenue vs Jobs</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--color-primary)" }} />
                  <span className="text-[11.5px] text-[--color-body]">Revenue</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[--color-primary-subdued]" />
                  <span className="text-[11.5px] text-[--color-body]">Jobs</span>
                </div>
                <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
            <RevenueChart />
          </div>
        </Card>

        {/* Pipeline */}
        <Card padded={false}>
          <div className="p-5">
            <SectionHeader title="Sales pipeline" subtitle="$51.2K in play" action="View" to="/app/contacts" />
            <PipelineBar />
            <div className="mt-4 pt-4 border-t border-[--color-hairline] flex items-center justify-between gap-2 min-w-0">
              <div className="text-[11.5px] text-[--color-muted] truncate">Avg. close time · <b className="text-[--color-ink]">6.4 days</b></div>
              <div className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[--color-success]">
                <TrendingUp size={11} /> +12%
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Fresh leads */}
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5">
            <SectionHeader title="Fresh leads" subtitle="4 new in the last hour" action="See all" to="/app/contacts" />
            <div>
              {LEADS.map(l => <LeadRow key={l.id} l={l} />)}
            </div>
          </div>
        </Card>

        {/* Lead sources */}
        <Card padded={false}>
          <div className="p-5">
            <SectionHeader title="Lead sources" subtitle="This month" />
            <ChannelDonut />
          </div>
        </Card>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent activity */}
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5">
            <SectionHeader title="Recent activity" subtitle="Across your team and AI agents" action="Open feed" to="/app/inbox" />
            <div>
              {ACTIVITY.map(a => <ActivityRow key={a.id} a={a} />)}
            </div>
          </div>
        </Card>

        {/* Tasks */}
        <Card padded={false}>
          <div className="p-5">
            <SectionHeader title="Your tasks" subtitle="5 today" action="View all" to="/app/inbox" />
            <div>
              {TASKS.map(t => <TaskRow key={t.id} t={t} />)}
            </div>
            <Btn variant="secondary" size="sm" className="w-full mt-4" icon={<Plus size={13} />}>Add task</Btn>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Card padded={false}>
        <div className="p-5">
          <SectionHeader title="Quick actions" subtitle="Jump back in" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {QUICK.map(q => <QuickAction key={q.label} label={q.label} icon={q.icon} to={q.to} />)}
          </div>
        </div>
      </Card>
    </div>
  );
}
