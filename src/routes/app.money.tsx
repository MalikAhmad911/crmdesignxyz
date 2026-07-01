import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Btn, Tag, StatCard } from "@/components/app-shell/AppShell";
import { Plus, Download, FileText, Receipt, CreditCard, Star } from "lucide-react";

export const Route = createFileRoute("/app/money")({
  head: () => ({ meta: [{ title: "Money · Revenue Sol" }] }),
  component: MoneyPage,
});

type Tab = "quotes" | "invoices" | "payments" | "reviews";

function MoneyPage() {
  const [tab, setTab] = useState<Tab>("invoices");
  return (
    <div className="p-8 max-w-[1440px] w-full">
      <PageHeader
        title="Money"
        subtitle="Quotes, invoices, payments and reviews in one place"
        actions={
          <>
            <Btn variant="secondary" icon={<Download size={13} />}>Export</Btn>
            <Btn icon={<Plus size={14} />}>{tab === "reviews" ? "Request review" : `New ${tab.slice(0,-1)}`}</Btn>
          </>
        }
      />

      <div className="flex gap-1 border-b border-[--color-hairline] mb-6">
        {([
          { k: "quotes",   l: "Quotes",   i: FileText },
          { k: "invoices", l: "Invoices", i: Receipt },
          { k: "payments", l: "Payments", i: CreditCard },
          { k: "reviews",  l: "Reviews",  i: Star },
        ] as const).map(t => {
          const I = t.i;
          const on = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition ${
                on ? "border-[--color-ink] text-[--color-ink]" : "border-transparent text-[--color-muted] hover:text-[--color-body]"
              }`}>
              <I size={14} /> {t.l}
            </button>
          );
        })}
      </div>

      {tab === "quotes"   && <Quotes />}
      {tab === "invoices" && <Invoices />}
      {tab === "payments" && <Payments />}
      {tab === "reviews"  && <Reviews />}
    </div>
  );
}

function Quotes() {
  const list = [
    { n: "Q-241", c: "Aisha Osei",    a: "$1,450", s: "Accepted", tone: "success", d: "Jun 26" },
    { n: "Q-242", c: "Jordan Pike",   a: "$980",   s: "Sent",     tone: "info",    d: "Jun 28" },
    { n: "Q-243", c: "Alicia Weber",  a: "$2,300", s: "Viewed",   tone: "primary", d: "Jun 29" },
    { n: "Q-244", c: "Devon Kim",     a: "$540",   s: "Draft",    tone: "neutral", d: "Jun 30" },
  ] as const;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open"   value="$4,270" trend="4 quotes" trendTone="neutral" />
        <StatCard label="Accepted (MTD)" value="$8,120" trend="↑ 34%" />
        <StatCard label="Win rate" value="62%" trend="↑ 8pt" />
        <StatCard label="Avg value" value="$1,067" trend="Last 30 days" trendTone="neutral" />
      </div>
      <Card padded={false}>
        <MoneyTable
          headers={["Quote","Customer","Sent","Status","Amount"]}
          rows={list.map(q => [q.n, q.c, q.d, <Tag tone={q.tone as any}>{q.s}</Tag>, <span className="font-semibold">{q.a}</span>])}
        />
      </Card>
    </>
  );
}

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Outstanding" value="$2,589" trend="4 invoices" trendTone="warning" />
        <StatCard label="Overdue"     value="$980"   trend="1 invoice" trendTone="danger" />
        <StatCard label="Paid MTD"    value="$18,240" trend="↑ 22%" />
        <StatCard label="Avg time to pay" value="4.2 days" trend="Faster than avg" />
      </div>
      <Card padded={false}>
        <MoneyTable
          headers={["Invoice","Customer","Status","Due","Amount"]}
          rows={list.map(i => [i.n, i.c, <Tag tone={i.tone as any}>{i.s}</Tag>, <span className="text-[--color-muted]">{i.d}</span>, <span className="font-semibold">{i.a}</span>])}
        />
      </Card>
    </>
  );
}

function Payments() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Revenue (Month to date)</div>
          <div className="text-[34px] font-semibold mt-1 tracking-tight">$18,240</div>
          <div className="flex gap-2 mt-2"><Tag tone="success">↑ 22% vs last month</Tag><Tag tone="info">4 payouts pending</Tag></div>
          <div className="h-32 mt-6 flex items-end gap-2">
            {[24, 40, 33, 55, 48, 70, 62, 78, 66, 84, 90, 72, 86, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: i === 13 ? "var(--color-ink)" : "var(--color-brand-lavender)" }} />
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <StatCard label="Deposits" value="$2,300" trend="3 upcoming" trendTone="neutral" />
          <StatCard label="Recurring" value="$1,120" trend="12 plans active" trendTone="neutral" />
        </div>
      </div>
      <Card padded={false}>
        <div className="p-4 border-b border-[--color-hairline] text-[13px] font-semibold">Payment history</div>
        <MoneyTable
          headers={["Customer","Method","Date","Amount"]}
          rows={[
            ["Aisha Osei",    "Stripe · card",   "Today, 9:14", <span className="font-semibold text-emerald-700">+$1,450</span>],
            ["Nina Berg",     "Stripe · ACH",    "Yesterday",   <span className="font-semibold text-emerald-700">+$420</span>],
            ["Reyes HVAC",    "Card in-person",  "Jun 28",      <span className="font-semibold text-emerald-700">+$189</span>],
            ["Jordan Pike",   "Deposit",         "Jun 26",      <span className="font-semibold text-emerald-700">+$200</span>],
          ]}
        />
      </Card>
    </>
  );
}

function Reviews() {
  const reviews = [
    { n: "Priya Rao",    src: "Google",   r: 5, t: "Fast, professional, and honest. Booked within minutes of my call.", w: "2d" },
    { n: "Jordan Pike",  src: "Yelp",     r: 4, t: "Great work, arrival window was a little wide.",                     w: "5d" },
    { n: "Devon Kim",    src: "Facebook", r: 2, t: "Price was higher than the estimate.",                               w: "1w" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Average rating</div>
        <div className="flex items-baseline gap-2 mt-1">
          <div className="text-[42px] font-semibold tracking-tight">4.8</div>
          <div className="flex gap-0.5">{[0,1,2,3,4].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
        </div>
        <div className="text-[12px] text-[--color-muted]">132 reviews · 96% positive</div>
        <div className="space-y-1.5 mt-4">
          {[[5,80],[4,14],[3,4],[2,1],[1,1]].map(([n,pct]) => (
            <div key={n} className="flex items-center gap-2 text-[11px]">
              <span className="w-3 text-[--color-muted]">{n}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
                <div className="h-full bg-[--color-ink]" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-right text-[--color-muted]">{pct}%</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        {reviews.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[13px] font-semibold">{r.n}</div>
                <div className="text-[11px] text-[--color-muted]">{r.src} · {r.w} ago</div>
              </div>
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(k => <Star key={k} size={13} className={k < r.r ? "fill-amber-400 text-amber-400" : "text-[--color-hairline]"} />)}
              </div>
            </div>
            <div className="text-[13px] text-[--color-body] leading-relaxed">{r.t}</div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[--color-hairline]">
              <Btn size="sm" variant="secondary">AI draft reply</Btn>
              <Btn size="sm" variant="ghost">Mark handled</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MoneyTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead>
        <tr className="text-[10px] uppercase tracking-widest text-[--color-muted] border-b border-[--color-hairline]">
          {headers.map((h, i) => (
            <th key={i} className={`px-4 py-3 font-semibold ${i === headers.length - 1 ? "text-right" : ""}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-surface-soft]/50 transition">
            {row.map((cell, j) => (
              <td key={j} className={`px-4 py-3 ${j === row.length - 1 ? "text-right" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
