import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MessageSquare, Star, DollarSign, Bot, TrendingUp, TrendingDown,
  Inbox, Users, Calendar, Megaphone, PhoneMissed, CheckCircle2, Circle,
  Sparkles, Send, CreditCard, Zap, X, ArrowUpRight, Clock, Phone,
  Reply, ChevronRight, Search, Plug, AlertTriangle, CheckCircle,
  ShieldCheck, Activity,
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
  { name: "Twilio",      status: "Healthy"  as const, desc: "SMS + Voice" },
  { name: "RingCentral", status: "Healthy"  as const, desc: "Phone system" },
  { name: "Retell",      status: "Degraded" as const, desc: "Voice AI" },
  { name: "Trigger",     status: "Healthy"  as const, desc: "Workflows" },
  { name: "Supabase",    status: "Healthy"  as const, desc: "Database" },
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
    <div className="px-3 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1440px] mx-auto">
      {/* 1. Aurora hero band */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5 p-5 sm:p-7 lg:p-8"
        style={{
          background: "var(--color-brand-gradient)",
          boxShadow: "var(--shadow-elev)",
        }}
      >
        {/* mesh orbs for depth */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-10 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #EC4899 0%, transparent 60%)" }} />
        {/* subtle grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")" }} />

        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:gap-6">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-white/80 bg-white/12 border border-white/20 rounded-full px-2.5 py-1 mb-3 backdrop-blur-sm">
              <Sparkles size={11} /> <span className="truncate">{formatDate()}</span>
            </div>
            <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight text-white leading-tight truncate">
              {greeting()}, {BUSINESS.name}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-white/75 mt-1.5 max-w-lg">
              Your workspace overview — metrics, activity, and AI tools in one place.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDlg("payment")}
              className="h-10 px-4 rounded-lg text-[13px] font-semibold text-white bg-white/12 hover:bg-white/20 border border-white/25 backdrop-blur-sm inline-flex items-center gap-1.5 transition"
            >
              <CreditCard size={14} /> Request payment
            </button>
            <button
              onClick={() => setDlg("message")}
              className="h-10 px-4 rounded-lg text-[13px] font-semibold text-[--color-ink] bg-white hover:bg-white/95 inline-flex items-center gap-1.5 transition shadow-sm"
            >
              <Send size={14} /> New message
            </button>
          </div>
        </div>
        {/* mobile CTAs */}
        <div className="relative sm:hidden grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => setDlg("payment")} className="h-10 rounded-lg text-[12.5px] font-semibold text-white bg-white/12 border border-white/25 inline-flex items-center justify-center gap-1.5 backdrop-blur-sm">
            <CreditCard size={13} /> Payment
          </button>
          <button onClick={() => setDlg("message")} className="h-10 rounded-lg text-[12.5px] font-semibold text-[--color-ink] bg-white inline-flex items-center justify-center gap-1.5 shadow-sm">
            <Send size={13} /> Message
          </button>
        </div>
      </div>



      {/* 2. Trial banner */}
      {trialOpen && (
        <div className="mb-5 rounded-[14px] border border-[--color-warning]/30 bg-[--color-warning-subtle] p-4 flex items-center gap-3 flex-wrap">
          <div className="w-9 h-9 rounded-lg grid place-items-center bg-white text-[--color-warning] shrink-0">
            <Zap size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-semibold text-[--color-ink]">
              {BUSINESS.trialDaysLeft > 0
                ? `${BUSINESS.trialDaysLeft} days left in your free trial`
                : "Your free trial has expired"}
            </div>
            <div className="text-[12px] text-[--color-body]">
              Unlock unlimited AI conversations, advanced automations, and priority support.
            </div>
          </div>
          <Btn variant="gradient" size="sm">
            {BUSINESS.trialDaysLeft > 0 ? "Upgrade now" : "Choose plan"}
          </Btn>
          <button
            onClick={() => setTrialOpen(false)}
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/60 text-[--color-body]"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {METRICS.map(({ key, ...m }) => (
          <MetricCard key={key} {...m} />
        ))}
      </div>

      {/* 5. Workspace shortcuts */}
      <div className="mb-5">
        <SectionTitle title="Workspace shortcuts" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SHORTCUTS.map(s => (
            <Link key={s.to} to={s.to}>
              <Card className="!p-4 h-full">
                <div className="flex items-start justify-between mb-3">
                  <IconTile icon={s.icon} tone={s.tone} />
                  <ArrowUpRight size={14} className="text-[--color-muted]" />
                </div>
                <div className="text-[15px] font-semibold text-[--color-ink]">{s.label}</div>
                <div className="text-[12px] text-[--color-muted]">{s.desc}</div>
                <div className="text-[11px] font-semibold mt-2 text-[--color-primary-deep]">{s.count}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 6. Needs your attention */}
      <div className="mb-5">
        <SectionTitle title="Needs your attention" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ATTENTION.filter(a => a.count > 0).map(a => {
            const I = a.icon;
            return (
              <Link key={a.key} to={a.to}>
                <Card className="!p-3.5 h-full">
                  <div className="flex items-center gap-2.5">
                    <IconTile icon={I} tone={a.tone} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-[--color-ink] truncate">{a.count} {a.label}</div>
                      <div className="text-[11px] text-[--color-muted]">Tap to review</div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 7. Business overview row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <Card>
          <SectionTitle title="Weekly Pulse" hint="Messages & payments · last 7 days" inline />
          <div className="flex items-end gap-2 sm:gap-3 h-40 mt-4">
            {WEEK.map(w => {
              const H = 140;
              const totalH = ((w.m + w.p) / maxWeek) * H;
              const pH = (w.p / (w.m + w.p)) * totalH;
              const mH = totalH - pH;
              return (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                  <div className="w-full flex flex-col justify-end" style={{ height: H }}>
                    <div className="w-full rounded-t-md" style={{ height: pH, background: "var(--color-success)" }} />
                    <div className="w-full" style={{ height: mH, background: "var(--color-primary)" }} />
                  </div>
                  <div className="text-[10.5px] text-[--color-muted] font-medium">{w.d}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-3 text-[11.5px]">
            <LegendDot color="var(--color-primary)" label="Messages" />
            <LegendDot color="var(--color-success)" label="Payments" />
          </div>
        </Card>

        <Card>
          <SectionTitle title="Pipeline Snapshot" hint={`${pipeTotal} total leads`} inline />
          <div className="flex h-2.5 rounded-full overflow-hidden mt-4 bg-[--color-surface-strong]">
            {PIPE.map(p => (
              <div key={p.k} style={{ width: `${(p.n / pipeTotal) * 100}%`, background: p.color }} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {PIPE.map(p => (
              <div key={p.k} className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-[11px] text-[--color-muted] truncate">{p.k}</span>
                </div>
                <div className="text-[18px] font-semibold text-[--color-ink] mt-0.5">{p.n}</div>
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
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>
                <Sparkles size={15} />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[--color-ink]">Infinite Agent</div>
                <div className="text-[11.5px] text-[--color-muted]">Ask anything or trigger an action</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[--color-hairline] bg-[--color-surface-strong] px-3 h-11">
              <Search size={15} className="text-[--color-muted]" />
              <input
                value={aiCommand}
                onChange={e => setAiCommand(e.target.value)}
                placeholder="e.g. Send review requests to last week's paid customers"
                className="flex-1 h-full bg-transparent focus:outline-none text-[13px] text-[--color-ink] placeholder:text-[--color-muted]"
              />
              <button className="h-8 px-3 rounded-md text-white text-[12px] font-semibold" style={{ background: "var(--color-brand-gradient-2)" }}>
                Run
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {AI_CHIPS.map(c => (
                <button
                  key={c}
                  onClick={() => setAiCommand(c)}
                  className="text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-[--color-hairline] text-[--color-body] hover:bg-[--color-primary-subdued] hover:border-[--color-primary] hover:text-[--color-primary-deep] transition"
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
          {/* Quick actions */}
          <Card>
            <SectionTitle title="Quick actions" inline />
            <div className="space-y-1.5 mt-3">
              <QuickAction icon={Star} label="Send review request" onClick={() => setDlg("review")} tone="warning" />
              <QuickAction icon={CreditCard} label="Request payment" onClick={() => setDlg("payment")} tone="success" />
              <QuickAction icon={Megaphone} label="Launch campaign" onClick={() => {}} tone="ai" />
            </div>
          </Card>

          {/* AI Autopilot */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-ai-subtle] text-[--color-ai]">
                  <Bot size={15} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[--color-ink]">AI Autopilot</div>
                  <div className="text-[11.5px] text-[--color-muted]">Handles inbound while you work</div>
                </div>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${autopilot ? "bg-[--color-success-subtle] text-[--color-success]" : "bg-[--color-surface-strong] text-[--color-muted]"}`}>
                {autopilot ? "Active" : "Paused"}
              </span>
            </div>
            <div className="rounded-lg bg-[--color-surface-strong] p-3 mb-3">
              <div className="text-[22px] font-semibold text-[--color-ink]">42</div>
              <div className="text-[11.5px] text-[--color-muted]">actions today</div>
            </div>
            <div className="space-y-1.5 text-[12px]">
              <ActivityRow label="Replies sent" value={18} />
              <ActivityRow label="Bookings" value={9} />
              <ActivityRow label="Review asks" value={7} />
              <ActivityRow label="Payment nudges" value={8} />
            </div>
            <button
              onClick={() => setAutopilot(v => !v)}
              className={`mt-3 w-full h-9 rounded-lg text-[12.5px] font-semibold transition ${autopilot ? "border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]" : "text-white"}`}
              style={autopilot ? undefined : { background: "var(--color-brand-gradient-2)" }}
            >
              {autopilot ? "Pause autopilot" : "Activate autopilot"}
            </button>
          </Card>

          {/* Reviews */}
          <Card>
            <SectionTitle title="Reviews" inline />
            <div className="flex items-baseline gap-2 mt-3">
              <div className="text-[28px] font-semibold text-[--color-ink] leading-none">{avgRating}</div>
              <div className="text-[11.5px] text-[--color-muted]">avg · {REVIEWS.length} total</div>
            </div>
            <div className="flex gap-0.5 mt-1.5 mb-3">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className={i <= Math.round(Number(avgRating)) ? "text-[--color-warning] fill-[--color-warning]" : "text-[--color-hairline]"} />
              ))}
            </div>
            <div className="space-y-1 mb-3">
              {ratingDist.map(r => {
                const pct = (r.n / REVIEWS.length) * 100;
                return (
                  <div key={r.star} className="flex items-center gap-2 text-[11px]">
                    <span className="w-3 text-[--color-muted]">{r.star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
                      <div className="h-full rounded-full bg-[--color-warning]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-4 text-right text-[--color-muted]">{r.n}</span>
                  </div>
                );
              })}
            </div>
            {unanswered > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-[--color-warning-subtle] p-2.5 text-[12px]">
                <AlertTriangle size={14} className="text-[--color-warning] shrink-0" />
                <span className="text-[--color-ink]">{unanswered} reviews awaiting reply</span>
              </div>
            )}
          </Card>

          {/* AI Search */}
          <Link to="/app/ai-search">
            <Card className="!p-4 hover:border-[--color-primary] transition">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
                  <Sparkles size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-[--color-ink]">AI Search</div>
                  <div className="text-[11.5px] text-[--color-muted]">Ask anything about your business</div>
                </div>
                <ChevronRight size={16} className="text-[--color-muted]" />
              </div>
            </Card>
          </Link>

          {/* Integrations health */}
          <Card>
            <SectionTitle title="Integrations" inline />
            <div className="mt-3 space-y-2">
              {INTEGRATIONS.map(i => (
                <div key={i.name} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md grid place-items-center bg-[--color-surface-strong] text-[--color-body] shrink-0">
                    <Plug size={13} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-[--color-ink]">{i.name}</div>
                    <div className="text-[11px] text-[--color-muted]">{i.desc}</div>
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
    <div className="relative bg-white rounded-2xl border border-[--color-hairline] p-4 transition hover:-translate-y-[1px]" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <IconTile icon={I} tone={tone} size="sm" />
        <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${up ? "bg-[--color-success-subtle] text-[--color-success]" : "bg-[--color-error-subtle] text-[--color-error]"}`}>
          {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{delta}
        </span>
      </div>
      <div className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-widest text-[--color-muted] truncate">{label}</div>
      <div className="flex items-end justify-between gap-2 mt-1">
        <div className="min-w-0 flex-1">
          <div className="text-[20px] sm:text-[24px] font-semibold text-[--color-ink] leading-tight truncate">{value}</div>
          <div className="text-[10.5px] sm:text-[11px] text-[--color-muted] mt-0.5 truncate">{hint}</div>
        </div>
        <div className="hidden sm:block shrink-0 opacity-90">
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

function QuickAction({ icon: I, label, tone, onClick }: { icon: any; label: string; tone: "warning" | "success" | "ai"; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[--color-surface-strong] transition text-left">
      <IconTile icon={I} tone={tone} size="sm" />
      <span className="flex-1 text-[13px] font-medium text-[--color-ink]">{label}</span>
      <ChevronRight size={14} className="text-[--color-muted]" />
    </button>
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
      <div className="text-[11px] font-semibold uppercase tracking-widest text-[--color-muted] mb-1.5">{label}</div>
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
