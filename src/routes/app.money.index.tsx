import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/money/")({
  beforeLoad: () => { throw redirect({ to: "/app/money/invoices" }); },
});
