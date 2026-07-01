import { createFileRoute } from "@tanstack/react-router";
import { Plus, FileText } from "lucide-react";
import { Card, PageHeader, Btn, Tag, DataTable } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/quotes")({ component: QuotesPage });

const QUOTES = [
  { id: "Q-1042", contact: "John Smith", desc: "AC Coil Replacement", amount: 1450, status: "Accepted", sent: "Jul 1" },
  { id: "Q-1041", contact: "Sarah Kim", desc: "Water Heater Install", amount: 2100, status: "Sent", sent: "Jul 1" },
  { id: "Q-1040", contact: "Mike Johnson", desc: "Zone Repair", amount: 620, status: "Draft", sent: "—" },
  { id: "Q-1039", contact: "Jane Doe", desc: "Slab Leak Repair", amount: 3400, status: "Sent", sent: "Jun 30" },
  { id: "Q-1038", contact: "James Rivera", desc: "Furnace Tune-up", amount: 189, status: "Accepted", sent: "Jun 29" },
  { id: "Q-1037", contact: "Alicia Weber", desc: "Bathroom Rough-in", amount: 4100, status: "Declined", sent: "Jun 27" },
];

function QuotesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Quotes"
        subtitle="Send AI-drafted quotes in seconds"
        actions={<Btn variant="gradient" icon={<Plus size={14} />}>New Quote</Btn>}
      />
      <Card padded={false}>
        <DataTable
          headers={["Quote #", "Contact", "Description", "Amount", "Status", "Sent", ""]}
          rows={QUOTES.map(q => [
            <span className="font-mono font-semibold">{q.id}</span>,
            q.contact, q.desc,
            <span className="font-semibold">${q.amount.toLocaleString()}</span>,
            <Tag tone={q.status === "Accepted" ? "success" : q.status === "Sent" ? "primary" : q.status === "Draft" ? "warning" : "danger"}>{q.status}</Tag>,
            <span className="text-[--color-muted]">{q.sent}</span>,
            <Btn size="sm" variant="ghost">View</Btn>,
          ])}
        />
      </Card>
    </div>
  );
}
