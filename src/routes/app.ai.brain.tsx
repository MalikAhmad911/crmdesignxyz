import { createFileRoute } from "@tanstack/react-router";
import { Card, Btn, Tag } from "@/components/app-shell/AppShell";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/ai/brain")({
  head: () => ({ meta: [{ title: "AI Brain · Revenue Sol" }] }),
  component: Brain,
});

function Brain() {
  const examples = [
    "Text every unpaid invoice from last week a friendly reminder.",
    "Book Priya at 3pm and confirm by SMS.",
    "Draft review replies for anything ≥4 stars from Google this week.",
    "Follow up with all leads that haven't heard from us in 48 hours.",
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary] text-white">
            <Sparkles size={14} />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-[--color-ink]">Command center</div>
            <div className="text-[11px] text-[--color-muted]">Give AI any task in plain English</div>
          </div>
        </div>
        <div className="rounded-xl border border-[--color-hairline] bg-[--color-canvas] p-4">
          <textarea
            placeholder="Ask AI to do anything — draft, book, send, follow up…"
            className="w-full h-28 bg-transparent text-[14px] resize-none focus:outline-none placeholder:text-[--color-muted-soft] text-[--color-ink]"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-[11px] text-[--color-muted]">AI will show a plan before it acts</div>
            <Btn icon={<Send size={13} />}>Plan it</Btn>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Plan preview</div>
          <div className="rounded-xl border border-[--color-hairline] p-4 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Tag tone="warning">Approval required</Tag>
              <span className="text-[11px] text-[--color-muted]">Affects ~12 customers</span>
            </div>
            {[
              "Find invoices marked 'sent' or 'overdue' in the last 7 days",
              "Compose personalized SMS using customer name and amount",
              "Skip anyone who paid in the last 24 hours",
              "Send via Twilio at 10:00 AM local time",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-[--color-body]">
                <CheckCircle2 size={14} className="text-[--color-success] mt-0.5 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-3">
              <Btn>Approve & run</Btn>
              <Btn variant="secondary">Edit</Btn>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3 text-[--color-ink]">Try an example</div>
        <div className="space-y-2">
          {examples.map(e => (
            <button key={e} className="w-full text-left p-3 rounded-lg bg-[--color-canvas] border border-[--color-hairline] text-[12px] font-medium text-[--color-body] hover:bg-[--color-accent-subtle] hover:border-[--color-primary-subdued] transition">
              {e}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
