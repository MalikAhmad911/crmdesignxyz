import { createFileRoute } from "@tanstack/react-router";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Play } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, DataTable } from "@/components/app-shell/AppShell";
import { CALLS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/calls")({ component: CallsPage });

function CallsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Calls"
        subtitle="Every inbound & outbound call in one place"
        actions={<Btn variant="gradient" icon={<Phone size={14} />}>New Call</Btn>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Calls" value="128" icon={<Phone size={18} />} iconTone="primary" />
        <StatCard label="Inbound" value="94" icon={<PhoneIncoming size={18} />} iconTone="success" />
        <StatCard label="Outbound" value="34" icon={<PhoneOutgoing size={18} />} iconTone="info" />
        <StatCard label="Missed" value="0" trend="Voice AI covered all" trendTone="success" icon={<PhoneMissed size={18} />} iconTone="danger" />
      </div>

      <Card padded={false}>
        <DataTable
          headers={["Time", "Caller", "Duration", "Outcome", "Recording"]}
          rows={CALLS.map(c => [
            <span className="text-[--color-muted]">{c.time}</span>,
            <span className="font-semibold">{c.caller}</span>,
            c.duration,
            <Tag tone={c.outcome === "Booked" ? "success" : c.outcome === "Missed" ? "danger" : c.outcome === "Escalated" ? "warning" : "neutral"}>{c.outcome}</Tag>,
            <button className="flex items-center gap-1.5 text-[--color-primary] text-[12px] font-semibold"><Play size={12} /> Play</button>,
          ])}
        />
      </Card>
    </div>
  );
}
