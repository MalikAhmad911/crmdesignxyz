import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Btn, Tag, Avatar, StatCard } from "@/components/app-shell/AppShell";
import {
  ArrowUpRight, Sparkles, PhoneCall, MessageSquare, CalendarCheck,
  DollarSign, Plus, TrendingUp, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Revenue Sol" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="p-8 max-w-[1440px] w-full">
      <PageHeader
        title="Good morning, Marcus"
        subtitle="Tuesday, July 1 · Everything's running smoothly"
        actions={
          <>
            <Btn variant="secondary" icon={<CalendarCheck size={14} />}>Today</Btn>
            <Btn icon={<Plus size={14} />}>New job</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Revenue today"    value="$4,280"  trend="↑ 22% vs yesterday" />
        <StatCard label="Jobs booked"      value="12"      trend="↑ 3 vs yesterday" />
        <StatCard label="AI replies sent"  value="28"      trend="Working 24/7" trendTone="neutral" />
        <StatCard label="Pending payments" value="$2,589"  trend="4 invoices open" trendTone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[13px] font-semibold">Revenue trend</div>
              <div className="text-[11px] text-[--color-muted]">Last 14 days</div>
            </div>
            <div className="flex items-center gap-1">
              {["7d", "14d", "30d"].map((r, i) => (
                <button key={r} className={`text-[11px] px-2 py-1 rounded-md font-medium ${i === 1 ? "bg-[--color-ink] text-white" : "text-[--color-muted] hover:bg-[--color-surface-soft]"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56 flex items-end gap-2">
            {[38, 52, 44, 60, 55, 72, 66, 58, 74, 80, 68, 84, 90, 96].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-md" style={{ height: `${h}%`, background: i === 13 ? "var(--color-ink)" : "var(--color-brand-lavender)" }} />
                <span className="text-[9px] text-[--color-muted]">{18 + i}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Employee card */}
        <Card className="bg-[--color-surface-dark] border-transparent text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg grid place-items-center bg-white/10">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-[13px] font-semibold">AI Employee</div>
              <div className="text-[11px] text-white/50">Working 24/7</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-300 font-semibold">LIVE</span>
            </div>
          </div>
          <div className="text-[15px] leading-relaxed mb-4">Handled <span className="font-semibold">42 tasks</span> today. <span className="text-white/60">7 waiting for your approval.</span></div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[[MessageSquare,"28","Replies"],[PhoneCall,"12","Calls"],[CalendarCheck,"9","Bookings"],[DollarSign,"4","Payments"]].map(([I,v,l]:any,i) => (
              <div key={i} className="p-2.5 rounded-lg bg-white/5">
                <I size={13} className="text-white/60" />
                <div className="text-[16px] font-semibold mt-1">{v}</div>
                <div className="text-[10px] text-white/50">{l}</div>
              </div>
            ))}
          </div>
          <button className="w-full h-9 rounded-lg bg-white text-[--color-ink] text-[12px] font-semibold flex items-center justify-center gap-1">
            Review approvals <ArrowUpRight size={13} />
          </button>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[13px] font-semibold">Recent activity</div>
            <button className="text-[11px] font-semibold text-[--color-muted] hover:text-[--color-ink]">See all</button>
          </div>
          <div className="space-y-1">
            {[
              { who: "AI Receptionist", what: "answered call from Priya Rao and booked 2pm today", t: "2m", tag: "AI", tone: "primary" as const },
              { who: "Marcus L.",       what: "marked Furnace tune-up as en-route",                 t: "18m", tag: "Job", tone: "neutral" as const },
              { who: "AI Employee",     what: "sent review request to Nina B.",                     t: "1h", tag: "AI", tone: "primary" as const },
              { who: "Stripe",          what: "collected $1,450 from Aisha O.",                      t: "3h", tag: "Payment", tone: "success" as const },
              { who: "AI Brain",        what: "created 3 follow-ups for unpaid invoices",           t: "yday", tag: "AI", tone: "primary" as const },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[--color-hairline] last:border-0">
                <div className="w-8 h-8 rounded-full bg-[--color-surface-soft] grid place-items-center text-[11px] font-semibold shrink-0">
                  {a.who.split(" ").map(x=>x[0]).slice(0,2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px]"><span className="font-semibold">{a.who}</span> <span className="text-[--color-body]">{a.what}</span></div>
                  <div className="flex items-center gap-2 mt-1">
                    <Tag tone={a.tone}>{a.tag}</Tag>
                    <span className="text-[11px] text-[--color-muted]">{a.t}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's schedule */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[13px] font-semibold">Today's schedule</div>
            <span className="text-[11px] text-[--color-muted]">3 jobs</span>
          </div>
          <div className="space-y-3">
            {[
              { t: "2:00 PM", j: "AC diagnostic",   c: "Priya Rao",    a: Avatar },
              { t: "4:30 PM", j: "Furnace tune-up", c: "Reyes HVAC",   a: Avatar },
              { t: "6:00 PM", j: "Quote call",      c: "Aisha O.",     a: Avatar },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[11px] font-mono font-semibold text-[--color-muted] w-14 shrink-0">{s.t}</div>
                <div className="flex-1 pl-3 border-l-2 border-[--color-brand-lavender]">
                  <div className="text-[13px] font-medium">{s.j}</div>
                  <div className="text-[11px] text-[--color-muted]">{s.c}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
