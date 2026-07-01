import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { Search, Filter, Phone, Sparkles, Send, Paperclip, MoreHorizontal, Star } from "lucide-react";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Inbox · Revenue Sol" }] }),
  component: InboxPage,
});

const THREADS = [
  { id: "1", name: "Priya Rao",     channel: "SMS",     preview: "Yes, 3pm works — see you then.", t: "2m", unread: true, ai: false },
  { id: "2", name: "Reyes HVAC",    channel: "Webchat", preview: "New lead: AC not cooling.", t: "8m", ai: true },
  { id: "3", name: "Jordan Pike",   channel: "Call",    preview: "Missed call · 24s voicemail", t: "12m" },
  { id: "4", name: "Maya Sørensen", channel: "Email",   preview: "Re: Furnace tune-up quote", t: "1h", ai: true },
  { id: "5", name: "Devon Kim",     channel: "SMS",     preview: "Thanks, I'll think it over.", t: "3h" },
  { id: "6", name: "Alicia Weber",  channel: "Webchat", preview: "Is anyone available tonight?", t: "5h", unread: true },
];

function InboxPage() {
  const [selected, setSelected] = useState("1");
  const active = THREADS.find(t => t.id === selected)!;
  return (
    <div className="flex h-[calc(100vh-56px)] min-h-0">
      {/* Thread list */}
      <div className="w-[360px] border-r border-[--color-hairline] flex flex-col shrink-0">
        <div className="p-4 border-b border-[--color-hairline]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold">Inbox</h2>
            <span className="text-[11px] text-[--color-muted]">{THREADS.length} conversations</span>
          </div>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-soft] text-[12px] text-[--color-muted]">
            <Search size={13} /> Search
          </div>
          <div className="flex gap-1 mt-3">
            {["All", "Unread", "AI handled"].map((f, i) => (
              <button key={f} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${i === 0 ? "bg-[--color-ink] text-white" : "bg-[--color-surface-soft] text-[--color-body]"}`}>{f}</button>
            ))}
            <button className="ml-auto w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-soft]"><Filter size={13} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {THREADS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left flex items-start gap-3 p-4 border-b border-[--color-hairline] transition ${
                selected === t.id ? "bg-[--color-surface-soft]" : "hover:bg-[--color-surface-soft]/50"
              }`}
            >
              <Avatar name={t.name} size={36} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-semibold truncate">{t.name}</div>
                  <div className="text-[10px] text-[--color-muted] shrink-0">{t.t}</div>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[--color-muted]">{t.channel}</span>
                  {t.ai && <Tag tone="primary">AI</Tag>}
                  {t.unread && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </div>
                <div className="text-[12px] text-[--color-body] truncate mt-1">{t.preview}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-[--color-hairline] flex items-center gap-3 px-6">
          <Avatar name={active.name} size={34} />
          <div className="min-w-0">
            <div className="text-[14px] font-semibold truncate">{active.name}</div>
            <div className="text-[11px] text-[--color-muted]">SMS · (512) 555-0111</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Btn variant="secondary" size="sm" icon={<Phone size={13} />}>Call</Btn>
            <Btn variant="ghost" size="sm"><MoreHorizontal size={16} /></Btn>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[--color-surface-soft]/40">
          <Msg from="them" text="Hi — my AC stopped cooling this morning, can someone come today?" t="1:12 PM" />
          <Msg from="ai" text="Hi Priya, I have a 2pm slot open with Marcus. Should I book it?" t="1:13 PM" />
          <Msg from="them" text="Yes, 3pm would be better if possible." t="1:14 PM" />

          <Card className="border-[--color-brand-lavender]/40 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[--color-ink]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest">AI suggested reply</span>
            </div>
            <div className="text-[13px] text-[--color-body] leading-relaxed">"No problem — 3pm works. I'll send Marcus your way and text his ETA when he's on route."</div>
            <div className="flex gap-2 mt-3">
              <Btn size="sm">Approve & send</Btn>
              <Btn size="sm" variant="secondary">Edit</Btn>
              <Btn size="sm" variant="ghost">Dismiss</Btn>
            </div>
          </Card>
        </div>

        <div className="border-t border-[--color-hairline] p-3 flex items-center gap-2">
          <button className="w-9 h-9 grid place-items-center rounded-lg hover:bg-[--color-surface-soft] text-[--color-muted]"><Paperclip size={15} /></button>
          <input placeholder="Type a message…" className="flex-1 h-10 px-4 rounded-lg border border-[--color-hairline] text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[--color-ink]/10" />
          <Btn icon={<Sparkles size={13} />} variant="secondary">AI draft</Btn>
          <Btn icon={<Send size={13} />}>Send</Btn>
        </div>
      </div>

      {/* Context panel */}
      <div className="w-[320px] border-l border-[--color-hairline] p-5 overflow-y-auto hidden xl:block">
        <div className="flex flex-col items-center gap-2 pb-5 border-b border-[--color-hairline]">
          <Avatar name={active.name} size={64} />
          <div className="text-[15px] font-semibold">{active.name}</div>
          <div className="flex gap-1.5"><Tag tone="success">Hot lead</Tag><Tag tone="primary">Score 92</Tag></div>
        </div>
        <div className="pt-5 space-y-4">
          <Field k="Phone" v="(512) 555-0111" />
          <Field k="Email" v="priya@mail.com" />
          <Field k="Source" v="Website form" />
          <Field k="Last job" v="AC service · Feb 2026" />
          <Field k="Lifetime value" v="$2,180" />
        </div>
        <div className="mt-5 pt-5 border-t border-[--color-hairline]">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[--color-muted] mb-2">Recent</div>
          <div className="space-y-2 text-[12px] text-[--color-body]">
            <div className="flex items-center gap-2"><Star size={11} className="text-amber-500" /> Left 5★ review · Feb</div>
            <div className="flex items-center gap-2"><Phone size={11} /> Called 3 times this year</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Msg({ from, text, t }: { from: "me" | "them" | "ai"; text: string; t: string }) {
  const align = from === "them" ? "items-start" : "items-end";
  const bubble =
    from === "ai" ? "bg-[--color-ink] text-white" :
    from === "me" ? "bg-white border border-[--color-hairline]" :
                    "bg-white border border-[--color-hairline]";
  return (
    <div className={`flex flex-col gap-1 ${align}`}>
      {from === "ai" && <Tag tone="primary">AI reply · sent for you</Tag>}
      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${bubble}`}>{text}</div>
      <div className="text-[10px] text-[--color-muted]">{t}</div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-[--color-muted]">{k}</span>
      <span className="font-medium text-[--color-ink]">{v}</span>
    </div>
  );
}
