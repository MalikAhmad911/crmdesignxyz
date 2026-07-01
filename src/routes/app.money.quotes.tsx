import { createFileRoute } from "@tanstack/react-router";
import { Card, Tag, StatCard } from "@/components/app-shell/AppShell";
import { MoneyTable } from "@/components/app-shell/MoneyTable";

export const Route = createFileRoute("/app/money/quotes")({
  head: () => ({ meta: [{ title: "Quotes · Revenue Sol" }] }),
  component: Quotes,
});

function Quotes() {
  const list = [
    { n: "Q-241", c: "Aisha Osei",    a: "$1,450", s: "Accepted", tone: "success", d: "Jun 26" },
    { n: "Q-242", c: "Jordan Pike",   a: "$980",   s: "Sent",     tone: "info",    d: "Jun 28" },
    { n: "Q-243", c: "Alicia Weber",  a: "$2,300", s: "Viewed",   tone: "primary", d: "Jun 29" },
    { n: "Q-244", c: "Devon Kim",     a: "$540",   s: "Draft",    tone: "neutral", d: "Jun 30" },
  ] as const;
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open"   value="$4,270" trend="4 quotes" trendTone="neutral" />
        <StatCard label="Accepted (MTD)" value="$8,120" trend="↑ 34%" />
        <StatCard label="Win rate" value="62%" trend="↑ 8pt" />
        <StatCard label="Avg value" value="$1,067" trend="Last 30 days" trendTone="neutral" />
      </div>
      <Card padded={false}>
        <MoneyTable
          headers={["Quote","Customer","Sent","Status","Amount"]}
          rows={list.map(q => [q.n, q.c, q.d, <Tag key="s" tone={q.tone as any}>{q.s}</Tag>, <span key="a" className="font-semibold text-[--color-ink]">{q.a}</span>])}
        />
      </Card>
    </>
  );
}
