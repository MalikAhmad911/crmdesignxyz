import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus, DollarSign, TrendingUp, Clock, CheckCircle,
  Search, Filter, Download, Upload, Link2, RefreshCcw, FileText,
  CreditCard, Banknote, Building2, Repeat, Sparkles, MoreHorizontal,
  X, Send, Phone, MessageSquare, Mail, Copy, QrCode, ArrowUpRight,
  Wallet, Receipt, AlertCircle, Zap, PauseCircle, Users, Package,
} from "lucide-react";

import { Card, PageHeader, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { PAYMENTS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/payments")({
  head: () => ({
    meta: [
      { title: "Payments — RevenueSol" },
      { name: "description", content: "Financial control center: payments, invoices, quotes, subscriptions and revenue analytics." },
    ],
  }),
  component: PaymentsPage,
});

/* ─────────────── Data ─────────────── */

type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Expired" | "Failed" | "Partial";
type Method = "card" | "ach" | "apple" | "google" | "paypal" | "cash" | "check" | "bank";

interface Row {
  id: string;
  contact: string;
  invoice: string;
  amount: number;
  description: string;
  status: PaymentStatus;
  method: Method;
  date: string;
  technician: string;
  gateway: string;
  txn: string;
}

const METHOD_META: Record<Method, { label: string; icon: React.ReactNode; tint: string }> = {
  card:   { label: "Visa •• 4242",  icon: <CreditCard size={13} />, tint: "bg-indigo-50 text-indigo-700" },
  ach:    { label: "ACH Transfer",  icon: <Building2 size={13} />,  tint: "bg-emerald-50 text-emerald-700" },
  apple:  { label: "Apple Pay",     icon: <Wallet size={13} />,     tint: "bg-neutral-900 text-white" },
  google: { label: "Google Pay",    icon: <Wallet size={13} />,     tint: "bg-sky-50 text-sky-700" },
  paypal: { label: "PayPal",        icon: <Wallet size={13} />,     tint: "bg-blue-50 text-blue-700" },
  cash:   { label: "Cash",          icon: <Banknote size={13} />,   tint: "bg-lime-50 text-lime-700" },
  check:  { label: "Check",         icon: <FileText size={13} />,   tint: "bg-amber-50 text-amber-700" },
  bank:   { label: "Bank Transfer", icon: <Building2 size={13} />,  tint: "bg-teal-50 text-teal-700" },
};

const ROWS: Row[] = PAYMENTS.map((p, i) => {
  const methods: Method[] = ["card", "ach", "apple", "google", "paypal", "cash", "check", "bank"];
  const techs = ["Marcus L.", "Elena R.", "David C.", "Priya S.", "Jonah W."];
  const gws = ["Stripe", "Square", "PayPal"];
  return {
    id: p.id,
    contact: p.contact,
    invoice: `INV-2026-${String(1000 + i).padStart(4, "0")}`,
    amount: p.amount,
    description: p.description,
    status: p.status as PaymentStatus,
    method: methods[i % methods.length],
    date: p.sent,
    technician: techs[i % techs.length],
    gateway: gws[i % gws.length],
    txn: `txn_${Math.random().toString(36).slice(2, 10)}`,
  };
});

const FILTERS = [
  { id: "all", label: "All Payments", count: ROWS.length, icon: <Wallet size={14} /> },
  { id: "Paid", label: "Successful", count: ROWS.filter(r => r.status === "Paid").length, icon: <CheckCircle size={14} /> },
  { id: "Pending", label: "Pending", count: ROWS.filter(r => r.status === "Pending").length, icon: <Clock size={14} /> },
  { id: "Failed", label: "Failed", count: 3, icon: <AlertCircle size={14} /> },
  { id: "Refunded", label: "Refunded", count: ROWS.filter(r => r.status === "Refunded").length, icon: <RefreshCcw size={14} /> },
  { id: "Partial", label: "Partially Paid", count: 2, icon: <Package size={14} /> },
  { id: "Recurring", label: "Recurring", count: 12, icon: <Repeat size={14} /> },
  { id: "Invoices", label: "Invoices", count: 24, icon: <FileText size={14} /> },
  { id: "Quotes", label: "Quotes", count: 8, icon: <Receipt size={14} /> },
  { id: "Subscriptions", label: "Subscriptions", count: 15, icon: <Repeat size={14} /> },
  { id: "Links", label: "Payment Links", count: 6, icon: <Link2 size={14} /> },
  { id: "Disputes", label: "Disputes", count: 1, icon: <AlertCircle size={14} /> },
];

/* ─────────────── Page ─────────────── */

type View = "payments" | "invoices" | "deposits" | "partial";

function PaymentsPage() {
  const [view, setView] = useState<View>("payments");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Row | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");


  const rows = useMemo(() => {
    return ROWS.filter(r => {
      if (query && !`${r.contact} ${r.invoice} ${r.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filter === "all") return true;
      if (["Paid","Pending","Refunded","Failed","Partial"].includes(filter)) return r.status === filter;
      return true;
    });
  }, [filter, query]);

  const paid = ROWS.filter(r => r.status === "Paid").reduce((a, r) => a + r.amount, 0);
  const pending = ROWS.filter(r => r.status === "Pending").reduce((a, r) => a + r.amount, 0);
  const refunded = ROWS.filter(r => r.status === "Refunded").reduce((a, r) => a + r.amount, 0);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1500px] mx-auto">
      <PageHeader
        title="Payments"
        subtitle="Financial control center — invoices, subscriptions, refunds & revenue"
        actions={
          <>
            <Btn variant="secondary" size="sm" icon={<Upload size={13} />} className="hidden md:inline-flex">Import</Btn>
            <Btn variant="secondary" size="sm" icon={<Download size={13} />} className="hidden sm:inline-flex">Export</Btn>
            <Btn variant="gradient" size="sm" icon={<Plus size={14} />}>
              <span className="hidden sm:inline">New Payment</span>
              <span className="sm:hidden">New</span>
            </Btn>
          </>
        }
      />

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3 mb-4 sm:mb-6">
        <Kpi label="Today's Revenue" value="$3,842" delta="+12.4%" up icon={<DollarSign size={14} />} accent="from-emerald-500 to-teal-500" />
        <Kpi label="MRR" value="$48,290" delta="+8.1%" up icon={<Repeat size={14} />} accent="from-violet-500 to-fuchsia-500" />
        <Kpi label="Outstanding" value={`$${pending.toLocaleString()}`} delta="4 invoices" icon={<Clock size={14} />} accent="from-amber-500 to-orange-500" />
        <Kpi label="Net Revenue" value={`$${(paid - refunded).toLocaleString()}`} delta="+18.2%" up icon={<TrendingUp size={14} />} accent="from-sky-500 to-blue-600" />
        <Kpi label="Avg Transaction" value="$421" delta="↑ $28" up icon={<Receipt size={14} />} accent="from-indigo-500 to-purple-500" />
        <Kpi label="Refunds" value={`$${refunded.toLocaleString()}`} delta="1.2% rate" icon={<RefreshCcw size={14} />} accent="from-rose-500 to-pink-500" />
      </div>

      {/* CHART + METHODS ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="xl:col-span-2 !p-4 sm:!p-5">
          <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Revenue Overview</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[--color-ink] tabular-nums">$48,290</span>
                <span className="text-[12px] font-medium text-emerald-600 inline-flex items-center gap-0.5">
                  <ArrowUpRight size={12} /> 18.2%
                </span>
              </div>
            </div>
            <div className="flex gap-1 p-0.5 rounded-lg bg-[--color-surface-strong]">
              {["7D", "30D", "90D", "YTD"].map((t, i) => (
                <button key={t} className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${i === 1 ? "bg-white text-[--color-ink] shadow-sm" : "text-[--color-muted]"}`}>{t}</button>
              ))}
            </div>
          </div>
          <RevenueChart />
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 pt-4 border-t border-[--color-hairline]">
            <MiniStat label="Collection Rate" value="94.2%" tone="success" />
            <MiniStat label="Avg Days to Pay" value="1.4" tone="primary" />
            <MiniStat label="Success Rate" value="98.4%" tone="success" />
          </div>
        </Card>

        <Card className="!p-4 sm:!p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Payment Methods</div>
            <span className="text-[11px] text-[--color-muted]">This month</span>
          </div>
          <div className="space-y-2.5">
            {[
              { m: "card" as Method, pct: 52, amt: "$25,110" },
              { m: "ach" as Method,  pct: 24, amt: "$11,590" },
              { m: "apple" as Method, pct: 12, amt: "$5,794" },
              { m: "paypal" as Method, pct: 8, amt: "$3,863" },
              { m: "cash" as Method, pct: 4, amt: "$1,933" },
            ].map(m => (
              <div key={m.m} className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-lg grid place-items-center shrink-0 ${METHOD_META[m.m].tint}`}>
                  {METHOD_META[m.m].icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[12px] font-medium text-[--color-ink]">
                    <span className="truncate">{METHOD_META[m.m].label.split(" ")[0]}</span>
                    <span className="tabular-nums">{m.amt}</span>
                  </div>
                  <div className="h-1.5 mt-1 rounded-full bg-[--color-surface-strong] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[--color-primary] to-[--color-primary-deep]" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
                <span className="text-[11px] text-[--color-muted] tabular-nums w-8 text-right">{m.pct}%</span>
              </div>
            ))}
          </div>

          {/* AI insight */}
          <div className="mt-4 pt-4 border-t border-[--color-hairline]">
            <div className="rounded-xl p-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-lg grid place-items-center bg-white/60 shrink-0">
                  <Sparkles size={13} className="text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-violet-900">RevenueSol AI</div>
                  <p className="text-[11.5px] text-violet-800/80 mt-0.5 leading-snug">
                    3 invoices likely to be late. Send reminders now to recover ~$1,240.
                  </p>
                  <button className="mt-1.5 text-[11px] font-semibold text-violet-700 hover:underline inline-flex items-center gap-0.5">
                    Review <ArrowUpRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FILTER CHIPS */}
      <div className="mb-3 -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max pb-1">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition ${
                filter === f.id
                  ? "bg-[--color-ink] text-white"
                  : "bg-white border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"
              }`}
            >
              {f.icon}
              {f.label}
              <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${filter === f.id ? "bg-white/15" : "bg-[--color-surface-strong]"}`}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTION BAR */}
      <Card padded={false} className="mb-3">
        <div className="flex items-center gap-2 p-2 sm:p-2.5">
          <div className="flex-1 relative min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by customer, invoice, amount…"
              className="w-full h-9 pl-9 pr-3 text-[13px] rounded-lg bg-[--color-surface-strong] border border-transparent focus:border-[--color-primary] focus:bg-white outline-none transition"
            />
          </div>
          <Btn size="sm" variant="secondary" icon={<Filter size={13} />} className="hidden sm:inline-flex">Filters</Btn>
          <Btn size="sm" variant="secondary" icon={<Link2 size={13} />} className="hidden md:inline-flex">Payment Link</Btn>
          <Btn size="sm" variant="secondary" icon={<FileText size={13} />} className="hidden lg:inline-flex">Invoice</Btn>
          <button className="w-9 h-9 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] text-[--color-muted]" aria-label="More">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {checked.size > 0 && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-indigo-50/60 border-t border-indigo-100 text-[12px]">
            <span className="font-semibold text-indigo-900">{checked.size} selected</span>
            <div className="flex gap-1.5">
              <Btn size="sm" variant="ghost" icon={<Send size={12} />}>Remind</Btn>
              <Btn size="sm" variant="ghost" icon={<Download size={12} />}>Export</Btn>
              <Btn size="sm" variant="ghost" icon={<X size={12} />} onClick={() => setChecked(new Set())}>Clear</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* TABLE (desktop) + CARDS (mobile) */}
      <Card padded={false} className="overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--color-hairline] bg-[--color-surface-strong]/40">
                <th className="w-10 pl-4">
                  <input
                    type="checkbox"
                    checked={checked.size > 0 && checked.size === rows.length}
                    onChange={e => setChecked(e.target.checked ? new Set(rows.map(r => r.id)) : new Set())}
                    className="rounded"
                  />
                </th>
                {["Status","Customer","Invoice","Amount","Method","Date","Technician","Gateway",""].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] uppercase tracking-widest font-semibold text-[--color-muted] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}
                  onClick={() => setSelected(r)}
                  className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-surface-strong]/40 cursor-pointer transition"
                >
                  <td className="pl-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={checked.has(r.id)}
                      onChange={e => {
                        const n = new Set(checked);
                        if (e.target.checked) n.add(r.id); else n.delete(r.id);
                        setChecked(n);
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="px-3 py-3"><StatusTag s={r.status} /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar name={r.contact} size={28} />
                      <div className="min-w-0">
                        <div className="font-semibold text-[--color-ink] truncate">{r.contact}</div>
                        <div className="text-[11px] text-[--color-muted] truncate">{r.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono text-[12px] text-[--color-body] whitespace-nowrap">{r.invoice}</td>
                  <td className="px-3 py-3 font-semibold text-[--color-ink] tabular-nums whitespace-nowrap">${r.amount.toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${METHOD_META[r.method].tint}`}>
                      {METHOD_META[r.method].icon}
                      <span className="hidden lg:inline">{METHOD_META[r.method].label.split(" ")[0]}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[--color-muted] whitespace-nowrap">{r.date}</td>
                  <td className="px-3 py-3 text-[--color-body] whitespace-nowrap">{r.technician}</td>
                  <td className="px-3 py-3 text-[--color-muted] whitespace-nowrap">{r.gateway}</td>
                  <td className="px-2 py-3 text-right pr-4">
                    <button className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong] text-[--color-muted]">
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="md:hidden divide-y divide-[--color-hairline]">
          {rows.map(r => (
            <button key={r.id} onClick={() => setSelected(r)} className="w-full text-left p-3 active:bg-[--color-surface-strong]/60 transition">
              <div className="flex items-start gap-2.5">
                <Avatar name={r.contact} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-[13px] text-[--color-ink] truncate">{r.contact}</div>
                      <div className="text-[11px] text-[--color-muted] truncate">{r.invoice} · {r.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-[13.5px] text-[--color-ink] tabular-nums">${r.amount.toLocaleString()}</div>
                      <div className="text-[10.5px] text-[--color-muted]">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <StatusTag s={r.status} />
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10.5px] font-semibold ${METHOD_META[r.method].tint}`}>
                      {METHOD_META[r.method].icon}
                      {METHOD_META[r.method].label.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {rows.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[--color-surface-strong] grid place-items-center mb-3">
              <Wallet size={20} className="text-[--color-muted]" />
            </div>
            <div className="text-[14px] font-semibold text-[--color-ink]">No payments found</div>
            <p className="text-[12px] text-[--color-muted] mt-1">Try adjusting your filters or search.</p>
          </div>
        )}
      </Card>

      {selected && <DetailsDrawer row={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ─────────────── Bits ─────────────── */

function Kpi({
  label, value, delta, up, icon, accent,
}: { label: string; value: string; delta?: string; up?: boolean; icon: React.ReactNode; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-[--color-hairline] p-3 sm:p-4 transition hover:-translate-y-[1px]"
      style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-xl`} />
      <div className="flex items-start justify-between gap-2 relative">
        <div className="min-w-0">
          <div className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-semibold text-[--color-muted] truncate">{label}</div>
          <div className="text-[16px] sm:text-[20px] font-semibold tracking-tight mt-1 text-[--color-ink] tabular-nums truncate">{value}</div>
          {delta && (
            <div className={`text-[10.5px] sm:text-[11px] font-medium mt-0.5 inline-flex items-center gap-0.5 ${up ? "text-emerald-600" : "text-[--color-muted]"}`}>
              {up ? <TrendingUp size={10} /> : null}
              <span className="truncate">{delta}</span>
            </div>
          )}
        </div>
        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg grid place-items-center text-white bg-gradient-to-br ${accent} shrink-0`}>
          {icon}
        </span>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: "success" | "primary" | "warning" }) {
  const c = { success: "text-emerald-600", primary: "text-[--color-primary-deep]", warning: "text-amber-600" }[tone];
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
      <div className={`text-[15px] sm:text-[17px] font-semibold tabular-nums mt-0.5 ${c}`}>{value}</div>
    </div>
  );
}

function StatusTag({ s }: { s: PaymentStatus }) {
  const map: Record<PaymentStatus, { tone: "success" | "warning" | "info" | "danger" | "neutral"; dot: string; label: string }> = {
    Paid:     { tone: "success", dot: "bg-emerald-500", label: "Paid" },
    Pending:  { tone: "warning", dot: "bg-amber-500",   label: "Pending" },
    Refunded: { tone: "info",    dot: "bg-sky-500",     label: "Refunded" },
    Expired:  { tone: "neutral", dot: "bg-neutral-400", label: "Expired" },
    Failed:   { tone: "danger",  dot: "bg-rose-500",    label: "Failed" },
    Partial:  { tone: "warning", dot: "bg-orange-500",  label: "Partial" },
  };
  const m = map[s];
  return (
    <Tag tone={m.tone}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </Tag>
  );
}

/* ─────────────── Chart ─────────────── */

function RevenueChart() {
  const data = [22, 34, 28, 45, 39, 58, 52, 66, 61, 74, 68, 82, 79, 90];
  const w = 640, h = 130, pad = 8;
  const max = Math.max(...data);
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24 sm:h-32" preserveAspectRatio="none">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#revGrad)" />
        <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="white" stroke="var(--color-primary)" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────── Details Drawer ─────────────── */

function DetailsDrawer({ row, onClose }: { row: Row; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50" role="dialog">
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-[--color-hairline] px-4 sm:px-5 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">{row.invoice}</div>
            <div className="text-[15px] font-semibold text-[--color-ink] truncate">Payment details</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong]">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Amount hero */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-[--color-primary]/8 via-transparent to-transparent border border-[--color-hairline]">
            <div className="flex items-center justify-between mb-1">
              <StatusTag s={row.status} />
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${METHOD_META[row.method].tint}`}>
                {METHOD_META[row.method].icon}
                {METHOD_META[row.method].label}
              </span>
            </div>
            <div className="text-[30px] sm:text-[34px] font-semibold tracking-tight text-[--color-ink] tabular-nums leading-none mt-2">
              ${row.amount.toLocaleString()}.00
            </div>
            <div className="text-[12px] text-[--color-muted] mt-1">{row.description} · {row.date}</div>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-3 rounded-xl p-3 bg-[--color-surface-strong]/50">
            <Avatar name={row.contact} size={42} />
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-semibold text-[--color-ink] truncate">{row.contact}</div>
              <div className="text-[11.5px] text-[--color-muted]">Lifetime: $8,420 · 12 payments</div>
            </div>
            <div className="flex gap-1">
              <IconBtn icon={<Phone size={13} />} />
              <IconBtn icon={<MessageSquare size={13} />} />
              <IconBtn icon={<Mail size={13} />} />
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Breakdown</div>
            <div className="rounded-xl border border-[--color-hairline] divide-y divide-[--color-hairline] text-[13px]">
              <Row2 k="Subtotal" v={`$${(row.amount * 0.92).toFixed(2)}`} />
              <Row2 k="Tax (8%)" v={`$${(row.amount * 0.08).toFixed(2)}`} />
              <Row2 k="Discount" v="—" />
              <Row2 k="Total" v={`$${row.amount.toFixed(2)}`} bold />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Timeline</div>
            <ol className="relative border-l border-[--color-hairline] pl-4 space-y-3">
              {[
                { t: "Payment succeeded", d: `${row.date} · via ${row.gateway}`, tone: "success" as const },
                { t: "Payment processed", d: `${row.date} · ${row.txn}`, tone: "info" as const },
                { t: "Invoice sent", d: `${row.date} · to ${row.contact}`, tone: "neutral" as const },
                { t: "Invoice created", d: `${row.date} · by ${row.technician}`, tone: "neutral" as const },
              ].map((e, i) => (
                <li key={i} className="relative">
                  <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${
                    e.tone === "success" ? "bg-emerald-500" : e.tone === "info" ? "bg-sky-500" : "bg-neutral-300"
                  } ring-4 ring-white`} />
                  <div className="text-[12.5px] font-semibold text-[--color-ink]">{e.t}</div>
                  <div className="text-[11px] text-[--color-muted]">{e.d}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <Meta k="Transaction ID" v={row.txn} />
            <Meta k="Gateway" v={row.gateway} />
            <Meta k="Technician" v={row.technician} />
            <Meta k="Created By" v="Elena R." />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Btn variant="gradient" icon={<Zap size={13} />}>Take Payment</Btn>
            <Btn variant="secondary" icon={<RefreshCcw size={13} />}>Refund</Btn>
            <Btn variant="secondary" icon={<Link2 size={13} />}>Payment Link</Btn>
            <Btn variant="secondary" icon={<QrCode size={13} />}>QR Code</Btn>
            <Btn variant="secondary" icon={<Copy size={13} />}>Duplicate</Btn>
            <Btn variant="secondary" icon={<PauseCircle size={13} />}>Dispute</Btn>
          </div>

          <div className="pt-2 flex gap-2">
            <Btn size="sm" variant="ghost" icon={<Download size={12} />}>PDF</Btn>
            <Btn size="sm" variant="ghost" icon={<Send size={12} />}>Email</Btn>
            <Btn size="sm" variant="ghost" icon={<Users size={12} />}>Share</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-8 h-8 grid place-items-center rounded-lg bg-white border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong] transition">
      {icon}
    </button>
  );
}

function Row2({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className={`text-[--color-body] ${bold ? "font-semibold" : ""}`}>{k}</span>
      <span className={`tabular-nums ${bold ? "font-semibold text-[--color-ink]" : "text-[--color-body]"}`}>{v}</span>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-[--color-surface-strong]/50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">{k}</div>
      <div className="font-mono text-[11.5px] text-[--color-ink] truncate mt-0.5">{v}</div>
    </div>
  );
}
