import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader, Btn } from "@/components/app-shell/AppShell";
import { Plus, Download, FileText, Receipt, CreditCard, Star } from "lucide-react";

export const Route = createFileRoute("/app/money")({
  head: () => ({ meta: [{ title: "Money · Revenue Sol" }] }),
  component: MoneyLayout,
});

const TABS = [
  { to: "/app/money/quotes",   l: "Quotes",   i: FileText,   new: "New quote" },
  { to: "/app/money/invoices", l: "Invoices", i: Receipt,    new: "New invoice" },
  { to: "/app/money/payments", l: "Payments", i: CreditCard, new: "Record payment" },
  { to: "/app/money/reviews",  l: "Reviews",  i: Star,       new: "Request review" },
] as const;

function MoneyLayout() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const active = TABS.find(t => pathname.startsWith(t.to)) ?? TABS[1];
  return (
    <div className="p-6 md:p-8 max-w-[1440px] w-full">
      <PageHeader
        title="Money"
        subtitle="Quotes, invoices, payments and reviews in one place"
        actions={
          <>
            <Btn variant="secondary" icon={<Download size={13} />}>Export</Btn>
            <Btn icon={<Plus size={14} />}>{active.new}</Btn>
          </>
        }
      />
      <div className="flex gap-1 border-b border-[--color-hairline] mb-6 overflow-x-auto no-scrollbar">
        {TABS.map(t => {
          const I = t.i;
          const on = pathname === t.to || pathname.startsWith(t.to + "/");
          return (
            <Link key={t.to} to={t.to}
              className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition whitespace-nowrap ${
                on ? "border-[--color-primary] text-[--color-primary-deep]" : "border-transparent text-[--color-muted] hover:text-[--color-body]"
              }`}>
              <I size={14} /> {t.l}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
