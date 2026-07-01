import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare, Star, DollarSign, Sparkles, Inbox, Users, Calendar, Megaphone,
  Reply, PhoneMissed, ChevronRight, Send, Zap, CreditCard, Rocket, Bot, X,
} from "lucide-react";
import { Card, Btn } from "@/components/app-shell/AppShell";
import { BUSINESS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

const PULSE = [
  { d: "THU", msg: 12, pay: 4 },
  { d: "FRI", msg: 18, pay: 6 },
  { d: "SAT", msg: 9, pay: 3 },
  { d: "SUN", msg: 22, pay: 8 },
  { d: "MON", msg: 34, pay: 12 },
  { d: "TUE", msg: 41, pay: 15 },
  { d: "WED", msg: 27, pay: 9 },
];

const SHORTCUTS = [
  { to: "/app/inbox", icon: Inbox, label: "Inbox", sub: "Messages" },
  { to: "/app/contacts", icon: Users, label: "Leads", sub: "Pipeline" },
  { to: "/app/calendar", icon: Calendar, label: "Calendar", sub: "Appointments" },
  { to: "/app/campaigns", icon: Megaphone, label: "Campaigns", sub: "Broadcasts" },
];

const QUICK_ACTIONS = [
  { icon: Star, label: "Send review request", sub: "Ask happy customers for a Google review", tone: "warning" as const },
  { icon: CreditCard, label: "Request payment", sub: "Collect via SMS payment link", tone: "success" as const },
  { icon: Rocket, label: "Launch campaign", sub: "Reach customers in one broadcast", tone: "primary" as const },
];

const REPLIES = [
  { name: "SMS with +14097526784", preview: "\"Your verification code is …\"", time: "1d ago" },
  { name: "SMS with +18569261156", preview: "\"Your verification code is …\"", time: "1d ago" },
];

const AGENT_CHIPS = ["Follow up leads", "Review requests", "Payment reminders", "Weekly report", "Reply unread"];

function DashboardPage() {
  const pulseMax = Math.max(...PULSE.map(p => p.msg + p.pay));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto space-y-6">
      {/* Vibrant hero */}
      <div
        className="relative overflow-hidden rounded-[20px] p-5 sm:p-7 text-white shadow-[0_20px_60px_-20px_rgba(139,92,246,0.55)]"
        style={{ background: "var(--grad-sunset)" }}
      >
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "#FDE68A" }} />
        <div className="absolute -left-10 -bottom-16 w-72 h-72 rounded-full opacity-25 blur-3xl" style={{ background: "#22D3EE" }} />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Wednesday · July 1, 2026
            </div>
            <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight mt-1 leading-tight">
              Good evening, {BUSINESS.name} ✨
            </h1>
            <p className="text-[13px] text-white/85 mt-1.5 max-w-xl">
              Your workspace overview — metrics, activity, and AI tools in one bright, focused place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-lg text-[12.5px] font-semibold bg-white/15 backdrop-blur border border-white/25 text-white hover:bg-white/25 flex items-center gap-1.5">
              <CreditCard size={13} /> Request payment
            </button>
            <button className="h-9 px-3.5 rounded-lg text-[12.5px] font-semibold bg-white text-[--color-primary-deep] hover:bg-white/90 flex items-center gap-1.5 shadow-md">
              <MessageSquare size={13} /> New message
            </button>
          </div>
        </div>
      </div>

      {/* Trial banner */}
      <div className="rounded-[16px] px-4 py-3 flex items-center gap-3 flex-wrap text-white shadow-[0_10px_30px_-12px_rgba(245,158,11,0.55)]" style={{ background: "var(--grad-amber)" }}>
        <div className="w-9 h-9 rounded-full grid place-items-center bg-white/25 backdrop-blur text-white shrink-0">
          <Zap size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold">
            Your free trial ends in {BUSINESS.trialDaysLeft * 31} days
          </div>
          <div className="text-[11.5px] text-white/85 mt-0.5">Upgrade now to keep all features active.</div>
        </div>
        <button className="h-8 px-3.5 rounded-lg text-[12.5px] font-semibold text-[--color-ink] bg-white hover:bg-white/90 shrink-0 shadow">
          Upgrade now
        </button>
        <button className="w-7 h-7 rounded-md grid place-items-center text-white/90 hover:bg-white/20 shrink-0">
          <X size={14} />
        </button>
      </div>

      {/* Performance metrics */}
      <section>
        <Kicker>Overview</Kicker>
        <SectionTitle title="Performance metrics" subtitle="Key numbers for your business this month" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
          <MetricCard
            icon={<MessageSquare size={16} />} tone="ocean"
            value="20" label="Open conversations" hint="3 need reply"
            chip="↑ 100%"
          />
          <MetricCard
            icon={<Star size={16} />} tone="amber"
            value="0" label="Reviews this month" hint="No reviews yet"
            chip="+ 0%"
          />
          <MetricCard
            icon={<DollarSign size={16} />} tone="mint"
            value="$0" label="Revenue this month" hint="No pending requests"
            chip="↑ 0%"
          />
          <MetricCard
            icon={<Sparkles size={16} />} tone="berry"
            value="90%" label="AI resolution rate" hint="8 handled today"
            chip="↑ 12.5%"
          />
        </div>
      </section>


      {/* Workspace shortcuts */}
      <section>
        <Kicker>Navigate</Kicker>
        <SectionTitle title="Workspace shortcuts" subtitle="Jump straight into your core tools" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {SHORTCUTS.map(s => {
            const I = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group bg-white rounded-[14px] border border-[--color-hairline] px-4 py-4 flex items-center gap-3 transition hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(9,9,11,0.05)] hover:border-[--color-primary]"
              >
                <div className="w-10 h-10 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0">
                  <I size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-[--color-ink] truncate">{s.label}</div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">{s.sub}</div>
                </div>
                <ChevronRight size={15} className="text-[--color-muted-soft] group-hover:text-[--color-primary] shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Needs attention */}
      <section>
        <Kicker>Action needed</Kicker>
        <SectionTitle title="Needs your attention" subtitle="Items that need a response or decision today" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AttentionCard
            icon={<Reply size={16} />} tone="info"
            title="Inbox replies" count={3}
            sub="Conversations waiting for your reply" to="/app/inbox"
          />
          <AttentionCard
            icon={<PhoneMissed size={16} />} tone="danger"
            title="Missed calls" count={5}
            sub="Calls to return this week" to="/app/calls"
          />
        </div>
      </section>

      {/* Pulse + Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <div className="mb-4">
            <h3 className="text-[15px] font-semibold text-[--color-ink]">Weekly pulse</h3>
            <p className="text-[12px] text-[--color-muted] mt-0.5">Messages and payments over the last 7 days</p>
          </div>
          <div className="h-48 flex items-end gap-2 sm:gap-3">
            {PULSE.map(p => {
              const total = p.msg + p.pay;
              const totalPct = (total / pulseMax) * 100;
              const msgShare = (p.msg / total) * totalPct;
              const payShare = (p.pay / total) * totalPct;
              return (
                <div key={p.d} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    <div className="w-full rounded-t-md" style={{ height: `${payShare}%`, background: "var(--color-primary-deep)", minHeight: 3 }} />
                    <div className="w-full" style={{ height: `${msgShare}%`, background: "var(--color-primary)", minHeight: 4 }} />
                  </div>
                  <div className="text-[10.5px] font-medium text-[--color-muted]">{p.d}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[11.5px] text-[--color-muted]">
            <LegendDot color="var(--color-primary)" /> Messages
            <LegendDot color="var(--color-primary-deep)" /> Payments
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Pipeline snapshot</h3>
              <p className="text-[12px] text-[--color-muted] mt-0.5">Where your leads are right now</p>
            </div>
            <Link to="/app/contacts" className="text-[12px] font-semibold text-[--color-primary]">View all →</Link>
          </div>
          <div className="h-2 rounded-full bg-[--color-surface-strong] overflow-hidden flex">
            <div style={{ width: "62%", background: "var(--color-primary)" }} />
            <div style={{ width: "6%", background: "var(--color-info)" }} />
            <div style={{ width: "4%", background: "var(--color-success)" }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            <PipelineStat dot="var(--color-primary)" label="New" value="15" />
            <PipelineStat dot="var(--color-info)" label="Contacted" value="1" />
            <PipelineStat dot="var(--color-success)" label="Qualified" value="0" />
            <PipelineStat dot="var(--color-muted-soft)" label="Won" value="0" />
            <PipelineStat dot="var(--color-error)" label="Lost" value="0" />
          </div>
        </Card>
      </div>

      {/* Infinite Agent + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Infinite Agent</h3>
              <p className="text-[12px] text-[--color-muted] mt-0.5">Tell the AI what to do — you'll preview every action before it sends.</p>
            </div>
            <Link to="/app/ai-brain" className="text-[12px] font-semibold text-[--color-primary] shrink-0">AI Brain →</Link>
          </div>
          <div className="relative">
            <input
              placeholder="e.g. Follow up with all new leads who haven't replied…"
              className="w-full h-11 pl-3.5 pr-11 rounded-lg border border-[--color-hairline] bg-white text-[13px] focus:outline-none focus:border-[--color-primary]"
            />
            <button
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md grid place-items-center text-white"
              style={{ background: "var(--color-brand-gradient)" }}
            >
              <Send size={14} />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {AGENT_CHIPS.map(c => (
              <button key={c} className="text-[11.5px] font-medium text-[--color-body] px-2.5 py-1 rounded-full border border-[--color-hairline] bg-white hover:border-[--color-primary] hover:text-[--color-primary]">
                {c}
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5 pb-3">
            <h3 className="text-[15px] font-semibold text-[--color-ink]">Quick actions</h3>
          </div>
          <div>
            {QUICK_ACTIONS.map((q, i) => {
              const I = q.icon;
              const toneMap: Record<string, string> = {
                warning: "bg-[--color-warning-subtle] text-[--color-warning]",
                success: "bg-[--color-success-subtle] text-[--color-success]",
                primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
              };
              return (
                <button key={i} className="w-full flex items-center gap-3 px-5 py-3 border-t border-[--color-hairline-soft] hover:bg-[--color-surface-strong]/60 transition text-left">
                  <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${toneMap[q.tone]}`}>
                    <I size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[--color-ink] truncate">{q.label}</div>
                    <div className="text-[11.5px] text-[--color-muted] truncate">{q.sub}</div>
                  </div>
                  <ChevronRight size={14} className="text-[--color-muted-soft] shrink-0" />
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Needs reply + AI Autopilot */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3" padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Needs your reply</h3>
              <span className="text-[10.5px] font-semibold text-[--color-error] bg-[--color-error-subtle] px-1.5 py-0.5 rounded-full">2</span>
            </div>
            <Link to="/app/inbox" className="text-[12px] font-semibold text-[--color-primary]">Open inbox →</Link>
          </div>
          <div>
            {REPLIES.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-t border-[--color-hairline-soft]">
                <div className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] text-[10.5px] font-bold shrink-0">SM</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[--color-ink] truncate">{r.name}</div>
                  <div className="text-[11.5px] text-[--color-muted] truncate">{r.preview}</div>
                </div>
                <div className="text-[11px] text-[--color-muted-soft] shrink-0">{r.time}</div>
                <button className="h-7 px-2.5 rounded-md text-[11.5px] font-semibold text-[--color-primary] hover:bg-[--color-primary-subdued] shrink-0">
                  Reply →
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">AI Autopilot</h3>
              <span className="text-[10px] font-semibold text-[--color-ai] bg-[--color-ai-subtle] px-1.5 py-0.5 rounded-full uppercase tracking-wider">Active</span>
            </div>
            <Link to="/app/ai-employee" className="text-[12px] font-semibold text-[--color-primary]">View all →</Link>
          </div>
          <div className="text-[28px] font-semibold text-[--color-ink] tracking-tight">0 <span className="text-[13px] font-normal text-[--color-muted]">actions today</span></div>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-[--color-muted]">
            <Bot size={14} className="text-[--color-muted-soft]" />
            No automated actions yet
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[--color-muted]">
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-1">
      <h2 className="text-[18px] font-semibold text-[--color-ink] tracking-tight">{title}</h2>
      {subtitle && <p className="text-[12.5px] text-[--color-muted] mt-0.5">{subtitle}</p>}
    </div>
  );
}

function MetricCard({
  icon, iconTone, value, label, hint, chip, chipTone,
}: {
  icon: React.ReactNode;
  iconTone: "info" | "warning" | "success" | "ai" | "primary";
  value: string; label: string; hint: string;
  chip: string;
  chipTone: "success" | "warning" | "danger" | "neutral";
}) {
  const iconBg: Record<string, string> = {
    info: "bg-[--color-info-subtle] text-[--color-info]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    success: "bg-[--color-success-subtle] text-[--color-success]",
    ai: "bg-[--color-ai-subtle] text-[--color-ai]",
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
  };
  const chipCls: Record<string, string> = {
    success: "text-[--color-success] bg-[--color-success-subtle]",
    warning: "text-[--color-warning] bg-[--color-warning-subtle]",
    danger: "text-[--color-error] bg-[--color-error-subtle]",
    neutral: "text-[--color-muted] bg-[--color-surface-strong]",
  };
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className={`w-8 h-8 rounded-lg grid place-items-center ${iconBg[iconTone]}`}>{icon}</div>
        <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full ${chipCls[chipTone]}`}>{chip}</span>
      </div>
      <div className="text-[28px] font-semibold tracking-tight mt-3 text-[--color-ink] leading-none">{value}</div>
      <div className="text-[10.5px] uppercase tracking-widest font-semibold text-[--color-muted] mt-1.5">{label}</div>
      <div className="text-[11.5px] text-[--color-muted-soft] mt-1">{hint}</div>
    </Card>
  );
}

function AttentionCard({
  icon, tone, title, count, sub, to,
}: {
  icon: React.ReactNode;
  tone: "info" | "danger";
  title: string; count: number; sub: string; to: string;
}) {
  const iconBg = tone === "danger"
    ? "bg-[--color-error-subtle] text-[--color-error]"
    : "bg-[--color-info-subtle] text-[--color-info]";
  return (
    <Link
      to={to}
      className="group bg-white rounded-[14px] border border-[--color-hairline] px-4 py-4 flex items-center gap-3 transition hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(9,9,11,0.05)]"
    >
      <div className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${iconBg}`}>{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-semibold text-[--color-ink]">{title}</span>
          <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full ${tone === "danger" ? "bg-[--color-error-subtle] text-[--color-error]" : "bg-[--color-info-subtle] text-[--color-info]"}`}>{count}</span>
        </div>
        <div className="text-[11.5px] text-[--color-muted] mt-0.5 truncate">{sub}</div>
      </div>
      <ChevronRight size={15} className="text-[--color-muted-soft] group-hover:text-[--color-primary] shrink-0" />
    </Link>
  );
}

function LegendDot({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
    </span>
  );
}

function PipelineStat({ dot, label, value }: { dot: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
      <div className="min-w-0">
        <div className="text-[11px] text-[--color-muted]">{label}</div>
        <div className="text-[15px] font-semibold text-[--color-ink] leading-tight">{value}</div>
      </div>
    </div>
  );
}
