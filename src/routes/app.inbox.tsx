import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search, MoreVertical, Phone, Mail, MessageSquare, Facebook, Instagram,
  ArrowLeft, Info, Send, Sparkles, Paperclip, Smile, Bot, CheckCheck,
  Calendar, DollarSign, FileText, Inbox as InboxIcon, MessageCircle,
  Star, Archive, Trash2, AtSign, Zap, Filter, Command, Video, PhoneCall,
  ChevronRight, Pin, CheckCircle2, Circle, AlertTriangle, TrendingUp,
  MapPin, Clock, Users, Hash, Globe, Slack, Reply, Wand2, Languages,
  ClipboardList, Volume2, PlayCircle, ThumbsUp, Building2, Briefcase,
  ReceiptText, ChevronDown, Plus, Tag as TagIcon, Bell, Headphones,
} from "lucide-react";
import { Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { THREADS, MESSAGES, CONTACTS, type Channel } from "@/lib/rs-mocks";
import { useSwipe } from "@/hooks/useSwipe";

export const Route = createFileRoute("/app/inbox")({ component: InboxPage });

/* ────────────────────────────────────────────────────────────────────
   Design constants — premium, purple-accented, Superhuman-inspired.
   ──────────────────────────────────────────────────────────────────── */

const ACCENT = "#635BFF";
const ACCENT_SOFT = "rgba(99, 91, 255, 0.10)";
const ACCENT_GRAD = "linear-gradient(135deg,#7C6BFF 0%,#5B4EFF 100%)";

const CHANNEL_META: Record<Channel, { icon: any; label: string; color: string; bg: string }> = {
  sms:   { icon: MessageSquare, label: "SMS",       color: "#22C55E", bg: "rgba(34,197,94,0.12)"  },
  email: { icon: Mail,          label: "Email",     color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  fb:    { icon: Facebook,      label: "Messenger", color: "#1877F2", bg: "rgba(24,119,242,0.12)" },
  ig:    { icon: Instagram,     label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.12)" },
  call:  { icon: Phone,         label: "Voice",     color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
};

const AI_SUGGESTION = "You're all set, John! Our tech Mike will arrive at 2pm. He'll text when he's 15 min out.";

/* ────────────────────────────────────────────────────────────────────
   Skeletons + empty state
   ──────────────────────────────────────────────────────────────────── */

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
        <div className="w-14 h-14 rounded-2xl grid place-items-center mx-auto mb-3" style={{ background: ACCENT_SOFT }}>
          <Icon size={22} style={{ color: ACCENT }} />
        </div>
        <div className="text-[14px] font-semibold text-[--color-ink]">{title}</div>
        {hint && <div className="text-[12.5px] font-medium text-[--color-body] mt-1 leading-relaxed">{hint}</div>}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Left category rail — folders, channels, labels
   ──────────────────────────────────────────────────────────────────── */

type RailItem = { key: string; label: string; icon: any; count?: number; dot?: string };

const RAIL_FOLDERS: RailItem[] = [
  { key: "All",       label: "All Conversations", icon: InboxIcon, count: 8 },
  { key: "Unread",    label: "Unread",            icon: Circle,    count: 6 },
  { key: "Assigned",  label: "Assigned to me",    icon: AtSign,    count: 3 },
  { key: "AI",        label: "AI Handled",        icon: Sparkles,  count: 12 },
  { key: "Needs",     label: "Needs Reply",       icon: AlertTriangle, count: 4 },
  { key: "Starred",   label: "Starred",           icon: Star },
  { key: "Archived",  label: "Archived",          icon: Archive },
];

const RAIL_CHANNELS: RailItem[] = [
  { key: "call",  label: "Calls",       icon: Phone,         dot: "#8B5CF6" },
  { key: "sms",   label: "SMS",         icon: MessageSquare, dot: "#22C55E" },
  { key: "email", label: "Email",       icon: Mail,          dot: "#3B82F6" },
  { key: "chat",  label: "Live Chat",   icon: Globe,         dot: "#F59E0B" },
  { key: "wa",    label: "WhatsApp",    icon: MessageCircle, dot: "#25D366" },
  { key: "fb",    label: "Messenger",   icon: Facebook,      dot: "#1877F2" },
  { key: "ig",    label: "Instagram",   icon: Instagram,     dot: "#E1306C" },
];

const RAIL_LABELS = [
  { key: "vip",    label: "VIP",         color: "#F59E0B" },
  { key: "urgent", label: "Urgent",      color: "#EF4444" },
  { key: "lead",   label: "New Lead",    color: "#635BFF" },
  { key: "estim",  label: "Estimate",    color: "#10B981" },
];

function RailRow({
  item, active, onClick,
}: { item: RailItem; active?: boolean; onClick?: () => void }) {
  const I = item.icon;
  return (
    <button
      onClick={onClick}
      className={`relative w-full h-9 pl-3 pr-2 rounded-lg flex items-center gap-2.5 text-[13px] font-medium transition ${
        active
          ? "bg-white text-[--color-ink] shadow-[0_1px_2px_rgba(15,15,45,0.04),0_0_0_1px_var(--color-hairline)]"
          : "text-[--color-body] hover:bg-white/70 hover:text-[--color-ink]"
      }`}
    >
      {active && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
          style={{ background: ACCENT }}
          aria-hidden
        />
      )}
      {item.dot ? (
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dot }} />
      ) : (
        <I size={15} className="shrink-0" style={active ? { color: ACCENT } : undefined} />
      )}
      <span className="flex-1 truncate text-left">{item.label}</span>
      {typeof item.count === "number" && (
        <span
          className={`text-[10.5px] font-semibold px-1.5 min-w-[18px] h-[18px] grid place-items-center rounded-full ${
            active ? "text-white" : "text-[--color-body-strong] bg-[--color-surface-strong]"
          }`}
          style={active ? { background: ACCENT } : undefined}
        >
          {item.count}
        </span>
      )}
    </button>
  );
}

function LeftRail({
  activeKey, onSelect,
}: { activeKey: string; onSelect: (k: string) => void }) {
  const railBg = "linear-gradient(180deg, #FAFAFB 0%, #F5F5F8 100%)";
  return (
    <>
      {/* Compact icon rail — lg to xl */}
      <aside
        className="hidden lg:flex xl:hidden w-14 shrink-0 flex-col items-center border-r border-[--color-hairline] py-3 gap-1"
        style={{ background: railBg }}
      >
        <button
          className="w-10 h-10 rounded-xl grid place-items-center text-white hover:opacity-95 active:scale-[0.97] transition mb-1"
          style={{ background: ACCENT, boxShadow: "0 4px 14px -6px rgba(99,91,255,0.55)" }}
          title="New Conversation"
          aria-label="New Conversation"
        >
          <Plus size={16} />
        </button>
        {RAIL_FOLDERS.map(it => {
          const I = it.icon;
          const active = activeKey === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onSelect(it.key)}
              title={it.label}
              aria-label={it.label}
              className={`relative w-10 h-10 rounded-xl grid place-items-center transition ${
                active
                  ? "bg-white text-[--color-ink] shadow-[0_1px_2px_rgba(15,15,45,0.05),0_0_0_1px_var(--color-hairline)]"
                  : "text-[--color-body] hover:bg-white/70"
              }`}
            >
              <I size={16} style={active ? { color: ACCENT } : undefined} />
              {typeof it.count === "number" && it.count > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 min-w-[15px] h-[15px] px-1 rounded-full text-[9px] font-bold text-white grid place-items-center"
                  style={{ background: ACCENT }}
                >{it.count}</span>
              )}
            </button>
          );
        })}
        <div className="h-px w-6 bg-[--color-hairline] my-1.5" />
        {RAIL_CHANNELS.map(it => {
          const I = it.icon;
          const active = activeKey === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onSelect(it.key)}
              title={it.label}
              aria-label={it.label}
              className={`w-10 h-10 rounded-xl grid place-items-center transition ${
                active
                  ? "bg-white text-[--color-ink] shadow-[0_1px_2px_rgba(15,15,45,0.05),0_0_0_1px_var(--color-hairline)]"
                  : "text-[--color-body] hover:bg-white/70"
              }`}
            >
              <I size={15} style={active ? { color: ACCENT } : undefined} />
            </button>
          );
        })}
      </aside>

      {/* Full rail — xl+ */}
      <aside
        className="hidden xl:flex w-[224px] shrink-0 flex-col border-r border-[--color-hairline]"
        style={{ background: railBg }}
      >
        <div className="px-3 pt-4 pb-3">
          <button
            className="w-full h-10 rounded-xl text-[13px] font-semibold text-white flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition"
            style={{ background: ACCENT, boxShadow: "0 6px 20px -10px rgba(99,91,255,0.65)" }}
          >
            <Plus size={14} strokeWidth={2.5} /> New Conversation
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-5">
          <div>
            <div className="px-3 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[--color-muted]">Inbox</div>
            <div className="space-y-0.5">
              {RAIL_FOLDERS.map(it => (
                <RailRow key={it.key} item={it} active={activeKey === it.key} onClick={() => onSelect(it.key)} />
              ))}
            </div>
          </div>

          <div>
            <div className="px-3 pb-1.5 flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[--color-muted]">
              <span>Channels</span>
              <ChevronDown size={11} />
            </div>
            <div className="space-y-0.5">
              {RAIL_CHANNELS.map(it => (
                <RailRow key={it.key} item={it} active={activeKey === it.key} onClick={() => onSelect(it.key)} />
              ))}
            </div>
          </div>

          <div>
            <div className="px-3 pb-1.5 flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[--color-muted]">
              <span>Labels</span>
              <button className="w-4 h-4 rounded grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"><Plus size={11} /></button>
            </div>
            <div className="space-y-0.5">
              {RAIL_LABELS.map(l => (
                <button key={l.key} className="w-full h-9 px-3 rounded-lg flex items-center gap-2.5 text-[13px] font-medium text-[--color-body] hover:bg-white/70 hover:text-[--color-ink] transition">
                  <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: l.color }} />
                  <span className="flex-1 truncate text-left">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[--color-muted]">Team</div>
            <div className="space-y-0.5">
              <RailRow item={{ key: "shared", label: "Shared Inbox", icon: Users, count: 4 }} />
              <RailRow item={{ key: "notes",  label: "Internal Notes", icon: FileText }} />
              <RailRow item={{ key: "spam",   label: "Spam", icon: Trash2 }} />
            </div>
          </div>
        </nav>

        <div className="border-t border-[--color-hairline] p-3">
          <div
            className="rounded-xl p-3 text-[11.5px] leading-snug bg-white"
            style={{ boxShadow: "0 1px 2px rgba(15,15,45,0.04), 0 0 0 1px var(--color-hairline)" }}
          >
            <div className="flex items-center gap-1.5 font-semibold mb-1 text-[11px]" style={{ color: ACCENT }}>
              <Sparkles size={12} /> AI handled today
            </div>
            <div className="font-bold text-[16px] text-[--color-ink] leading-none">27</div>
            <div className="text-[11px] text-[--color-muted] mt-1">conversations · saved ~3h 42m</div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Message extras — appointment, payment, review, voicemail cards
   ──────────────────────────────────────────────────────────────────── */

function AppointmentCard() {
  return (
    <div className="mt-2 rounded-xl border border-[--color-hairline] bg-white overflow-hidden shadow-[0_1px_2px_rgba(15,15,45,0.04)]">
      <div className="h-1" style={{ background: ACCENT_GRAD }} />
      <div className="p-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0" style={{ background: ACCENT_SOFT, color: ACCENT }}>
          <Calendar size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-semibold text-[--color-ink]">AC Repair · Today 2:00 PM</div>
          <div className="text-[11.5px] text-[--color-body] flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> 123 Main St, Dallas · <Clock size={11} /> 60 min
          </div>
          <div className="mt-2 flex gap-1.5">
            <button className="h-6 px-2 rounded-md text-[11px] font-semibold text-white" style={{ background: ACCENT }}>Confirm</button>
            <button className="h-6 px-2 rounded-md text-[11px] font-semibold bg-[--color-surface-strong] text-[--color-body]">Reschedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallCard() {
  return (
    <div className="rounded-xl border border-[--color-hairline] bg-white p-3 flex items-center gap-3 shadow-[0_1px_2px_rgba(15,15,45,0.04)]">
      <div className="w-9 h-9 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(139,92,246,0.15)", color: "#8B5CF6" }}>
        <PhoneCall size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-semibold text-[--color-ink]">Voice call · 3m 24s</div>
        <div className="text-[11px] text-[--color-body]">AI transcribed · Sentiment positive</div>
      </div>
      <button className="h-7 px-2.5 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-[--color-surface-strong]">
        <PlayCircle size={12} /> Play
      </button>
    </div>
  );
}

function AiSummaryCard() {
  return (
    <div className="rounded-xl border p-3 mb-2" style={{ background: "linear-gradient(180deg,rgba(99,91,255,0.06),rgba(99,91,255,0.02))", borderColor: "rgba(99,91,255,0.25)" }}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-5 h-5 rounded-md grid place-items-center text-white" style={{ background: ACCENT_GRAD }}>
          <Sparkles size={11} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>AI Summary</span>
        <span className="ml-auto flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600">
          <ThumbsUp size={10} /> Positive
        </span>
      </div>
      <p className="text-[12.5px] text-[--color-ink] leading-snug">
        John needs same-day AC repair. Tech <b>Mike</b> booked for <b>2 PM</b>. Confirmation SMS sent — awaiting arrival.
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {["High intent", "Booked", "AC · Repair", "Est. $450"].map(t => (
          <span key={t} className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: ACCENT_SOFT, color: ACCENT }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Main page
   ──────────────────────────────────────────────────────────────────── */

const FILTERS = ["All", "Unread", "AI Handled", "Missed", "Open", "Closed"];

function InboxPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [railKey, setRailKey] = useState("All");
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

  const convoSwipe = useSwipe({
    onSwipe: (dir, meta) => {
      if (dir === "right" && meta.startX < 40) setActiveId(null);
      else if (dir === "left" && active) setShowContext(true);
    },
  });
  const contextSwipe = useSwipe({ onSwipeRight: () => setShowContext(false) });

  return (
    <div className="h-[calc(100dvh-56px-64px)] lg:h-[calc(100dvh-56px)] flex overflow-hidden bg-[--color-canvas]">
      {/* Left category rail (lg+) */}
      <LeftRail activeKey={railKey} onSelect={setRailKey} />

      {/* Thread List */}
      <div className={`w-full md:w-[300px] lg:w-[340px] shrink-0 border-r border-[--color-hairline] bg-white flex-col ${activeId ? "hidden md:flex" : "flex"}`}>
        {/* List header */}
        <div className="p-4 pb-3 border-b border-[--color-hairline]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[15px] font-bold text-[--color-ink] tracking-tight">Inbox</div>
              <div className="text-[11px] text-[--color-muted] mt-0.5">
                <span className="font-semibold" style={{ color: ACCENT }}>{filtered.filter(t => t.unread > 0).length}</span> unread ·{" "}
                <span>{filtered.length} total</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg grid place-items-center text-[--color-body] hover:bg-[--color-surface-strong]"><Filter size={14} /></button>
              <button className="w-8 h-8 rounded-lg grid place-items-center text-[--color-body] hover:bg-[--color-surface-strong]"><MoreVertical size={14} /></button>
            </div>
          </div>

          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] mb-3">
            <Search size={13} className="text-[--color-muted] shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search or ask AI…"
              className="bg-transparent flex-1 min-w-0 text-[12.5px] focus:outline-none placeholder:text-[--color-muted]" />
            <span className="hidden sm:flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[--color-hairline] text-[--color-muted] items-center gap-0.5 shrink-0">
              <Command size={9} />K
            </span>
          </div>

          {/* Mobile-only folder switcher (LeftRail is hidden below lg) */}
          <div className="lg:hidden -mx-1 mb-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-1 px-1">
              {RAIL_FOLDERS.map(it => {
                const active = railKey === it.key;
                const I = it.icon;
                return (
                  <button
                    key={it.key}
                    onClick={() => setRailKey(it.key)}
                    className={`shrink-0 h-8 px-2.5 rounded-full inline-flex items-center gap-1.5 text-[11.5px] font-semibold border transition ${
                      active ? "text-white border-transparent" : "bg-white border-[--color-hairline] text-[--color-body]"
                    }`}
                    style={active ? { background: ACCENT } : undefined}
                  >
                    <I size={12} />
                    <span>{it.label}</span>
                    {typeof it.count === "number" && (
                      <span
                        className={`text-[10px] font-bold px-1.5 rounded-full ${active ? "bg-white/25 text-white" : "bg-[--color-surface-strong] text-[--color-body-strong]"}`}
                      >{it.count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`shrink-0 h-7 px-2.5 rounded-full text-[11.5px] font-semibold border transition ${
                  filter === f ? "text-white border-transparent" : "bg-white border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"
                }`}
                style={filter === f ? { background: ACCENT } : undefined}
              >{f}</button>
            ))}
          </div>
        </div>


        {/* List */}
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
              const meta = CHANNEL_META[t.channel];
              const Icon = meta.icon;
              const isActive = activeId === t.id;
              const isPriority = c.tags?.includes("VIP") || c.tags?.includes("Hot Lead");
              const aiHandled = MESSAGES.some(m => m.threadId === t.id && m.ai);
              return (
                <button key={t.id} onClick={() => setActiveId(t.id)}
                  className={`group w-full text-left px-3 py-3 border-b border-[--color-hairline-soft] transition flex gap-3 relative ${
                    isActive ? "bg-[--color-surface-soft]" : "hover:bg-[--color-surface-soft]/60"
                  }`}>
                  {/* Active indicator bar */}
                  {isActive && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full" style={{ background: ACCENT }} />}

                  <div className="relative shrink-0">
                    <Avatar name={c.name} size={40} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full grid place-items-center ring-2 ring-white" style={{ background: meta.bg }}>
                      <Icon size={9} style={{ color: meta.color }} />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`text-[13px] truncate ${t.unread > 0 ? "font-bold text-[--color-ink]" : "font-semibold text-[--color-body-strong]"}`}>{c.name}</div>
                      {isPriority && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#F59E0B" }} title="VIP" />}
                      <div className="ml-auto text-[11px] font-medium text-[--color-muted] shrink-0 tabular-nums">{t.time}</div>
                    </div>

                    <div className={`text-[12px] truncate mt-0.5 ${t.unread > 0 ? "text-[--color-body-strong] font-medium" : "text-[--color-body]"}`}>
                      {t.preview}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: meta.bg, color: meta.color }}
                      >
                        <Icon size={9} /> {meta.label}
                      </span>
                      {aiHandled && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1"
                          style={{ background: ACCENT_SOFT, color: ACCENT }}>
                          <Sparkles size={9} /> AI
                        </span>
                      )}
                      {t.status === "Open" && t.unread > 0 && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">Needs reply</span>
                      )}
                      {t.unread > 0 && (
                        <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full text-[10px] font-bold text-white grid place-items-center" style={{ background: ACCENT }}>
                          {t.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Conversation */}
      <div
        {...(active ? convoSwipe : {})}
        className={`flex-1 min-w-0 bg-[--color-canvas] flex-col ${activeId ? "flex" : "hidden md:flex"}`}
      >
        {!active ? (
          listLoading ? (
            <div className="flex-1 grid place-items-center">
              <div className="flex items-center gap-2 text-[12.5px] font-medium text-[--color-body]">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[--color-hairline] animate-spin" style={{ borderTopColor: ACCENT }} />
                Loading conversations…
              </div>
            </div>
          ) : (
            <EmptyState
              icon={MessageCircle}
              title="Pick a conversation"
              hint="Every SMS, email, call, and DM lands in one unified inbox."
            />
          )
        ) : threadLoading ? (
          <>
            <div className="h-16 shrink-0 px-5 border-b border-[--color-hairline] bg-white flex items-center gap-3">
              <Shimmer className="w-10 h-10 !rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Shimmer className="h-3 w-40" />
                <Shimmer className="h-2.5 w-24" />
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
            {/* Conversation Header — rich, Superhuman-inspired */}
            <div className="shrink-0 bg-white border-b border-[--color-hairline]">
              <div className="h-16 px-4 sm:px-5 flex items-center gap-3">
                <button onClick={() => setActiveId(null)} className="md:hidden w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] shrink-0">
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => setShowContext(v => !v)}
                  className="flex items-center gap-3 min-w-0 flex-1 text-left rounded-lg px-1 -mx-1 py-1 hover:bg-[--color-surface-strong] transition-colors"
                  aria-label="Open customer details"
                >
                  <div className="relative shrink-0">
                    <Avatar name={contact!.name} size={40} />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className="text-[14.5px] font-bold text-[--color-ink] truncate tracking-tight">{contact!.name}</div>
                      <ChevronDown size={13} className="text-[--color-muted]" />
                      {contact!.tags?.includes("VIP") && (
                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-0.5">
                          <Star size={9} /> VIP
                        </span>
                      )}
                    </div>
                    <div className="text-[11.5px] font-medium text-[--color-body] truncate flex items-center gap-2">
                      <span>{contact!.phone}</span>
                      <span className="text-[--color-muted]">·</span>
                      <span className="hidden sm:inline">{contact!.stage}</span>
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => notify(`Calling ${contact!.name}…`)}
                    aria-label="Call customer"
                    className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] shrink-0 text-[--color-body]"
                  ><Phone size={15} /></button>
                  <button
                    onClick={() => notify(`Starting video call with ${contact!.name}…`)}
                    aria-label="Video call"
                    className="hidden sm:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] shrink-0 text-[--color-body]"
                  ><Video size={15} /></button>
                  <button
                    onClick={() => notify("Opening schedule…")}
                    aria-label="Schedule"
                    className="hidden lg:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] shrink-0 text-[--color-body]"
                  ><Calendar size={15} /></button>
                  <div className="hidden lg:block w-px h-5 bg-[--color-hairline] mx-1" />
                  <button
                    onClick={() => setShowContext(v => !v)}
                    aria-pressed={showContext}
                    aria-label="Toggle customer details"
                    className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] shrink-0 text-[--color-body]"
                    style={showContext ? { background: ACCENT_SOFT, color: ACCENT } : undefined}
                  >
                    <Info size={15} />
                  </button>
                  <button
                    onClick={() => notify("More actions coming soon")}
                    aria-label="More actions"
                    className="hidden xl:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] shrink-0 text-[--color-body]"
                  ><MoreVertical size={15} /></button>
                </div>
              </div>

              {/* Intel bar */}
              <div className="hidden lg:block px-5 pb-2.5">
                <div className="flex items-center gap-x-4 gap-y-2 text-[11px] flex-wrap">
                  <div className="flex items-center gap-x-4 gap-y-1.5 flex-wrap min-w-0">
                    {[
                      { icon: TrendingUp, label: "LTV",     value: "$4,180", color: "#10B981" },
                      { icon: Briefcase,  label: "Open jobs", value: "2",     color: ACCENT },
                      { icon: Calendar,   label: "Next appt", value: "Today 2 PM", color: "#F59E0B" },
                      { icon: ReceiptText,label: "Outstanding", value: "$0",   color: "#6B7280" },
                      { icon: Building2,  label: "Pipeline", value: "Customer", color: "#3B82F6" },
                    ].map(m => {
                      const MI = m.icon;
                      return (
                        <div key={m.label} className="flex items-center gap-1.5 shrink-0">
                          <MI size={11} style={{ color: m.color }} />
                          <span className="text-[--color-muted]">{m.label}</span>
                          <span className="font-semibold text-[--color-ink]">{m.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap w-full xl:w-auto xl:ml-auto">
                    <button onClick={() => notify("Creating job…")} className="h-7 px-2.5 rounded-md text-[11px] font-semibold bg-[--color-surface-strong] text-[--color-body-strong] hover:bg-[--color-hairline] whitespace-nowrap">Create Job</button>
                    <button onClick={() => notify("Review request queued…")} className="h-7 px-2.5 rounded-md text-[11px] font-semibold bg-[--color-surface-strong] text-[--color-body-strong] hover:bg-[--color-hairline] whitespace-nowrap">Request Review</button>
                    <button onClick={() => notify("Opening payment…")} className="h-7 px-2.5 rounded-md text-[11px] font-semibold text-white whitespace-nowrap" style={{ background: ACCENT }}>Take Payment</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
              <div className="mx-auto max-w-[820px]">
                <AiSummaryCard />

                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-[--color-hairline]" />
                  <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[--color-muted]">Today</span>
                  <div className="flex-1 h-px bg-[--color-hairline]" />
                </div>

                {messages.length === 0 ? (
                  <div className="h-40 grid place-items-center">
                    <div className="text-center max-w-xs">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[--color-hairline] grid place-items-center mx-auto mb-2">
                        <MessageCircle size={18} className="text-[--color-muted]" />
                      </div>
                      <div className="text-[13px] font-semibold text-[--color-ink]">No messages yet</div>
                      <div className="text-[12px] text-[--color-muted] mt-1">Send the first message to start this thread.</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((m, idx) => {
                      if (m.from === "note") {
                        return (
                          <div key={m.id} className="mx-auto max-w-[75%] rounded-xl p-3 border border-dashed bg-amber-50 border-amber-300 text-[12.5px] text-[--color-ink]">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1">
                              <Pin size={10} /> Internal note
                            </div>
                            {m.text}
                          </div>
                        );
                      }
                      const mine = m.from === "us";
                      const prev = messages[idx - 1];
                      const showAvatar = !mine && (!prev || prev.from !== m.from);
                      return (
                        <div key={m.id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                          {!mine && (
                            showAvatar
                              ? <Avatar name={contact!.name} size={26} />
                              : <div className="w-[26px] shrink-0" />
                          )}
                          <div className="flex flex-col max-w-[72%]" style={{ alignItems: mine ? "flex-end" : "flex-start" }}>
                            <div
                              className={`rounded-2xl px-3.5 py-2 shadow-[0_1px_2px_rgba(15,15,45,0.04)] ${
                                mine ? "text-white rounded-br-md" : "bg-white border border-[--color-hairline] rounded-bl-md text-[--color-ink]"
                              }`}
                              style={mine ? { background: ACCENT_GRAD } : undefined}
                            >
                              <div className="text-[13.5px] leading-[1.45] whitespace-pre-wrap">{m.text}</div>
                            </div>
                            <div className={`text-[10.5px] mt-1 flex items-center gap-1 ${mine ? "text-[--color-muted]" : "text-[--color-muted]"}`}>
                              {m.ai && (
                                <span className="flex items-center gap-0.5 font-semibold" style={{ color: ACCENT }}>
                                  <Sparkles size={9} /> AI ·
                                </span>
                              )}
                              <span>{m.time}</span>
                              {mine && <CheckCheck size={11} style={{ color: ACCENT }} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Rich cards inline */}
                    <div className="flex justify-start pl-[34px]">
                      <div className="w-full max-w-[72%]">
                        <AppointmentCard />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-[--color-hairline]" />
                      <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[--color-muted]">Just now</span>
                      <div className="flex-1 h-px bg-[--color-hairline]" />
                    </div>

                    <div className="flex justify-start pl-[34px]">
                      <div className="w-full max-w-[72%]">
                        <CallCard />
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex items-center gap-2 pl-1 pt-1">
                      <Avatar name={contact!.name} size={22} />
                      <div className="flex items-center gap-1 rounded-full bg-white border border-[--color-hairline] px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-muted] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-muted] animate-bounce" style={{ animationDelay: "120ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-muted] animate-bounce" style={{ animationDelay: "240ms" }} />
                      </div>
                      <span className="text-[11px] text-[--color-muted]">{contact!.name.split(" ")[0]} is typing…</span>
                    </div>
                  </div>
                )}

                {/* AI Suggested Reply */}
                {aiVisible && (
                  <div className="mt-4 rounded-2xl p-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg,rgba(99,91,255,0.09),rgba(99,91,255,0.02))", border: "1px solid rgba(99,91,255,0.28)" }}>
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: "radial-gradient(closest-side,rgba(99,91,255,0.18),transparent)" }} />
                    <div className="flex items-center gap-2 mb-2 relative">
                      <div className="w-6 h-6 rounded-lg grid place-items-center text-white" style={{ background: ACCENT_GRAD }}>
                        <Sparkles size={12} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>AI suggested reply</span>
                      <span className="ml-auto text-[10.5px] font-semibold text-[--color-muted]">RevenueSol AI · 97% confidence</span>
                    </div>
                    <div className="text-[13.5px] text-[--color-ink] leading-snug mb-3 relative">
                      "{AI_SUGGESTION}"
                    </div>
                    <div className="flex flex-wrap gap-2 relative">
                      <button
                        onClick={() => { setAiVisible(false); setDraft(""); notify("Reply sent"); }}
                        className="h-8 px-3.5 rounded-lg text-[12px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(99,91,255,0.6)] hover:opacity-95 active:scale-[0.98] transition inline-flex items-center gap-1.5"
                        style={{ background: ACCENT_GRAD }}
                      >
                        <Send size={12} /> Send
                      </button>
                      <button
                        onClick={() => { setDraft(AI_SUGGESTION); setMode("reply"); }}
                        className="h-8 px-3 rounded-lg text-[12px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong] hover:bg-[--color-surface-strong]"
                      >Edit</button>
                      <button
                        onClick={() => setAiVisible(false)}
                        className="h-8 px-3 rounded-lg text-[12px] font-semibold text-[--color-body] hover:bg-[--color-surface-strong]"
                      >Dismiss</button>
                      <div className="ml-auto flex items-center gap-1 text-[--color-body]">
                        <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-white" title="Rewrite"><Wand2 size={13} /></button>
                        <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-white" title="Translate"><Languages size={13} /></button>
                        <button className="h-8 w-8 rounded-lg grid place-items-center hover:bg-white" title="Create task"><ClipboardList size={13} /></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-[--color-hairline] bg-white px-4 sm:px-6 py-3">
              <div className="mx-auto max-w-[820px]">
                <div className="flex items-center gap-1 mb-2">
                  <button onClick={() => setMode("reply")}
                    className={`h-7 px-3 rounded-full text-[11.5px] font-semibold transition inline-flex items-center gap-1 ${
                      mode === "reply" ? "text-white" : "text-[--color-body] hover:bg-[--color-surface-strong]"
                    }`}
                    style={mode === "reply" ? { background: ACCENT } : undefined}
                  ><Reply size={11} /> Reply</button>
                  <button onClick={() => setMode("note")}
                    className={`h-7 px-3 rounded-full text-[11.5px] font-semibold transition inline-flex items-center gap-1 ${
                      mode === "note" ? "bg-amber-500 text-white" : "text-[--color-body] hover:bg-[--color-surface-strong]"
                    }`}
                  ><Pin size={11} /> Internal Note</button>
                  <div className="ml-auto text-[10.5px] text-[--color-muted] hidden sm:flex items-center gap-1">
                    <Headphones size={11} /> Sending as <span className="font-semibold text-[--color-body-strong]">SMS</span>
                    <ChevronDown size={11} />
                  </div>
                </div>
                <div
                  className={`rounded-2xl border px-3 pt-2 pb-1.5 transition ${
                    mode === "note"
                      ? "border-amber-300 bg-amber-50"
                      : "border-[--color-hairline] bg-white focus-within:border-[--color-hairline] focus-within:shadow-[0_0_0_4px_rgba(99,91,255,0.10)]"
                  }`}
                >
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder={mode === "note" ? "Add an internal note. Use @ to mention teammates." : `Message ${contact!.name.split(" ")[0]} · Press ⌘⏎ to send`}
                    className="w-full resize-none bg-transparent text-[13.5px] leading-[1.5] focus:outline-none min-h-[56px] placeholder:text-[--color-muted]"
                    rows={2}
                  />
                  <div className="flex items-center gap-1 pt-1">
                    <button
                      onClick={() => notify("Attachments coming soon")}
                      aria-label="Attach file"
                      className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]"
                    ><Paperclip size={15} /></button>
                    <button
                      onClick={() => setDraft(d => d + " 👍")}
                      aria-label="Insert emoji"
                      className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]"
                    ><Smile size={15} /></button>
                    <button
                      onClick={() => { setDraft(AI_SUGGESTION); setMode("reply"); notify("AI draft ready"); }}
                      className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg hover:bg-[--color-surface-strong] text-[11.5px] font-semibold"
                      style={{ color: ACCENT }}
                    >
                      <Sparkles size={13} /> AI Draft
                    </button>
                    <button className="hidden md:inline-flex items-center gap-1 h-8 px-2.5 rounded-lg hover:bg-[--color-surface-strong] text-[--color-body] text-[11.5px] font-semibold">
                      <Zap size={13} /> Templates
                    </button>

                    <div className="flex-1" />

                    <span className="hidden sm:inline text-[10.5px] font-mono text-[--color-muted] pr-1">⌘⏎</span>
                    <button
                      onClick={() => {
                        if (!draft.trim()) return;
                        setDraft("");
                        notify(mode === "note" ? "Note saved" : "Message sent");
                      }}
                      className="h-8 px-3.5 rounded-lg text-[12px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(99,91,255,0.55)] hover:opacity-95 active:scale-[0.98] transition inline-flex items-center gap-1.5 disabled:opacity-50"
                      style={{ background: mode === "note" ? "#F59E0B" : ACCENT_GRAD as string }}
                    >
                      Send <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Context Panel */}
      {active && showContext && (
        <>
          <div className="hidden xl:flex w-[340px] shrink-0 border-l border-[--color-hairline] bg-white flex-col overflow-y-auto">
            {contextLoading ? <PanelSkeleton /> : <ContextPanel contact={contact!} onClose={() => setShowContext(false)} onAction={notify} />}
          </div>
          <div className="xl:hidden fixed inset-0 z-50 bg-black/40 animate-in fade-in duration-150" onClick={() => setShowContext(false)}>
            <div
              {...contextSwipe}
              className="absolute right-0 top-0 bottom-0 w-[88vw] max-w-[380px] bg-white overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200"
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

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-full text-white text-[12.5px] font-medium shadow-[0_10px_40px_-10px_rgba(15,15,45,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2"
          style={{ background: "#0F0F2D" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Right-side Context Panel — richer customer intel
   ──────────────────────────────────────────────────────────────────── */

function ContextPanel({
  contact, onClose, onAction,
}: { contact: any; onClose?: () => void; onAction?: (msg: string) => void }) {
  const act = (msg: string) => onAction?.(msg);
  const timeline = [
    { i: PhoneCall,   c: "#8B5CF6", t: "Called for AC repair", d: "Today" },
    { i: DollarSign,  c: "#10B981", t: "Paid $450 invoice",     d: "Jun 28" },
    { i: Star,        c: "#F59E0B", t: "Left 5-star review",    d: "Jun 20" },
    { i: Briefcase,   c: "#3B82F6", t: "HVAC install completed", d: "Jun 15" },
  ];
  const note = "Prefers afternoon appointments. Has 2 dogs — call ahead.";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted]">Customer</div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]"><Pin size={13} /></button>
          <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong] text-[--color-body]"><Archive size={13} /></button>
          {onClose && (
            <button onClick={onClose} className="text-[11.5px] font-semibold px-2 h-7 rounded-md hover:bg-[--color-surface-strong]" style={{ color: ACCENT }}>Close</button>
          )}
        </div>
      </div>

      {/* Identity card */}
      <div className="mx-5 mt-1 rounded-2xl border border-[--color-hairline] overflow-hidden bg-white">
        <div className="h-14" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #9F7AEA 100%)` }} />
        <div className="px-4 pb-4 -mt-8">
          <div className="ring-4 ring-white rounded-full inline-block">
            <Avatar name={contact.name} size={64} />
          </div>
          <div className="text-[15px] font-bold text-[--color-ink] mt-2 tracking-tight">{contact.name}</div>
          <div className="text-[12px] font-medium text-[--color-body]">{contact.phone}</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: ACCENT_SOFT, color: ACCENT }}>{contact.stage}</span>
            {contact.tags?.map((t: string) => (
              <span key={t} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-4">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted] mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { l: "Call",   I: Phone,      msg: `Calling ${contact.name}…` },
            { l: "Book",   I: Calendar,   msg: "Opening booking…" },
            { l: "Quote",  I: FileText,   msg: "Creating quote…" },
            { l: "Charge", I: DollarSign, msg: "Starting charge…" },
          ].map(a => {
            const AI = a.I;
            return (
              <button key={a.l} onClick={() => act(a.msg)}
                className="h-9 rounded-lg border border-[--color-hairline] bg-white hover:bg-[--color-surface-strong] flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[--color-body-strong] transition"
              >
                <AI size={13} style={{ color: ACCENT }} />
                {a.l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-1.5">
        {[
          { l: "Lifetime revenue", v: "$4,180", tone: "#10B981" },
          { l: "Open jobs",        v: "2",      tone: ACCENT },
          { l: "Past jobs",        v: "6",      tone: "#3B82F6" },
          { l: "Reviews",          v: "5 ★★★★★", tone: "#F59E0B" },
        ].map(s => (
          <div key={s.l} className="rounded-xl border border-[--color-hairline] bg-white p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[--color-muted]">{s.l}</div>
            <div className="text-[14px] font-bold mt-0.5" style={{ color: s.tone }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-5 mt-5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted] mb-2">Activity</div>
        <div className="space-y-2.5">
          {timeline.map((e, i) => {
            const TI = e.i;
            return (
              <div key={i} className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-lg grid place-items-center shrink-0" style={{ background: e.c + "22", color: e.c }}>
                  <TI size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-semibold text-[--color-ink]">{e.t}</div>
                  <div className="text-[11px] font-medium text-[--color-muted]">{e.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="px-5 mt-5 pb-8">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted] mb-2 flex items-center justify-between">
          <span>Team Notes</span>
          <button className="text-[10.5px] font-semibold" style={{ color: ACCENT }}>Add</button>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[12px] font-medium text-[--color-ink] leading-relaxed">
          {note}
        </div>
      </div>
    </div>
  );
}
