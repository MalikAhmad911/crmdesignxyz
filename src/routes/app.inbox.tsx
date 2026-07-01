import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import {
  Search, Filter, Phone, Sparkles, Send, Paperclip, MoreHorizontal, Star,
  ArrowLeft, Info, MessageSquare, Mail, Globe, PhoneMissed, StickyNote,
  CheckCheck, Check, Calendar, FileText, UserPlus, ChevronRight, X, Zap,
} from "lucide-react";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Inbox · Revenue Sol" }] }),
  component: InboxPage,
});

type Channel = "SMS" | "Webchat" | "Call" | "Email";
type Provider = "Twilio" | "RingCentral" | "Retell AI" | "Webchat" | "Gmail";
type Thread = {
  id: string;
  name: string;
  handle: string;
  channel: Channel;
  provider: Provider;
  preview: string;
  t: string;
  unread?: boolean;
  ai?: boolean;
  missed?: boolean;
  tag?: "Hot lead" | "VIP" | "Recurring";
  score?: number;
};

const THREADS: Thread[] = [
  { id: "1", name: "Priya Rao",     handle: "(512) 555-0111", channel: "SMS",     provider: "Twilio",       preview: "Yes, 3pm works — see you then.", t: "2m",  unread: true, tag: "Hot lead", score: 92 },
  { id: "2", name: "Reyes HVAC",    handle: "webchat #4821",  channel: "Webchat", provider: "Webchat",      preview: "New lead: AC not cooling.",      t: "8m",  ai: true, tag: "Hot lead", score: 88 },
  { id: "3", name: "Jordan Pike",   handle: "(415) 555-0142", channel: "Call",    provider: "RingCentral",  preview: "Missed call · 24s voicemail",   t: "12m", missed: true, score: 41 },
  { id: "4", name: "Maya Sørensen", handle: "maya@northlake.co", channel: "Email", provider: "Gmail",       preview: "Re: Furnace tune-up quote",       t: "1h",  ai: true, tag: "VIP", score: 76 },
  { id: "5", name: "Devon Kim",     handle: "(737) 555-0180", channel: "SMS",     provider: "Twilio",       preview: "Thanks, I'll think it over.",    t: "3h",  score: 55 },
  { id: "6", name: "Alicia Weber",  handle: "webchat #4817",  channel: "Webchat", provider: "Retell AI",    preview: "Is anyone available tonight?",   t: "5h",  unread: true, ai: true, score: 69 },
  { id: "7", name: "Marcus Bell",   handle: "(512) 555-0193", channel: "Call",    provider: "Twilio",       preview: "Call · 4m 12s · completed",     t: "1d",  tag: "Recurring", score: 84 },
];

type MsgKind = "them" | "me" | "ai" | "note";
type Msg = { id: string; kind: MsgKind; text: string; t: string; status?: "sent" | "delivered" | "read" };

const INITIAL_MSGS: Record<string, Msg[]> = {
  "1": [
    { id: "m1", kind: "them", text: "Hi — my AC stopped cooling this morning, can someone come today?", t: "1:12 PM" },
    { id: "m2", kind: "ai",   text: "Hi Priya, I have a 2pm slot open with Marcus. Should I book it?", t: "1:13 PM", status: "read" },
    { id: "m3", kind: "them", text: "Yes, 3pm would be better if possible.", t: "1:14 PM" },
    { id: "m4", kind: "note", text: "Customer prefers afternoons — flag for dispatch.", t: "1:15 PM" },
  ],
  "2": [{ id: "m1", kind: "them", text: "AC not cooling — please help.", t: "10:04 AM" }],
  "3": [{ id: "m1", kind: "them", text: "[voicemail 24s] Hi, calling about last week's estimate…", t: "9:41 AM" }],
  "4": [{ id: "m1", kind: "them", text: "Re: Furnace tune-up quote — looks reasonable, can we start next week?", t: "Yesterday" }],
  "5": [{ id: "m1", kind: "them", text: "Thanks, I'll think it over.", t: "Mon" }],
  "6": [{ id: "m1", kind: "them", text: "Is anyone available tonight?", t: "Mon" }],
  "7": [{ id: "m1", kind: "them", text: "Call summary: quarterly maintenance confirmed for Apr 12.", t: "Sun" }],
};

const CHANNEL_META: Record<Channel, { icon: typeof MessageSquare; label: string }> = {
  SMS:     { icon: MessageSquare, label: "SMS" },
  Webchat: { icon: Globe,         label: "Web" },
  Call:    { icon: Phone,         label: "Call" },
  Email:   { icon: Mail,          label: "Email" },
};

function InboxPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [filter, setFilter] = useState<"All" | "Unread" | "AI handled" | "Missed">("All");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Record<string, Msg[]>>(INITIAL_MSGS);
  const [draft, setDraft] = useState("");
  const [isNote, setIsNote] = useState(false);

  const filtered = useMemo(() => {
    return THREADS.filter(t => {
      if (filter === "Unread" && !t.unread) return false;
      if (filter === "AI handled" && !t.ai) return false;
      if (filter === "Missed" && !t.missed) return false;
      if (query && !`${t.name} ${t.handle} ${t.preview}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  const active = THREADS.find(t => t.id === selected) ?? THREADS[0];
  const activeMsgs = messages[active.id] ?? [];
  const mobileView: "list" | "convo" = selected ? "convo" : "list";

  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [activeMsgs.length, active.id]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const t = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const msg: Msg = {
      id: `m${Date.now()}`,
      kind: isNote ? "note" : "me",
      text,
      t,
      status: isNote ? undefined : "sent",
    };
    setMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] ?? []), msg] }));
    setDraft("");
    // simulate delivery ack
    if (!isNote) {
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [active.id]: (prev[active.id] ?? []).map(m => m.id === msg.id ? { ...m, status: "delivered" } : m),
        }));
      }, 700);
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [active.id]: (prev[active.id] ?? []).map(m => m.id === msg.id ? { ...m, status: "read" } : m),
        }));
      }, 1800);
    }
  };

  const approveAI = () => {
    setDraft("No problem — 3pm works. I'll send Marcus your way and text his ETA when he's on route.");
    setIsNote(false);
  };

  return (
    <div className="flex h-[calc(100dvh-56px)] min-h-0 bg-[--color-canvas]">
      {/* Thread list */}
      <div className={`${mobileView === "list" ? "flex" : "hidden"} md:flex w-full md:w-[300px] lg:w-[340px] border-r border-[--color-hairline] flex-col shrink-0 bg-[--color-surface-card]`}>
        <div className="px-4 pt-4 pb-3 border-b border-[--color-hairline]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-[--color-ink]">Inbox</h2>
            <span className="text-[11px] text-[--color-muted]">{filtered.length} of {THREADS.length}</span>
          </div>
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] border border-transparent focus-within:border-[--color-primary-subdued] focus-within:bg-white transition">
            <Search size={13} className="text-[--color-muted] shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search people, numbers, messages"
              className="flex-1 min-w-0 bg-transparent text-[12px] text-[--color-ink] placeholder:text-[--color-muted-soft] focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-[--color-muted] hover:text-[--color-ink]"><X size={12} /></button>
            )}
          </div>
          <div className="flex gap-1 mt-3 items-center">
            {(["All", "Unread", "AI handled", "Missed"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition ${
                  filter === f
                    ? "bg-[--color-ink] text-white"
                    : "bg-[--color-surface-strong] text-[--color-body] hover:bg-[--color-primary-subdued]/40"
                }`}
              >
                {f}
              </button>
            ))}
            <button className="ml-auto w-7 h-7 rounded-md grid place-items-center text-[--color-muted] hover:bg-[--color-surface-strong]">
              <Filter size={13} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-[12px] text-[--color-muted]">No conversations match.</div>
          )}
          {filtered.map(t => {
            const Icon = CHANNEL_META[t.channel].icon;
            const isActive = selected === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-[--color-hairline-soft] transition ${
                  isActive ? "bg-[--color-accent-subtle]" : "hover:bg-[--color-surface-strong]"
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar name={t.name} size={38} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white grid place-items-center ring-1 ring-[--color-hairline]">
                    <Icon size={9} className="text-[--color-body]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`text-[13px] truncate ${t.unread ? "font-semibold text-[--color-ink]" : "font-medium text-[--color-body-strong]"}`}>{t.name}</div>
                    <div className={`text-[10px] shrink-0 ${t.unread ? "text-[--color-primary] font-semibold" : "text-[--color-muted]"}`}>{t.t}</div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    {t.missed && <Tag tone="danger">Missed</Tag>}
                    {t.ai && <Tag tone="ai">AI</Tag>}
                    {t.tag && !t.missed && <Tag tone={t.tag === "Hot lead" ? "success" : "primary"}>{t.tag}</Tag>}
                  </div>
                  <div className={`text-[12px] truncate mt-1 ${t.unread ? "text-[--color-body-strong]" : "text-[--color-muted]"}`}>{t.preview}</div>
                </div>
                {t.unread && <span className="w-2 h-2 rounded-full bg-[--color-primary] mt-1.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation */}
      <div className={`${mobileView === "convo" ? "flex" : "hidden"} md:flex flex-1 flex-col min-w-0 bg-[--color-surface-card]`}>
        {/* Header */}
        <div className="h-14 border-b border-[--color-hairline] flex items-center gap-2 sm:gap-3 px-3 sm:px-5 shrink-0 bg-white">
          <button onClick={() => setSelected(null)} className="md:hidden w-8 h-8 grid place-items-center rounded-md hover:bg-[--color-surface-strong] shrink-0">
            <ArrowLeft size={16} />
          </button>
          <Avatar name={active.name} size={34} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-[14px] font-semibold text-[--color-ink] truncate">{active.name}</div>
              <ProviderBadge provider={active.provider} />
            </div>
            <div className="text-[11px] text-[--color-muted] truncate">{active.channel} · {active.handle}</div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Btn variant="secondary" size="sm" icon={<Phone size={13} />}><span className="hidden sm:inline">Call</span></Btn>
            <Btn variant="secondary" size="sm" icon={<Calendar size={13} />}><span className="hidden lg:inline">Book</span></Btn>
            <button onClick={() => setShowContext(v => !v)} className="xl:hidden w-8 h-8 grid place-items-center rounded-md hover:bg-[--color-surface-strong] text-[--color-body]">
              <Info size={15} />
            </button>
            <Btn variant="ghost" size="sm"><MoreHorizontal size={16} /></Btn>
          </div>
        </div>

        {active.missed && (
          <div className="px-5 py-2 border-b border-[--color-hairline] bg-[--color-error-subtle]/40 flex items-center gap-2 text-[12px] text-[--color-error]">
            <PhoneMissed size={13} /> Missed call · 24s voicemail transcribed below
          </div>
        )}

        {/* Messages */}
        <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[--color-surface-strong]/50">
          <div className="mx-auto max-w-3xl space-y-4">
            <DateDivider label="Today" />
            {activeMsgs.map(m => <MsgBubble key={m.id} msg={m} name={active.name} />)}

            <Card className="border-[--color-ai]/30 bg-[--color-ai-subtle]/50 shadow-none">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[--color-ai]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[--color-ai]">AI suggested reply</span>
                <span className="ml-auto text-[10px] text-[--color-muted]">Confidence 94% · calendar-aware</span>
              </div>
              <div className="text-[13px] text-[--color-body-strong] leading-relaxed">
                "No problem — 3pm works. I'll send Marcus your way and text his ETA when he's on route."
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Btn size="sm" onClick={approveAI} icon={<Zap size={12} />}>Approve & send</Btn>
                <Btn size="sm" variant="secondary" onClick={approveAI}>Edit</Btn>
                <Btn size="sm" variant="ghost">Dismiss</Btn>
              </div>
            </Card>
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-[--color-hairline] bg-white shrink-0">
          <div className="flex items-center gap-1 px-3 pt-2 text-[11px]">
            <button
              onClick={() => setIsNote(false)}
              className={`px-2.5 py-1 rounded-md font-semibold transition ${!isNote ? "bg-[--color-accent-subtle] text-[--color-primary]" : "text-[--color-muted] hover:bg-[--color-surface-strong]"}`}
            >
              Reply
            </button>
            <button
              onClick={() => setIsNote(true)}
              className={`px-2.5 py-1 rounded-md font-semibold transition inline-flex items-center gap-1 ${isNote ? "bg-[--color-warning-subtle] text-[#8b5a00]" : "text-[--color-muted] hover:bg-[--color-surface-strong]"}`}
            >
              <StickyNote size={11} /> Internal note
            </button>
            <span className="ml-auto text-[--color-muted-soft]">{active.provider} · will send from (512) 555-0100</span>
          </div>
          <div className="p-2 sm:p-3 flex items-end gap-1.5 sm:gap-2">
            <button className="w-9 h-9 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] text-[--color-muted] shrink-0">
              <Paperclip size={15} />
            </button>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1}
              placeholder={isNote ? "Add a note visible to your team only…" : "Type a message… (Enter to send)"}
              className={`flex-1 min-w-0 resize-none px-3 sm:px-4 py-2.5 rounded-lg border text-[13px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[--color-primary-subdued] max-h-[140px] ${
                isNote
                  ? "border-[--color-warning]/40 bg-[--color-warning-subtle]/30 focus:border-[--color-warning]"
                  : "border-[--color-hairline] bg-white focus:border-[--color-primary]"
              }`}
              style={{ minHeight: 40 }}
            />
            {!isNote && (
              <Btn icon={<Sparkles size={13} />} variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={approveAI}>
                AI draft
              </Btn>
            )}
            <Btn icon={<Send size={13} />} size="sm" onClick={send}>Send</Btn>
          </div>
        </div>
      </div>

      {/* Context panel */}
      <div className="w-[320px] border-l border-[--color-hairline] overflow-y-auto hidden xl:block bg-[--color-surface-card]">
        <ContextPanel active={active} />
      </div>
      {showContext && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setShowContext(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-white overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 h-12 border-b border-[--color-hairline]">
              <span className="text-[13px] font-semibold">Contact</span>
              <button onClick={() => setShowContext(false)} className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong]">
                <X size={14} />
              </button>
            </div>
            <ContextPanel active={active} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Message bubble ---------- */

function MsgBubble({ msg, name }: { msg: Msg; name: string }) {
  if (msg.kind === "note") {
    return (
      <div className="flex justify-center">
        <div className="max-w-[80%] rounded-lg border border-[--color-warning]/30 bg-[--color-warning-subtle]/60 px-3 py-2 text-[12px] text-[#7a4a00] flex items-start gap-2">
          <StickyNote size={12} className="mt-0.5 shrink-0 text-[#a56b00]" />
          <div>
            <div className="font-semibold text-[10px] uppercase tracking-widest text-[#a56b00] mb-0.5">Internal note</div>
            <div className="leading-relaxed">{msg.text}</div>
            <div className="text-[10px] text-[#a56b00]/80 mt-1">{msg.t}</div>
          </div>
        </div>
      </div>
    );
  }
  const isOutbound = msg.kind === "me" || msg.kind === "ai";
  const align = isOutbound ? "items-end" : "items-start";
  const bubble = msg.kind === "ai"
    ? "bg-[--color-ink] text-white"
    : msg.kind === "me"
    ? "bg-[--color-primary] text-white"
    : "bg-white border border-[--color-hairline] text-[--color-ink]";
  return (
    <div className={`flex flex-col gap-1 ${align}`}>
      {msg.kind === "ai" && (
        <div className="flex items-center gap-1.5">
          <Sparkles size={10} className="text-[--color-ai]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[--color-ai]">AI · sent for you</span>
        </div>
      )}
      {!isOutbound && (
        <div className="text-[10px] text-[--color-muted] pl-1">{name}</div>
      )}
      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-[0_1px_2px_rgba(10,37,64,0.04)] ${bubble}`}>
        {msg.text}
      </div>
      <div className="flex items-center gap-1 text-[10px] text-[--color-muted] pr-1">
        <span>{msg.t}</span>
        {isOutbound && msg.status && (
          <>
            <span>·</span>
            {msg.status === "read" ? (
              <CheckCheck size={11} className="text-[--color-primary]" />
            ) : msg.status === "delivered" ? (
              <CheckCheck size={11} />
            ) : (
              <Check size={11} />
            )}
            <span className="capitalize">{msg.status}</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Provider badge ---------- */

function ProviderBadge({ provider }: { provider: Provider }) {
  const map: Record<Provider, { tone: "primary" | "ai" | "warning" | "success" | "neutral"; label: string }> = {
    "Twilio":      { tone: "primary", label: "Twilio" },
    "RingCentral": { tone: "primary", label: "RingCentral" },
    "Retell AI":   { tone: "ai",      label: "Retell AI" },
    "Webchat":     { tone: "success", label: "Webchat" },
    "Gmail":       { tone: "neutral",   label: "Gmail" },
  };
  const m = map[provider];
  return <Tag tone={m.tone}>{m.label}</Tag>;
}

/* ---------- Date divider ---------- */

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-[--color-hairline]" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted]">{label}</span>
      <div className="flex-1 h-px bg-[--color-hairline]" />
    </div>
  );
}

/* ---------- Context panel ---------- */

function ContextPanel({ active }: { active: Thread }) {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-2 pb-5 border-b border-[--color-hairline]">
        <Avatar name={active.name} size={64} />
        <div className="text-[15px] font-semibold text-[--color-ink]">{active.name}</div>
        <div className="text-[11px] text-[--color-muted]">{active.handle}</div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {active.tag && <Tag tone={active.tag === "Hot lead" ? "success" : "primary"}>{active.tag}</Tag>}
          {active.score != null && <Tag tone="primary">Score {active.score}</Tag>}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 py-4 border-b border-[--color-hairline]">
        <QuickAction icon={Phone}     label="Call" />
        <QuickAction icon={Calendar}  label="Book" />
        <QuickAction icon={FileText}  label="Quote" />
        <QuickAction icon={UserPlus}  label="Assign" />
      </div>

      {/* Details */}
      <div className="pt-4 space-y-3">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted]">Details</div>
        <Field k="Source" v="Website form" />
        <Field k="Owner" v="Marcus D." />
        <Field k="Last job" v="AC service · Feb 2026" />
        <Field k="Lifetime value" v="$2,180" />
        <Field k="Next event" v="Site visit · Wed 3:00 PM" />
      </div>

      {/* Timeline */}
      <div className="mt-5 pt-4 border-t border-[--color-hairline]">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted] mb-3">Recent activity</div>
        <ul className="space-y-3">
          <TimelineItem icon={Star}  tint="warning" title="Left a 5★ review"  meta="Feb 22" />
          <TimelineItem icon={Phone} tint="primary" title="3 calls this year" meta="Twilio · avg 3m" />
          <TimelineItem icon={FileText} tint="muted" title="Invoice #INV-204 paid" meta="Feb 18 · $420" />
        </ul>
      </div>

      {/* Notes */}
      <div className="mt-5 pt-4 border-t border-[--color-hairline]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[--color-muted]">Team notes</div>
          <button className="text-[11px] font-semibold text-[--color-primary] hover:text-[--color-primary-deep] inline-flex items-center gap-0.5">
            Add <ChevronRight size={11} />
          </button>
        </div>
        <div className="text-[12px] text-[--color-body] leading-relaxed p-2.5 rounded-md bg-[--color-surface-strong]">
          Prefers afternoons. Gate code 4821. Dog is friendly.
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1.5 py-2 rounded-lg hover:bg-[--color-surface-strong] transition group">
      <div className="w-9 h-9 rounded-lg bg-[--color-accent-subtle] grid place-items-center text-[--color-primary] group-hover:bg-[--color-primary] group-hover:text-white transition">
        <Icon size={15} />
      </div>
      <span className="text-[10px] font-semibold text-[--color-body]">{label}</span>
    </button>
  );
}

function TimelineItem({ icon: Icon, tint, title, meta }: { icon: typeof Phone; tint: "primary" | "warning" | "muted"; title: string; meta: string }) {
  const tintClass =
    tint === "warning" ? "bg-[--color-warning-subtle] text-[--color-warning]"
    : tint === "primary" ? "bg-[--color-accent-subtle] text-[--color-primary]"
    : "bg-[--color-surface-strong] text-[--color-muted]";
  return (
    <li className="flex items-start gap-2.5">
      <div className={`w-6 h-6 rounded-md grid place-items-center shrink-0 ${tintClass}`}>
        <Icon size={11} />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] font-medium text-[--color-ink] truncate">{title}</div>
        <div className="text-[11px] text-[--color-muted]">{meta}</div>
      </div>
    </li>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-[12px]">
      <span className="text-[--color-muted] shrink-0">{k}</span>
      <span className="font-medium text-[--color-ink] text-right">{v}</span>
    </div>
  );
}
