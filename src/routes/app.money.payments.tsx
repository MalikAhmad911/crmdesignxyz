import { createFileRoute } from "@tanstack/react-router";
import { Card, Tag, StatCard } from "@/components/app-shell/AppShell";
import { MoneyTable } from "@/components/app-shell/MoneyTable";

export const Route = createFileRoute("/app/money/payments")({
  head: () => ({ meta: [{ title: "Payments · Revenue Sol" }] }),
  component: Payments,
});

function Payments() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Revenue (Month to date)</div>
          <div className="text-[34px] font-semibold mt-1 tracking-tight text-[--color-ink]">$18,240</div>
          <div className="flex gap-2 mt-2"><Tag tone="success">↑ 22% vs last month</Tag><Tag tone="info">4 payouts pending</Tag></div>
          <div className="h-32 mt-6 flex items-end gap-2">
            {[24, 40, 33, 55, 48, 70, 62, 78, 66, 84, 90, 72, 86, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: i === 13 ? "var(--color-primary)" : "var(--color-primary-subdued)" }} />
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <StatCard label="Deposits" value="$2,300" trend="3 upcoming" trendTone="neutral" />
          <StatCard label="Recurring" value="$1,120" trend="12 plans active" trendTone="neutral" />
        </div>
      </div>
      <Card padded={false}>
        <div className="p-4 border-b border-[--color-hairline] text-[13px] font-semibold text-[--color-ink]">Payment history</div>
        <MoneyTable
          headers={["Customer","Method","Date","Amount"]}
          rows={[
            ["Aisha Osei",    "Stripe · card",   "Today, 9:14", <span key="a" className="font-semibold text-[--color-success]">+$1,450</span>],
            ["Nina Berg",     "Stripe · ACH",    "Yesterday",   <span key="a" className="font-semibold text-[--color-success]">+$420</span>],
            ["Reyes HVAC",    "Card in-person",  "Jun 28",      <span key="a" className="font-semibold text-[--color-success]">+$189</span>],
            ["Jordan Pike",   "Deposit",         "Jun 26",      <span key="a" className="font-semibold text-[--color-success]">+$200</span>],
          ]}
        />
      </Card>
    </>
  );
}
