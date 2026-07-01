import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Revenue Sol — Operator OS" },
      { name: "description", content: "Run your service shop from one workspace." },
    ],
  }),
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
