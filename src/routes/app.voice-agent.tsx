import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Plus, Search, Bot, Mic, Phone, PhoneCall, PhoneIncoming, PhoneOutgoing,
  PhoneOff, Play, Pause, Copy, MoreHorizontal, X, ChevronRight, ChevronLeft,
  Sparkles, Wand2, ShieldCheck, Activity, Clock, DollarSign, Users, Zap,
  Volume2, Headphones, Radio, LayoutDashboard, LayoutGrid, BookOpen, Hash,
  GitBranch, LibraryBig, Wrench, BarChart3, MessageSquare, FileAudio,
  FileText, Beaker, Brain, Puzzle, Settings, TrendingUp, TrendingDown,
  Target, Percent, ThumbsUp, Flame, Globe, Languages, User, UserRound,
  Building2, Stethoscope, Home, Scale, ShoppingBag, Wrench as WrenchIcon,
  Waves, Circle, CircleDot, Download, Upload, Filter as FilterIcon,
  ArrowUpRight, Calendar, MapPin, CreditCard, Repeat, ListChecks,
  StickyNote, ArrowRightLeft, MicOff, Square, Signal, Loader2, Eye, Timer,
} from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/voice-agent")({
  head: () => ({
    meta: [
      { title: "Voice AI Agents — RevenueSol" },
      { name: "description", content: "Create, manage and monitor unlimited AI voice employees that answer calls, book appointments and close revenue 24/7." },
    ],
  }),
  component: VoiceAgentsPage,
});

/* ─────────────── Types & Data ─────────────── */

type AgentStatus = "Live" | "Idle" | "Paused" | "Training";
type Department = "Reception" | "Sales" | "Support" | "Booking" | "Collections" | "Emergency";

interface Agent {
  id: string;
  name: string;
  avatar: string;
  department: Department;
  role: string;
  status: AgentStatus;
  voice: string;
  language: string;
  accent: string;
  phone: string;
  callsToday: number;
  successRate: number;
  lastActive: string;
  credits: number;
  bookings: number;
  revenue: number;
  personality: string;
}

const AGENTS: Agent[] = [
  { id:"a1", name:"Emma",    avatar:"E",  department:"Reception",   role:"Front-desk receptionist",     status:"Live",     voice:"Ava · Warm",       language:"English", accent:"US",       phone:"+1 214-555-0100", callsToday:128, successRate:94, lastActive:"just now",  credits:2140, bookings:47, revenue:12400, personality:"Friendly" },
  { id:"a2", name:"Marcus",  avatar:"M",  department:"Sales",       role:"Outbound sales closer",        status:"Live",     voice:"Nathan · Confident",language:"English", accent:"US",       phone:"+1 214-555-0101", callsToday:82,  successRate:38, lastActive:"2m ago",    credits:1820, bookings:14, revenue:24800, personality:"Sales Expert" },
  { id:"a3", name:"Sophia",  avatar:"S",  department:"Booking",     role:"Appointment specialist",       status:"Live",     voice:"Sophia · Bright",  language:"English", accent:"UK",       phone:"+1 214-555-0102", callsToday:64,  successRate:88, lastActive:"5m ago",    credits: 940, bookings:56, revenue:8900,  personality:"Professional" },
  { id:"a4", name:"Diego",   avatar:"D",  department:"Support",     role:"Tier-1 customer support",      status:"Idle",     voice:"Diego · Calm",     language:"Spanish", accent:"Mexico",   phone:"+1 214-555-0103", callsToday:34,  successRate:81, lastActive:"22m ago",   credits: 620, bookings:0,  revenue:0,     personality:"Support Agent" },
  { id:"a5", name:"Priya",   avatar:"P",  department:"Collections", role:"Overdue invoice collector",    status:"Live",     voice:"Priya · Assertive",language:"English", accent:"UK",       phone:"+1 214-555-0104", callsToday:41,  successRate:72, lastActive:"just now",  credits:1280, bookings:0,  revenue:6420,  personality:"Collections Agent" },
  { id:"a6", name:"Amir",    avatar:"A",  department:"Emergency",   role:"After-hours emergency triage", status:"Live",     voice:"Amir · Steady",    language:"English", accent:"US",       phone:"+1 214-555-0105", callsToday:12,  successRate:91, lastActive:"14m ago",   credits: 320, bookings:9,  revenue:0,     personality:"Professional" },
  { id:"a7", name:"Chloé",   avatar:"C",  department:"Reception",   role:"VIP concierge",                status:"Paused",   voice:"Chloé · Luxury",   language:"French",  accent:"Paris",    phone:"—",               callsToday:0,   successRate:0,  lastActive:"1d ago",    credits:   0, bookings:0,  revenue:0,     personality:"Luxury Concierge" },
  { id:"a8", name:"Kai",     avatar:"K",  department:"Sales",       role:"Estimate follow-up",           status:"Training", voice:"Kai · Playful",    language:"English", accent:"AU",       phone:"—",               callsToday:0,   successRate:0,  lastActive:"training",  credits:   0, bookings:0,  revenue:0,     personality:"Friendly" },
];

const DEPT_META: Record<Department, { icon: React.ReactNode; tint: string }> = {
  Reception:   { icon: <UserRound size={12} />,     tint: "bg-indigo-50 text-indigo-700" },
  Sales:       { icon: <TrendingUp size={12} />,    tint: "bg-emerald-50 text-emerald-700" },
  Support:     { icon: <Headphones size={12} />,    tint: "bg-sky-50 text-sky-700" },
  Booking:     { icon: <Calendar size={12} />,      tint: "bg-violet-50 text-violet-700" },
  Collections: { icon: <CreditCard size={12} />,    tint: "bg-amber-50 text-amber-700" },
  Emergency:   { icon: <Flame size={12} />,         tint: "bg-rose-50 text-rose-700" },
};

/* ─────────────── Page ─────────────── */

type View =
  | "overview" | "agents" | "live" | "history" | "transcripts" | "recordings"
  | "prompts" | "knowledge" | "numbers" | "flows" | "voices" | "tools"
  | "analytics" | "testing" | "memory" | "integrations" | "settings";

function VoiceAgentsPage() {
  const [view, setView] = useState<View>("overview");
  const [selected, setSelected] = useState<Agent | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [query, setQuery] = useState("");

  const kpis = useMemo(() => {
    const total = AGENTS.length;
    const active = AGENTS.filter(a => a.status === "Live").length;
    const callsToday = AGENTS.reduce((s, a) => s + a.callsToday, 0);
    const bookings = AGENTS.reduce((s, a) => s + a.bookings, 0);
    const revenue = AGENTS.reduce((s, a) => s + a.revenue, 0);
    const avgSuccess = Math.round(AGENTS.filter(a => a.successRate).reduce((s, a) => s + a.successRate, 0) / AGENTS.filter(a => a.successRate).length);
    return { total, active, callsToday, callsMonth: 4218, autoAnswered: 96, bookings, revenue, avgDuration: "2:14", csat: 4.8, transfers: 3.2, successRate: avgSuccess, cost: 384, credits: 12680 };
  }, []);

  const filteredAgents = useMemo(() => {
    if (!query.trim()) return AGENTS;
    const q = query.toLowerCase();
    return AGENTS.filter(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.department.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1500px] mx-auto">
      <PageHeader
        title="AI Voice Agents"
        subtitle="Command center for your team of AI employees"
        actions={
          <>
            <span className="hidden md:inline-flex"><Btn variant="secondary" size="md" icon={<Upload size={13} />}>Import Knowledge</Btn></span>
            <span className="hidden md:inline-flex"><Btn variant="secondary" size="md" icon={<LibraryBig size={13} />}>Prompt Library</Btn></span>
            <span className="hidden sm:inline-flex"><Btn variant="secondary" size="md" icon={<Beaker size={13} />} onClick={() => setCallOpen(true)}>Test Call</Btn></span>
            <Btn variant="gradient" size="md" icon={<Plus size={14} />} onClick={() => setWizardOpen(true)}>New Agent</Btn>
          </>
        }
      />


      {/* SUB NAV */}
      <div className="mb-3 sm:mb-4 border-b border-[--color-hairline] -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {([
            { id:"overview",     label:"Overview",       icon:<LayoutDashboard size={13} /> },
            { id:"agents",       label:"Voice Agents",   icon:<Bot size={13} />,           count: AGENTS.length },
            { id:"live",         label:"Live Calls",     icon:<Radio size={13} />,         count: 3 },
            { id:"history",      label:"Call History",   icon:<PhoneCall size={13} /> },
            { id:"transcripts",  label:"Transcripts",    icon:<FileText size={13} /> },
            { id:"recordings",   label:"Recordings",     icon:<FileAudio size={13} /> },
            { id:"prompts",      label:"Prompt Library", icon:<LibraryBig size={13} /> },
            { id:"knowledge",    label:"Knowledge Base", icon:<BookOpen size={13} /> },
            { id:"numbers",      label:"Phone Numbers",  icon:<Hash size={13} /> },
            { id:"flows",        label:"Call Flows",     icon:<GitBranch size={13} /> },
            { id:"voices",       label:"Voices",         icon:<Volume2 size={13} /> },
            { id:"tools",        label:"Tools",          icon:<Wrench size={13} /> },
            { id:"analytics",    label:"Analytics",      icon:<BarChart3 size={13} /> },
            { id:"testing",      label:"Testing Lab",    icon:<Beaker size={13} /> },
            { id:"memory",       label:"AI Memory",      icon:<Brain size={13} /> },
            { id:"integrations", label:"Integrations",   icon:<Puzzle size={13} /> },
            { id:"settings",     label:"Settings",       icon:<Settings size={13} /> },
          ] as { id: View; label: string; icon: React.ReactNode; count?: number }[]).map(t => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] font-semibold whitespace-nowrap transition ${
                  active ? "text-[--color-ink]" : "text-[--color-muted] hover:text-[--color-body]"
                }`}
              >
                {t.icon}
                {t.label}
                {t.count !== undefined && (
                  <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${active ? "bg-[--color-primary]/10 text-[--color-primary-deep]" : "bg-[--color-surface-strong] text-[--color-muted]"}`}>{t.count}</span>
                )}
                {active && <span className="absolute left-2 right-2 -bottom-px h-0.5 rounded-full bg-[--color-primary]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEWS */}
      {view === "overview" && <OverviewView onNewAgent={() => setWizardOpen(true)} onTest={() => setCallOpen(true)} />}
      {view === "agents"   && <AgentsView agents={filteredAgents} query={query} onQuery={setQuery} onOpen={setSelected} />}
      {view === "live"     && <LiveCallsView onOpen={() => setCallOpen(true)} />}
      {view === "history"  && <HistoryView />}
      {view === "transcripts" && <TranscriptView />}
      {view === "recordings"  && <RecordingsView />}
      {view === "prompts"   && <PromptLibraryView />}
      {view === "knowledge" && <KnowledgeView />}
      {view === "numbers"   && <NumbersView />}
      {view === "flows"     && <FlowsView />}
      {view === "voices"    && <VoicesView />}
      {view === "tools"     && <ToolsView />}
      {view === "analytics" && <AnalyticsView />}
      {view === "testing"   && <TestingLabView onCall={() => setCallOpen(true)} />}
      {view === "memory"    && <MemoryView />}
      {view === "integrations" && <IntegrationsView />}
      {view === "settings"  && <SettingsView />}

      {/* Floating AI FAB */}
      <button
        onClick={() => setCallOpen(true)}
        className="fixed bottom-20 sm:bottom-5 right-4 sm:right-5 z-40 h-12 w-12 sm:h-14 sm:w-auto sm:px-5 rounded-full text-white font-semibold text-[13px] shadow-lg flex items-center gap-2 hover:opacity-90 transition"
        style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow), 0 12px 28px -8px rgba(99,91,255,0.5)" }}
      >
        <Phone size={16} />
        <span className="hidden sm:inline">Test Call</span>
      </button>

      {selected   && <AgentDrawer a={selected} onClose={() => setSelected(null)} />}
      {wizardOpen && <CreateAgentWizard onClose={() => setWizardOpen(false)} />}
      {callOpen   && <LiveCallPanel onClose={() => setCallOpen(false)} />}
    </div>
  );
}

/* ─────────────── Utilities ─────────────── */

function kCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

/* ─────────────── KPI + Charts ─────────────── */

function Kpi({ label, value, icon, accent, delta, up, pulse }: {
  label: string; value: number | string; icon: React.ReactNode; accent: string; delta?: string; up?: boolean; pulse?: boolean;
}) {
  const num = typeof value === "number" ? value : Number(String(value).replace(/[^\d.]/g, "")) || 0;
  const animated = useCountUp(num);
  const display = typeof value === "string"
    ? value.replace(/[\d.]+/, animated < 10 ? animated.toFixed(1) : Math.round(animated).toString())
    : Math.round(animated).toLocaleString();

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-[--color-hairline] p-3 sm:p-4 transition hover:-translate-y-[1px]"
      style={{ boxShadow: "var(--shadow-card)" }}>
      <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-xl`} />
      <div className="flex items-start justify-between gap-2 relative">
        <div className="min-w-0">
          <div className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-semibold text-[--color-muted] truncate flex items-center gap-1">
            {pulse && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            {label}
          </div>
          <div className="text-[17px] sm:text-[22px] font-semibold tracking-tight mt-1 text-[--color-ink] tabular-nums truncate">{display}</div>
          {delta && (
            <div className={`text-[10.5px] font-medium mt-0.5 inline-flex items-center gap-0.5 ${up ? "text-emerald-600" : "text-[--color-muted]"}`}>
              {up ? <TrendingUp size={10} /> : <Activity size={10} />}
              <span className="truncate">{delta}</span>
            </div>
          )}
        </div>
        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg grid place-items-center text-white bg-gradient-to-br ${accent} shrink-0`}>{icon}</span>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "info" | "warning" | "success" }) {
  const tones = {
    primary: "text-[--color-primary-deep] bg-[--color-primary-subdued]",
    info: "text-sky-700 bg-sky-50",
    warning: "text-amber-700 bg-amber-50",
    success: "text-emerald-700 bg-emerald-50",
  } as const;
  return (
    <div className="bg-white rounded-xl border border-[--color-hairline] p-2.5 sm:p-3 flex items-center gap-2.5"
      style={{ boxShadow: "var(--shadow-card)" }}>
      <span className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${tones[tone]}`}>{icon}</span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted] truncate">{label}</div>
        <div className="text-[14px] sm:text-[15px] font-semibold text-[--color-ink] tabular-nums">{value}</div>
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
        <div className="text-[13px] font-semibold tabular-nums text-[--color-ink]">{value}</div>
      </div>
    </div>
  );
}

function VolumeChart() {
  const answered = [18, 26, 22, 34, 30, 44, 38, 52, 48, 60, 54, 68, 64, 78];
  const booked   = [4,  8,  6,  12, 10, 16, 14, 22, 20, 28, 26, 34, 32, 42];
  const revenue  = [3,  6,  5,  10,  9, 14, 12, 20, 24, 28, 30, 38, 44, 52];
  const w = 640, h = 160, pad = 8;
  const max = Math.max(...answered);
  const step = (w - pad * 2) / (answered.length - 1);
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"}${pad + i * step},${h - pad - (v / max) * (h - pad * 2)}`).join(" ");
  const area = (arr: number[]) =>
    `M${pad},${h - pad} ${arr.map((v, i) => `L${pad + i * step},${h - pad - (v / max) * (h - pad * 2)}`).join(" ")} L${pad + step * (arr.length - 1)},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28 sm:h-36" preserveAspectRatio="none">
      <defs>
        <linearGradient id="vGradA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area(answered)} fill="url(#vGradA)" />
      <path d={line(answered)} fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" />
      <path d={line(booked)}   fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      <path d={line(revenue)}  fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────── Live call row ─────────────── */

function LiveCallRow({ name, caller, dur, intent, tone, onOpen }: {
  name: string; caller: string; dur: string; intent: string; tone: "success" | "info" | "warning"; onOpen: () => void;
}) {
  const bar = tone === "success" ? "bg-emerald-500" : tone === "warning" ? "bg-amber-500" : "bg-sky-500";
  return (
    <li>
      <button onClick={onOpen} className="w-full text-left rounded-lg p-2 hover:bg-[--color-surface-strong]/60 transition flex items-center gap-2.5">
        <span className="relative w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0">
          <Bot size={14} />
          <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${bar} ring-2 ring-white`} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[12.5px] font-semibold text-[--color-ink] truncate">{name}</span>
            <span className="text-[10.5px] text-[--color-muted] tabular-nums shrink-0">{dur}</span>
          </div>
          <div className="text-[11px] text-[--color-muted] truncate">{intent} · {caller}</div>
          <MiniWaveform tone={tone} />
        </div>
      </button>
    </li>
  );
}

function MiniWaveform({ tone }: { tone: "success" | "info" | "warning" }) {
  const c = tone === "success" ? "bg-emerald-500" : tone === "warning" ? "bg-amber-500" : "bg-sky-500";
  return (
    <div className="mt-1 flex items-end gap-0.5 h-3">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className={`w-0.5 rounded-sm ${c} opacity-70 animate-pulse`} style={{ height: `${25 + Math.abs(Math.sin(i * 0.9)) * 75}%`, animationDelay: `${i * 60}ms`, animationDuration: "900ms" }} />
      ))}
    </div>
  );
}

/* ─────────────── Overview view ─────────────── */

function OverviewView({ onNewAgent, onTest }: { onNewAgent: () => void; onTest: () => void }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {[
          { icon:<Plus size={14} />,        label:"Create Agent",     onClick:onNewAgent, gradient:true },
          { icon:<Copy size={14} />,        label:"Clone Agent" },
          { icon:<Beaker size={14} />,      label:"Test Agent",       onClick:onTest },
          { icon:<Hash size={14} />,        label:"Assign Number" },
          { icon:<Upload size={14} />,      label:"Upload Knowledge" },
          { icon:<Wand2 size={14} />,       label:"Generate Prompt" },
        ].map(a => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={`h-16 sm:h-20 rounded-xl border transition flex flex-col items-start justify-between p-3 text-left ${a.gradient ? "text-white border-transparent" : "bg-white border-[--color-hairline] hover:bg-[--color-surface-strong]/40"}`}
            style={a.gradient ? { background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" } : { boxShadow: "var(--shadow-card)" }}
          >
            <span className={`w-7 h-7 rounded-lg grid place-items-center ${a.gradient ? "bg-white/20" : "bg-[--color-primary-subdued] text-[--color-primary-deep]"}`}>{a.icon}</span>
            <span className={`text-[12px] font-semibold ${a.gradient ? "" : "text-[--color-ink]"}`}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Top agents + AI tips */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-3 sm:gap-4">
        <Card padded={false} className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13px] font-semibold text-[--color-ink]">Top Performing Agents</div>
            <span className="text-[11px] text-[--color-muted]">by revenue · 30d</span>
          </div>
          <ul className="space-y-2">
            {AGENTS.filter(a => a.revenue).sort((a,b) => b.revenue - a.revenue).slice(0, 5).map((a, i) => (
              <li key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[--color-surface-strong]/50">
                <span className="w-6 text-[11px] font-bold text-[--color-muted] tabular-nums">#{i + 1}</span>
                <Avatar name={a.avatar} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[--color-ink] truncate">{a.name}</div>
                  <div className="text-[11px] text-[--color-muted] truncate">{a.role}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-semibold text-[--color-ink] tabular-nums">${a.revenue.toLocaleString()}</div>
                  <div className="text-[11px] text-emerald-600 tabular-nums">{a.successRate}% success</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card padded={false} className="p-3 sm:p-4 overflow-hidden relative">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: "var(--color-brand-gradient-2)" }} />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Sparkles size={15} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[--color-ink]">RevenueSol AI</div>
              <div className="text-[11px] text-[--color-muted]">Optimization Suggestions</div>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <AiSuggestion icon={<Flame size={12} />}       title="Marcus is closing 38%" body="Boost bookings +12% by adding a callback offer at t=45s." />
            <AiSuggestion icon={<Wand2 size={12} />}       title="Prompt A/B ready"      body="Sophia v3 wins vs v2 by 8.4% booking rate. Promote?" />
            <AiSuggestion icon={<ShieldCheck size={12} />} title="Zero missed calls"     body="Emma covered 128 calls with 0 misses in the last 24h." />
          </div>
        </Card>
      </div>
    </div>
  );
}

function AiSuggestion({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-lg p-2.5 bg-gradient-to-br from-[--color-primary-subdued] to-violet-50/40 border border-violet-100">
      <div className="flex items-start gap-2">
        <span className="w-6 h-6 rounded-md grid place-items-center bg-white text-[--color-primary-deep] shrink-0">{icon}</span>
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-[--color-ink]">{title}</div>
          <div className="text-[11px] text-[--color-muted] mt-0.5 leading-snug">{body}</div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const colors = ["from-indigo-500 to-violet-500","from-emerald-500 to-teal-500","from-fuchsia-500 to-pink-500","from-sky-500 to-cyan-500","from-amber-500 to-orange-500","from-rose-500 to-red-500"];
  const c = colors[name.charCodeAt(0) % colors.length];
  return (
    <span className={`w-9 h-9 shrink-0 rounded-full grid place-items-center text-white text-[13px] font-bold bg-gradient-to-br ${c}`}>
      {name}
    </span>
  );
}

/* ─────────────── Agents grid ─────────────── */

function AgentsView({ agents, query, onQuery, onOpen }: { agents: Agent[]; query: string; onQuery: (q: string) => void; onOpen: (a: Agent) => void }) {
  return (
    <>
      <Card padded={false} className="mb-3">
        <div className="flex items-center gap-2 p-2 sm:p-2.5">
          <div className="flex-1 relative min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
            <input
              value={query}
              onChange={e => onQuery(e.target.value)}
              placeholder="Search agents by name, role, department…"
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[--color-hairline] bg-[--color-surface] text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30"
            />
          </div>
          <span className="hidden sm:inline-flex"><Btn variant="secondary" size="sm" icon={<FilterIcon size={12} />}>Filter</Btn></span>
          <span className="hidden md:inline-flex"><Btn variant="secondary" size="sm" icon={<LayoutGrid size={12} />}>View</Btn></span>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {agents.map(a => <AgentCard key={a.id} a={a} onOpen={() => onOpen(a)} />)}
      </div>

      {agents.length === 0 && <EmptyState icon={<Bot size={22} />} title="No agents match" body="Try a different search or clear filters." />}
    </>
  );
}

function AgentCard({ a, onOpen }: { a: Agent; onOpen: () => void }) {
  const statusMap: Record<AgentStatus, { dot: string; tone: "success"|"neutral"|"warning"|"info" }> = {
    Live:     { dot: "bg-emerald-500", tone: "success" },
    Idle:     { dot: "bg-neutral-400", tone: "neutral" },
    Paused:   { dot: "bg-amber-500",   tone: "warning" },
    Training: { dot: "bg-sky-500",     tone: "info" },
  };
  const m = statusMap[a.status];
  return (
    <button onClick={onOpen} className="text-left bg-white rounded-2xl border border-[--color-hairline] p-4 transition hover:-translate-y-[2px] relative overflow-hidden group"
      style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-[--color-primary] to-fuchsia-500 group-hover:opacity-20 transition" />
      <div className="relative flex items-start gap-3">
        <div className="relative shrink-0">
          <Avatar name={a.avatar} />
          {a.status === "Live" && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-[--color-ink] truncate">{a.name}</div>
              <div className="text-[11.5px] text-[--color-muted] truncate">{a.role}</div>
            </div>
            <Tag tone={m.tone}><span className={`inline-block w-1.5 h-1.5 rounded-full ${m.dot}`} />{a.status}</Tag>
          </div>
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <DeptChip d={a.department} />
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[--color-surface-strong] text-[--color-body]">
              <Volume2 size={10} />{a.voice.split(" ")[0]}
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[--color-surface-strong] text-[--color-body]">
              <Globe size={10} />{a.accent}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-3 pt-3 border-t border-[--color-hairline] grid grid-cols-3 gap-2">
        <StatBox label="Calls" v={String(a.callsToday)} />
        <StatBox label="Success" v={a.successRate ? `${a.successRate}%` : "—"} />
        <StatBox label="Credits" v={a.credits ? kCompact(a.credits) : "—"} />
      </div>

      <div className="relative mt-3 flex items-center justify-between">
        <span className="text-[11px] text-[--color-muted] truncate">{a.phone !== "—" ? a.phone : "No number"}</span>
        <span className="text-[11px] text-[--color-muted]">{a.lastActive}</span>
      </div>
    </button>
  );
}

function DeptChip({ d }: { d: Department }) {
  const m = DEPT_META[d];
  return <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full ${m.tint}`}>{m.icon}{d}</span>;
}

function StatBox({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg bg-[--color-surface-strong]/60 px-2 py-1.5 text-center">
      <div className="text-[9px] uppercase tracking-widest font-bold text-[--color-muted]">{label}</div>
      <div className="text-[12px] font-semibold text-[--color-ink] tabular-nums">{v}</div>
    </div>
  );
}

/* ─────────────── Live Calls / History / Transcripts / Recordings ─────────────── */

function LiveCallsView({ onOpen }: { onOpen: () => void }) {
  const calls = [
    { agent:"Emma",   caller:"+1 512 555 0198", dur:"1:22", intent:"Booking HVAC tune-up", emotion:"Neutral · calm", tone:"success" as const },
    { agent:"Marcus", caller:"+1 469 555 0142", dur:"0:38", intent:"Quote follow-up",       emotion:"Curious",       tone:"info" as const },
    { agent:"Priya",  caller:"+1 214 555 0119", dur:"2:14", intent:"Overdue invoice",       emotion:"Frustrated",    tone:"warning" as const },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {calls.map((c, i) => (
        <Card key={i} padded={false} className="p-4 relative overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-15 ${c.tone === "success" ? "bg-emerald-500" : c.tone === "warning" ? "bg-amber-500" : "bg-sky-500"}`} />
          <div className="relative flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className={`absolute inset-0 rounded-full ${c.tone === "success" ? "bg-emerald-400" : c.tone === "warning" ? "bg-amber-400" : "bg-sky-400"} animate-ping opacity-70`} />
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${c.tone === "success" ? "bg-emerald-500" : c.tone === "warning" ? "bg-amber-500" : "bg-sky-500"}`} />
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[--color-ink] truncate">{c.agent}</div>
                <div className="text-[11px] text-[--color-muted] truncate">{c.caller}</div>
              </div>
            </div>
            <span className="text-[12px] font-semibold tabular-nums text-[--color-ink] shrink-0">{c.dur}</span>
          </div>
          <div className="relative flex items-end gap-0.5 h-8 mb-3">
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className={`flex-1 rounded-sm ${c.tone === "success" ? "bg-emerald-500" : c.tone === "warning" ? "bg-amber-500" : "bg-sky-500"} opacity-70 animate-pulse`} style={{ height: `${25 + Math.abs(Math.sin(i * 0.5 + Date.now() / 1000)) * 75}%`, animationDelay: `${i * 30}ms`, animationDuration: "800ms" }} />
            ))}
          </div>
          <div className="relative text-[12px] text-[--color-body] mb-3 leading-snug">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">Intent</span>
            <div className="text-[--color-ink] font-medium">{c.intent}</div>
            <div className="text-[11px] text-[--color-muted] mt-1">Emotion: {c.emotion}</div>
          </div>
          <div className="relative flex items-center gap-1.5 flex-wrap">
            <Btn size="sm" variant="secondary" icon={<Eye size={12} />} onClick={onOpen}>Listen</Btn>
            <Btn size="sm" variant="secondary" icon={<ArrowRightLeft size={12} />}>Transfer</Btn>
            <Btn size="sm" variant="gradient" icon={<Mic size={12} />} onClick={onOpen}>Take over</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

function HistoryView() {
  const rows = [
    { time:"10:24 AM", agent:"Emma",   caller:"Alicia Berg",  dur:"2:14", outcome:"Booked",    sentiment:"Positive", rev:"$180" },
    { time:"10:19 AM", agent:"Marcus", caller:"Jamal Cross",  dur:"3:42", outcome:"Follow-up", sentiment:"Curious",  rev:"—" },
    { time:"10:11 AM", agent:"Priya",  caller:"Mei Tanaka",   dur:"4:08", outcome:"Paid",      sentiment:"Neutral",  rev:"$420" },
    { time:"09:58 AM", agent:"Sophia", caller:"Aiden Park",   dur:"1:48", outcome:"Booked",    sentiment:"Positive", rev:"$95"  },
    { time:"09:42 AM", agent:"Diego",  caller:"Carla Reyes",  dur:"0:44", outcome:"Missed",    sentiment:"—",        rev:"—" },
    { time:"09:31 AM", agent:"Amir",   caller:"Ravi Shah",    dur:"5:12", outcome:"Escalated", sentiment:"Urgent",   rev:"—" },
  ];
  const badge = (o: string) => o === "Booked" || o === "Paid" ? "success" : o === "Missed" ? "danger" : o === "Escalated" ? "warning" : "neutral";
  return (
    <>
      {/* Desktop table */}
      <Card padded={false} className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead className="bg-[--color-surface-strong]/60 text-[10.5px] uppercase tracking-widest text-[--color-muted] font-semibold">
              <tr>
                <th className="text-left px-4 py-2.5">Time</th>
                <th className="text-left px-3 py-2.5">Agent</th>
                <th className="text-left px-3 py-2.5">Caller</th>
                <th className="text-right px-3 py-2.5">Duration</th>
                <th className="text-left px-3 py-2.5">Outcome</th>
                <th className="text-left px-3 py-2.5">Sentiment</th>
                <th className="text-right px-3 py-2.5">Revenue</th>
                <th className="text-right px-3 py-2.5 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[--color-hairline]">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-[--color-surface-strong]/40 transition">
                  <td className="px-4 py-3 text-[--color-muted]">{r.time}</td>
                  <td className="px-3 py-3 font-semibold text-[--color-ink]">{r.agent}</td>
                  <td className="px-3 py-3">{r.caller}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{r.dur}</td>
                  <td className="px-3 py-3"><Tag tone={badge(r.outcome) as "success"|"danger"|"warning"|"neutral"}>{r.outcome}</Tag></td>
                  <td className="px-3 py-3 text-[--color-muted]">{r.sentiment}</td>
                  <td className="px-3 py-3 text-right tabular-nums font-semibold text-[--color-ink]">{r.rev}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong] text-[--color-primary-deep]"><Play size={12} /></button>
                      <button className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong]"><FileText size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile list */}
      <div className="md:hidden space-y-2">
        {rows.map((r, i) => (
          <Card key={i} padded={false} className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[--color-ink] truncate">{r.agent} · {r.caller}</div>
                <div className="text-[11px] text-[--color-muted]">{r.time} · {r.dur}</div>
              </div>
              <Tag tone={badge(r.outcome) as "success"|"danger"|"warning"|"neutral"}>{r.outcome}</Tag>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-[--color-muted]">{r.sentiment}</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[--color-ink] tabular-nums">{r.rev}</span>
                <button className="w-7 h-7 grid place-items-center rounded-md bg-[--color-primary-subdued] text-[--color-primary-deep]"><Play size={12} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function TranscriptView() {
  const lines = [
    { s:"agent",    t:"00:00", body:"Hi, this is Emma from RevenueSol HVAC. How can I help today?" },
    { s:"customer", t:"00:04", body:"Yeah, my furnace is making a weird noise. Can someone come out?" },
    { s:"agent",    t:"00:09", body:"Absolutely — I can get a technician to you today. Are you at 4210 Willow Ave?" },
    { s:"customer", t:"00:16", body:"Yes that's right." },
    { s:"agent",    t:"00:18", body:"Great. I have a slot at 2:30 PM today, or 10 AM tomorrow. Which works best?" },
    { s:"customer", t:"00:26", body:"2:30 today would be perfect." },
    { s:"agent",    t:"00:28", body:"Booked. You'll get an SMS confirmation and reminder. Anything else?" },
    { s:"customer", t:"00:34", body:"No, thanks!" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
      <Card padded={false}>
        <div className="p-3 sm:p-4 border-b border-[--color-hairline] flex items-center justify-between flex-wrap gap-2">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-[--color-ink] truncate">Emma × Alicia Berg</div>
            <div className="text-[11px] text-[--color-muted]">Today · 10:24 AM · 2:14 duration</div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Btn size="sm" variant="secondary" icon={<Search size={12} />} className="hidden sm:inline-flex">Search</Btn>
            <Btn size="sm" variant="secondary" icon={<Copy size={12} />}>Copy</Btn>
            <Btn size="sm" variant="secondary" icon={<Download size={12} />}>PDF</Btn>
          </div>
        </div>
        <div className="p-3 sm:p-4 space-y-3 max-h-[520px] overflow-y-auto">
          {lines.map((l, i) => (
            <div key={i} className={`flex gap-3 ${l.s === "customer" ? "flex-row-reverse" : ""}`}>
              <div className="shrink-0">
                {l.s === "agent"
                  ? <span className="w-8 h-8 rounded-full grid place-items-center bg-gradient-to-br from-indigo-500 to-violet-500 text-white"><Bot size={14} /></span>
                  : <span className="w-8 h-8 rounded-full grid place-items-center bg-[--color-surface-strong] text-[--color-body]"><User size={14} /></span>
                }
              </div>
              <div className={`min-w-0 max-w-[85%] ${l.s === "customer" ? "text-right" : ""}`}>
                <div className="flex items-center gap-2 text-[10.5px] text-[--color-muted]">
                  <span className="font-bold uppercase tracking-widest">{l.s === "agent" ? "AI" : "Customer"}</span>
                  <span className="tabular-nums">{l.t}</span>
                </div>
                <div className={`mt-1 rounded-2xl px-3 py-2 text-[13px] leading-relaxed inline-block ${l.s === "agent" ? "bg-[--color-primary-subdued] text-[--color-ink]" : "bg-[--color-surface-strong] text-[--color-body]"}`}>
                  {l.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        <Card padded={false} className="p-3 sm:p-4">
          <div className="text-[13px] font-semibold text-[--color-ink] mb-2 flex items-center gap-1.5"><Sparkles size={13} className="text-[--color-primary-deep]" />AI Summary</div>
          <p className="text-[12px] text-[--color-body] leading-relaxed">Customer reported abnormal furnace noise and booked a same-day service call at 2:30 PM. High intent, positive sentiment. No objections.</p>
        </Card>
        <Card padded={false} className="p-3 sm:p-4">
          <div className="text-[13px] font-semibold text-[--color-ink] mb-2">Insights</div>
          <ul className="space-y-1.5 text-[12px]">
            <InsightLine label="Intent" v="Same-day HVAC repair" tone="primary" />
            <InsightLine label="Sentiment" v="Positive · 0.82" tone="success" />
            <InsightLine label="Revenue opportunity" v="$180 est." tone="success" />
            <InsightLine label="Risk" v="Low" tone="neutral" />
            <InsightLine label="Next step" v="Send SMS confirmation" tone="info" />
          </ul>
        </Card>
      </div>
    </div>
  );
}

function InsightLine({ label, v, tone }: { label: string; v: string; tone: "primary" | "success" | "info" | "neutral" | "warning" }) {
  const map: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    success: "bg-emerald-50 text-emerald-700",
    info: "bg-sky-50 text-sky-700",
    warning: "bg-amber-50 text-amber-700",
    neutral: "bg-[--color-surface-strong] text-[--color-body]",
  };
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="text-[--color-muted] text-[11.5px]">{label}</span>
      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${map[tone]}`}>{v}</span>
    </li>
  );
}

function RecordingsView() {
  const recs = [
    { name:"Emma × Alicia Berg",  dur:"2:14", when:"10:24 AM", size:"1.2 MB" },
    { name:"Marcus × Jamal Cross", dur:"3:42", when:"10:19 AM", size:"2.0 MB" },
    { name:"Priya × Mei Tanaka",   dur:"4:08", when:"10:11 AM", size:"2.2 MB" },
    { name:"Sophia × Aiden Park",  dur:"1:48", when:"09:58 AM", size:"1.0 MB" },
  ];
  return (
    <div className="space-y-2">
      {recs.map((r, i) => (
        <Card key={i} padded={false} className="p-3">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Play size={14} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[--color-ink] truncate">{r.name}</div>
              <div className="mt-1 flex items-end gap-0.5 h-4">
                {Array.from({ length: 60 }).map((_, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-[--color-primary] opacity-40" style={{ height: `${20 + Math.abs(Math.sin(i * 0.4)) * 80}%` }} />
                ))}
              </div>
              <div className="mt-1 text-[10.5px] text-[--color-muted] tabular-nums flex items-center gap-2 flex-wrap">
                <span>{r.when}</span><span>·</span><span>{r.dur}</span><span>·</span><span>{r.size}</span>
              </div>
            </div>
            <button className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0"><Download size={13} /></button>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ─────────────── Prompt Library / Knowledge / Numbers / Flows / Voices / Tools ─────────────── */

function PromptLibraryView() {
  const templates: { name: string; icon: React.ReactNode; uses: number; industry: string }[] = [
    { name:"Receptionist",     icon:<UserRound size={14} />,   uses:2140, industry:"General"    },
    { name:"HVAC",             icon:<WrenchIcon size={14} />,  uses:892,  industry:"Home"       },
    { name:"Roofing",          icon:<Home size={14} />,        uses:412,  industry:"Home"       },
    { name:"Electrical",       icon:<Zap size={14} />,         uses:314,  industry:"Home"       },
    { name:"Plumbing",         icon:<WrenchIcon size={14} />,  uses:684,  industry:"Home"       },
    { name:"Dental",           icon:<Stethoscope size={14} />, uses:220,  industry:"Medical"    },
    { name:"Legal Intake",     icon:<Scale size={14} />,       uses:182,  industry:"Legal"      },
    { name:"Real Estate",      icon:<Building2 size={14} />,   uses:508,  industry:"Real Estate"},
    { name:"Insurance",        icon:<ShieldCheck size={14} />, uses:112,  industry:"Insurance"  },
    { name:"Medical Intake",   icon:<Stethoscope size={14} />, uses:96,   industry:"Medical"    },
    { name:"E-commerce",       icon:<ShoppingBag size={14} />, uses:74,   industry:"Retail"     },
    { name:"Custom Template",  icon:<Wand2 size={14} />,       uses:0,    industry:"—"          },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {templates.map(t => (
        <button key={t.name} className="text-left bg-white rounded-2xl border border-[--color-hairline] p-3 hover:-translate-y-[1px] transition"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <span className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]">{t.icon}</span>
          <div className="mt-2 text-[13px] font-semibold text-[--color-ink] truncate">{t.name}</div>
          <div className="text-[11px] text-[--color-muted] mt-0.5">{t.industry}</div>
          <div className="mt-3 pt-3 border-t border-[--color-hairline] flex items-center justify-between">
            <span className="text-[11px] text-[--color-muted] tabular-nums">{t.uses.toLocaleString()} uses</span>
            <span className="text-[11px] font-semibold text-[--color-primary-deep] inline-flex items-center gap-0.5">Use <ArrowUpRight size={11} /></span>
          </div>
        </button>
      ))}
    </div>
  );
}

function KnowledgeView() {
  const sources: { icon: React.ReactNode; name: string; count: string; tint: string }[] = [
    { icon:<Globe size={16} />,       name:"Website",       count:"48 pages",    tint:"from-indigo-500 to-violet-500" },
    { icon:<FileText size={16} />,    name:"PDFs",          count:"12 files",    tint:"from-rose-500 to-pink-500" },
    { icon:<BookOpen size={16} />,    name:"FAQs",          count:"84 answers",  tint:"from-emerald-500 to-teal-500" },
    { icon:<ShieldCheck size={16} />, name:"Policies",      count:"9 documents", tint:"from-amber-500 to-orange-500" },
    { icon:<StickyNote size={16} />,  name:"Manual Text",   count:"3.2K words",  tint:"from-sky-500 to-cyan-500" },
    { icon:<Users size={16} />,       name:"CRM Data",      count:"3,402 rec.",  tint:"from-fuchsia-500 to-pink-500" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sources.map(s => (
        <Card key={s.name} padded={false} className="p-4 relative overflow-hidden">
          <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${s.tint} opacity-15 blur-xl`} />
          <div className="relative flex items-center gap-3">
            <span className={`w-11 h-11 rounded-xl grid place-items-center text-white bg-gradient-to-br ${s.tint} shrink-0`}>{s.icon}</span>
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold text-[--color-ink] truncate">{s.name}</div>
              <div className="text-[11.5px] text-[--color-muted]">{s.count}</div>
            </div>
          </div>
          <div className="relative mt-3 flex items-center gap-1.5">
            <Btn size="sm" variant="secondary" icon={<Eye size={12} />}>Browse</Btn>
            <Btn size="sm" variant="ghost" icon={<Upload size={12} />}>Add</Btn>
          </div>
        </Card>
      ))}
      <Card padded={false} className="p-4 border-dashed border-2 border-[--color-hairline] bg-transparent flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0"><Plus size={16} /></span>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-[--color-ink]">Add new source</div>
          <div className="text-[11.5px] text-[--color-muted]">Notion, Google Docs, or paste URL</div>
        </div>
      </Card>
    </div>
  );
}

function NumbersView() {
  const numbers = [
    { num:"+1 214-555-0100", assigned:"Emma",   provider:"Twilio",       type:"Local",    calls:128 },
    { num:"+1 214-555-0101", assigned:"Marcus", provider:"Twilio",       type:"Local",    calls:82 },
    { num:"+1 214-555-0102", assigned:"Sophia", provider:"Telnyx",       type:"Local",    calls:64 },
    { num:"+1 800-555-0141", assigned:"—",      provider:"RingCentral",  type:"Toll-free",calls:0 },
    { num:"+44 20 7946 0958",assigned:"—",      provider:"Vonage",       type:"Intl.",    calls:0 },
  ];
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px]">
          <thead className="bg-[--color-surface-strong]/60 text-[10.5px] uppercase tracking-widest text-[--color-muted] font-semibold">
            <tr>
              <th className="text-left px-4 py-2.5">Number</th>
              <th className="text-left px-3 py-2.5">Assigned</th>
              <th className="text-left px-3 py-2.5 hidden sm:table-cell">Provider</th>
              <th className="text-left px-3 py-2.5 hidden md:table-cell">Type</th>
              <th className="text-right px-3 py-2.5">Calls</th>
              <th className="text-right px-3 py-2.5 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--color-hairline]">
            {numbers.map((n, i) => (
              <tr key={i} className="hover:bg-[--color-surface-strong]/40">
                <td className="px-4 py-3 font-semibold text-[--color-ink] tabular-nums">{n.num}</td>
                <td className="px-3 py-3">{n.assigned === "—" ? <span className="text-[--color-muted]">unassigned</span> : n.assigned}</td>
                <td className="px-3 py-3 hidden sm:table-cell">{n.provider}</td>
                <td className="px-3 py-3 hidden md:table-cell text-[--color-muted]">{n.type}</td>
                <td className="px-3 py-3 text-right tabular-nums">{n.calls}</td>
                <td className="px-3 py-3 text-right"><button className="text-[11.5px] font-semibold text-[--color-primary-deep]">Assign</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FlowsView() {
  return (
    <Card>
      <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Call Flow — Emma (Reception)</div>
      <div className="overflow-x-auto scrollbar-none">
        <div className="min-w-[720px] flex items-center gap-3">
          <FlowNode icon={<PhoneIncoming size={14} />} title="Incoming" body="Ring < 2s" tone="from-indigo-500 to-violet-500" />
          <FlowArrow />
          <FlowNode icon={<Bot size={14} />}          title="AI Greet"  body="Emma answers" tone="from-fuchsia-500 to-pink-500" />
          <FlowArrow />
          <FlowNode icon={<ListChecks size={14} />}   title="Qualify"   body="Intent + service" tone="from-sky-500 to-cyan-500" />
          <FlowArrow />
          <FlowNode icon={<Calendar size={14} />}     title="Book"      body="Calendar sync" tone="from-emerald-500 to-teal-500" />
          <FlowArrow />
          <FlowNode icon={<MessageSquare size={14} />} title="Confirm"  body="SMS + Email" tone="from-amber-500 to-orange-500" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[--color-hairline] flex items-center gap-2 flex-wrap">
        <Btn size="sm" variant="secondary" icon={<Plus size={12} />}>Add Step</Btn>
        <Btn size="sm" variant="secondary" icon={<GitBranch size={12} />}>Branch</Btn>
        <Btn size="sm" variant="ghost" icon={<ArrowRightLeft size={12} />}>Transfer Rule</Btn>
      </div>
    </Card>
  );
}

function FlowNode({ icon, title, body, tone }: { icon: React.ReactNode; title: string; body: string; tone: string }) {
  return (
    <div className="shrink-0 w-40 rounded-xl bg-white border border-[--color-hairline] p-3" style={{ boxShadow: "var(--shadow-card)" }}>
      <span className={`w-8 h-8 rounded-lg grid place-items-center text-white bg-gradient-to-br ${tone}`}>{icon}</span>
      <div className="mt-2 text-[13px] font-semibold text-[--color-ink]">{title}</div>
      <div className="text-[11px] text-[--color-muted]">{body}</div>
    </div>
  );
}

function FlowArrow() {
  return <ChevronRight size={16} className="text-[--color-muted] shrink-0" />;
}

function VoicesView() {
  const voices = [
    { name:"Ava",     desc:"Warm · US female",       gender:"Female", accent:"US" },
    { name:"Nathan",  desc:"Confident · US male",    gender:"Male",   accent:"US" },
    { name:"Sophia",  desc:"Bright · UK female",     gender:"Female", accent:"UK" },
    { name:"Chloé",   desc:"Luxury · French female", gender:"Female", accent:"FR" },
    { name:"Kai",     desc:"Playful · AU male",      gender:"Male",   accent:"AU" },
    { name:"Diego",   desc:"Calm · Spanish male",    gender:"Male",   accent:"ES" },
    { name:"Priya",   desc:"Assertive · UK female",  gender:"Female", accent:"UK" },
    { name:"Amir",    desc:"Steady · US male",       gender:"Male",   accent:"US" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {voices.map(v => (
        <Card key={v.name} padded={false} className="p-3">
          <div className="flex items-center gap-2.5">
            <button className="w-10 h-10 rounded-full grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Play size={13} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[--color-ink] truncate">{v.name}</div>
              <div className="text-[11px] text-[--color-muted] truncate">{v.desc}</div>
            </div>
          </div>
          <div className="mt-2 flex items-end gap-0.5 h-6">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="flex-1 rounded-sm bg-[--color-primary]/50" style={{ height: `${25 + Math.abs(Math.sin(i * 0.7 + v.name.charCodeAt(0))) * 75}%` }} />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10.5px] text-[--color-muted]">
            <span className="px-1.5 py-0.5 rounded-full bg-[--color-surface-strong] font-semibold">{v.gender}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[--color-surface-strong] font-semibold">{v.accent}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ToolsView() {
  const tools = [
    { icon:<Calendar size={14} />,       name:"Book Appointment",    on:true  },
    { icon:<X size={14} />,              name:"Cancel Appointment",  on:true  },
    { icon:<Repeat size={14} />,         name:"Reschedule",          on:true  },
    { icon:<MessageSquare size={14} />,  name:"Send SMS",            on:true  },
    { icon:<FileText size={14} />,       name:"Send Email",          on:true  },
    { icon:<CreditCard size={14} />,     name:"Take Payment",        on:false },
    { icon:<FileText size={14} />,       name:"Generate Quote",      on:true  },
    { icon:<FileText size={14} />,       name:"Generate Invoice",    on:false },
    { icon:<UserRound size={14} />,      name:"Create Lead",         on:true  },
    { icon:<Users size={14} />,          name:"Update CRM",          on:true  },
    { icon:<ArrowRightLeft size={14} />, name:"Transfer Call",       on:true  },
    { icon:<Search size={14} />,         name:"Lookup Customer",     on:true  },
    { icon:<ListChecks size={14} />,     name:"Collect Info",        on:true  },
    { icon:<Clock size={14} />,          name:"Schedule Follow-up",  on:false },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {tools.map(t => (
        <div key={t.name} className="bg-white rounded-xl border border-[--color-hairline] p-3 flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0">{t.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-[--color-ink] truncate">{t.name}</div>
            <div className="text-[11px] text-[--color-muted]">{t.on ? "Enabled" : "Disabled"}</div>
          </div>
          <Toggle on={t.on} />
        </div>
      ))}
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-flex h-5 w-9 rounded-full transition ${on ? "bg-[--color-primary]" : "bg-[--color-surface-strong]"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${on ? "left-4" : "left-0.5"}`} />
    </span>
  );
}

/* ─────────────── Analytics ─────────────── */

function AnalyticsView() {
  const channels = [
    { label:"Emma",   answered:99, booking:37, conv:22 },
    { label:"Marcus", answered:82, booking:14, conv:38 },
    { label:"Sophia", answered:94, booking:56, conv:41 },
    { label:"Diego",  answered:71, booking:0,  conv:12 },
    { label:"Priya",  answered:88, booking:0,  conv:29 },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Agent Comparison</div>
        <div className="space-y-3">
          {channels.map(c => (
            <div key={c.label}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[12px] mb-1 gap-0.5">
                <span className="font-semibold text-[--color-ink]">{c.label}</span>
                <span className="text-[--color-muted] tabular-nums text-[11.5px]">Answer {c.answered}% · Book {c.booking}% · Conv {c.conv}%</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-[--color-surface-strong]">
                <div style={{ width: `${c.answered}%`, background: "#635BFF" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Conversion Funnel</div>
        {[
          { label:"Incoming",  v:4218, pct:100, c:"from-indigo-500 to-violet-500" },
          { label:"Answered",  v:4046, pct:96,  c:"from-violet-500 to-fuchsia-500" },
          { label:"Qualified", v:2814, pct:67,  c:"from-fuchsia-500 to-pink-500" },
          { label:"Booked",    v:882,  pct:21,  c:"from-pink-500 to-rose-500" },
          { label:"Revenue",   v:472,  pct:11,  c:"from-rose-500 to-orange-500" },
        ].map(s => (
          <div key={s.label} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between text-[12px] mb-1">
              <span className="font-semibold text-[--color-ink]">{s.label}</span>
              <span className="text-[--color-muted] tabular-nums">{s.v.toLocaleString()} · {s.pct}%</span>
            </div>
            <div className="h-6 rounded-md overflow-hidden bg-[--color-surface-strong]">
              <div className={`h-full bg-gradient-to-r ${s.c}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </Card>
      <Card className="lg:col-span-2">
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Peak-hour Heatmap</div>
        <Heatmap />
      </Card>
    </div>
  );
}

function Heatmap() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
      <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-max">
        {days.flatMap((d, r) =>
          Array.from({ length: 24 }, (_, c) => {
            const v = (Math.sin(r * 0.9 + c * 0.4) + 1) / 2;
            const alpha = 0.08 + v * 0.85;
            return <div key={`${r}-${c}`} className="w-4 h-4 rounded-sm" style={{ background: `rgba(99, 91, 255, ${alpha})` }} />;
          })
        )}
      </div>
      <div className="flex items-center justify-between text-[10px] text-[--color-muted] mt-2 uppercase tracking-widest font-semibold">
        <span>Mon–Sun · 0–23h</span>
        <span>Peak: Tue 10am · Thu 3pm</span>
      </div>
    </div>
  );
}

/* ─────────────── Testing Lab / Memory / Integrations / Settings ─────────────── */

function TestingLabView({ onCall }: { onCall: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-9 h-9 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}><Beaker size={15} /></span>
          <div>
            <div className="text-[14px] font-semibold text-[--color-ink]">Live Test Call</div>
            <div className="text-[11px] text-[--color-muted]">Call your agent instantly from the browser</div>
          </div>
        </div>
        <label className="block mb-2">
          <span className="text-[11px] font-semibold text-[--color-muted] uppercase tracking-widest">Scenario</span>
          <textarea rows={4} defaultValue="Customer calls about a broken AC and wants the earliest same-day slot in Denver."
            className="mt-1 w-full p-3 rounded-lg border border-[--color-hairline] text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30" />
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          <Btn variant="gradient" icon={<Phone size={13} />} onClick={onCall}>Call Agent</Btn>
          <Btn variant="secondary" icon={<Sparkles size={13} />}>Auto-generate</Btn>
        </div>
      </Card>
      <Card>
        <div className="text-[14px] font-semibold text-[--color-ink] mb-3">A/B Prompt Test</div>
        {[
          { name:"Emma v2 vs v3", winner:"v3", uplift:"+8.4%", conf:92 },
          { name:"Marcus opener A/B", winner:"B", uplift:"+11.2%", conf:88 },
          { name:"Sophia close v1 vs v2", winner:"v2", uplift:"+5.1%", conf:74 },
        ].map(t => (
          <div key={t.name} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{t.name}</div>
                <div className="text-[10.5px] text-[--color-muted]">Confidence {t.conf}%</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Tag tone="success">Winner: {t.winner}</Tag>
                <span className="text-[12px] font-semibold text-emerald-600 tabular-nums">{t.uplift}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${t.conf}%` }} />
            </div>
          </div>
        ))}
      </Card>
      <Card className="lg:col-span-2">
        <div className="text-[14px] font-semibold text-[--color-ink] mb-3">Latency Benchmarks</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <LatencyStat label="Time to First Word"  v="420ms"  tone="success" />
          <LatencyStat label="Interruption Detect" v="180ms"  tone="success" />
          <LatencyStat label="Turn Latency"        v="620ms"  tone="info" />
          <LatencyStat label="Full Response"       v="1.2s"   tone="warning" />
        </div>
      </Card>
    </div>
  );
}

function LatencyStat({ label, v, tone }: { label: string; v: string; tone: "success" | "info" | "warning" }) {
  const map = { success: "text-emerald-700 bg-emerald-50", info: "text-sky-700 bg-sky-50", warning: "text-amber-700 bg-amber-50" };
  return (
    <div className={`rounded-lg p-3 ${map[tone]}`}>
      <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">{label}</div>
      <div className="text-[18px] font-semibold tabular-nums mt-1">{v}</div>
    </div>
  );
}

function MemoryView() {
  const memories = [
    { title:"Alicia Berg",     body:"Owns dual-zone HVAC · prefers Tuesday afternoon slots · paid $180 (2026-06-11)." },
    { title:"Mei Tanaka",      body:"Enterprise account · 4 locations · Net-30 terms · invoice #INV-2841 outstanding." },
    { title:"Ravi Shah",       body:"Emergency contact · authorized after-hours callback until 10 PM MST." },
    { title:"Carla Reyes",     body:"Prefers Spanish · past furnace install (2025-11) · warranty active until 2027-11." },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {memories.map(m => (
        <Card key={m.title} padded={false} className="p-4">
          <div className="flex items-start gap-2">
            <span className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0"><Brain size={14} /></span>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[--color-ink] truncate">{m.title}</div>
              <div className="text-[11.5px] text-[--color-body] mt-1 leading-relaxed">{m.body}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function IntegrationsView() {
  const integrations = [
    { name:"Twilio",        icon:<Phone size={14} />,      tint:"from-rose-500 to-red-500",       on:true },
    { name:"RingCentral",   icon:<Phone size={14} />,      tint:"from-orange-500 to-amber-500",   on:false },
    { name:"Telnyx",        icon:<Signal size={14} />,     tint:"from-sky-500 to-cyan-500",       on:true },
    { name:"Vonage",        icon:<Phone size={14} />,      tint:"from-violet-500 to-purple-500",  on:false },
    { name:"ElevenLabs",    icon:<Volume2 size={14} />,    tint:"from-neutral-900 to-neutral-700",on:true },
    { name:"OpenAI",        icon:<Sparkles size={14} />,   tint:"from-emerald-500 to-teal-500",   on:true },
    { name:"Google Calendar",icon:<Calendar size={14} />,  tint:"from-blue-500 to-indigo-500",    on:true },
    { name:"HubSpot CRM",   icon:<Users size={14} />,      tint:"from-orange-500 to-rose-500",    on:false },
    { name:"Salesforce",    icon:<Users size={14} />,      tint:"from-sky-500 to-blue-600",       on:false },
    { name:"Stripe",        icon:<CreditCard size={14} />, tint:"from-violet-500 to-indigo-500",  on:true },
    { name:"Slack",         icon:<MessageSquare size={14} />, tint:"from-fuchsia-500 to-pink-500",on:false },
    { name:"Zapier",        icon:<Zap size={14} />,        tint:"from-amber-500 to-orange-500",   on:false },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {integrations.map(i => (
        <Card key={i.name} padded={false} className="p-3 relative overflow-hidden">
          <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${i.tint} opacity-15 blur-xl`} />
          <div className="relative flex items-center justify-between gap-2 mb-2">
            <span className={`w-9 h-9 rounded-lg grid place-items-center text-white bg-gradient-to-br ${i.tint}`}>{i.icon}</span>
            {i.on ? <Tag tone="success">Connected</Tag> : <Tag tone="neutral">Off</Tag>}
          </div>
          <div className="relative text-[13px] font-semibold text-[--color-ink] truncate">{i.name}</div>
          <div className="relative mt-2">
            <button className="text-[11.5px] font-semibold text-[--color-primary-deep]">{i.on ? "Manage" : "Connect →"}</button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SettingsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Global Defaults</div>
        <SettingRow label="Default language"   value="English (US)" />
        <SettingRow label="Default voice"       value="Ava · Warm" />
        <SettingRow label="Recording"           value="Enabled" />
        <SettingRow label="Transcription"       value="Real-time" />
        <SettingRow label="PII redaction"       value="Card, SSN" />
      </Card>
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Billing</div>
        <SettingRow label="Plan"                value="Scale · $299/mo" />
        <SettingRow label="Credits remaining"   value="12,680 min" />
        <SettingRow label="Auto-recharge"       value="On · $50 at 10%" />
        <SettingRow label="Overage rate"        value="$0.06 / min" />
      </Card>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[--color-hairline] last:border-0">
      <span className="text-[12.5px] text-[--color-muted]">{label}</span>
      <span className="text-[12.5px] font-semibold text-[--color-ink] truncate max-w-[60%] text-right">{value}</span>
    </div>
  );
}

/* ─────────────── Empty state ─────────────── */

function EmptyState({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card>
      <div className="py-12 text-center">
        <div className="w-12 h-12 rounded-2xl grid place-items-center mx-auto mb-3 bg-[--color-primary-subdued] text-[--color-primary-deep]">{icon}</div>
        <div className="text-[14px] font-semibold text-[--color-ink]">{title}</div>
        <div className="text-[12px] text-[--color-muted] mt-1">{body}</div>
      </div>
    </Card>
  );
}

/* ─────────────── Agent Drawer ─────────────── */

function AgentDrawer({ a, onClose }: { a: Agent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:max-w-[540px] bg-white border-l border-[--color-hairline] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        <div className="p-4 sm:p-5 border-b border-[--color-hairline] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={a.avatar} />
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink] truncate">{a.name}</div>
              <div className="text-[11.5px] text-[--color-muted] truncate">{a.role}</div>
              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                <DeptChip d={a.department} />
                <Tag tone={a.status === "Live" ? "success" : a.status === "Paused" ? "warning" : "neutral"}>{a.status}</Tag>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <MetricBox label="Calls Today" v={String(a.callsToday)} />
            <MetricBox label="Success"     v={a.successRate ? `${a.successRate}%` : "—"} />
            <MetricBox label="Bookings"    v={String(a.bookings)} />
            <MetricBox label="Revenue"     v={a.revenue ? `$${a.revenue.toLocaleString()}` : "—"} />
            <MetricBox label="Credits"     v={a.credits ? kCompact(a.credits) : "—"} />
            <MetricBox label="CSAT"        v="4.8 / 5" />
          </div>

          <section>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Voice · Language</div>
            <div className="rounded-xl border border-[--color-hairline] p-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0"><Volume2 size={16} /></span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[--color-ink] truncate">{a.voice}</div>
                <div className="text-[11.5px] text-[--color-muted]">{a.language} · {a.accent}</div>
              </div>
              <button className="w-8 h-8 grid place-items-center rounded-lg bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0"><Play size={13} /></button>
            </div>
          </section>

          <section>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Phone Number</div>
            <div className="rounded-xl border border-[--color-hairline] p-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] shrink-0"><Hash size={16} /></span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[--color-ink] tabular-nums truncate">{a.phone}</div>
                <div className="text-[11.5px] text-[--color-muted]">Twilio · US Local</div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Recent activity</div>
            <ul className="space-y-2">
              {[
                { t:"Booked appointment", time:"just now", icon:<Calendar size={12} />, tone:"text-emerald-600 bg-emerald-50" },
                { t:"Answered call",       time:"2m ago",   icon:<PhoneIncoming size={12} />, tone:"text-sky-600 bg-sky-50" },
                { t:"Sent SMS confirmation", time:"3m ago", icon:<MessageSquare size={12} />, tone:"text-violet-600 bg-violet-50" },
                { t:"Updated CRM",         time:"5m ago",   icon:<Users size={12} />, tone:"text-amber-600 bg-amber-50" },
              ].map((e, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-lg grid place-items-center shrink-0 ${e.tone}`}>{e.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium text-[--color-ink]">{e.t}</div>
                    <div className="text-[11px] text-[--color-muted]">{e.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="p-3 sm:p-4 border-t border-[--color-hairline] grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Btn variant="secondary" size="sm" icon={a.status === "Paused" ? <Play size={12} /> : <Pause size={12} />} className="justify-center">{a.status === "Paused" ? "Resume" : "Pause"}</Btn>
          <Btn variant="secondary" size="sm" icon={<Copy size={12} />} className="justify-center">Duplicate</Btn>
          <Btn variant="secondary" size="sm" icon={<Beaker size={12} />} className="justify-center">Test</Btn>
          <Btn variant="gradient"  size="sm" icon={<Wand2 size={12} />} className="justify-center">Edit</Btn>
        </div>
      </aside>
    </div>
  );
}

function MetricBox({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg border border-[--color-hairline] p-2.5">
      <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
      <div className="text-[15px] font-semibold text-[--color-ink] tabular-nums mt-0.5">{v}</div>
    </div>
  );
}

/* ─────────────── Create Agent Wizard ─────────────── */

const WIZ_STEPS = ["Identity","Voice","Personality","Prompt","Knowledge","Tools","Number"] as const;

function CreateAgentWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Ava");
  const [dept, setDept] = useState<Department>("Reception");
  const [voice, setVoice] = useState("Ava");
  const [gender, setGender] = useState<"Male" | "Female">("Female");
  const [accent, setAccent] = useState("US");
  const [speed, setSpeed] = useState(1);
  const [personality, setPersonality] = useState("Friendly");
  const [prompt, setPrompt] = useState("You are {{business_name}}'s AI receptionist. Greet warmly, ask how you can help, and book qualified appointments. Always be concise, professional and helpful.");
  const [sources, setSources] = useState<string[]>(["Website","FAQs"]);
  const [tools, setTools] = useState<string[]>(["Book Appointment","Send SMS","Lookup Customer"]);
  const [provider, setProvider] = useState("Twilio");

  const next = () => setStep(s => Math.min(s + 1, WIZ_STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const toggle = (arr: string[], v: string, setter: (a: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-3xl bg-white rounded-t-2xl sm:rounded-2xl border border-[--color-hairline] max-h-[94vh] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[--color-hairline]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Bot size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink]">Create AI Agent</div>
              <div className="text-[11.5px] text-[--color-muted] truncate">Step {step + 1} of {WIZ_STEPS.length} · {WIZ_STEPS[step]}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0"><X size={16} /></button>
        </div>

        {/* Progress */}
        <div className="px-4 sm:px-5 pt-3 pb-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {WIZ_STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1 shrink-0">
                <div className={`h-1.5 w-5 sm:w-10 rounded-full ${i <= step ? "bg-[--color-primary]" : "bg-[--color-surface-strong]"}`} />
                <span className={`text-[10.5px] sm:text-[11px] font-semibold pr-1.5 sm:pr-2 ${i === step ? "text-[--color-ink]" : "text-[--color-muted]"}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {step === 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Avatar name={name[0] || "A"} />
                <FieldRow label="Agent name">
                  <input value={name} onChange={e => setName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30" />
                </FieldRow>
              </div>
              <FieldRow label="Department">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(DEPT_META) as Department[]).map(d => (
                    <button key={d} onClick={() => setDept(d)}
                      className={`p-2.5 rounded-xl border transition text-left ${dept === d ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                      <div className="flex items-center gap-2">
                        {DEPT_META[d].icon}
                        <span className="text-[12.5px] font-semibold text-[--color-ink]">{d}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Short description">
                <textarea rows={3} defaultValue="Handles inbound calls, qualifies leads and books appointments 24/7."
                  className="w-full p-3 rounded-lg border border-[--color-hairline] text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30" />
              </FieldRow>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <FieldRow label="Gender">
                <div className="inline-flex p-0.5 rounded-lg bg-[--color-surface-strong] text-[12px] font-semibold">
                  {(["Female","Male"] as const).map(g => (
                    <button key={g} onClick={() => setGender(g)}
                      className={`px-3 py-1.5 rounded-md transition ${gender === g ? "bg-white text-[--color-ink] shadow-sm" : "text-[--color-muted]"}`}>{g}</button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Accent">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["US","UK","Australia","Spanish","French","Arabic","Hindi","Urdu"].map(a => (
                    <button key={a} onClick={() => setAccent(a)}
                      className={`h-8 px-3 rounded-full text-[12px] font-semibold transition ${accent === a ? "bg-[var(--color-ink)] text-white" : "bg-white border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"}`}>{a}</button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Voice preview">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Ava","Sophia","Chloé","Nathan"].map(v => (
                    <button key={v} onClick={() => setVoice(v)}
                      className={`p-3 rounded-xl border transition text-left flex items-center gap-3 ${voice === v ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                      <span className="w-9 h-9 rounded-full grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}><Play size={12} /></span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{v}</div>
                        <div className="mt-1 flex items-end gap-0.5 h-3">
                          {Array.from({ length: 28 }).map((_, i) => (
                            <span key={i} className="flex-1 rounded-sm bg-[--color-primary]/50" style={{ height: `${25 + Math.abs(Math.sin(i * 0.7 + v.charCodeAt(0))) * 75}%` }} />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label={`Speed · ${speed.toFixed(1)}x`}>
                <input type="range" min="0.7" max="1.4" step="0.1" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} className="w-full accent-[--color-primary]" />
              </FieldRow>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["Professional","Friendly","Luxury Concierge","Sales Expert","Receptionist","Support Agent","Booking Agent","Collections Agent","Custom Personality"].map(p => {
                const active = personality === p;
                return (
                  <button key={p} onClick={() => setPersonality(p)}
                    className={`p-3 rounded-xl border transition text-left ${active ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                    <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] mb-2">
                      {p.includes("Luxury") ? <ShoppingBag size={14} /> : p.includes("Sales") ? <TrendingUp size={14} /> : p.includes("Support") ? <Headphones size={14} /> : p.includes("Collections") ? <CreditCard size={14} /> : <UserRound size={14} />}
                    </div>
                    <div className="text-[12.5px] font-semibold text-[--color-ink]">{p}</div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <FieldRow label="Prompt">
                <div className="rounded-lg border border-[--color-hairline] bg-white overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[--color-hairline] bg-[--color-surface-strong]/40 flex-wrap">
                    <span className="text-[10.5px] font-bold uppercase tracking-widest text-[--color-muted]">System</span>
                    <div className="ml-auto flex items-center gap-1">
                      <button className="h-7 px-2 rounded text-[11px] font-semibold text-[--color-primary-deep] bg-[--color-primary-subdued] inline-flex items-center gap-1"><Sparkles size={11} /> AI improve</button>
                    </div>
                  </div>
                  <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={8}
                    className="w-full p-3 text-[13px] text-[--color-ink] focus:outline-none resize-y font-mono" />
                </div>
              </FieldRow>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-1.5">Variables</div>
                <div className="flex flex-wrap gap-1.5">
                  {["{{business_name}}","{{customer_name}}","{{services}}","{{pricing}}","{{working_hours}}","{{knowledge_base}}","{{faqs}}"].map(v => (
                    <button key={v} onClick={() => setPrompt(p => p + " " + v)}
                      className="text-[11px] font-semibold px-2 py-1 rounded-md bg-[--color-primary-subdued] text-[--color-primary-deep] hover:bg-[--color-primary]/15 transition">
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["Website","PDF","Documents","FAQs","Policies","Google Docs","Notion","Manual Text","CRM Data"].map(s => {
                const active = sources.includes(s);
                return (
                  <button key={s} onClick={() => toggle(sources, s, setSources)}
                    className={`p-3 rounded-xl border transition text-left flex items-center gap-2 ${active ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                    <BookOpen size={14} className="text-[--color-primary-deep]" />
                    <span className="text-[12.5px] font-semibold text-[--color-ink]">{s}</span>
                    {active && <ShieldCheck size={12} className="ml-auto text-[--color-primary-deep]" />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Book Appointment","Cancel Appointment","Reschedule","Send SMS","Send Email","Take Payment","Generate Quote","Generate Invoice","Create Lead","Update CRM","Transfer Call","Lookup Customer","Collect Information","Schedule Follow-up"].map(t => {
                const active = tools.includes(t);
                return (
                  <button key={t} onClick={() => toggle(tools, t, setTools)}
                    className={`p-2.5 rounded-lg border transition text-left flex items-center gap-2 ${active ? "border-[--color-primary] bg-[--color-primary]/5" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                    <Wrench size={13} className={active ? "text-[--color-primary-deep]" : "text-[--color-muted]"} />
                    <span className="text-[12.5px] font-semibold text-[--color-ink] flex-1">{t}</span>
                    <Toggle on={active} />
                  </button>
                );
              })}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <FieldRow label="Provider">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Twilio","RingCentral","Telnyx","Vonage","Zoom Phone","BYON"].map(p => (
                    <button key={p} onClick={() => setProvider(p)}
                      className={`p-3 rounded-xl border transition text-left ${provider === p ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-[--color-primary-deep]" />
                        <span className="text-[12.5px] font-semibold text-[--color-ink]">{p}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </FieldRow>
              <FieldRow label="Assign number">
                <select className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px]">
                  <option>+1 214-555-0110 (New · US)</option>
                  <option>+1 800-555-0141 (Toll-free)</option>
                  <option>+44 20 7946 0958 (UK)</option>
                </select>
              </FieldRow>
              <div className="rounded-xl p-3 bg-gradient-to-br from-[--color-primary-subdued] to-white border border-violet-100 flex items-start gap-2">
                <Sparkles size={14} className="text-[--color-primary-deep] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-[--color-ink]">Ready to launch</div>
                  <div className="text-[11.5px] text-[--color-muted]">Your agent will go live in ~30 seconds after launch.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[--color-hairline] flex flex-col-reverse sm:flex-row sm:items-center gap-2">
          <Btn variant="ghost" size="md" onClick={onClose} className="w-full sm:w-auto justify-center">Cancel</Btn>
          <div className="sm:ml-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {step > 0 && <Btn variant="secondary" size="md" icon={<ChevronLeft size={13} />} onClick={back} className="w-full sm:w-auto justify-center">Back</Btn>}
            {step < WIZ_STEPS.length - 1 && <Btn variant="gradient" size="md" icon={<ChevronRight size={13} />} onClick={next} className="w-full sm:w-auto justify-center">Next: {WIZ_STEPS[step + 1]}</Btn>}
            {step === WIZ_STEPS.length - 1 && <Btn variant="gradient" size="md" icon={<Sparkles size={13} />} onClick={onClose} className="w-full sm:w-auto justify-center">Launch Agent</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-[--color-muted] uppercase tracking-widest mb-1.5">{label}</div>
      {children}
    </label>
  );
}

/* ─────────────── Live Call Panel ─────────────── */

function LiveCallPanel({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(82);
  const [muted, setMuted] = useState(false);
  const [holding, setHolding] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const transcript = [
    { s:"agent",    body:"Hi, this is Emma from RevenueSol HVAC. How can I help today?" },
    { s:"customer", body:"My furnace is making a weird noise, can someone come out?" },
    { s:"agent",    body:"Absolutely. Are you at 4210 Willow Ave?" },
    { s:"customer", body:"Yes." },
    { s:"agent",    body:"I have a 2:30 PM slot today. Does that work?" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[3px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl border border-[--color-hairline] max-h-[94vh] flex flex-col overflow-hidden"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.4))" }}>
        {/* Header (dark) */}
        <div className="relative p-4 sm:p-5 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #0F0B2E 0%, #1E1548 55%, #635BFF 100%)" }}>
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold truncate">Emma × Alicia Berg</div>
                <div className="text-[11.5px] text-white/70 truncate">+1 512 555 0198 · Booking HVAC tune-up</div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 shrink-0"><X size={16} /></button>
          </div>
          <div className="relative mt-4 flex items-center gap-3">
            <div className="text-[26px] sm:text-[32px] font-semibold tabular-nums tracking-tight">{mm}:{ss}</div>
            <div className="flex-1 flex items-end gap-0.5 h-10">
              {Array.from({ length: 60 }).map((_, i) => (
                <span key={i} className="flex-1 rounded-sm bg-emerald-400 animate-pulse" style={{ height: `${20 + Math.abs(Math.sin(i * 0.35 + seconds)) * 80}%`, animationDelay: `${i * 25}ms`, animationDuration: "700ms" }} />
              ))}
            </div>
          </div>
          <div className="relative mt-3 flex items-center gap-2 flex-wrap text-[10.5px] font-semibold">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"><Sparkles size={11} /> AI thinking</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-100">● Positive · 0.82</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"><Signal size={11} /> Latency 420ms</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-[--color-surface]/60">
          {transcript.map((l, i) => (
            <div key={i} className={`flex gap-2 ${l.s === "customer" ? "flex-row-reverse" : ""}`}>
              <span className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${l.s === "agent" ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white" : "bg-[--color-surface-strong]"}`}>
                {l.s === "agent" ? <Bot size={13} /> : <User size={13} />}
              </span>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${l.s === "agent" ? "bg-[--color-primary-subdued] text-[--color-ink]" : "bg-white border border-[--color-hairline] text-[--color-body]"}`}>
                {l.body}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 text-[11.5px] text-[--color-muted] pl-2">
            <Loader2 size={12} className="animate-spin" />
            Emma is listening…
          </div>
        </div>

        {/* Controls */}
        <div className="p-3 sm:p-4 border-t border-[--color-hairline] grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button onClick={() => setMuted(m => !m)} className={`h-11 rounded-xl font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5 transition ${muted ? "bg-rose-500 text-white" : "bg-[--color-surface-strong] text-[--color-ink] hover:bg-[--color-hairline]"}`}>
            {muted ? <MicOff size={13} /> : <Mic size={13} />}
            {muted ? "Muted" : "Mute"}
          </button>
          <button onClick={() => setHolding(h => !h)} className={`h-11 rounded-xl font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5 transition ${holding ? "bg-amber-500 text-white" : "bg-[--color-surface-strong] text-[--color-ink] hover:bg-[--color-hairline]"}`}>
            <Pause size={13} />
            {holding ? "Held" : "Hold"}
          </button>
          <button className="h-11 rounded-xl bg-[--color-surface-strong] text-[--color-ink] hover:bg-[--color-hairline] font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5">
            <ArrowRightLeft size={13} /> Transfer
          </button>
          <button className="h-11 rounded-xl text-white font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5" style={{ background: "var(--color-brand-gradient-2)" }}>
            <Mic size={13} /> Take over
          </button>
          <button onClick={onClose} className="h-11 rounded-xl bg-rose-500 text-white font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1">
            <PhoneOff size={13} /> End
          </button>
        </div>
      </div>
    </div>
  );
}
