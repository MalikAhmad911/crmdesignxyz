import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search, Filter, MoreVertical, Phone, Mail, MessageSquare, Facebook, Instagram,
  ArrowLeft, Info, Send, Sparkles, Paperclip, Smile, Bot, Check, CheckCheck,
  Calendar, DollarSign, FileText, User, Inbox as InboxIcon, MessageCircle, UserX,
} from "lucide-react";
import { Card, PageHeader, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { THREADS, MESSAGES, CONTACTS, type Channel } from "@/lib/rs-mocks";
import { useSwipe } from "@/hooks/useSwipe";

export const Route = createFileRoute("/app/inbox")({ component: InboxPage });

function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-[--color-surface-strong] rounded ${className}`} />;
}
function ThreadSkeleton() {
  return (
    <div className="px-4 py-3 border-b border-[--color-hairline-soft] flex gap-3">
      <Shimmer className="w-10 h-10 !rounded-full shrink-0" />
      <div className="flex-1 space-y-2 pt-1 min-w-0">
        <div className="flex justify-between gap-2">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-2.5 w-10" />
        </div>
        <Shimmer className="h-2.5 w-full" />
        <Shimmer className="h-2.5 w-3/4" />
      </div>
    </div>
  );
}
function MessageSkeleton({ mine = false }: { mine?: boolean }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`} aria-label="Loading message">
      <div className="space-y-1.5 max-w-[70%] flex flex-col">
        <Shimmer className={`h-10 ${mine ? "w-48" : "w-56"} !rounded-2xl`} />
        <Shimmer className={`h-2 w-12 ${mine ? "self-end" : ""}`} />
      </div>
    </div>
  );
}
function PanelSkeleton() {
  return (
    <div className="p-5 space-y-5" aria-label="Loading customer details">
      <div className="flex items-center justify-between">
        <Shimmer className="h-3 w-20" />
        <Shimmer className="h-3 w-10" />
      </div>
      <div className="text-center pb-4 border-b border-[--color-hairline-soft] space-y-2">
        <Shimmer className="h-16 w-16 !rounded-full mx-auto" />
        <Shimmer className="h-3.5 w-32 mx-auto" />
        <Shimmer className="h-2.5 w-24 mx-auto" />
      </div>
      <div className="space-y-2">
        <Shimmer className="h-2.5 w-24" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} className="h-9 w-full" />)}
        </div>
      </div>
      <div className="space-y-2">
        <Shimmer className="h-2.5 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-2.5">
            <Shimmer className="h-7 w-7 shrink-0" />
            <div className="flex-1 space-y-1.5 pt-0.5">
              <Shimmer className="h-2.5 w-full" />
              <Shimmer className="h-2 w-16" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-[11.5px] font-medium text-[--color-body] pt-1" role="status" aria-live="polite">
        Loading customer details…
      </div>
    </div>
  );
}
function EmptyState({ icon: Icon, title, hint, action }: { icon: any; title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="flex-1 grid place-items-center p-8" role="status">
      <div className="text-center max-w-xs">

        <div className="w-14 h-14 rounded-2xl bg-[--color-surface-strong] grid place-items-center mx-auto mb-3">
          <Icon size={22} className="text-[--color-muted]" />
        </div>
        <div className="text-[14px] font-semibold text-[--color-ink]">{title}</div>
        {hint && <div className="text-[12.5px] font-medium text-[--color-body] mt-1 leading-relaxed">{hint}</div>}

        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}

const CHANNEL_ICON: Record<Channel, any> = {
  sms: MessageSquare, email: Mail, fb: Facebook, ig: Instagram, call: Phone,
};

const FILTERS = ["All", "Unread", "AI Handled", "Missed", "Open", "Closed"];

function InboxPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"reply" | "note">("reply");
  const [showContext, setShowContext] = useState(false);
  const [draft, setDraft] = useState("");
  const [aiVisible, setAiVisible] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };
  const AI_SUGGESTION = "You're all set, John! Our tech Mike will arrive at 2pm. He'll text when he's 15 min out.";

  // Simulated data-fetch states
  const [listLoading, setListLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(false);
  const [contextLoading, setContextLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setListLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    setThreadLoading(true);
    setContextLoading(true);
    const t1 = setTimeout(() => setThreadLoading(false), 600);
    const t2 = setTimeout(() => setContextLoading(false), 850);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeId]);

  const filtered = useMemo(() => {
    return THREADS.filter(t => {
      if (filter === "Unread" && t.unread === 0) return false;
      if (filter === "Open" && t.status !== "Open") return false;
      if (filter === "Closed" && t.status !== "Closed") return false;
      if (q) {
        const c = CONTACTS.find(x => x.id === t.contactId);
        return (c?.name + t.preview).toLowerCase().includes(q.toLowerCase());
      }
      return true;
    });
  }, [filter, q]);

  const active = THREADS.find(t => t.id === activeId);
  const contact = active ? CONTACTS.find(c => c.id === active.contactId) : null;
  const messages = active ? MESSAGES.filter(m => m.threadId === active.id) : [];

  // Swipe: on the conversation pane, right-from-left-edge = back to list,
  // left-anywhere = open context slide-over.
  const convoSwipe = useSwipe({
    onSwipe: (dir, meta) => {
      if (dir === "right" && meta.startX < 40) setActiveId(null);
      else if (dir === "left" && active) setShowContext(true);
    },
  });
  // Swipe: on the context slide-over, right dismisses.
  const contextSwipe = useSwipe({
    onSwipeRight: () => setShowContext(false),
  });

  return (
    <div className="h-[calc(100dvh-56px-64px)] lg:h-[calc(100dvh-56px)] flex overflow-hidden">
      {/* Thread List */}
      <div className={`w-full lg:w-[340px] shrink-0 border-r border-[--color-hairline] bg-white flex-col ${activeId ? "hidden lg:flex" : "flex"}`}>
        <div className="p-4 border-b border-[--color-hairline]">
          <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-[--color-surface-strong] mb-3">
            <Search size={14} className="text-[--color-muted]" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search conversations..."
              className="bg-transparent flex-1 text-[13px] focus:outline-none" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11.5px] font-semibold border transition ${
                  filter === f
                    ? "bg-[--color-primary] text-white border-[--color-primary]"
                    : "bg-white border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"
                }`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {listLoading ? (
            Array.from({ length: 7 }).map((_, i) => <ThreadSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={q ? Search : InboxIcon}
              title={q ? "No matches" : "Inbox zero"}
              hint={q ? `Nothing found for "${q}"` : "New conversations will appear here."}
            />
          ) : (
            filtered.map(t => {
            const c = CONTACTS.find(x => x.id === t.contactId)!;
            const Icon = CHANNEL_ICON[t.channel];
            const isActive = activeId === t.id;
            return (
              <button key={t.id} onClick={() => setActiveId(t.id)}
                className={`w-full text-left px-4 py-3 border-b border-[--color-hairline-soft] transition flex gap-3 ${
                  isActive ? "bg-[--color-primary-subdued]" : "hover:bg-[--color-surface-strong]"
                }`}>
                <div className="relative shrink-0">
                  <Avatar name={c.name} size={40} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white grid place-items-center">
                    <Icon size={9} className="text-[--color-muted]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[13px] font-semibold text-[--color-ink] truncate">{c.name}</div>
                    <div className="text-[11px] text-[--color-muted] shrink-0">{t.time}</div>
                  </div>
                  <div className="text-[12px] text-[--color-body] truncate mt-0.5">{t.preview}</div>
                </div>
                {t.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[--color-primary] text-white text-[10px] font-bold grid place-items-center shrink-0 self-center">
                    {t.unread}
                  </div>
                )}
              </button>
            );
          })
          )}
        </div>
      </div>


      {/* Conversation */}
      <div
        {...(active ? convoSwipe : {})}
        className={`flex-1 min-w-0 bg-[--color-canvas] flex-col ${activeId ? "flex" : "hidden lg:flex"}`}
      >
        {!active ? (
          listLoading ? (
            <div className="flex-1 grid place-items-center">
              <div className="flex items-center gap-2 text-[12.5px] font-medium text-[--color-body]">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[--color-hairline] border-t-[--color-primary] animate-spin" />
                Loading conversations…
              </div>
            </div>
          ) : (
            <EmptyState icon={MessageCircle} title="Select a conversation" hint="Choose a thread from the list to start replying." />
          )
        ) : threadLoading ? (
          <>
            <div className="h-14 shrink-0 px-4 border-b border-[--color-hairline] bg-white flex items-center gap-3">
              <Shimmer className="w-9 h-9 !rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Shimmer className="h-3 w-32" />
                <Shimmer className="h-2.5 w-20" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              <MessageSkeleton />
              <MessageSkeleton mine />
              <MessageSkeleton />
              <MessageSkeleton mine />
            </div>
          </>
        ) : (
          <>
            <div className="h-14 shrink-0 px-4 border-b border-[--color-hairline] bg-white flex items-center gap-3">
              <button onClick={() => setActiveId(null)} className="lg:hidden w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong]">
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setShowContext(v => !v)}
                className="flex items-center gap-3 min-w-0 flex-1 text-left rounded-lg px-1 -mx-1 py-1 hover:bg-[--color-surface-strong] transition-colors"
                aria-label="Open customer details"
              >
                <Avatar name={contact!.name} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[--color-ink] truncate">{contact!.name}</div>
                  <div className="text-[11px] font-medium text-[--color-body] truncate">{contact!.phone}</div>
                </div>
              </button>
              <button
                onClick={() => notify(`Calling ${contact!.name}…`)}
                aria-label="Call customer"
                className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong]"
              ><Phone size={16} /></button>
              <button
                onClick={() => setShowContext(v => !v)}
                aria-pressed={showContext}
                aria-label="Toggle customer details"
                className={`w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] ${showContext ? "bg-[--color-surface-strong] text-[--color-ink]" : ""}`}
              >
                <Info size={16} />
              </button>
              <button
                onClick={() => notify("More actions coming soon")}
                aria-label="More actions"
                className="hidden xl:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong]"
              ><MoreVertical size={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full grid place-items-center">
                  <div className="text-center max-w-xs">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[--color-hairline] grid place-items-center mx-auto mb-2">
                      <MessageCircle size={18} className="text-[--color-muted]" />
                    </div>
                    <div className="text-[13px] font-semibold text-[--color-ink]">No messages yet</div>
                    <div className="text-[12px] text-[--color-muted] mt-1">Send the first message to start this thread.</div>
                  </div>
                </div>
              ) : messages.map(m => {
                if (m.from === "note") return (
                  <div key={m.id} className="mx-auto max-w-[75%] rounded-lg p-3 border border-dashed bg-[--color-warning-subtle] border-[--color-warning] text-[12px] text-[--color-ink]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[--color-warning] mb-1">Internal note</div>
                    {m.text}
                  </div>
                );
                const mine = m.from === "us";
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${
                      mine ? "text-white rounded-br-md" : "bg-white border border-[--color-hairline] rounded-bl-md text-[--color-ink]"
                    }`} style={mine ? { background: "var(--color-brand-gradient)" } : undefined}>
                      <div className="text-[13px] leading-snug whitespace-pre-wrap">{m.text}</div>
                      <div className={`text-[10px] mt-1 flex items-center gap-1 ${mine ? "text-white/80 justify-end" : "text-[--color-muted]"}`}>
                        {m.ai && <Bot size={10} />} {m.time} {mine && <CheckCheck size={11} />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* AI Suggested Reply */}
              {aiVisible && (
                <div className="rounded-xl border border-[--color-ai]/30 bg-[--color-ai-subtle] p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={13} className="text-[--color-ai]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[--color-ai]">AI suggested reply</span>
                  </div>
                  <div className="text-[13px] text-[--color-ink] mb-2">
                    "{AI_SUGGESTION}"
                  </div>
                  <div className="flex gap-2">
                    <Btn size="sm" variant="gradient" onClick={() => { setAiVisible(false); setDraft(""); notify("Reply sent"); }}>Send</Btn>
                    <Btn size="sm" variant="secondary" onClick={() => { setDraft(AI_SUGGESTION); setMode("reply"); }}>Edit</Btn>
                    <Btn size="sm" variant="ghost" onClick={() => setAiVisible(false)}>Dismiss</Btn>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-[--color-hairline] bg-white p-3">
              <div className="flex gap-1.5 mb-2">
                <button onClick={() => setMode("reply")}
                  className={`h-7 px-3 rounded-full text-[11.5px] font-semibold ${
                    mode === "reply" ? "bg-[--color-primary] text-white" : "bg-[--color-surface-strong] text-[--color-body]"
                  }`}>Reply</button>
                <button onClick={() => setMode("note")}
                  className={`h-7 px-3 rounded-full text-[11.5px] font-semibold ${
                    mode === "note" ? "bg-[--color-warning] text-white" : "bg-[--color-surface-strong] text-[--color-body]"
                  }`}>Internal Note</button>
              </div>
              <div className={`rounded-xl border p-2 ${mode === "note" ? "border-[--color-warning] bg-[--color-warning-subtle]" : "border-[--color-hairline]"}`}>
                <textarea value={draft} onChange={e => setDraft(e.target.value)}
                  placeholder={mode === "note" ? "Add an internal note..." : "Type a message..."}
                  className="w-full resize-none bg-transparent text-[13px] focus:outline-none min-h-[52px]" rows={2} />
                <div className="flex items-center gap-1 mt-1">
                  <button
                    onClick={() => notify("Attachments coming soon")}
                    aria-label="Attach file"
                    className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"
                  ><Paperclip size={15} /></button>
                  <button
                    onClick={() => setDraft(d => d + " 👍")}
                    aria-label="Insert emoji"
                    className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"
                  ><Smile size={15} /></button>
                  <button
                    onClick={() => { setDraft(AI_SUGGESTION); setMode("reply"); notify("AI draft ready"); }}
                    className="hidden sm:inline-flex items-center gap-1 h-8 px-2.5 rounded-lg hover:bg-[--color-surface-strong] text-[--color-ai] text-[11.5px] font-semibold"
                  >
                    <Sparkles size={13} /> AI Draft
                  </button>
                  <div className="flex-1" />
                  <Btn
                    variant={mode === "note" ? "primary" : "gradient"}
                    icon={<Send size={13} />}
                    onClick={() => {
                      if (!draft.trim()) return;
                      setDraft("");
                      notify(mode === "note" ? "Note saved" : "Message sent");
                    }}
                  >Send</Btn>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Context Panel */}
      {active && showContext && (
        <>
          <div className={`hidden xl:flex w-[320px] shrink-0 border-l border-[--color-hairline] bg-white flex-col overflow-y-auto`}>
            {contextLoading ? <PanelSkeleton /> : <ContextPanel contact={contact!} onClose={() => setShowContext(false)} onAction={notify} />}
          </div>
          <div className="xl:hidden fixed inset-0 z-50 bg-black/40 animate-in fade-in duration-150" onClick={() => setShowContext(false)}>
              <div
                {...contextSwipe}
                className="absolute right-0 top-0 bottom-0 w-[88vw] max-w-[360px] bg-white overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Customer details"
              >
                <div className="sticky top-0 z-10 flex justify-center pt-2 pb-1 bg-white">
                  <div className="w-10 h-1 rounded-full bg-[--color-hairline]" />
                </div>
                {contextLoading
                  ? <PanelSkeleton />
                  : <ContextPanel contact={contact!} onClose={() => setShowContext(false)} onAction={notify} />}

              </div>
            </div>
        </>
      )}
    </div>
  );
}

function ContextPanel({ contact, onClose, onAction }: { contact: any; onClose?: () => void; onAction?: (msg: string) => void }) {
  const act = (msg: string) => onAction?.(msg);
  const timeline = [
    { i: "📞", t: "Called for AC repair", d: "Today" },
    { i: "💰", t: "Paid $450 invoice", d: "Jun 28" },
    { i: "⭐", t: "Left 5-star review", d: "Jun 20" },
    { i: "🔧", t: "HVAC install completed", d: "Jun 15" },
  ];
  const note = "Prefers afternoon appointments. Has 2 dogs — call ahead.";
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold text-[--color-ink]">Customer</div>
        {onClose && <button onClick={onClose} className="text-[12px] font-semibold text-[--color-primary]">Close</button>}
      </div>
      <div className="text-center pb-4 border-b border-[--color-hairline-soft]">
        <div className="mx-auto"><Avatar name={contact.name} size={64} /></div>
        <div className="text-[16px] font-semibold text-[--color-ink] mt-2">{contact.name}</div>
        <div className="text-[12px] font-medium text-[--color-body]">{contact.phone}</div>
        <div className="mt-2 flex justify-center gap-1.5 flex-wrap">
          <Tag tone="primary">{contact.stage}</Tag>
          {contact.tags?.map((t: string) => <Tag key={t} tone="ai">{t}</Tag>)}
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-body-strong] mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <Btn variant="secondary" size="sm" icon={<Phone size={12} />} onClick={() => act(`Calling ${contact.name}…`)}>Call</Btn>
          <Btn variant="secondary" size="sm" icon={<Calendar size={12} />} onClick={() => act("Opening booking…")}>Book</Btn>
          <Btn variant="secondary" size="sm" icon={<FileText size={12} />} onClick={() => act("Creating quote…")}>Quote</Btn>
          <Btn variant="secondary" size="sm" icon={<DollarSign size={12} />} onClick={() => act("Starting charge…")}>Charge</Btn>
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-body-strong] mb-2">Timeline</div>
        {timeline.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[--color-hairline] p-3 text-center">
            <div className="text-[12.5px] font-semibold text-[--color-ink]">No activity yet</div>
            <div className="text-[11.5px] font-medium text-[--color-body] mt-0.5">Calls, payments, and reviews will appear here.</div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {timeline.map((e, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg grid place-items-center bg-[--color-surface-strong] shrink-0 text-[12px]">{e.i}</div>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-medium text-[--color-ink]">{e.t}</div>
                  <div className="text-[11px] font-medium text-[--color-muted]">{e.d}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-body-strong] mb-2">Team Notes</div>
        {note ? (
          <div className="rounded-lg bg-[--color-warning-subtle] border border-[--color-warning]/30 p-2.5 text-[12px] font-medium text-[--color-ink] leading-relaxed">
            {note}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[--color-hairline] p-3 text-center">
            <div className="text-[12.5px] font-semibold text-[--color-ink]">No notes yet</div>
            <div className="text-[11.5px] font-medium text-[--color-body] mt-0.5">Add context your team can see on every reply.</div>
          </div>
        )}
      </div>
    </div>
  );
}

