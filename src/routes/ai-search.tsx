import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-search")({
  beforeLoad: () => {
    throw redirect({ to: "/app/ai-search" });
  },
});
