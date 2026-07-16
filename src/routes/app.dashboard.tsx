import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, PhoneMissed, CalendarCheck, DollarSign, Star, TrendingUp, TrendingDown,
  Phone, MessageSquare, UserPlus, Briefcase, Receipt, ChevronRight,
} from "lucide-react";
import { Card, Btn, Avatar } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

/* -------------------------------------------------- data (mirrors mobile) */
const METRICS = [
  { label: "New leads",            value: "12",    delta: "+4",   hint: "today",    positive: true,  icon: Sparkles,      tone: "primary" as const },
  { label: "Missed → recovered",   value: "7/8",   delta: "88%",  hint: "rate",     positive: true,  icon: PhoneMissed,   tone: "warning" as const },
  { label: "Booked",               value: "9",     delta: "+2",   hint: "today",    positive: true,  icon: CalendarCheck, tone: "success" as const },
  { label: "Collected",            value: "$3.2K", delta: "+18%", hint: "vs yday",  positive: true,  icon: DollarSign,    tone: "success" as const },
  { label: "Reviews",              value: "4",     delta: "+1",   hint: "new",      positive: true,  icon: Star,          tone: "warning" as const },
  { label: "AI tasks",             value: "42",    delta: "+11",  hint: "today",    positive: true,  icon: Sparkles,      tone: "ai" as const },
];

const QUICK = [
  { key: "call",  label: "Call",     Icon: Phone,          to: "/app/calls" },
  { key: "text",  label: "Text",     Icon: MessageSquare,  to: "/app/inbox" },
  { key: "lead",  label: "Add Lead", Icon: UserPlus,       to: "/app/contacts" },
  { key: "job",   label: "New Job",  Icon: Briefcase,      to: "/app/jobs" },
  { key: "inv",   label: "Invoice",  Icon: Receipt,        to: "/app/payments" },
];

const LEADS = [
  { id: "l1", name: "Priya Rao",     source: "Website form", score: 92, need: "AC not cooling, needs urgent visit today.", time: "2m ago" },
  { id: "l2", name: "Jordan Pike",   source: "Missed call",  score: 78, need: "Quote request: bathroom repipe.",           time: "12m ago" },
  { id: "l3", name: "Maya Sørensen", source: "Google Ads",   score: 64, need: "Furnace tune-up, flexible schedule.",       time: "1h ago" },
];

const ACTIVITY = [
  { id: "ac1", who: "AI Receptionist", what: "answered call from Priya Rao and booked 2pm today", time: "2m" },
  { id: "ac2", who: "Marcus L.",       what: "marked Furnace tune-up as en-route",                time: "18m" },
  { id: "ac3", who: "AI Employee",     what: "sent review request to Nina B.",                    time: "1h" },
  { id: "ac4", who: "Stripe",          what: "collected $1,450 from Aisha O.",                    time: "3h" },
  { id: "ac5", who: "AI Brain",        what: "created 3 follow-ups for unpaid invoices",          time: "yesterday" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
function today() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

/* -------------------------------------------------- atoms */

const ICON_BG: Record<string, string> = {
  primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
  success: "bg-[--color-success-subtle] text-[--color-success]",
  warning: "bg-[--color-warning-subtle] text-[--color-warning]",
  info:    "bg-[--color-info-subtle] text-[--color-info]",
  ai:      "bg-[--color-ai-subtle] text-[--color-ai]",
};

function MetricCard({ m }: { m: typeof METRICS[number] }) {
  const Icon = m.icon;
  const Trend = m.positive ? TrendingUp : TrendingDown;
  return (
    <div className="bg-white rounded-2xl border border-[--color-hairline] p-4 sm:p-5 min-w-0" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[--color-muted] truncate">{m.label}</div>
        <div className={`w-7 h-7 rounded-lg grid place-items-center shrink-0 ${ICON_BG[m.tone]}`}>
          <Icon size={14} />
        </div>
      </div>
      <div className="text-[22px] sm:text-[24px] font-semibold tracking-tight text-[--color-ink] tabular-nums mt-2 leading-none">{m.value}</div>
      <div className="flex items-center gap-1.5 mt-2 min-w-0">
        <Trend size={12} className={m.positive ? "text-[--color-success]" : "text-[--color-error]"} />
        <span className={`text-[11.5px] font-semibold ${m.positive ? "text-[--color-success]" : "text-[--color-error]"}`}>{m.delta}</span>
        <span className="text-[11.5px] text-[--color-muted] truncate">{m.hint}</span>
      </div>
    </div>
  );
}

function SectionHeader({ title, action, to }: { title: string; action?: string; to?: string }) {
  return (
    <div className="flex items-center justify-between mt-8 mb-3">
      <h2 className="text-[17px] font-semibold text-[--color-ink] tracking-tight">{title}</h2>
      {action && to && (
        <Link to={to} className="text-[13px] font-semibold text-[--color-primary-deep] hover:underline shrink-0">
          {action}
        </Link>
      )}
    </div>
  );
}

function QuickAction({ label, Icon, to }: { label: string; Icon: typeof Phone; to: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1.5 min-w-0 group">
      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[--color-primary-subdued] grid place-items-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-elev)]" style={{ width: 52, height: 52 }}>
        <Icon size={20} className="text-[--color-primary-deep]" />
      </div>
      <span className="text-[12px] font-medium text-[--color-ink] truncate max-w-full">{label}</span>
    </Link>
  );
}

function AISuggestion() {
  return (
    <Card className="border-[--color-primary]/25" padded={false}>
      <div className="p-5" style={{ background: "linear-gradient(180deg, #FBFAFF 0%, #FFFFFF 100%)", borderRadius: "1rem" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[--color-primary] grid place-items-center shrink-0">
            <Sparkles size={14} className="text-white" />
          </div>
          <h3 className="text-[15px] font-semibold text-[--color-ink] truncate">Approve reply to Priya Rao</h3>
        </div>
        <p className="text-[13px] text-[--color-body] mt-3 leading-relaxed">
          Draft: “Hi Priya — we can be there at 3pm today. I'll send a confirmation text with the tech's ETA.”
        </p>
        <div className="flex gap-2 mt-4">
          <Btn variant="secondary" size="sm" className="flex-1">Dismiss</Btn>
          <Btn variant="primary" size="sm" className="flex-[2]">Approve &amp; send</Btn>
        </div>
      </div>
    </Card>
  );
}

function LeadCard({ l }: { l: typeof LEADS[number] }) {
  const tone = l.score >= 80 ? "success" : l.score >= 50 ? "warning" : "neutral";
  const toneCls: Record<string, string> = {
    success: "bg-[--color-success-subtle] text-[--color-success]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    neutral: "bg-[--color-surface-strong] text-[--color-body]",
  };
  return (
    <Card>
      <div className="flex items-center gap-3 min-w-0">
        <Avatar name={l.name} size={44} />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-[--color-ink] truncate">{l.name}</div>
          <div className="text-[12px] text-[--color-muted] truncate">{l.source} · {l.time}</div>
        </div>
        <span className={`text-[11.5px] font-bold px-2 py-0.5 rounded-full shrink-0 ${toneCls[tone]}`}>{l.score}</span>
      </div>
      <p className="text-[13px] text-[--color-body] mt-3 line-clamp-2">{l.need}</p>
      <div className="flex gap-2 mt-4">
        <Btn variant="secondary" size="sm" className="flex-1" icon={<Phone size={13} />}>Call</Btn>
        <Btn variant="secondary" size="sm" className="flex-1" icon={<MessageSquare size={13} />}>Text</Btn>
        <Btn variant="primary" size="sm" className="flex-1">Book</Btn>
      </div>
    </Card>
  );
}

/* -------------------------------------------------- page */

function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[--color-ink] truncate">
            {greeting()}, Alex
          </h1>
          <p className="text-[13px] text-[--color-muted] mt-1">{today()}</p>
        </div>
      </header>

      {/* Metrics — 2 cols mobile, up to 6 cols desktop (matches mobile 3x2 stack) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {METRICS.map(m => <MetricCard key={m.label} m={m} />)}
      </div>

      {/* Quick actions */}
      <SectionHeader title="Quick actions" />
      <div className="grid grid-cols-5 gap-2">
        {QUICK.map(q => <QuickAction key={q.key} label={q.label} Icon={q.Icon} to={q.to} />)}
      </div>

      {/* Needs your attention */}
      <SectionHeader title="Needs your attention" action="View AI queue" to="/app/ai-employee" />
      <AISuggestion />

      {/* Fresh leads */}
      <SectionHeader title="Fresh leads" action="See all" to="/app/contacts" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEADS.map(l => <LeadCard key={l.id} l={l} />)}
      </div>

      {/* Recent activity */}
      <SectionHeader title="Recent activity" />
      <Card padded={false}>
        <div className="p-4 sm:p-5">
          {ACTIVITY.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-start gap-3 py-3 min-w-0 ${i === ACTIVITY.length - 1 ? "" : "border-b border-[--color-hairline]"}`}
            >
              <Avatar name={a.who} size={32} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[--color-ink] truncate">{a.who}</div>
                <div className="text-[13px] text-[--color-body] truncate">{a.what}</div>
              </div>
              <span className="text-[11.5px] text-[--color-muted] shrink-0 pt-0.5">{a.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
