import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Users, TrendingUp, Star } from "lucide-react";
import { Card, PageHeader, StatCard, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/analytics")({ component: AnalyticsPage });

const MONTHLY = [
  { m: "Jan", v: 18 }, { m: "Feb", v: 22 }, { m: "Mar", v: 28 },
  { m: "Apr", v: 31 }, { m: "May", v: 38 }, { m: "Jun", v: 44 }, { m: "Jul", v: 52 },
];

const SOURCES = [
  { name: "Google", pct: 42, tone: "primary" as const },
  { name: "Referral", pct: 24, tone: "success" as const },
  { name: "Facebook", pct: 18, tone: "info" as const },
  { name: "Direct", pct: 10, tone: "warning" as const },
  { name: "Other", pct: 6, tone: "neutral" as const },
];

function AnalyticsPage() {
  const max = Math.max(...MONTHLY.map(m => m.v));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader title="Analytics" subtitle="Track your growth across every channel" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="MRR" value="$18.2k" trend="↑ 24% MoM" trendTone="success" icon={<DollarSign size={18} />} iconTone="success" />
        <StatCard label="New Customers" value="52" trend="↑ 18%" trendTone="success" icon={<Users size={18} />} iconTone="primary" />
        <StatCard label="LTV" value="$1,840" trend="↑ 6%" trendTone="success" icon={<TrendingUp size={18} />} iconTone="ai" />
        <StatCard label="NPS" value="72" trend="Excellent" trendTone="success" icon={<Star size={18} />} iconTone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Revenue Trend</h3>
              <p className="text-[12px] text-[--color-muted]">Last 7 months</p>
            </div>
            <Tag tone="success">↑ 188% YoY</Tag>
          </div>
          <div className="h-56 flex items-end gap-3">
            {MONTHLY.map(m => (
              <div key={m.m} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                <div className="text-[10.5px] font-semibold text-[--color-ink]">${m.v}k</div>
                <div className="w-full rounded-t-md" style={{ height: `${(m.v / max) * 100}%`, background: "var(--color-brand-gradient)", minHeight: 8 }} />
                <div className="text-[10.5px] text-[--color-muted]">{m.m}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-[15px] font-semibold text-[--color-ink] mb-4">Lead Sources</h3>
          <div className="space-y-3">
            {SOURCES.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-[--color-ink]">{s.name}</span>
                  <span className="text-[--color-muted]">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
                  <div className="h-full" style={{ width: `${s.pct}%`, background: "var(--color-brand-gradient)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
