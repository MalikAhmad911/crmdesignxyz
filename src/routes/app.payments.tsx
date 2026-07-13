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

const SEED_ROWS: Row[] = PAYMENTS.map((p, i) => {
  const methods: Method[] = ["card", "ach", "apple", "google", "paypal", "cash", "check", "bank"];
  const techs = ["Marcus L.", "Elena R.", "David C.", "Priya S.", "Jonah W."];
  const gws = ["Stripe", "Square", "PayPal"];
  // Sprinkle failed/partial statuses so filter chips have real data
  const override: PaymentStatus | null =
    i === 2 || i === 6 || i === 11 ? "Failed" :
    i === 4 || i === 9 ? "Partial" : null;
  return {
    id: p.id,
    contact: p.contact,
    invoice: `INV-2026-${String(1000 + i).padStart(4, "0")}`,
    amount: p.amount,
    description: p.description,
    status: (override ?? p.status) as PaymentStatus,
    method: methods[i % methods.length],
    date: p.sent,
    technician: techs[i % techs.length],
    gateway: gws[i % gws.length],
    txn: `txn_${Math.random().toString(36).slice(2, 10)}`,
  };
});

/* ─────────────── Page ─────────────── */

type View = "payments" | "invoices" | "deposits" | "partial" | "recurring";

function PaymentsPage() {
  const [view, setView] = useState<View>("payments");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Row | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [allRows, setAllRows] = useState<Row[]>(SEED_ROWS);
  const [quickOpen, setQuickOpen] = useState<null | "payment" | "invoice">(null);

  const FILTERS = useMemo(() => ([
    { id: "all", label: "All Payments", count: allRows.length, icon: <Wallet size={14} /> },
    { id: "Paid", label: "Successful", count: allRows.filter(r => r.status === "Paid").length, icon: <CheckCircle size={14} /> },
    { id: "Pending", label: "Pending", count: allRows.filter(r => r.status === "Pending").length, icon: <Clock size={14} /> },
    { id: "Failed", label: "Failed", count: allRows.filter(r => r.status === "Failed").length, icon: <AlertCircle size={14} /> },
    { id: "Refunded", label: "Refunded", count: allRows.filter(r => r.status === "Refunded").length, icon: <RefreshCcw size={14} /> },
    { id: "Partial", label: "Partially Paid", count: allRows.filter(r => r.status === "Partial").length, icon: <Package size={14} /> },
    { id: "Recurring", label: "Recurring", count: 12, icon: <Repeat size={14} /> },
    { id: "Invoices", label: "Invoices", count: 24, icon: <FileText size={14} /> },
    { id: "Quotes", label: "Quotes", count: 8, icon: <Receipt size={14} /> },
    { id: "Subscriptions", label: "Subscriptions", count: 15, icon: <Repeat size={14} /> },
    { id: "Links", label: "Payment Links", count: 6, icon: <Link2 size={14} /> },
    { id: "Disputes", label: "Disputes", count: 1, icon: <AlertCircle size={14} /> },
  ]), [allRows]);

  const rows = useMemo(() => {
    return allRows.filter(r => {
      if (query && !`${r.contact} ${r.invoice} ${r.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filter === "all") return true;
      if (["Paid","Pending","Refunded","Failed","Partial"].includes(filter)) return r.status === filter;
      return true;
    });
  }, [allRows, filter, query]);

  const paid = allRows.filter(r => r.status === "Paid").reduce((a, r) => a + r.amount, 0);
  const pending = allRows.filter(r => r.status === "Pending").reduce((a, r) => a + r.amount, 0);
  const refunded = allRows.filter(r => r.status === "Refunded").reduce((a, r) => a + r.amount, 0);

  function handleCreate(row: Row) {
    setAllRows(prev => [row, ...prev]);
    setQuickOpen(null);
  }


  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1500px] mx-auto">
      <PageHeader
        title="Payments"
        subtitle="Financial control center — invoices, subscriptions, refunds & revenue"
        actions={
          <>
            <Btn variant="secondary" size="sm" icon={<Upload size={13} />} className="hidden! md:inline-flex!">Import</Btn>
            <Btn variant="secondary" size="sm" icon={<Download size={13} />} className="hidden! md:inline-flex!">Export</Btn>
            <Btn variant="secondary" size="sm" icon={<Send size={13} />} className="hidden! sm:inline-flex!" onClick={() => setQuickOpen("invoice")}>
              Send Invoice
            </Btn>
            <button
              onClick={() => setQuickOpen("invoice")}
              className="sm:hidden w-9 h-9 grid place-items-center rounded-lg bg-white border border-[--color-hairline] text-[--color-body]"
              aria-label="Send Invoice"
            >
              <Send size={14} />
            </button>
            <Btn variant="gradient" size="sm" icon={<Plus size={14} />} onClick={() => setQuickOpen("payment")}>
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

      {/* VIEW TABS */}
      <div className="mb-3 sm:mb-4 border-b border-[--color-hairline] -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {([
            { id: "payments",  label: "Payments",         icon: <Wallet size={14} />,    count: allRows.length },
            { id: "invoices",  label: "Invoices",         icon: <FileText size={14} />,  count: INVOICES.length },
            { id: "deposits",  label: "Deposits",         icon: <Banknote size={14} />,  count: DEPOSITS.length },
            { id: "partial",   label: "Partial Payments", icon: <Package size={14} />,   count: PARTIALS.length },
            { id: "recurring", label: "Recurring",        icon: <Repeat size={14} />,    count: RECURRING.length },
          ] as { id: View; label: string; icon: React.ReactNode; count: number }[]).map(t => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setView(t.id); setChecked(new Set()); }}
                className={`relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[12.5px] sm:text-[13px] font-semibold whitespace-nowrap transition ${
                  active ? "text-[--color-ink]" : "text-[--color-muted] hover:text-[--color-body]"
                }`}
              >
                {t.icon}
                {t.label}
                <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${active ? "bg-[--color-primary]/10 text-[--color-primary-deep]" : "bg-[--color-surface-strong] text-[--color-muted]"}`}>{t.count}</span>
                {active && <span className="absolute left-2 right-2 -bottom-px h-0.5 rounded-full bg-[--color-ink]" />}
              </button>
            );
          })}
        </div>
      </div>

      {view === "payments" && <>

      <div className="mb-3 -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max pb-1">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition ${
                filter === f.id
                  ? "bg-[var(--color-ink)] text-white"
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
          <Btn size="sm" variant="secondary" icon={<Filter size={13} />} className="hidden! sm:inline-flex!">Filters</Btn>
          <Btn size="sm" variant="secondary" icon={<Link2 size={13} />} className="hidden! md:inline-flex!">Payment Link</Btn>
          <Btn size="sm" variant="secondary" icon={<FileText size={13} />} className="hidden! lg:inline-flex!">Invoice</Btn>
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
      </>}

      {view === "invoices" && <InvoicesView query={query} setQuery={setQuery} />}
      {view === "deposits" && <DepositsView query={query} setQuery={setQuery} />}
      {view === "partial"  && <PartialsView query={query} setQuery={setQuery} />}
      {view === "recurring" && <RecurringView query={query} setQuery={setQuery} />}

      {selected && <DetailsDrawer row={selected} onClose={() => setSelected(null)} />}

      {selected && <DetailsDrawer row={selected} onClose={() => setSelected(null)} />}
      {quickOpen && (
        <QuickActionModal
          mode={quickOpen}
          onClose={() => setQuickOpen(null)}
          onCreate={handleCreate}
          nextIndex={allRows.length}
        />
      )}

    </div>
  );
}

/* ─────────────── Quick Action Modal (New Payment / Send Invoice) ─────────────── */

function QuickActionModal({ mode, onClose, onCreate, nextIndex }: {
  mode: "payment" | "invoice";
  onClose: () => void;
  onCreate: (row: Row) => void;
  nextIndex: number;
}) {
  const [tab, setTab] = useState<"payment" | "invoice">(mode);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState<Method>("card");
  const [dueDate, setDueDate] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  const invoiceNo = `INV-2026-${String(1000 + nextIndex + 1).padStart(4, "0")}`;
  const canSubmit = contact.trim().length > 0 && Number(amount) > 0 &&
    (tab === "payment" || email.trim().includes("@"));

  function submit() {
    if (!canSubmit) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const row: Row = {
      id: `pay_${Math.random().toString(36).slice(2, 9)}`,
      contact: contact.trim(),
      invoice: invoiceNo,
      amount: Number(amount),
      description: description.trim() || (tab === "invoice" ? "Invoice" : "Payment"),
      status: tab === "invoice" ? "Pending" : "Paid",
      method,
      date: dateStr,
      technician: "You",
      gateway: method === "cash" || method === "check" ? "Manual" : method === "paypal" ? "PayPal" : "Stripe",
      txn: `txn_${Math.random().toString(36).slice(2, 10)}`,
    };
    onCreate(row);
  }

  const methods: { id: Method; label: string; icon: React.ReactNode }[] = [
    { id: "card",   label: "Card",       icon: <CreditCard size={14} /> },
    { id: "ach",    label: "ACH",        icon: <Building2 size={14} /> },
    { id: "bank",   label: "Bank",       icon: <Building2 size={14} /> },
    { id: "apple",  label: "Apple Pay",  icon: <Wallet size={14} /> },
    { id: "google", label: "Google Pay", icon: <Wallet size={14} /> },
    { id: "paypal", label: "PayPal",     icon: <Wallet size={14} /> },
    { id: "cash",   label: "Cash",       icon: <Banknote size={14} /> },
    { id: "check",  label: "Check",      icon: <FileText size={14} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl border border-[--color-hairline] max-h-[92vh] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[--color-hairline]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-9 h-9 rounded-xl grid place-items-center text-white bg-gradient-to-br ${tab === "invoice" ? "from-violet-500 to-fuchsia-500" : "from-emerald-500 to-teal-500"}`}>
              {tab === "invoice" ? <Send size={16} /> : <DollarSign size={16} />}
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink]">
                {tab === "invoice" ? "Send Invoice" : "Record Payment"}
              </div>
              <div className="text-[11.5px] text-[--color-muted] truncate">
                {tab === "invoice" ? "Email a payable invoice to a customer" : "Log a payment received from a customer"}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-5 pt-3">
          <div className="inline-flex p-0.5 rounded-lg bg-[--color-surface-strong] w-full sm:w-auto">
            {(["payment","invoice"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-[12px] font-semibold rounded-md transition ${
                  tab === t ? "bg-white text-[--color-ink] shadow-sm" : "text-[--color-muted]"
                }`}
              >
                {t === "payment" ? "Record Payment" : "Send Invoice"}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <Field label="Customer / Lead" required>
            <input
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="e.g. Acme Roofing Co."
              className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
            />
          </Field>

          {tab === "invoice" && (
            <Field label="Customer Email" required>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="billing@customer.com"
                className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
              />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount (USD)" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[--color-muted]">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full h-10 pl-6 pr-3 rounded-lg border border-[--color-hairline] bg-white text-[13.5px] tabular-nums focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
                />
              </div>
            </Field>
            <Field label={tab === "invoice" ? "Due Date" : "Payment Date"}>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
              />
            </Field>
          </div>

          <Field label="Description">
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={tab === "invoice" ? "e.g. Roof inspection — 2 hrs" : "e.g. Deposit for job #123"}
              className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
            />
          </Field>

          <Field label={tab === "invoice" ? "Accepted Payment Method" : "Payment Method"}>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-1.5">
              {methods.map(m => {
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-[11px] font-semibold transition ${
                      active
                        ? "border-[--color-primary] bg-[--color-primary]/5 text-[--color-primary-deep]"
                        : "border-[--color-hairline] bg-white text-[--color-body] hover:bg-[--color-surface-strong]"
                    }`}
                  >
                    {m.icon}
                    {m.label}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Invoice preview */}
          <div className="rounded-xl bg-[--color-surface-strong] p-3">
            <div className="flex items-center justify-between text-[11px] text-[--color-muted] uppercase tracking-widest font-semibold">
              <span>{tab === "invoice" ? "Invoice #" : "Reference"}</span>
              <span className="tabular-nums text-[--color-ink]">{invoiceNo}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-[12px] text-[--color-muted]">Total</span>
              <span className="text-[20px] font-semibold tabular-nums text-[--color-ink]">
                ${Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {tab === "invoice" && (
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={e => setSendEmail(e.target.checked)}
                className="mt-0.5 rounded"
              />
              <span className="text-[12px] text-[--color-body]">
                Email invoice to customer immediately with a secure pay link
                <span className="block text-[11px] text-[--color-muted]">Uncheck to save as draft</span>
              </span>
            </label>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-5 border-t border-[--color-hairline] flex flex-col-reverse sm:flex-row sm:items-center gap-2">
          <Btn variant="ghost" size="md" onClick={onClose} className="w-full sm:w-auto justify-center">Cancel</Btn>
          <div className="sm:ml-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {tab === "invoice" && (
              <Btn variant="secondary" size="md" icon={<Copy size={13} />} onClick={submit} className="w-full sm:w-auto justify-center">
                Save as Draft
              </Btn>
            )}
            <Btn
              variant="gradient"
              size="md"
              icon={tab === "invoice" ? <Send size={13} /> : <CheckCircle size={13} />}
              onClick={submit}
              className="w-full sm:w-auto justify-center"
            >
              {tab === "invoice" ? (sendEmail ? "Send Invoice" : "Save Draft") : "Record Payment"}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-[--color-muted] uppercase tracking-widest mb-1.5">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </div>
      {children}
    </label>
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

/* ─────────────── Invoices / Deposits / Partial data ─────────────── */

type InvoiceStatus = "Paid" | "Sent" | "Overdue" | "Draft";
interface Invoice {
  id: string; number: string; customer: string; issued: string; due: string;
  amount: number; status: InvoiceStatus; items: number;
}
const INVOICES: Invoice[] = [
  { id: "i1", number: "INV-2026-1042", customer: "John Smith",    issued: "Jul 1",  due: "Jul 15", amount: 450,  status: "Paid",    items: 3 },
  { id: "i2", number: "INV-2026-1043", customer: "Sarah Kim",     issued: "Jul 2",  due: "Jul 16", amount: 289,  status: "Sent",    items: 2 },
  { id: "i3", number: "INV-2026-1044", customer: "Mike Johnson",  issued: "Jun 30", due: "Jul 14", amount: 1200, status: "Paid",    items: 5 },
  { id: "i4", number: "INV-2026-1045", customer: "Jane Doe",      issued: "Jul 2",  due: "Jul 05", amount: 175,  status: "Overdue", items: 1 },
  { id: "i5", number: "INV-2026-1046", customer: "James Rivera",  issued: "Jun 29", due: "Jul 13", amount: 620,  status: "Paid",    items: 2 },
  { id: "i6", number: "INV-2026-1047", customer: "Priya Reddy",   issued: "Jun 15", due: "Jun 29", amount: 2100, status: "Overdue", items: 4 },
  { id: "i7", number: "INV-2026-1048", customer: "Alicia Weber",  issued: "Jul 3",  due: "Jul 17", amount: 320,  status: "Draft",   items: 2 },
];

type DepositStatus = "Held" | "Applied" | "Refunded";
interface Deposit {
  id: string; customer: string; job: string; amount: number; total: number;
  received: string; status: DepositStatus; method: Method;
}
const DEPOSITS: Deposit[] = [
  { id: "d1", customer: "Mike Johnson",  job: "HVAC Install",         amount: 400,  total: 1200, received: "Jun 28", status: "Applied",  method: "card" },
  { id: "d2", customer: "Priya Reddy",   job: "Water Heater Install", amount: 700,  total: 2100, received: "Jun 14", status: "Applied",  method: "ach"  },
  { id: "d3", customer: "Ana Delgado",   job: "Roof Repair",          amount: 500,  total: 1800, received: "Jul 5",  status: "Held",     method: "card" },
  { id: "d4", customer: "Owen Park",     job: "Kitchen Remodel",      amount: 1500, total: 6200, received: "Jul 8",  status: "Held",     method: "bank" },
  { id: "d5", customer: "Nora Patel",    job: "Deck Build",           amount: 900,  total: 3400, received: "Jul 6",  status: "Refunded", method: "card" },
];

interface Partial {
  id: string; customer: string; invoice: string; total: number; paid: number;
  next: string; installments: number; done: number;
}
const PARTIALS: Partial[] = [
  { id: "pp1", customer: "Owen Park",    invoice: "INV-2026-1051", total: 6200, paid: 2400, next: "Jul 20", installments: 4, done: 2 },
  { id: "pp2", customer: "Ana Delgado",  invoice: "INV-2026-1053", total: 1800, paid: 500,  next: "Jul 18", installments: 3, done: 1 },
  { id: "pp3", customer: "Nora Patel",   invoice: "INV-2026-1054", total: 3400, paid: 1700, next: "Jul 25", installments: 4, done: 2 },
  { id: "pp4", customer: "Luis Ortega",  invoice: "INV-2026-1058", total: 950,  paid: 300,  next: "Jul 22", installments: 3, done: 1 },
];

/* ─────────────── Shared toolbar ─────────────── */

function ViewToolbar({
  query, setQuery, placeholder, primary,
}: { query: string; setQuery: (v: string) => void; placeholder: string; primary: { label: string; icon: React.ReactNode } }) {
  return (
    <Card padded={false} className="mb-3">
      <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5">
        <div className="flex-1 relative min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-9 pl-9 pr-3 text-[13px] rounded-lg bg-[--color-surface-strong] border border-transparent focus:border-[--color-primary] focus:bg-white outline-none transition"
          />
        </div>
        <Btn size="sm" variant="secondary" icon={<Filter size={13} />} className="hidden! sm:inline-flex!">Filters</Btn>
        <Btn size="sm" variant="secondary" icon={<Download size={13} />} className="hidden! md:inline-flex!">Export</Btn>
        <button className="sm:hidden w-9 h-9 shrink-0 grid place-items-center rounded-lg bg-white border border-[--color-hairline] text-[--color-body]" aria-label="Filters">
          <Filter size={14} />
        </button>
        <Btn size="sm" variant="gradient" icon={primary.icon} className="shrink-0">
          <span className="hidden xs:inline sm:inline">{primary.label}</span>
          <span className="xs:hidden sm:hidden">{primary.label.split(" ")[0]}</span>
        </Btn>
      </div>
    </Card>
  );
}

/* ─────────────── View: Invoices ─────────────── */

function InvoicesView({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const tone: Record<InvoiceStatus, "success" | "info" | "danger" | "neutral"> = {
    Paid: "success", Sent: "info", Overdue: "danger", Draft: "neutral",
  };
  const rows = INVOICES.filter(i =>
    !query || `${i.customer} ${i.number}`.toLowerCase().includes(query.toLowerCase())
  );

  const stats = {
    outstanding: INVOICES.filter(i => i.status !== "Paid" && i.status !== "Draft").reduce((a, i) => a + i.amount, 0),
    overdue:     INVOICES.filter(i => i.status === "Overdue").reduce((a, i) => a + i.amount, 0),
    paid:        INVOICES.filter(i => i.status === "Paid").reduce((a, i) => a + i.amount, 0),
    drafts:      INVOICES.filter(i => i.status === "Draft").length,
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <MiniCard label="Outstanding" value={`$${stats.outstanding.toLocaleString()}`} tone="warning" />
        <MiniCard label="Overdue"     value={`$${stats.overdue.toLocaleString()}`}     tone="danger" />
        <MiniCard label="Paid (30d)"  value={`$${stats.paid.toLocaleString()}`}        tone="success" />
        <MiniCard label="Drafts"      value={String(stats.drafts)}                     tone="neutral" />
      </div>

      <ViewToolbar query={query} setQuery={setQuery} placeholder="Search invoices…" primary={{ label: "New Invoice", icon: <Plus size={14} /> }} />

      <Card padded={false} className="overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--color-hairline] bg-[--color-surface-strong]/40">
                {["Status","Invoice","Customer","Issued","Due","Items","Amount",""].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[10.5px] uppercase tracking-widest font-semibold text-[--color-muted] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(i => (
                <tr key={i.id} className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-surface-strong]/40 cursor-pointer transition">
                  <td className="px-3 py-3"><Tag tone={tone[i.status]}>{i.status}</Tag></td>
                  <td className="px-3 py-3 font-mono text-[12px] text-[--color-body] whitespace-nowrap">{i.number}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar name={i.customer} size={28} />
                      <span className="font-semibold text-[--color-ink] truncate">{i.customer}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[--color-muted] whitespace-nowrap">{i.issued}</td>
                  <td className={`px-3 py-3 whitespace-nowrap ${i.status === "Overdue" ? "text-rose-600 font-semibold" : "text-[--color-muted]"}`}>{i.due}</td>
                  <td className="px-3 py-3 text-[--color-body] tabular-nums">{i.items}</td>
                  <td className="px-3 py-3 font-semibold text-[--color-ink] tabular-nums whitespace-nowrap">${i.amount.toLocaleString()}</td>
                  <td className="px-2 py-3 text-right pr-4">
                    <div className="flex justify-end gap-1">
                      <IconBtn2 icon={<Send size={13} />} />
                      <IconBtn2 icon={<Download size={13} />} />
                      <IconBtn2 icon={<MoreHorizontal size={13} />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-[--color-hairline]">
          {rows.map(i => (
            <div key={i.id} className="p-3">
              <div className="flex items-start gap-2.5">
                <Avatar name={i.customer} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-[13px] text-[--color-ink] truncate">{i.customer}</div>
                      <div className="text-[11px] text-[--color-muted] truncate">{i.number} · {i.items} items</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-[13.5px] text-[--color-ink] tabular-nums">${i.amount.toLocaleString()}</div>
                      <div className={`text-[10.5px] ${i.status === "Overdue" ? "text-rose-600 font-semibold" : "text-[--color-muted]"}`}>Due {i.due}</div>
                    </div>
                  </div>
                  <div className="mt-1.5"><Tag tone={tone[i.status]}>{i.status}</Tag></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────── View: Deposits ─────────────── */

function DepositsView({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const tone: Record<DepositStatus, "warning" | "success" | "info"> = {
    Held: "warning", Applied: "success", Refunded: "info",
  };
  const rows = DEPOSITS.filter(d =>
    !query || `${d.customer} ${d.job}`.toLowerCase().includes(query.toLowerCase())
  );

  const held = DEPOSITS.filter(d => d.status === "Held").reduce((a, d) => a + d.amount, 0);
  const applied = DEPOSITS.filter(d => d.status === "Applied").reduce((a, d) => a + d.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <MiniCard label="Currently Held" value={`$${held.toLocaleString()}`}    tone="warning" />
        <MiniCard label="Applied (30d)"  value={`$${applied.toLocaleString()}`} tone="success" />
        <MiniCard label="Avg Deposit"    value="$800"                            tone="primary" />
        <MiniCard label="Deposit Rate"   value="42%"                             tone="neutral" />
      </div>

      <ViewToolbar query={query} setQuery={setQuery} placeholder="Search deposits by customer or job…" primary={{ label: "Collect Deposit", icon: <Plus size={14} /> }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rows.map(d => {
          const pct = Math.round((d.amount / d.total) * 100);
          return (
            <Card key={d.id} className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar name={d.customer} size={36} />
                  <div className="min-w-0">
                    <div className="font-semibold text-[13.5px] text-[--color-ink] truncate">{d.customer}</div>
                    <div className="text-[11.5px] text-[--color-muted] truncate">{d.job}</div>
                  </div>
                </div>
                <Tag tone={tone[d.status]}>{d.status}</Tag>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[20px] font-semibold tabular-nums text-[--color-ink]">${d.amount.toLocaleString()}</span>
                <span className="text-[11.5px] text-[--color-muted]">of ${d.total.toLocaleString()}</span>
              </div>
              <div className="h-1.5 mt-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[--color-primary] to-[--color-primary-deep]" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px] text-[--color-muted]">
                <span>{pct}% of job total</span>
                <span>Received {d.received}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[--color-hairline]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${METHOD_META[d.method].tint}`}>
                  {METHOD_META[d.method].icon}
                  {METHOD_META[d.method].label.split(" ")[0]}
                </span>
                <div className="ml-auto flex gap-1">
                  <Btn size="sm" variant="ghost">Apply</Btn>
                  <Btn size="sm" variant="ghost">Refund</Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── View: Partial Payments ─────────────── */

function PartialsView({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const rows = PARTIALS.filter(p =>
    !query || `${p.customer} ${p.invoice}`.toLowerCase().includes(query.toLowerCase())
  );

  const scheduled = PARTIALS.reduce((a, p) => a + (p.total - p.paid), 0);
  const collected = PARTIALS.reduce((a, p) => a + p.paid, 0);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <MiniCard label="Balance Remaining" value={`$${scheduled.toLocaleString()}`} tone="warning" />
        <MiniCard label="Collected"         value={`$${collected.toLocaleString()}`} tone="success" />
        <MiniCard label="Active Plans"      value={String(PARTIALS.length)}          tone="primary" />
        <MiniCard label="On-time Rate"      value="96%"                              tone="success" />
      </div>

      <ViewToolbar query={query} setQuery={setQuery} placeholder="Search installment plans…" primary={{ label: "New Plan", icon: <Plus size={14} /> }} />

      <div className="space-y-3">
        {rows.map(p => {
          const pct = Math.round((p.paid / p.total) * 100);
          const remaining = p.total - p.paid;
          return (
            <Card key={p.id} className="!p-4 sm:!p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={p.customer} size={40} />
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] text-[--color-ink] truncate">{p.customer}</div>
                    <div className="text-[11.5px] text-[--color-muted] truncate">{p.invoice} · {p.done}/{p.installments} installments paid</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">Next payment</div>
                  <div className="text-[13px] font-semibold text-[--color-ink]">{p.next}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-[--color-muted]">
                    <span className="text-[--color-ink] font-semibold tabular-nums">${p.paid.toLocaleString()}</span> paid of ${p.total.toLocaleString()}
                  </span>
                  <span className="text-[12px] font-semibold text-[--color-primary-deep] tabular-nums">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[--color-surface-strong] overflow-hidden flex">
                  {Array.from({ length: p.installments }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 ${idx < p.installments - 1 ? "border-r-2 border-white" : ""} ${
                        idx < p.done ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-[--color-muted] mt-1.5">
                  Balance remaining <span className="text-rose-600 font-semibold tabular-nums">${remaining.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[--color-hairline]">
                <Btn size="sm" variant="gradient" icon={<Zap size={12} />}>Charge Next</Btn>
                <Btn size="sm" variant="secondary" icon={<Send size={12} />}>Send Reminder</Btn>
                <Btn size="sm" variant="ghost" icon={<PauseCircle size={12} />}>Pause</Btn>
                <Btn size="sm" variant="ghost" icon={<MoreHorizontal size={12} />}>More</Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── Shared bits ─────────────── */

function MiniCard({ label, value, tone }: {
  label: string; value: string; tone: "success" | "warning" | "danger" | "primary" | "neutral";
}) {
  const c: Record<string, string> = {
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger:  "text-rose-600",
    primary: "text-[--color-primary-deep]",
    neutral: "text-[--color-ink]",
  };
  return (
    <div className="rounded-xl bg-white border border-[--color-hairline] p-3 sm:p-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="text-[10px] sm:text-[10.5px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
      <div className={`text-[17px] sm:text-[20px] font-semibold tabular-nums tracking-tight mt-1 ${c[tone]}`}>{value}</div>
    </div>
  );
}

function IconBtn2({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong] text-[--color-muted]">
      {icon}
    </button>
  );
}


/* ─────────────── View: Recurring / Subscriptions ─────────────── */

type RecurStatus = "Active" | "Paused" | "Canceled" | "Failed" | "Trialing";
type Cadence = "Weekly" | "Monthly" | "Quarterly" | "Yearly";

interface Recurring {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  cadence: Cadence;
  status: RecurStatus;
  nextRun: string;
  lastRun: string;
  cyclesDone: number;
  cyclesTotal: number | null; // null = open-ended
  method: Method;
  failReason?: string;
  mrr: number;
}

const RECURRING_SEED: Recurring[] = [
  { id: "sub_9021", customer: "Acme Roofing Co.",    plan: "Pro Plan · Monthly",     amount: 249,  cadence: "Monthly",   status: "Active",   nextRun: "Nov 12, 2026", lastRun: "Oct 12, 2026", cyclesDone: 14, cyclesTotal: null, method: "card",  mrr: 249 },
  { id: "sub_9022", customer: "Bloom HVAC LLC",      plan: "Maintenance Contract",   amount: 189,  cadence: "Monthly",   status: "Active",   nextRun: "Nov 04, 2026", lastRun: "Oct 04, 2026", cyclesDone: 9,  cyclesTotal: 24,   method: "ach",   mrr: 189 },
  { id: "sub_9023", customer: "Cedar Landscape",     plan: "Weekly Lawn Service",    amount: 65,   cadence: "Weekly",    status: "Paused",   nextRun: "—",             lastRun: "Sep 28, 2026", cyclesDone: 22, cyclesTotal: null, method: "card",  mrr: 0 },
  { id: "sub_9024", customer: "Delta Plumbing",      plan: "Annual Service Plan",    amount: 1200, cadence: "Yearly",    status: "Active",   nextRun: "Jan 15, 2027", lastRun: "Jan 15, 2026", cyclesDone: 2,  cyclesTotal: null, method: "bank",  mrr: 100 },
  { id: "sub_9025", customer: "Everest Cleaning",    plan: "Bi-weekly Deep Clean",   amount: 340,  cadence: "Monthly",   status: "Failed",   nextRun: "Retry Nov 08", lastRun: "Nov 01, 2026", cyclesDone: 6,  cyclesTotal: 12,   method: "card",  mrr: 340, failReason: "Card declined · insufficient funds" },
  { id: "sub_9026", customer: "Foxtail Electric",    plan: "Quarterly Inspection",   amount: 480,  cadence: "Quarterly", status: "Trialing", nextRun: "Nov 30, 2026", lastRun: "—",             cyclesDone: 0,  cyclesTotal: 8,    method: "card",  mrr: 160 },
  { id: "sub_9027", customer: "Grove Interiors",     plan: "Design Retainer",        amount: 950,  cadence: "Monthly",   status: "Canceled", nextRun: "—",             lastRun: "Aug 20, 2026", cyclesDone: 5,  cyclesTotal: null, method: "card",  mrr: 0 },
  { id: "sub_9028", customer: "Harbor Auto Detail",  plan: "Fleet Wash · Monthly",   amount: 1450, cadence: "Monthly",   status: "Active",   nextRun: "Nov 21, 2026", lastRun: "Oct 21, 2026", cyclesDone: 18, cyclesTotal: null, method: "ach",   mrr: 1450 },
];

const RECURRING: Recurring[] = RECURRING_SEED;

const RECUR_STATUS_STYLES: Record<RecurStatus, { dot: string; badge: string; label: string }> = {
  Active:   { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Active" },
  Paused:   { dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border-amber-200",       label: "Paused" },
  Canceled: { dot: "bg-slate-400",   badge: "bg-slate-100 text-slate-600 border-slate-200",      label: "Canceled" },
  Failed:   { dot: "bg-rose-500",    badge: "bg-rose-50 text-rose-700 border-rose-200",          label: "Payment failed" },
  Trialing: { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 border-violet-200",    label: "Trialing" },
};

function RecurringView({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const [items, setItems] = useState<Recurring[]>(RECURRING_SEED);
  const [statusFilter, setStatusFilter] = useState<"All" | RecurStatus>("All");

  const rows = items.filter(r => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (query && !`${r.customer} ${r.plan} ${r.id}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const mrr = items.filter(r => r.status === "Active" || r.status === "Trialing").reduce((a, r) => a + r.mrr, 0);
  const activeCount = items.filter(r => r.status === "Active").length;
  const failedCount = items.filter(r => r.status === "Failed").length;
  const pausedCount = items.filter(r => r.status === "Paused").length;

  function update(id: string, patch: {[K in keyof Recurring]?: Recurring[K]}) {
    setItems(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }

  function nextDate(cadence: Cadence): string {
    const d = new Date();
    if (cadence === "Weekly") d.setDate(d.getDate() + 7);
    else if (cadence === "Monthly") d.setMonth(d.getMonth() + 1);
    else if (cadence === "Quarterly") d.setMonth(d.getMonth() + 3);
    else d.setFullYear(d.getFullYear() + 1);
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  }

  const pause  = (r: Recurring) => update(r.id, { status: "Paused",   nextRun: "—", mrr: 0 });
  const resume = (r: Recurring) => update(r.id, { status: "Active",   nextRun: nextDate(r.cadence), mrr: r.amount / (r.cadence === "Yearly" ? 12 : r.cadence === "Quarterly" ? 3 : r.cadence === "Weekly" ? 0.25 : 1) });
  const cancel = (r: Recurring) => update(r.id, { status: "Canceled", nextRun: "—", mrr: 0 });
  const retry  = (r: Recurring) => update(r.id, { status: "Active",   nextRun: nextDate(r.cadence), failReason: undefined, mrr: r.amount / (r.cadence === "Yearly" ? 12 : r.cadence === "Quarterly" ? 3 : r.cadence === "Weekly" ? 0.25 : 1) });

  const methodIcon: Record<Method, React.ReactNode> = {
    card: <CreditCard size={12} />, ach: <Building2 size={12} />, apple: <CreditCard size={12} />,
    google: <CreditCard size={12} />, paypal: <Wallet size={12} />, cash: <Banknote size={12} />,
    check: <FileText size={12} />, bank: <Building2 size={12} />,
  };

  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        <MiniCard label="Recurring MRR"    value={`$${Math.round(mrr).toLocaleString()}`} tone="success" />
        <MiniCard label="Active"            value={String(activeCount)}                     tone="primary" />
        <MiniCard label="Paused"            value={String(pausedCount)}                     tone="warning" />
        <MiniCard label="Failed / Retry"    value={String(failedCount)}                     tone="danger" />
      </div>

      <ViewToolbar query={query} setQuery={setQuery} placeholder="Search by customer, plan, or ID…" primary={{ label: "New Subscription", icon: <Plus size={14} /> }} />

      {/* Status filter chips */}
      <div className="mb-3 -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max pb-1">
          {(["All","Active","Trialing","Paused","Failed","Canceled"] as const).map(s => {
            const active = statusFilter === s;
            const count = s === "All" ? items.length : items.filter(r => r.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition ${
                  active ? "bg-[--color-ink] text-white" : "bg-white border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"
                }`}
              >
                {s}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${active ? "bg-white/20 text-white" : "bg-[--color-surface-strong] text-[--color-muted]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {rows.map(r => {
          const s = RECUR_STATUS_STYLES[r.status];
          const pct = r.cyclesTotal ? Math.round((r.cyclesDone / r.cyclesTotal) * 100) : null;
          const canPause  = r.status === "Active" || r.status === "Trialing";
          const canResume = r.status === "Paused";
          const canRetry  = r.status === "Failed";
          const canCancel = r.status !== "Canceled";
          return (
            <Card key={r.id} className="!p-4 sm:!p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={r.customer} size={40} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-semibold text-[14px] text-[--color-ink] truncate">{r.customer}</div>
                      <span className={`inline-flex items-center gap-1 h-5 px-1.5 rounded-full border text-[10.5px] font-semibold ${s.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-[--color-muted] truncate mt-0.5">
                      {r.plan} · <span className="tabular-nums">{r.id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">Amount</div>
                  <div className="text-[16px] font-semibold text-[--color-ink] tabular-nums">
                    ${r.amount.toLocaleString()}
                    <span className="text-[11px] font-medium text-[--color-muted]"> /{r.cadence.toLowerCase().replace("ly","")}</span>
                  </div>
                </div>
              </div>

              {/* Meta grid */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <MetaCell label="Next run" value={r.nextRun} accent={r.status === "Failed" ? "danger" : r.status === "Active" || r.status === "Trialing" ? "primary" : "muted"} icon={<Clock size={11} />} />
                <MetaCell label="Last run" value={r.lastRun} icon={<CheckCircle size={11} />} />
                <MetaCell label="Cadence" value={r.cadence} icon={<Repeat size={11} />} />
                <MetaCell label="Method"  value={r.method.toUpperCase()} icon={methodIcon[r.method]} />
              </div>

              {/* Cycle progress */}
              {r.cyclesTotal && (
                <div className="mt-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11.5px] text-[--color-muted]">
                      Cycle <span className="text-[--color-ink] font-semibold tabular-nums">{r.cyclesDone}</span> of <span className="tabular-nums">{r.cyclesTotal}</span>
                    </span>
                    <span className="text-[11.5px] font-semibold text-[--color-primary-deep] tabular-nums">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )}

              {/* Failure alert */}
              {r.status === "Failed" && r.failReason && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5">
                  <AlertCircle size={14} className="text-rose-600 mt-0.5 shrink-0" />
                  <div className="text-[11.5px] text-rose-700">
                    <span className="font-semibold">Last charge failed.</span> {r.failReason}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[--color-hairline]">
                {canRetry && (
                  <Btn size="sm" variant="gradient" icon={<RefreshCcw size={12} />} onClick={() => retry(r)}>Retry Now</Btn>
                )}
                {canResume && (
                  <Btn size="sm" variant="gradient" icon={<Zap size={12} />} onClick={() => resume(r)}>Resume</Btn>
                )}
                {canPause && (
                  <Btn size="sm" variant="secondary" icon={<PauseCircle size={12} />} onClick={() => pause(r)}>Pause</Btn>
                )}
                {canCancel && (
                  <Btn size="sm" variant="ghost" icon={<X size={12} />} onClick={() => cancel(r)}>Cancel</Btn>
                )}
                <Btn size="sm" variant="ghost" icon={<Send size={12} />}>Notify Customer</Btn>
                <Btn size="sm" variant="ghost" icon={<FileText size={12} />}>View History</Btn>
                <div className="ml-auto">
                  <IconBtn2 icon={<MoreHorizontal size={14} />} />
                </div>
              </div>
            </Card>
          );
        })}

        {rows.length === 0 && (
          <Card className="!p-10 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[--color-surface-strong] grid place-items-center mb-3">
              <Repeat size={20} className="text-[--color-muted]" />
            </div>
            <div className="text-[14px] font-semibold text-[--color-ink]">No subscriptions match</div>
            <p className="text-[12px] text-[--color-muted] mt-1">Try changing the status filter or search.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function MetaCell({ label, value, icon, accent = "muted" }: {
  label: string; value: string; icon?: React.ReactNode;
  accent?: "primary" | "danger" | "muted";
}) {
  const tone =
    accent === "primary" ? "text-[--color-primary-deep]" :
    accent === "danger"  ? "text-rose-600" : "text-[--color-ink]";
  return (
    <div className="rounded-lg bg-[--color-surface-strong] px-2.5 py-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">
        {icon}{label}
      </div>
      <div className={`text-[12.5px] font-semibold mt-0.5 truncate ${tone}`}>{value}</div>
    </div>
  );
}
