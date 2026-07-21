import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MessageSquare, Star, DollarSign, Bot, TrendingUp, TrendingDown,
  Inbox, Users, Calendar, Megaphone, PhoneMissed, CheckCircle2, Circle,
  Sparkles, Send, CreditCard, Zap, X, ArrowUpRight, Clock, Phone,
  Reply, ChevronRight, Search, Plug, AlertTriangle, CheckCircle,
  ShieldCheck, Activity, Rocket, Pause, Play, MessageCircleReply,
  CalendarCheck, BellRing,
} from "lucide-react";
import { PageHeader, Card, Tag, Btn } from "@/components/app-shell/AppShell";
import { BUSINESS, THREADS, CONTACTS, REVIEWS, PAYMENTS, CALLS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

/* -------------------------------------------------- helpers */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
function formatDate() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}
function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

/* -------------------------------------------------- data */
const ONBOARDING = [
  { id: 1, label: "Connect a phone number", done: true },
  { id: 2, label: "Add your first contact", done: true },
  { id: 3, label: "Send your first message", done: true },
  { id: 4, label: "Turn on AI Autopilot", done: false },
  { id: 5, label: "Request your first payment", done: false },
];

const METRICS = [
  { key: "conv",  label: "Open Conversations", value: "24",     delta: "+12%", up: true,  icon: MessageSquare, tone: "info" as const, hint: "vs last week" },
  { key: "rev",   label: "Reviews This Month", value: "18",     delta: "+6",   up: true,  icon: Star,          tone: "warning" as const, hint: "4.9 avg rating" },
  { key: "money", label: "Revenue This Month", value: "$12,480",delta: "+8.2%",up: true,  icon: DollarSign,    tone: "success" as const, hint: "vs last month" },
  { key: "ai",    label: "AI Resolution Rate", value: "87%",    delta: "-2%",  up: false, icon: Bot,           tone: "ai" as const,      hint: "past 7 days" },
];

const SHORTCUTS = [
  { to: "/app/inbox",     label: "Inbox",     desc: "Messages",     icon: Inbox,     tone: "info" as const,    count: "3 unread" },
  { to: "/app/contacts",  label: "Leads",     desc: "Pipeline",     icon: Users,     tone: "primary" as const, count: "12 open" },
  { to: "/app/calendar",  label: "Calendar",  desc: "Appointments", icon: Calendar,  tone: "success" as const, count: "4 today" },
  { to: "/app/campaigns", label: "Campaigns", desc: "Broadcasts",   icon: Megaphone, tone: "ai" as const,      count: "2 live" },
];

const ATTENTION = [
  { key: "inbox",  icon: Reply,       label: "Inbox replies",   count: 6, tone: "info" as const,    to: "/app/inbox" },
  { key: "review", icon: Star,        label: "Review replies",  count: 3, tone: "warning" as const, to: "/app/reviews" },
  { key: "pay",    icon: CreditCard,  label: "Pending payments",count: 4, tone: "success" as const, to: "/app/payments" },
  { key: "call",   icon: PhoneMissed, label: "Missed calls",    count: 2, tone: "danger" as const,  to: "/app/calls" },
  { key: "ai",     icon: Bot,         label: "AI approvals",    count: 5, tone: "ai" as const,      to: "/app/ai-employee" },
];

const WEEK = [
  { d: "Mon", m: 32, p: 8  },
  { d: "Tue", m: 41, p: 12 },
  { d: "Wed", m: 28, p: 6  },
  { d: "Thu", m: 55, p: 14 },
  { d: "Fri", m: 62, p: 18 },
  { d: "Sat", m: 24, p: 5  },
  { d: "Sun", m: 18, p: 3  },
];

const PIPE = [
  { k: "New",       n: 24, color: "#0052FF" },
  { k: "Contacted", n: 18, color: "#7C3AED" },
  { k: "Qualified", n: 12, color: "#FFB020" },
  { k: "Won",       n: 9,  color: "#00D924" },
  { k: "Lost",      n: 4,  color: "#FF4D4F" },
];

const AI_CHIPS = [
  "Follow up leads", "Review requests", "Payment reminders", "Weekly report", "Reply unread",
];

const INTEGRATIONS = [
  { name: "Twilio",      status: "Healthy"  as const, desc: "SMS + Voice",   domain: "twilio.com" },
  { name: "RingCentral", status: "Healthy"  as const, desc: "Phone system",  domain: "ringcentral.com" },
  { name: "Retell",      status: "Degraded" as const, desc: "Voice AI",      domain: "retellai.com" },
  { name: "Trigger",     status: "Healthy"  as const, desc: "Workflows",     domain: "trigger.dev" },
  { name: "Supabase",    status: "Healthy"  as const, desc: "Database",      domain: "supabase.com" },
];

/* -------------------------------------------------- component */
function DashboardPage() {
  const [trialOpen, setTrialOpen] = useState(true);
  const [aiCommand, setAiCommand] = useState("");
  const [autopilot, setAutopilot] = useState(true);
  const [dlg, setDlg] = useState<null | "message" | "payment" | "review">(null);

  const done = ONBOARDING.filter(o => o.done).length;
  const total = ONBOARDING.length;
  const progress = Math.round((done / total) * 100);

  const inboxNeedsReply = useMemo(
    () => THREADS.filter(t => t.unread > 0).slice(0, 4),
    []
  );
  const todaysAppts = [
    { time: "10:00 AM", customer: "John Smith",    title: "AC Repair",         status: "Confirmed" as const },
    { time: "12:30 PM", customer: "Sarah Kim",     title: "Plumbing Estimate", status: "En Route" as const },
    { time: "2:00 PM",  customer: "Priya Reddy",   title: "Water Heater",      status: "Confirmed" as const },
    { time: "4:15 PM",  customer: "Alicia Weber",  title: "Furnace Tune-up",   status: "Pending" as const },
  ];
  const hotLeads = CONTACTS.filter(c => c.score >= 80).slice(0, 4);

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    n: REVIEWS.filter(r => r.rating === star).length,
  }));
  const unanswered = REVIEWS.filter(r => !r.replied).length;

  const pendingPayments = PAYMENTS.filter(p => p.status === "Pending").length;
  const missedCalls = CALLS.filter(c => c.outcome === "Missed").length;

  const maxWeek = Math.max(...WEEK.map(w => w.m + w.p));
  const pipeTotal = PIPE.reduce((s, p) => s + p.n, 0);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1440px] mx-auto dash-fade">
      {/* 1. Premium hero — Attio spacing · Stripe restraint · AI daily brief */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5"
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #635BFF 45%, #8B5CF6 100%)",
          boxShadow: "var(--shadow-elev)",
        }}
      >
        {/* soft orbs */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-20 w-72 h-72 rounded-full opacity-45 blur-3xl dash-orb-a" style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl dash-orb-b" style={{ background: "radial-gradient(circle, #635BFF 0%, transparent 60%)" }} />
        {/* fine grid overlay for enterprise texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/90 bg-white/10 border border-white/20 rounded-full pl-1.5 pr-2.5 py-1 mb-3 backdrop-blur-sm">
                <span className="inline-flex items-center gap-1 bg-white/20 rounded-full pl-1 pr-1.5 py-0.5">
                  <Sparkles size={10} className="shrink-0" /> AI Brief
                </span>
                <span className="truncate">{formatDate()}</span>
              </div>
              <h1 className="text-[22px] sm:text-[28px] lg:text-[34px] font-bold tracking-[-0.02em] text-white leading-[1.1]">
                Welcome back, <span className="text-white/95">{BUSINESS.name}</span>
              </h1>
              <p className="text-[13px] sm:text-[14px] text-white/75 mt-2 max-w-xl leading-relaxed">
                You have <b className="font-semibold text-white">6 replies</b>, <b className="font-semibold text-white">4 appointments</b>, and <b className="font-semibold text-white">5 AI approvals</b> waiting. Autopilot is handling the rest.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:flex lg:items-center gap-2 lg:shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setDlg("payment")}
                className="h-10 sm:h-11 px-3 sm:px-4 rounded-lg text-[12.5px] sm:text-[13px] font-semibold text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/25 backdrop-blur-sm inline-flex items-center justify-center gap-1.5 transition"
              >
                <CreditCard size={14} className="shrink-0" />
                <span className="truncate">Request payment</span>
              </button>
              <button
                onClick={() => setDlg("message")}
                className="h-10 sm:h-11 px-3 sm:px-4 rounded-lg text-[12.5px] sm:text-[13px] font-semibold text-[--color-ink] bg-white hover:bg-white active:scale-[0.98] inline-flex items-center justify-center gap-1.5 transition shadow-md"
              >
                <Send size={14} className="shrink-0" />
                <span className="truncate">New message</span>
              </button>
            </div>
          </div>

          {/* Daily Brief KPI strip */}
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-5 sm:mt-6">
            <HeroStat icon={DollarSign} label="Today's revenue" value="$3,240" trend="+18%" up />
            <HeroStat icon={CalendarCheck} label="Bookings" value="9" trend="+2" up />
            <HeroStat icon={Phone} label="Calls" value="24" trend="+11%" up />
            <HeroStat icon={ShieldCheck} label="Health score" value="92" trend="Excellent" up />
          </div>
        </div>
      </div>




      {/* 2. Trial banner */}
      {trialOpen && (
        <div className="mb-5 relative overflow-hidden rounded-[14px] border border-[--color-warning]/30 bg-gradient-to-r from-[--color-warning-subtle] via-[--color-warning-subtle] to-white p-3 sm:p-4">
          <div aria-hidden className="pointer-events-none absolute -top-10 -right-8 w-40 h-40 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, var(--color-warning) 0%, transparent 60%)" }} />
          <div className="relative flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl grid place-items-center bg-white text-[--color-warning] shrink-0 shadow-sm ring-1 ring-[--color-warning]/20">
              <Sparkles size={18} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[13.5px] sm:text-[14px] font-semibold text-[--color-ink] truncate">
                  {BUSINESS.trialDaysLeft > 0
                    ? `${BUSINESS.trialDaysLeft} days left in your free trial`
                    : "Your free trial has expired"}
                </span>
                {BUSINESS.trialDaysLeft > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[--color-warning] bg-white border border-[--color-warning]/30 rounded-full px-1.5 py-0.5">
                    <Clock size={10} strokeWidth={2.5} /> Trial
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[--color-body] mt-0.5 line-clamp-2 sm:line-clamp-1">
                Unlock unlimited AI conversations, advanced automations, and priority support.
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <Btn variant="gradient" size="sm" className="gap-1.5">
                <Rocket size={14} strokeWidth={2.25} />
                <span className="hidden xs:inline">{BUSINESS.trialDaysLeft > 0 ? "Upgrade" : "Choose plan"}</span>
                <span className="xs:hidden">{BUSINESS.trialDaysLeft > 0 ? "Upgrade" : "Plans"}</span>
              </Btn>
              <button
                onClick={() => setTrialOpen(false)}
                className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/70 text-[--color-body] transition"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>

      )}

      {/* 3. Getting started */}
      <Card className="mb-5">
        <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
          <div>
            <div className="text-[15px] font-semibold text-[--color-ink]">Getting started</div>
            <div className="text-[12px] text-[--color-muted]">Finish setup to unlock the full workspace.</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "var(--color-brand-gradient-2)" }} />
            </div>
            <span className="text-[12px] font-semibold text-[--color-ink]">{done}/{total} done</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {ONBOARDING.map(o => (
            <div key={o.id} className={`flex items-center gap-2 p-2.5 rounded-lg border ${o.done ? "border-[--color-hairline-soft] bg-[--color-success-subtle]/40" : "border-[--color-hairline] hover:bg-[--color-surface-strong]"} cursor-pointer transition`}>
              {o.done ? <CheckCircle2 size={16} className="text-[--color-success] shrink-0" /> : <Circle size={16} className="text-[--color-muted] shrink-0" />}
              <span className={`text-[12.5px] ${o.done ? "line-through text-[--color-muted]" : "text-[--color-ink] font-medium"}`}>{o.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Performance metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-5">
        {METRICS.map(({ key, ...m }) => (
          <MetricCard key={key} {...m} />
        ))}
      </div>


      {/* 5. Workspace shortcuts */}
      <div className="mb-5">
        <SectionTitle title="Workspace shortcuts" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {SHORTCUTS.map(s => (
            <Link key={s.to} to={s.to} className="group">
              <Card className="!p-3 sm:!p-4 h-full transition group-hover:-translate-y-[2px] group-hover:border-[--color-primary]/40 group-hover:shadow-md">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <IconTile icon={s.icon} tone={s.tone} size="sm" />
                  <ArrowUpRight size={14} className="text-[--color-muted] transition group-hover:text-[--color-primary] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
                </div>
                <div className="text-[13.5px] sm:text-[15px] font-semibold text-[--color-ink] leading-tight truncate">{s.label}</div>
                <div className="text-[11.5px] sm:text-[12px] text-[--color-muted] mt-0.5 line-clamp-1">{s.desc}</div>
                <div className="text-[10.5px] sm:text-[11px] font-semibold mt-1.5 sm:mt-2 text-[--color-primary-deep] tabular-nums truncate">{s.count}</div>
              </Card>
            </Link>
          ))}
        </div>

      </div>

      {/* 6. Needs your attention */}
      <div className="mb-5">
        <SectionTitle title="Needs your attention" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {ATTENTION.filter(a => a.count > 0).map((a, i) => {
            const I = a.icon;
            return (
              <Link key={a.key} to={a.to} className={`group ${i >= 4 ? 'hidden md:block' : ''}`}>
                <Card className="!p-3 sm:!p-3.5 h-full transition group-hover:-translate-y-[2px] group-hover:border-[--color-primary]/40 group-hover:shadow-md">
                  <div className="flex items-center gap-2.5">
                    <IconTile icon={I} tone={a.tone} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] sm:text-[13px] font-semibold text-[--color-ink] leading-tight truncate">
                        <span className="tabular-nums">{a.count}</span> {a.label}
                      </div>
                      <div className="text-[11px] sm:text-[11.5px] font-medium text-[--color-muted] mt-0.5 truncate">Tap to review</div>
                    </div>
                    <ChevronRight size={14} className="text-[--color-muted] transition group-hover:text-[--color-primary] group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </Card>
              </Link>
            );
          })}

        </div>

      </div>

      {/* 7. Business overview row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-5">
        <Card className="!p-3.5 sm:!p-5">
          <SectionTitle title="Weekly Pulse" hint="Messages & payments · last 7 days" inline />
          <div className="flex items-end gap-1.5 sm:gap-3 h-32 sm:h-40 mt-3 sm:mt-4">
            {WEEK.map((w, idx) => {
              const totalPct = ((w.m + w.p) / maxWeek) * 100;
              const pPct = (w.p / (w.m + w.p)) * totalPct;
              const mPct = totalPct - pPct;
              return (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-1.5 min-w-0 group">
                  <div className="relative w-full flex-1 flex flex-col justify-end gap-0.5 min-w-0">
                    <div
                      className="w-full rounded-md transition-all duration-500 group-hover:opacity-90 origin-bottom"
                      style={{ height: `${pPct}%`, background: "var(--color-success)", animation: `fade-in .5s ease-out ${idx * 50}ms both` }}
                    />
                    <div
                      className="w-full rounded-md transition-all duration-500 group-hover:opacity-90 origin-bottom"
                      style={{ height: `${mPct}%`, background: "var(--color-primary)", animation: `fade-in .5s ease-out ${idx * 50 + 40}ms both` }}
                    />
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-[--color-muted] font-medium">{w.d}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-[11px] sm:text-[11.5px]">
            <LegendDot color="var(--color-primary)" label="Messages" />
            <LegendDot color="var(--color-success)" label="Payments" />
          </div>
        </Card>

        <Card className="!p-3.5 sm:!p-5">
          <SectionTitle title="Pipeline Snapshot" hint={`${pipeTotal} total leads`} inline />
          <div className="flex h-2.5 rounded-full overflow-hidden mt-3 sm:mt-4 bg-[--color-surface-strong]">
            {PIPE.map(p => (
              <div key={p.k} style={{ width: `${(p.n / pipeTotal) * 100}%`, background: p.color }} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {PIPE.map(p => (
              <div key={p.k} className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-[10.5px] sm:text-[11px] text-[--color-muted] truncate">{p.k}</span>
                </div>
                <div className="text-[15px] sm:text-[18px] font-semibold text-[--color-ink] mt-0.5 tabular-nums">{p.n}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 8. Main two-column area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Infinite Agent */}
          <Card className="relative overflow-hidden !p-4 sm:!p-5">
            {/* aurora glow backdrop */}
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-40" style={{ background: "var(--color-brand-gradient-2)" }} />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full blur-3xl opacity-20" style={{ background: "var(--color-primary)" }} />

            <div className="relative flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-xl grid place-items-center text-white shrink-0 shadow-md" style={{ background: "var(--color-brand-gradient-2)" }}>
                  <Sparkles size={16} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[--color-success] ring-2 ring-[--color-surface] animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-[14px] font-semibold text-[--color-ink] truncate">Infinite Agent</div>
                    <span className="hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[--color-primary-subdued] text-[--color-primary-deep] uppercase tracking-wide">Beta</span>
                  </div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">Ask anything or trigger an action</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[10.5px] font-medium text-[--color-muted] shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[--color-success] animate-pulse" />
                Online
              </div>
            </div>

            <form
              onSubmit={e => e.preventDefault()}
              className="relative flex items-center gap-2 rounded-xl border border-[--color-hairline] bg-[--color-surface] px-3 h-11 sm:h-12 focus-within:border-[--color-primary] focus-within:ring-2 focus-within:ring-[--color-primary-subdued] transition"
            >
              <Search size={15} className="text-[--color-muted] shrink-0" />
              <input
                value={aiCommand}
                onChange={e => setAiCommand(e.target.value)}
                placeholder="Send review requests to last week's paid customers…"
                className="flex-1 min-w-0 h-full bg-transparent focus:outline-none text-[13px] text-[--color-ink] placeholder:text-[--color-muted]"
              />
              <kbd className="hidden md:inline-flex items-center h-6 px-1.5 rounded border border-[--color-hairline] bg-[--color-surface-strong] text-[10px] font-mono text-[--color-muted] shrink-0">⌘K</kbd>
              <button
                type="submit"
                className="h-8 sm:h-9 px-3 sm:px-4 rounded-lg text-white text-[12px] font-semibold shrink-0 shadow-sm hover:shadow-md active:scale-95 transition flex items-center gap-1"
                style={{ background: "var(--color-brand-gradient-2)" }}
              >
                <Sparkles size={12} className="hidden sm:block" />
                Run
              </button>
            </form>

            <div className="relative flex items-center gap-1.5 mt-3 -mx-1 px-1 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
              <span className="hidden sm:inline text-[11px] font-medium text-[--color-muted] mr-0.5">Try:</span>
              {AI_CHIPS.map(c => (
                <button
                  key={c}
                  onClick={() => setAiCommand(c)}
                  className="shrink-0 text-[11.5px] font-medium px-2.5 py-1.5 rounded-full border border-[--color-hairline] bg-[--color-surface] text-[--color-body] hover:bg-[--color-primary-subdued] hover:border-[--color-primary] hover:text-[--color-primary-deep] active:scale-95 transition whitespace-nowrap"
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>


          {/* Needs your reply */}
          <Card padded={false}>
            <div className="p-5 pb-3 flex items-center justify-between">
              <SectionTitle title="Needs your reply" inline />
              <Link to="/app/inbox" className="text-[12px] font-semibold text-[--color-primary] flex items-center gap-1">
                View inbox <ChevronRight size={12} />
              </Link>
            </div>
            <div>
              {inboxNeedsReply.map(t => {
                const c = CONTACTS.find(x => x.id === t.contactId);
                return (
                  <div key={t.id} className="px-5 py-3 flex items-center gap-3 border-t border-[--color-hairline-soft] hover:bg-[--color-surface-strong] transition">
                    <div className="w-9 h-9 rounded-full grid place-items-center text-white text-[12px] font-semibold shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
                      {initials(c?.name ?? "??")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-[13.5px] font-semibold text-[--color-ink] truncate">{c?.name}</div>
                        <span className="text-[11px] text-[--color-muted] shrink-0">· {t.time}</span>
                      </div>
                      <div className="text-[12.5px] text-[--color-body] truncate">{t.preview}</div>
                    </div>
                    <Btn variant="secondary" size="sm" icon={<Reply size={12} />}>Reply</Btn>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Today's schedule */}
          <Card padded={false}>
            <div className="p-5 pb-3 flex items-center justify-between">
              <SectionTitle title="Today's schedule" inline />
              <Link to="/app/calendar" className="text-[12px] font-semibold text-[--color-primary] flex items-center gap-1">
                Open calendar <ChevronRight size={12} />
              </Link>
            </div>
            <div>
              {todaysAppts.map((a, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3 border-t border-[--color-hairline-soft]">
                  <div className="text-[12px] font-mono font-semibold text-[--color-ink] w-16 shrink-0">{a.time}</div>
                  <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[--color-ink] truncate">{a.title}</div>
                    <div className="text-[12px] text-[--color-muted] truncate">{a.customer}</div>
                  </div>
                  <Tag tone={a.status === "Confirmed" ? "success" : a.status === "En Route" ? "warning" : "neutral"}>
                    {a.status}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>

          {/* Hot leads */}
          <Card padded={false}>
            <div className="p-5 pb-3 flex items-center justify-between">
              <SectionTitle title="Hot leads" inline />
              <Link to="/app/contacts" className="text-[12px] font-semibold text-[--color-primary] flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div>
              {hotLeads.map(l => (
                <div key={l.id} className="px-5 py-3 flex items-center gap-3 border-t border-[--color-hairline-soft]">
                  <div className="w-9 h-9 rounded-full grid place-items-center text-white text-[12px] font-semibold shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
                    {initials(l.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold text-[--color-ink] truncate">{l.name}</div>
                    <div className="text-[11.5px] text-[--color-muted] truncate">{l.stage} · Score {l.score} · {l.activity}</div>
                  </div>
                  <Tag tone="success">Hot</Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions — 6 premium buttons */}
          <Card className="!p-4 sm:!p-5">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle title="Quick actions" inline />
              <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[--color-primary-subdued] text-[--color-primary-deep] uppercase tracking-wide">Shortcuts</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              <QuickTile icon={Users} label="New contact" tone="primary" onClick={() => {}} />
              <QuickTile icon={Zap} label="New job" tone="info" onClick={() => {}} />
              <QuickTile icon={CreditCard} label="New invoice" tone="success" onClick={() => setDlg("payment")} />
              <QuickTile icon={Megaphone} label="Send campaign" tone="warning" onClick={() => {}} />
              <QuickTile icon={Sparkles} label="AI assistant" tone="ai" onClick={() => {}} />
              <QuickTile icon={Calendar} label="Schedule" tone="primary" onClick={() => {}} />
            </div>
          </Card>

          {/* Business Health Score — premium radial ring */}
          <HealthScoreCard />

          {/* Voice AI — waveform widget */}
          <VoiceAICard />


          {/* AI Autopilot */}
          <Card className="relative overflow-hidden !p-4 sm:!p-5">
            {/* aurora backdrop */}
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-14 h-40 w-40 rounded-full blur-3xl opacity-30" style={{ background: "var(--color-ai)" }} />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full blur-3xl opacity-20" style={{ background: "var(--color-primary)" }} />

            <div className="relative flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-9 h-9 rounded-xl grid place-items-center bg-[--color-ai-subtle] text-[--color-ai] shrink-0">
                  <Bot size={16} />
                  {autopilot && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[--color-success] ring-2 ring-[--color-surface] animate-pulse" />}
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[--color-ink] truncate leading-tight">AI Autopilot</div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">Handles inbound while you work</div>
                </div>
              </div>
              <span className={`shrink-0 inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${autopilot ? "bg-[--color-success-subtle] text-[--color-success]" : "bg-[--color-surface-strong] text-[--color-muted]"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${autopilot ? "bg-[--color-success] animate-pulse" : "bg-[--color-muted]"}`} />
                {autopilot ? "Active" : "Paused"}
              </span>
            </div>

            {/* headline number */}
            <div className="relative rounded-xl border border-[--color-hairline] bg-[--color-surface-strong] p-3.5 mb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg grid place-items-center bg-[--color-ai-subtle] text-[--color-ai] shrink-0">
                <Activity size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[24px] sm:text-[26px] font-semibold text-[--color-ink] leading-none tabular-nums">42</div>
                <div className="text-[11.5px] text-[--color-muted] mt-1">actions today · +12% vs yesterday</div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[--color-success]">
                <TrendingUp size={12} /> 12%
              </div>
            </div>

            {/* activity grid */}
            <div className="relative grid grid-cols-2 gap-2 mb-3">
              <AutopilotStat icon={MessageCircleReply} label="Replies sent" value={18} tone="primary" />
              <AutopilotStat icon={CalendarCheck}    label="Bookings"      value={9}  tone="success" />
              <AutopilotStat icon={Star}             label="Review asks"   value={7}  tone="warning" />
              <AutopilotStat icon={BellRing}         label="Payment nudges" value={8}  tone="ai" />
            </div>

            <button
              onClick={() => setAutopilot(v => !v)}
              className={`relative w-full h-10 rounded-xl text-[12.5px] font-semibold transition active:scale-[.98] flex items-center justify-center gap-1.5 ${
                autopilot
                  ? "border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong] hover:border-[--color-error]/40 hover:text-[--color-error]"
                  : "text-white shadow-md hover:shadow-lg"
              }`}
              style={autopilot ? undefined : { background: "var(--color-brand-gradient-2)" }}
            >
              {autopilot ? <Pause size={13} /> : <Play size={13} />}
              {autopilot ? "Pause autopilot" : "Activate autopilot"}
            </button>
          </Card>


          {/* Reviews */}
          <Card className="relative overflow-hidden !p-4 sm:!p-5 group">
            <div aria-hidden className="pointer-events-none absolute -top-14 -right-10 h-32 w-32 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-40" style={{ background: "var(--color-warning)" }} />

            <div className="relative flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-[--color-warning-subtle] text-[--color-warning] shrink-0">
                  <Star size={16} className="fill-[--color-warning]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[--color-ink] truncate leading-tight">Reviews</div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">Reputation at a glance</div>
                </div>
              </div>
              <Link to="/app/reviews" className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-[--color-primary] hover:gap-1.5 transition-all">
                View <ChevronRight size={12} />
              </Link>
            </div>

            <div className="relative rounded-xl border border-[--color-hairline] bg-[--color-surface-strong] p-3.5 mb-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <div className="text-[26px] sm:text-[28px] font-semibold text-[--color-ink] leading-none tabular-nums">{avgRating}</div>
                  <div className="text-[11px] text-[--color-muted]">/ 5.0</div>
                </div>
                <div className="flex gap-0.5 mt-1.5">
                  {[1,2,3,4,5].map(i => (
                    <Star
                      key={i}
                      size={12}
                      className={i <= Math.round(Number(avgRating)) ? "text-[--color-warning] fill-[--color-warning]" : "text-[--color-hairline]"}
                      style={{ animation: `fade-in .4s ease-out ${i * 60}ms both` }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[16px] font-semibold text-[--color-ink] tabular-nums leading-none">{REVIEWS.length}</div>
                <div className="text-[10.5px] text-[--color-muted] mt-1">total</div>
              </div>
            </div>

            <div className="relative space-y-1.5 mb-3">
              {ratingDist.map((r, idx) => {
                const pct = (r.n / REVIEWS.length) * 100;
                return (
                  <div key={r.star} className="flex items-center gap-2 text-[11px]">
                    <span className="w-5 text-[--color-muted] tabular-nums inline-flex items-center gap-0.5">
                      {r.star}<Star size={8} className="fill-[--color-warning] text-[--color-warning]" />
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[--color-warning] origin-left"
                        style={{ width: `${pct}%`, transition: `width .8s cubic-bezier(.4,0,.2,1) ${idx * 80}ms` }}
                      />
                    </div>
                    <span className="w-5 text-right text-[--color-muted] tabular-nums">{r.n}</span>
                  </div>
                );
              })}
            </div>

            {unanswered > 0 && (
              <Link to="/app/reviews" className="relative flex items-center gap-2 rounded-lg bg-[--color-warning-subtle] px-2.5 py-2 text-[11.5px] animate-fade-in hover:bg-[--color-warning-subtle]/80 transition">
                <AlertTriangle size={13} className="text-[--color-warning] shrink-0" />
                <span className="text-[--color-ink] flex-1 min-w-0 truncate"><span className="font-semibold tabular-nums">{unanswered}</span> awaiting reply</span>
                <ChevronRight size={12} className="text-[--color-warning] shrink-0" />
              </Link>
            )}
          </Card>

          {/* AI Search */}
          <Link to="/app/ai-search" className="block group">
            <Card className="relative overflow-hidden !p-4 sm:!p-5 border-[--color-hairline] hover:border-[--color-ai]/40 hover:shadow-lg transition-all duration-300">
              <div aria-hidden className="pointer-events-none absolute -top-12 -right-10 h-28 w-28 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-50" style={{ background: "var(--color-ai)" }} />
              <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-10 h-24 w-24 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40" style={{ background: "var(--color-primary)" }} />

              <div className="relative flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl grid place-items-center text-white shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3" style={{ background: "var(--color-brand-gradient-2)" }}>
                  <Sparkles size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[--color-ai] ring-2 ring-[--color-surface] animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <div className="text-[14px] font-semibold text-[--color-ink] truncate leading-tight">AI Search</div>
                    <span className="shrink-0 inline-flex items-center text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[--color-ai-subtle] text-[--color-ai] uppercase tracking-wide">New</span>
                  </div>
                  <div className="text-[11.5px] text-[--color-muted] truncate mt-0.5">Ask anything about your business</div>
                </div>
                <ChevronRight size={16} className="text-[--color-muted] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[--color-ai]" />
              </div>
            </Card>
          </Link>


          {/* Integrations health */}
          <Card className="relative overflow-hidden !p-4 sm:!p-5 group">
            <div aria-hidden className="pointer-events-none absolute -top-14 -right-10 h-32 w-32 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35" style={{ background: "var(--color-primary)" }} />

            <div className="relative flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-[--color-primary-subtle] text-[--color-primary] shrink-0">
                  <Plug size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[--color-ink] truncate leading-tight">Integrations</div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">{INTEGRATIONS.filter(i => i.status === "Healthy").length}/{INTEGRATIONS.length} services healthy</div>
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[--color-success-subtle] text-[--color-success]">
                <span className="w-1.5 h-1.5 rounded-full bg-[--color-success] animate-pulse" />
                Live
              </span>
            </div>

            <div className="relative space-y-1.5">
              {INTEGRATIONS.map((i, idx) => (
                <div
                  key={i.name}
                  className="flex items-center gap-2.5 rounded-lg border border-transparent px-2 py-2 hover:border-[--color-hairline] hover:bg-[--color-surface-strong]/60 transition-all"
                  style={{ animation: `fade-in .4s ease-out ${idx * 60}ms both` }}
                >
                  <div className="w-8 h-8 rounded-lg grid place-items-center bg-white ring-1 ring-[--color-hairline] shrink-0 overflow-hidden">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${i.domain}&sz=64`}
                      alt={`${i.name} logo`}
                      loading="lazy"
                      className="w-4 h-4 object-contain"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{i.name}</div>
                    <div className="text-[11px] text-[--color-muted] truncate">{i.desc}</div>
                  </div>
                  <StatusPill status={i.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      {dlg === "message" && (
        <Dialog title="New message" onClose={() => setDlg(null)} icon={<Send size={15} />}>
          <Field label="To">
            <input placeholder="Search contacts..." className="input" />
          </Field>
          <Field label="Channel">
            <div className="flex gap-2">
              {["SMS", "Email", "WhatsApp"].map(c => (
                <button key={c} className="flex-1 h-9 rounded-lg border border-[--color-hairline] text-[12.5px] font-medium hover:bg-[--color-surface-strong]">{c}</button>
              ))}
            </div>
          </Field>
          <Field label="Message">
            <textarea rows={4} placeholder="Write your message..." className="input resize-none" />
          </Field>
          <DialogFooter onClose={() => setDlg(null)} primary="Send message" />
        </Dialog>
      )}
      {dlg === "payment" && (
        <Dialog title="Request payment" onClose={() => setDlg(null)} icon={<CreditCard size={15} />}>
          <Field label="Customer"><input placeholder="Search customers..." className="input" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount"><input placeholder="$0.00" className="input" /></Field>
            <Field label="Due"><input type="date" className="input" /></Field>
          </div>
          <Field label="Description"><input placeholder="e.g. AC Repair - 123 Main St" className="input" /></Field>
          <DialogFooter onClose={() => setDlg(null)} primary="Send request" />
        </Dialog>
      )}
      {dlg === "review" && (
        <Dialog title="Send review request" onClose={() => setDlg(null)} icon={<Star size={15} />}>
          <Field label="Customer"><input placeholder="Search customers..." className="input" /></Field>
          <Field label="Send via">
            <div className="flex gap-2">
              {["SMS", "Email", "Both"].map(c => (
                <button key={c} className="flex-1 h-9 rounded-lg border border-[--color-hairline] text-[12.5px] font-medium hover:bg-[--color-surface-strong]">{c}</button>
              ))}
            </div>
          </Field>
          <Field label="Platform">
            <div className="flex gap-2">
              {["Google", "Facebook", "Yelp"].map(c => (
                <button key={c} className="flex-1 h-9 rounded-lg border border-[--color-hairline] text-[12.5px] font-medium hover:bg-[--color-surface-strong]">{c}</button>
              ))}
            </div>
          </Field>
          <DialogFooter onClose={() => setDlg(null)} primary="Send request" />
        </Dialog>
      )}

      {/* input styles */}
      <style>{`
        .input {
          width: 100%;
          height: 38px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid var(--color-hairline);
          background: #fff;
          font-size: 13px;
          color: var(--color-ink);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        textarea.input { height: auto; padding: 10px 12px; }
        .input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-glow); }

        @keyframes dashFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-fade { animation: dashFadeIn .45s ease-out both; }
        .dash-fade > * { animation: dashFadeIn .5s ease-out both; }
        .dash-fade > *:nth-child(1) { animation-delay: .00s; }
        .dash-fade > *:nth-child(2) { animation-delay: .04s; }
        .dash-fade > *:nth-child(3) { animation-delay: .08s; }
        .dash-fade > *:nth-child(4) { animation-delay: .12s; }
        .dash-fade > *:nth-child(5) { animation-delay: .16s; }
        .dash-fade > *:nth-child(6) { animation-delay: .20s; }
        .dash-fade > *:nth-child(7) { animation-delay: .24s; }
        .dash-fade > *:nth-child(8) { animation-delay: .28s; }

        @keyframes dashOrbA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-14px, 10px) scale(1.06); }
        }
        @keyframes dashOrbB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(18px, -12px) scale(1.08); }
        }
        .dash-orb-a { animation: dashOrbA 14s ease-in-out infinite; }
        .dash-orb-b { animation: dashOrbB 18s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .dash-fade, .dash-fade > *, .dash-orb-a, .dash-orb-b { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------- pieces */

function SectionTitle({ title, hint, inline }: { title: string; hint?: string; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-baseline justify-between gap-2" : "mb-3 flex items-baseline justify-between gap-2"}>
      <h2 className="text-[15px] font-semibold text-[--color-ink]">{title}</h2>
      {hint && <span className="text-[11.5px] text-[--color-muted]">{hint}</span>}
    </div>
  );
}

function IconTile({ icon: I, tone, size = "md" }: { icon: any; tone: "primary" | "info" | "success" | "warning" | "danger" | "ai"; size?: "sm" | "md" }) {
  const map: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    info:    "bg-[--color-info-subtle] text-[--color-info]",
    success: "bg-[--color-success-subtle] text-[--color-success]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    danger:  "bg-[--color-error-subtle] text-[--color-error]",
    ai:      "bg-[--color-ai-subtle] text-[--color-ai]",
  };
  const s = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const isize = size === "sm" ? 14 : 17;
  return <div className={`${s} rounded-lg grid place-items-center shrink-0 ${map[tone]}`}><I size={isize} /></div>;
}

const SPARK: Record<string, number[]> = {
  info:    [8, 12, 10, 14, 11, 17, 16, 21, 19, 24],
  warning: [3, 4, 6, 5, 8, 7, 10, 12, 14, 18],
  success: [40, 55, 48, 62, 70, 68, 82, 90, 105, 124],
  ai:      [70, 72, 74, 73, 76, 75, 82, 85, 88, 87],
};
const TONE_STROKE: Record<string, string> = {
  info: "var(--color-primary)",
  warning: "var(--color-warning)",
  success: "var(--color-success)",
  ai: "var(--color-ai)",
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 68, h = 26, pad = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => `${pad + i * step},${pad + (h - pad * 2) * (1 - (v - min) / range)}`).join(" ");
  const areaPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  const gid = `sg-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={areaPts} fill={`url(#${gid})`} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({ label, value, delta, up, icon: I, tone, hint }: {
  label: string; value: string; delta: string; up: boolean;
  icon: any; tone: "info" | "success" | "warning" | "ai"; hint: string;
}) {
  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-[--color-hairline] p-3 sm:p-4 transition hover:-translate-y-[1px] hover:border-[--color-primary]/30 overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
        <IconTile icon={I} tone={tone} size="sm" />
        <span className={`inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${up ? "bg-[--color-success-subtle] text-[--color-success]" : "bg-[--color-error-subtle] text-[--color-error]"}`}>
          {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}<span className="tabular-nums">{delta}</span>
        </span>
      </div>
      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[--color-body-strong] leading-snug line-clamp-1">{label}</div>
      <div className="flex items-end justify-between gap-2 mt-1">
        <div className="min-w-0 flex-1">
          <div className="text-[19px] sm:text-[24px] font-semibold text-[--color-ink] leading-tight truncate tabular-nums">{value}</div>
          <div className="text-[10.5px] sm:text-[11.5px] font-medium text-[--color-muted] mt-0.5 truncate">{hint}</div>
        </div>
        <div className="hidden sm:block shrink-0 opacity-90 group-hover:opacity-100 transition">
          <Sparkline data={SPARK[tone]} color={TONE_STROKE[tone]} />
        </div>
      </div>
    </div>
  );
}



function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-[--color-muted]">{label}</span>
    </div>
  );
}

function QuickAction({ icon: I, label, hint, tone, onClick }: { icon: any; label: string; hint?: string; tone: "warning" | "success" | "ai"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 p-3 rounded-xl border border-[--color-hairline] bg-[--color-surface] hover:bg-[--color-surface-strong] hover:border-[--color-primary]/40 hover:-translate-y-[1px] hover:shadow-sm active:scale-[.98] transition text-left"
    >
      <IconTile icon={I} tone={tone} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[--color-ink] truncate leading-tight">{label}</div>
        {hint && <div className="text-[11px] text-[--color-muted] truncate mt-0.5">{hint}</div>}
      </div>
      <ChevronRight size={14} className="text-[--color-muted] shrink-0 transition group-hover:text-[--color-primary] group-hover:translate-x-0.5" />
    </button>
  );
}

function AutopilotStat({ icon: I, label, value, tone }: { icon: any; label: string; value: number; tone: "primary" | "success" | "warning" | "ai" }) {
  const toneMap: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    success: "bg-[--color-success-subtle] text-[--color-success]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    ai:      "bg-[--color-ai-subtle] text-[--color-ai]",
  };
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[--color-hairline] bg-[--color-surface] p-2 hover:border-[--color-primary]/40 transition">
      <div className={`w-7 h-7 rounded-md grid place-items-center shrink-0 ${toneMap[tone]}`}>
        <I size={13} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-semibold text-[--color-ink] tabular-nums leading-none">{value}</div>
        <div className="text-[10.5px] text-[--color-muted] truncate mt-0.5">{label}</div>
      </div>
    </div>
  );
}


function ActivityRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[--color-body]">{label}</span>
      <span className="font-semibold text-[--color-ink]">{value}</span>
    </div>
  );
}

function StatusPill({ status }: { status: "Healthy" | "Degraded" | "Down" }) {
  const m = {
    Healthy:  { bg: "bg-[--color-success-subtle]", tx: "text-[--color-success]", I: CheckCircle },
    Degraded: { bg: "bg-[--color-warning-subtle]", tx: "text-[--color-warning]", I: AlertTriangle },
    Down:     { bg: "bg-[--color-error-subtle]",   tx: "text-[--color-error]",   I: X },
  }[status];
  const I = m.I;
  return (
    <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full ${m.bg} ${m.tx}`}>
      <I size={10} />{status}
    </span>
  );
}

function Dialog({ title, icon, children, onClose }: { title: string; icon: React.ReactNode; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-[rgba(10,37,64,0.45)]" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-[16px] border border-[--color-hairline] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[--color-hairline]">
          <div className="w-8 h-8 rounded-lg grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>{icon}</div>
          <div className="text-[15px] font-semibold text-[--color-ink] flex-1">{title}</div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] text-[--color-body]">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 space-y-3">{children}</div>
      </div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[--color-body-strong] mb-1.5">{label}</div>
      {children}
    </label>
  );
}
function DialogFooter({ onClose, primary }: { onClose: () => void; primary: string }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      <Btn variant="gradient" onClick={onClose}>{primary}</Btn>
    </div>
  );
}

/* -------------------------------------------------- premium extras */

function HeroStat({ icon: I, label, value, trend, up }: { icon: any; label: string; value: string; trend: string; up: boolean }) {
  return (
    <div className="relative rounded-xl bg-white/10 border border-white/15 backdrop-blur-md p-2.5 sm:p-3 hover:bg-white/15 transition group">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-6 h-6 rounded-md grid place-items-center bg-white/15 text-white shrink-0">
          <I size={12} />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 truncate">{label}</div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[18px] sm:text-[22px] font-bold text-white tabular-nums leading-none tracking-tight">{value}</div>
        <span className={`text-[10px] font-semibold tabular-nums shrink-0 ${up ? "text-[#86EFAC]" : "text-[#FCA5A5]"}`}>
          {up ? "↑" : "↓"} {trend}
        </span>
      </div>
    </div>
  );
}

function QuickTile({ icon: I, label, tone, onClick }: { icon: any; label: string; tone: "primary" | "info" | "success" | "warning" | "ai"; onClick: () => void }) {
  const map: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    info:    "bg-[--color-info-subtle] text-[--color-info]",
    success: "bg-[--color-success-subtle] text-[--color-success]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    ai:      "bg-[--color-ai-subtle] text-[--color-ai]",
  };
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-2 p-3 rounded-xl border border-[--color-hairline] bg-white hover:border-[--color-primary]/40 hover:-translate-y-[1px] hover:shadow-[var(--shadow-elev)] active:scale-[.98] transition text-left"
    >
      <div className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 transition group-hover:scale-105 ${map[tone]}`}>
        <I size={16} />
      </div>
      <div className="text-[12.5px] font-semibold text-[--color-ink] leading-tight truncate w-full">{label}</div>
    </button>
  );
}

function HealthScoreCard() {
  const score = 92;
  const circumference = 2 * Math.PI * 42;
  const dash = (score / 100) * circumference;
  return (
    <Card className="relative overflow-hidden !p-4 sm:!p-5 group">
      <div aria-hidden className="pointer-events-none absolute -top-14 -right-10 h-32 w-32 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-45" style={{ background: "var(--color-success)" }} />
      <div className="relative flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-[--color-success-subtle] text-[--color-success] shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-[--color-ink] truncate leading-tight">Business Health</div>
            <div className="text-[11.5px] text-[--color-muted] truncate">Live composite score</div>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[--color-success-subtle] text-[--color-success]">
          <span className="w-1.5 h-1.5 rounded-full bg-[--color-success] animate-pulse" />
          Live
        </span>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="relative w-[104px] h-[104px] shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-hairline)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#healthGrad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
            />
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#635BFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[24px] font-bold text-[--color-ink] tabular-nums leading-none">{score}</div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-[--color-muted] mt-1">Score</div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <HealthRow label="Response time" pct={94} tone="success" />
          <HealthRow label="Conversion" pct={82} tone="primary" />
          <HealthRow label="Retention" pct={96} tone="ai" />
          <HealthRow label="Reviews" pct={88} tone="warning" />
        </div>
      </div>
    </Card>
  );
}

function HealthRow({ label, pct, tone }: { label: string; pct: number; tone: "success" | "primary" | "warning" | "ai" }) {
  const color: Record<string, string> = {
    success: "var(--color-success)",
    primary: "var(--color-primary)",
    warning: "var(--color-warning)",
    ai: "var(--color-ai)",
  };
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="text-[--color-muted] truncate w-[86px]">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color[tone], transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <span className="text-[--color-ink] font-semibold tabular-nums w-8 text-right">{pct}</span>
    </div>
  );
}

function VoiceAICard() {
  const bars = [40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 85, 50, 75, 40, 65, 30, 55, 80, 45, 70];
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #635BFF 50%, #8B5CF6 100%)", boxShadow: "var(--shadow-elev)" }}>
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-14 h-40 w-40 rounded-full blur-3xl opacity-40" style={{ background: "#A855F7" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full blur-3xl opacity-25" style={{ background: "#635BFF" }} />

      <div className="relative flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-9 h-9 rounded-xl grid place-items-center bg-white/15 text-white shrink-0 backdrop-blur-sm border border-white/20">
            <Phone size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-[#4F46E5] animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-white truncate leading-tight">Voice AI</div>
            <div className="text-[11.5px] text-white/70 truncate">Live call activity</div>
          </div>
        </div>
        <Link to="/app/voice-agent" className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-white transition">
          Open <ChevronRight size={12} />
        </Link>
      </div>

      {/* Waveform */}
      <div className="relative rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm p-3 mb-3">
        <div className="flex items-center justify-center gap-[3px] h-12">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-white/90"
              style={{
                height: `${h}%`,
                animation: `voiceBar 1.2s ease-in-out ${i * 60}ms infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-2">
        <VoiceStat label="Today" value="24" />
        <VoiceStat label="Avg dur" value="2:14" />
        <VoiceStat label="Missed" value="2" />
      </div>

      <style>{`
        @keyframes voiceBar {
          from { transform: scaleY(0.4); opacity: 0.6; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="voiceBar"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function VoiceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 border border-white/15 backdrop-blur-sm px-2.5 py-2 text-center">
      <div className="text-[15px] font-bold text-white tabular-nums leading-none">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70 mt-1">{label}</div>
    </div>
  );
}
