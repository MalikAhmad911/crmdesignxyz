import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, MessageSquare, DollarSign, Wrench, Star } from "lucide-react";
import { Card, PageHeader, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/ai-search")({ component: AISearchPage });

const SUGGESTIONS = [
  { icon: MessageSquare, text: "Unread messages from VIP contacts" },
  { icon: DollarSign, text: "Invoices over $500 unpaid for 7+ days" },
  { icon: Wrench, text: "Jobs scheduled for this week" },
  { icon: Star, text: "Reviews without a reply" },
];

function AISearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[] | null>(null);

  const run = () => {
    if (!q.trim()) return;
    setResults([
      { type: "Contact", title: "John Smith", meta: "VIP · +1 214-555-0123", tone: "primary" as const },
      { type: "Message", title: "Is someone available for AC repair today?", meta: "SMS · 2m ago", tone: "info" as const },
      { type: "Job", title: "AC Repair · 2:00 PM", meta: "Mike T. · 123 Main St", tone: "warning" as const },
      { type: "Payment", title: "$450 · Paid", meta: "Jul 1 · AC Repair", tone: "success" as const },
    ]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[900px] mx-auto">
      <PageHeader title="AI Search" subtitle="Ask anything about your business. Powered by RevSol Brain." />

      <Card padded={false} className="mb-5">
        <div className="p-3 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient)" }}>
            <Sparkles size={16} />
          </div>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && run()}
            placeholder="Ask a question... 'How much did I make last week?'"
            className="flex-1 h-10 text-[14px] focus:outline-none" autoFocus />
          <button onClick={run} className="h-9 px-4 rounded-lg text-white text-[13px] font-semibold" style={{ background: "var(--color-brand-gradient)" }}>Search</button>
        </div>
      </Card>

      {!results && (
        <Card>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[--color-muted] mb-3">Try asking</div>
          <div className="space-y-1.5">
            {SUGGESTIONS.map(s => {
              const I = s.icon;
              return (
                <button key={s.text} onClick={() => { setQ(s.text); run(); }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[--color-surface-strong] text-left transition">
                  <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]"><I size={15} /></div>
                  <span className="text-[13px] text-[--color-ink]">{s.text}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {results && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <Card key={i} className="!p-4">
              <div className="flex items-center gap-3">
                <Tag tone={r.tone}>{r.type}</Tag>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[--color-ink] truncate">{r.title}</div>
                  <div className="text-[12px] text-[--color-muted]">{r.meta}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
