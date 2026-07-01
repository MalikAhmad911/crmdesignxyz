import { createFileRoute } from "@tanstack/react-router";
import { Card, Tag, StatCard } from "@/components/app-shell/AppShell";
import { MoneyTable } from "@/components/app-shell/MoneyTable";

export const Route = createFileRoute("/app/money/invoices")({
  head: () => ({ meta: [{ title: "Invoices · Revenue Sol" }] }),
  component: Invoices,
});

function Invoices() {
  const list = [
    { n: "INV-1042", c: "Aisha Osei",    a: "$1,450", s: "Paid",    tone: "success", d: "Paid Jun 28" },
    { n: "INV-1043", c: "Reyes HVAC",    a: "$189",   s: "Sent",    tone: "info",    d: "Due Jul 5" },
    { n: "INV-1044", c: "Jordan Pike",   a: "$980",   s: "Overdue", tone: "danger",  d: "5 days overdue" },
    { n: "INV-1045", c: "Nina Berg",     a: "$420",   s: "Draft",   tone: "neutral", d: "Draft" },
    { n: "INV-1046", c: "Alicia Weber",  a: "$780",   s: "Sent",    tone: "info",    d: "Due Jul 10" },
  ] as const;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Outstanding" value="$2,589" trend="4 invoices" trendTone="warning" />
        <StatCard label="Overdue"     value="$980"   trend="1 invoice" trendTone="danger" />
        <StatCard label="Paid MTD"    value="$18,240" trend="↑ 22%" />
        <StatCard label="Avg time to pay" value="4.2 days" trend="Faster than avg" />
      </div>
      <Card padded={false}>
        <MoneyTable
          headers={["Invoice","Customer","Status","Due","Amount"]}
          rows={list.map(i => [i.n, i.c, <Tag key="s" tone={i.tone as any}>{i.s}</Tag>, <span key="d" className="text-[--color-muted]">{i.d}</span>, <span key="a" className="font-semibold text-[--color-ink]">{i.a}</span>])}
        />
      </Card>
    </>
  );
}
