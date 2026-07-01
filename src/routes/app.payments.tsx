import { createFileRoute } from "@tanstack/react-router";
import { Plus, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, DataTable } from "@/components/app-shell/AppShell";
import { PAYMENTS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/payments")({ component: PaymentsPage });

function PaymentsPage() {
  const total = PAYMENTS.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0);
  const pending = PAYMENTS.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Payments"
        subtitle="Send payment links & track invoices"
        actions={<Btn variant="gradient" icon={<Plus size={14} />}>Request Payment</Btn>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Collected" value={`$${total.toLocaleString()}`} trend="This month" trendTone="neutral" icon={<DollarSign size={18} />} iconTone="success" />
        <StatCard label="Pending" value={`$${pending.toLocaleString()}`} trend={`${PAYMENTS.filter(p=>p.status==="Pending").length} invoices`} trendTone="warning" icon={<Clock size={18} />} iconTone="warning" />
        <StatCard label="Avg Days to Pay" value="1.4" trend="↓ 40% faster" trendTone="success" icon={<TrendingUp size={18} />} iconTone="primary" />
        <StatCard label="Success Rate" value="94%" trend="↑ 2%" trendTone="success" icon={<CheckCircle size={18} />} iconTone="success" />
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-[--color-hairline]">
          <h3 className="text-[14px] font-semibold text-[--color-ink]">Recent Payments</h3>
        </div>
        <DataTable
          headers={["Contact", "Description", "Amount", "Status", "Sent", "Paid", ""]}
          rows={PAYMENTS.map(p => [
            <span className="font-semibold">{p.contact}</span>,
            p.description,
            <span className="font-semibold">${p.amount}</span>,
            <Tag tone={p.status === "Paid" ? "success" : p.status === "Pending" ? "warning" : p.status === "Refunded" ? "info" : "danger"}>{p.status}</Tag>,
            <span className="text-[--color-muted]">{p.sent}</span>,
            <span className="text-[--color-muted]">{p.paid}</span>,
            <Btn size="sm" variant="ghost">View</Btn>,
          ])}
        />
      </Card>
    </div>
  );
}
