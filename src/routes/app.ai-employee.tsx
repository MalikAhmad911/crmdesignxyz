import { createFileRoute } from "@tanstack/react-router";
import { Bot, MessageSquare, Calendar, DollarSign, Zap, TrendingUp } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/ai-employee")({ component: AIEmployeePage });

const SKILLS = [
  { name: "Lead Response", desc: "Reply to inbound leads in under 60s", active: true, handled: 142 },
  { name: "Appointment Booking", desc: "Schedule via calendar in the chat", active: true, handled: 89 },
  { name: "Quote Generation", desc: "Draft quotes from job description", active: true, handled: 41 },
  { name: "Review Requests", desc: "Ask happy customers for reviews", active: true, handled: 67 },
  { name: "Payment Follow-up", desc: "Chase overdue invoices politely", active: false, handled: 0 },
  { name: "Objection Handling", desc: "Overcome common pushbacks", active: true, handled: 22 },
];

function AIEmployeePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="AI Employee"
        subtitle="Meet Ari — she works 24/7 across SMS, email & chat"
        actions={<Btn variant="gradient" icon={<Zap size={14} />}>Configure</Btn>}
      />

      <Card className="mb-6 relative overflow-hidden" padded={false}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: "var(--color-brand-gradient)" }} />
        <div className="relative p-6 flex items-center gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-2xl grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient)" }}>
            <Bot size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[20px] font-semibold text-[--color-ink]">Ari</h2>
              <Tag tone="success">● Active</Tag>
              <Tag tone="ai">GPT-4o</Tag>
            </div>
            <p className="text-[13px] text-[--color-muted] mt-1">Handles 87% of conversations without human help. Books meetings, sends quotes, chases payments.</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Convos Handled" value="1,247" trend="↑ 23% this week" trendTone="success" icon={<MessageSquare size={18} />} iconTone="primary" />
        <StatCard label="Bookings Made" value="89" trend="↑ 12%" trendTone="success" icon={<Calendar size={18} />} iconTone="success" />
        <StatCard label="Revenue Driven" value="$18.2k" trend="This month" trendTone="neutral" icon={<DollarSign size={18} />} iconTone="warning" />
        <StatCard label="Resolution Rate" value="87%" trend="↑ 4%" trendTone="success" icon={<TrendingUp size={18} />} iconTone="ai" />
      </div>

      <Card>
        <h3 className="text-[15px] font-semibold text-[--color-ink] mb-4">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SKILLS.map(s => (
            <div key={s.name} className="flex items-start gap-3 p-3 rounded-xl border border-[--color-hairline] hover:border-[--color-primary] transition">
              <div className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-ai-subtle] text-[--color-ai] shrink-0">
                <Zap size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-semibold text-[--color-ink]">{s.name}</div>
                  <button className={`w-9 h-5 rounded-full relative shrink-0 ${s.active ? "" : "bg-[--color-hairline]"}`} style={s.active ? { background: "var(--color-brand-gradient)" } : undefined}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${s.active ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
                <div className="text-[11.5px] text-[--color-muted]">{s.desc}</div>
                <div className="text-[11px] text-[--color-primary-deep] font-semibold mt-1">{s.handled} handled today</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
