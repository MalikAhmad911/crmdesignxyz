import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, MessageSquare, Star, DollarSign, Calendar, ArrowUp, ArrowDown,
  Phone, Bot, Wrench, TrendingUp, Send,
} from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { ACTIVITY, REVIEWS, JOBS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/dashboard")({ component: DashboardPage });

const REVENUE = [
  { d: "Mon", v: 3200 }, { d: "Tue", v: 4100 }, { d: "Wed", v: 3800 },
  { d: "Thu", v: 5200 }, { d: "Fri", v: 6100 }, { d: "Sat", v: 4900 }, { d: "Sun", v: 5800 },
];

function DashboardPage() {
  const max = Math.max(...REVENUE.map(r => r.v));
  const todayJobs = [...JOBS.Scheduled, ...JOBS["En Route"], ...JOBS["In Progress"]].slice(0, 5);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Good morning, Mike 👋"
        subtitle="Here's what's happening at ABC Plumbing today."
      />

      {/* AI Command Bar */}
      <Card className="mb-6 relative overflow-hidden" padded={false}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: "var(--color-brand-gradient)" }} />
        <div className="relative p-5 flex items-center gap-3 flex-wrap">
          <div className="w-10 h-10 rounded-lg grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient)" }}>
            <Sparkles size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[--color-ink]">Ask AI anything about your business</div>
            <div className="text-[11.5px] text-[--color-muted] mt-0.5">"How many leads did I get yesterday?" · "Send review requests to today's completed jobs"</div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              placeholder="Ask AI..."
              className="h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px] w-full sm:w-64 focus:outline-none focus:border-[--color-primary]"
            />
            <Btn variant="gradient" icon={<Send size={14} />}>Ask</Btn>
          </div>
        </div>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value="$32,450" trend="↑ 12% vs last week" trendTone="success" icon={<DollarSign size={18} />} iconTone="success" />
        <StatCard label="New Leads" value="24" trend="↑ 8% vs last week" trendTone="success" icon={<TrendingUp size={18} />} iconTone="primary" />
        <StatCard label="Conversion Rate" value="34%" trend="↓ 2% vs last week" trendTone="danger" icon={<Bot size={18} />} iconTone="ai" />
        <StatCard label="Avg Response" value="1.2m" trend="↑ 45% faster" trendTone="success" icon={<MessageSquare size={18} />} iconTone="info" />
      </div>

      {/* 60/40 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Revenue chart + activity */}
        <div className="lg:col-span-3 space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold text-[--color-ink]">Revenue this week</h3>
                <p className="text-[12px] text-[--color-muted] mt-0.5">Compared to last 7 days</p>
              </div>
              <Tag tone="success">↑ 12%</Tag>
            </div>
            <div className="h-48 flex items-end gap-2 sm:gap-3">
              {REVENUE.map(r => (
                <div key={r.d} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                  <div className="w-full rounded-t-md transition hover:opacity-80" style={{
                    height: `${(r.v / max) * 100}%`,
                    background: "var(--color-brand-gradient)",
                    minHeight: 8,
                  }} />
                  <div className="text-[10.5px] text-[--color-muted]">{r.d}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card padded={false}>
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Recent Activity</h3>
              <Link to="/app/inbox" className="text-[12px] font-semibold text-[--color-primary]">View all</Link>
            </div>
            <div>
              {ACTIVITY.slice(0, 6).map(a => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-2.5 border-t border-[--color-hairline-soft] hover:bg-[--color-surface-strong]/60 transition">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] text-[13px] shrink-0">
                    {a.icon === "message" ? "💬" : a.icon === "star" ? "⭐" : a.icon === "pay" ? "💰" : a.icon === "call" ? "📞" : "🤖"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-[--color-ink] truncate">{a.text}</div>
                    <div className="text-[11px] text-[--color-muted]">{a.time}</div>
                  </div>
                  <Btn variant="secondary" size="sm">{a.action}</Btn>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Latest Reviews</h3>
              <Link to="/app/reviews" className="text-[12px] font-semibold text-[--color-primary]">All</Link>
            </div>
            <div className="space-y-3">
              {REVIEWS.slice(0, 3).map(r => (
                <div key={r.id} className="pb-3 border-b border-[--color-hairline-soft] last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar name={r.name} size={26} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{r.name}</div>
                    </div>
                    <div className="text-[12px]">{"⭐".repeat(r.rating)}</div>
                  </div>
                  <p className="text-[12px] text-[--color-body] line-clamp-2">{r.text}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Today's Jobs</h3>
              <Link to="/app/jobs" className="text-[12px] font-semibold text-[--color-primary]">All</Link>
            </div>
            <div className="space-y-2">
              {todayJobs.map(j => (
                <div key={j.id} className="flex items-center gap-3 py-2 border-b border-[--color-hairline-soft] last:border-0">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0">
                    <Wrench size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[--color-ink] truncate">{j.title}</div>
                    <div className="text-[11.5px] text-[--color-muted] truncate">{j.customer} · {j.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
