import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/ai/")({
  beforeLoad: () => { throw redirect({ to: "/app/ai/employee" }); },
});
