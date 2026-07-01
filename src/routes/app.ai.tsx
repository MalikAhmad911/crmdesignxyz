import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader, Btn } from "@/components/app-shell/AppShell";
import { Bot, Sparkles, Radio } from "lucide-react";

export const Route = createFileRoute("/app/ai")({
  head: () => ({ meta: [{ title: "AI surfaces · Revenue Sol" }] }),
  component: AILayout,
});

const TABS = [
  { to: "/app/ai/employee", l: "AI Employee", i: Bot },
  { to: "/app/ai/brain",    l: "AI Brain",    i: Sparkles },
  { to: "/app/ai/voice",    l: "Voice AI",    i: Radio },
] as const;

function AILayout() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  return (
    <div className="p-6 md:p-8 max-w-[1440px] w-full">
      <PageHeader
        title="AI surfaces"
        subtitle="Your always-on operations team"
        actions={<Btn variant="secondary">View activity log</Btn>}
      />
      <div className="flex gap-1 border-b border-[--color-hairline] mb-6 overflow-x-auto no-scrollbar">
        {TABS.map(t => {
          const I = t.i;
          const on = pathname === t.to || pathname.startsWith(t.to + "/");
          return (
            <Link key={t.to} to={t.to}
              className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition whitespace-nowrap ${
                on ? "border-[--color-primary] text-[--color-primary-deep]" : "border-transparent text-[--color-muted] hover:text-[--color-body]"
              }`}
            >
              <I size={14} /> {t.l}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
