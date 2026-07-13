import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Plus, Search, Download, Upload, Sparkles, LayoutTemplate,
  Mail, MessageSquare, Phone, Mic, Star, Zap, Users, Layers, Split,
  BarChart3, Archive, LayoutDashboard, Megaphone,
  Play, Pause, Copy, MoreHorizontal, X, ChevronRight, ChevronLeft,
  Send, Calendar, Clock, Wand2, Image as ImageIcon, Type, Bold, Italic,
  Link2, Smile, Gift, Tag as TagIcon, Eye, Monitor, Tablet, Smartphone,
  Moon, Sun, TrendingUp, TrendingDown, ArrowUpRight, Bot,
  Target, Repeat, MessageCircle, ThumbsUp, DollarSign, Percent,
  Activity, Flame, ShieldCheck, Languages, ListChecks,
  Filter as FilterIcon, CircleDot,
} from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — RevenueSol" },
      { name: "description", content: "AI-powered omnichannel marketing center. Create, launch, monitor and optimize campaigns across Email, SMS, WhatsApp, Voice and more." },
    ],
  }),
  component: CampaignsPage,
});

/* ─────────────── Types & Data ─────────────── */

type Channel = "email" | "sms" | "whatsapp" | "voice" | "ai-voice" | "review" | "reminder" | "drip" | "automation";
type Status = "Live" | "Scheduled" | "Draft" | "Paused" | "Completed";

interface Campaign {
  id: string;
  name: string;
  channel: Channel;
  status: Status;
  audience: string;
  audienceSize: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replies: number;
  conversions: number;
  revenue: number;
  createdBy: string;
  updated: string;
  tag?: string;
}

const CHANNEL_META: Record<Channel, { label: string; icon: React.ReactNode; tint: string; ring: string }> = {
  email:     { label: "Email",             icon: <Mail size={12} />,          tint: "bg-indigo-50 text-indigo-700",   ring: "ring-indigo-200" },
  sms:       { label: "SMS",               icon: <MessageSquare size={12} />, tint: "bg-emerald-50 text-emerald-700", ring: "ring-emerald-200" },
  whatsapp:  { label: "WhatsApp",          icon: <MessageCircle size={12} />, tint: "bg-green-50 text-green-700",     ring: "ring-green-200" },
  voice:     { label: "Voice",             icon: <Phone size={12} />,         tint: "bg-sky-50 text-sky-700",         ring: "ring-sky-200" },
  "ai-voice":{ label: "AI Voice",          icon: <Mic size={12} />,           tint: "bg-violet-50 text-violet-700",   ring: "ring-violet-200" },
  review:    { label: "Review",            icon: <Star size={12} />,          tint: "bg-amber-50 text-amber-700",     ring: "ring-amber-200" },
  reminder:  { label: "Reminder",          icon: <Clock size={12} />,         tint: "bg-orange-50 text-orange-700",   ring: "ring-orange-200" },
  drip:      { label: "Drip",              icon: <Layers size={12} />,        tint: "bg-fuchsia-50 text-fuchsia-700", ring: "ring-fuchsia-200" },
  automation:{ label: "Automation",        icon: <Zap size={12} />,           tint: "bg-rose-50 text-rose-700",       ring: "ring-rose-200" },
};

const SEED: Campaign[] = [
  { id:"c1",  name:"July Tune-up Promo",           channel:"sms",       status:"Live",      audience:"Active customers",   audienceSize:1284, sent:1284, delivered:1258, opened:892, clicked:214, replies:48, conversions:36, revenue:12480, createdBy:"You",     updated:"2h ago",   tag:"Seasonal" },
  { id:"c2",  name:"Fall Furnace Check — Email",   channel:"email",     status:"Scheduled", audience:"HVAC segment",       audienceSize:842,  sent:0,    delivered:0,    opened:0,   clicked:0,   replies:0,  conversions:0,  revenue:0,     createdBy:"Elena R.", updated:"1d ago",   tag:"Seasonal" },
  { id:"c3",  name:"5-Star Google Push",           channel:"review",    status:"Completed", audience:"Recent jobs",        audienceSize:412,  sent:412,  delivered:406,  opened:301, clicked:167, replies:34, conversions:88, revenue:0,     createdBy:"You",     updated:"3d ago" },
  { id:"c4",  name:"Cold Lead Reactivation",       channel:"drip",      status:"Live",      audience:"Inactive 90d+",      audienceSize:672,  sent:672,  delivered:660,  opened:412, clicked:98,  replies:23, conversions:14, revenue:5620,  createdBy:"Marcus L.",updated:"5h ago" },
  { id:"c5",  name:"WhatsApp Appointment Reminders",channel:"whatsapp", status:"Live",      audience:"Booked next 7d",     audienceSize:184,  sent:184,  delivered:181,  opened:174, clicked:22,  replies:19, conversions:12, revenue:2140,  createdBy:"System",  updated:"12m ago",  tag:"Auto" },
  { id:"c6",  name:"AI Voice: Estimate Follow-up", channel:"ai-voice",  status:"Live",      audience:"Quotes sent 3d+",    audienceSize:96,   sent:96,   delivered:92,   opened:78,  clicked:0,   replies:41, conversions:19, revenue:14200, createdBy:"You",     updated:"1h ago",   tag:"AI" },
  { id:"c7",  name:"Win-back — VIP Customers",     channel:"email",     status:"Draft",     audience:"VIP inactive",       audienceSize:128,  sent:0,    delivered:0,    opened:0,   clicked:0,   replies:0,  conversions:0,  revenue:0,     createdBy:"You",     updated:"4d ago" },
  { id:"c8",  name:"Missed Call Auto Text-back",   channel:"automation",status:"Live",      audience:"Missed calls",       audienceSize:0,    sent:2140, delivered:2118, opened:1904,clicked:412, replies:214,conversions:98, revenue:24800, createdBy:"System",  updated:"just now", tag:"Auto" },
  { id:"c9",  name:"Holiday Coupon — 20% Off",     channel:"sms",       status:"Scheduled", audience:"All customers",      audienceSize:3402, sent:0,    delivered:0,    opened:0,   clicked:0,   replies:0,  conversions:0,  revenue:0,     createdBy:"Priya S.",updated:"6h ago",   tag:"Promo" },
  { id:"c10", name:"Post-Job Review Request",      channel:"review",    status:"Live",      audience:"Completed jobs",     audienceSize:0,    sent:891,  delivered:882,  opened:722, clicked:398, replies:56, conversions:198,revenue:0,     createdBy:"System",  updated:"3h ago",   tag:"Auto" },
  { id:"c11", name:"Newsletter — August Edition",  channel:"email",     status:"Paused",    audience:"Newsletter list",    audienceSize:5820, sent:2100, delivered:2071, opened:1104,clicked:284, replies:12, conversions:31, revenue:6820,  createdBy:"Elena R.", updated:"1d ago" },
  { id:"c12", name:"Voice Broadcast — Emergency",  channel:"voice",     status:"Completed", audience:"City: Denver",       audienceSize:412,  sent:412,  delivered:398,  opened:341, clicked:0,   replies:74, conversions:44, revenue:18400, createdBy:"You",     updated:"1w ago" },
  { id:"c13", name:"New Lead 7-Day Nurture",       channel:"drip",      status:"Live",      audience:"New leads",          audienceSize:214,  sent:642,  delivered:634,  opened:412, clicked:118, replies:31, conversions:22, revenue:8940,  createdBy:"You",     updated:"2h ago",   tag:"Drip" },
  { id:"c14", name:"Birthday Coupon",              channel:"automation",status:"Live",      audience:"Birthday today",     audienceSize:0,    sent:184,  delivered:182,  opened:158, clicked:41,  replies:5,  conversions:12, revenue:1420,  createdBy:"System",  updated:"5h ago",   tag:"Auto" },
  { id:"c15", name:"Spring Preview Draft",         channel:"email",     status:"Draft",     audience:"—",                  audienceSize:0,    sent:0,    delivered:0,    opened:0,   clicked:0,   replies:0,  conversions:0,  revenue:0,     createdBy:"You",     updated:"2w ago" },
];

/* ─────────────── Page ─────────────── */

type View =
  | "dashboard" | "all" | "email" | "sms" | "whatsapp" | "voice" | "review"
  | "automations" | "templates" | "audience" | "segments" | "abtests"
  | "analytics" | "archived";

function CampaignsPage() {
  const [view, setView] = useState<View>("dashboard");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const rows = useMemo(() => {
    const byChannel: Partial<Record<View, Channel>> = {
      email: "email", sms: "sms", whatsapp: "whatsapp",
      voice: "voice", review: "review", automations: "automation",
    };
    let list = SEED;
    if (byChannel[view]) list = list.filter(r => r.channel === byChannel[view] || (view === "voice" && r.channel === "ai-voice"));
    if (filter !== "all") list = list.filter(r => r.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.audience.toLowerCase().includes(q));
    }
    return list;
  }, [view, filter, query]);

  const kpis = useMemo(() => {
    const total = SEED.length;
    const active = SEED.filter(c => c.status === "Live").length;
    const scheduled = SEED.filter(c => c.status === "Scheduled").length;
    const completed = SEED.filter(c => c.status === "Completed").length;
    const sent = SEED.reduce((a, c) => a + c.sent, 0);
    const opened = SEED.reduce((a, c) => a + c.opened, 0);
    const clicked = SEED.reduce((a, c) => a + c.clicked, 0);
    const replies = SEED.reduce((a, c) => a + c.replies, 0);
    const conv = SEED.reduce((a, c) => a + c.conversions, 0);
    const rev = SEED.reduce((a, c) => a + c.revenue, 0);
    return {
      total, active, scheduled, completed,
      openRate: sent ? Math.round((opened / sent) * 1000) / 10 : 0,
      clickRate: sent ? Math.round((clicked / sent) * 1000) / 10 : 0,
      replyRate: sent ? Math.round((replies / sent) * 1000) / 10 : 0,
      convRate: sent ? Math.round((conv / sent) * 1000) / 10 : 0,
      revenue: rev, roi: 4.8, sent, calls: 508, reviews: 286, appts: 142,
    };
  }, []);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1500px] mx-auto">
      <PageHeader
        title="Campaigns"
        subtitle="AI-powered omnichannel marketing operating system"
        actions={
          <>
            <Btn variant="secondary" size="md" icon={<Upload size={13} />} className="hidden sm:inline-flex">Import Audience</Btn>
            <Btn variant="secondary" size="md" icon={<Download size={13} />} className="hidden md:inline-flex">Export</Btn>
            <Btn variant="secondary" size="md" icon={<LayoutTemplate size={13} />} className="hidden md:inline-flex">Templates</Btn>
            <Btn variant="secondary" size="md" icon={<Sparkles size={13} />} onClick={() => setAiOpen(true)} className="hidden sm:inline-flex">AI Builder</Btn>
            <Btn variant="gradient" size="md" icon={<Plus size={14} />} onClick={() => setWizardOpen(true)}>New Campaign</Btn>
          </>
        }
      />

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Kpi label="Active"       value={kpis.active}         icon={<Activity size={14} />} accent="from-emerald-500 to-teal-500" delta="+3 this wk" up />
        <Kpi label="Scheduled"    value={kpis.scheduled}      icon={<Clock size={14} />}    accent="from-sky-500 to-cyan-500" />
        <Kpi label="Open Rate"    value={`${kpis.openRate}%`} icon={<Eye size={14} />}      accent="from-indigo-500 to-violet-500" delta="+2.4pt" up />
        <Kpi label="Click Rate"   value={`${kpis.clickRate}%`} icon={<Target size={14} />}  accent="from-fuchsia-500 to-pink-500" />
        <Kpi label="Conv. Rate"   value={`${kpis.convRate}%`} icon={<ThumbsUp size={14} />} accent="from-amber-500 to-orange-500" delta="+0.8pt" up />
        <Kpi label="Revenue"      value={`$${kCompact(kpis.revenue)}`} icon={<DollarSign size={14} />} accent="from-violet-500 to-indigo-500" delta={`ROI ${kpis.roi}x`} up />
      </div>

      {/* SECONDARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <MiniStat icon={<Send size={13} />}     label="Messages sent"  value={kpis.sent.toLocaleString()} tone="primary" />
        <MiniStat icon={<Phone size={13} />}    label="Calls made"     value={kpis.calls.toLocaleString()} tone="info" />
        <MiniStat icon={<Star size={13} />}     label="Reviews"        value={kpis.reviews.toLocaleString()} tone="warning" />
        <MiniStat icon={<Calendar size={13} />} label="Appointments"   value={kpis.appts.toLocaleString()} tone="success" />
      </div>

      {/* CHART + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-3 sm:gap-4 mb-4">
        <Card padded={false} className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <div className="text-[13px] font-semibold text-[--color-ink]">Performance</div>
              <div className="text-[11.5px] text-[--color-muted]">Opens · Clicks · Conversions — last 14 days</div>
            </div>
            <div className="inline-flex p-0.5 rounded-lg bg-[--color-surface-strong] text-[11px] font-semibold">
              {["7d","14d","30d","90d"].map((r, i) => (
                <button key={r} className={`px-2.5 py-1 rounded-md transition ${i===1 ? "bg-white text-[--color-ink] shadow-sm" : "text-[--color-muted]"}`}>{r}</button>
              ))}
            </div>
          </div>
          <PerfChart />
          <div className="mt-3 pt-3 border-t border-[--color-hairline] grid grid-cols-3 gap-3">
            <Legend color="#635BFF" label="Opens"       value="12,842" />
            <Legend color="#EC4899" label="Clicks"      value="3,914" />
            <Legend color="#10B981" label="Conversions" value="1,208" />
          </div>
        </Card>

        <Card padded={false} className="p-3 sm:p-4 overflow-hidden relative">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: "var(--color-brand-gradient-2)" }} />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Sparkles size={15} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[--color-ink]">RevenueSol AI</div>
              <div className="text-[11px] text-[--color-muted]">Campaign Assistant</div>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <AiSuggestion icon={<Wand2 size={12} />} title="Best send time is Tue 10:14 AM" body="For your HVAC segment — projected +18% opens." />
            <AiSuggestion icon={<Flame size={12} />} title="Cold Lead Reactivation heating up" body="Add SMS follow-up on day 3 — est +$2,400." />
            <AiSuggestion icon={<ShieldCheck size={12} />} title="Spam score: 2.1 / 10" body="Your July Promo is safe. Nice work." />
          </div>
          <button
            onClick={() => setAiOpen(true)}
            className="mt-3 w-full h-9 rounded-lg text-[12px] font-semibold text-white transition hover:opacity-90"
            style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }}
          >
            Open AI Builder
          </button>
        </Card>
      </div>

      {/* SUB NAV */}
      <div className="mb-3 sm:mb-4 border-b border-[--color-hairline] -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {([
            { id:"dashboard",  label:"Dashboard",     icon:<LayoutDashboard size={13} /> },
            { id:"all",        label:"All Campaigns", icon:<Megaphone size={13} />,      count: SEED.length },
            { id:"email",      label:"Email",         icon:<Mail size={13} />,           count: SEED.filter(c=>c.channel==="email").length },
            { id:"sms",        label:"SMS",           icon:<MessageSquare size={13} />,  count: SEED.filter(c=>c.channel==="sms").length },
            { id:"whatsapp",   label:"WhatsApp",      icon:<MessageCircle size={13} />,  count: SEED.filter(c=>c.channel==="whatsapp").length },
            { id:"voice",      label:"Voice AI",      icon:<Mic size={13} />,            count: SEED.filter(c=>c.channel==="voice"||c.channel==="ai-voice").length },
            { id:"review",     label:"Reviews",       icon:<Star size={13} />,           count: SEED.filter(c=>c.channel==="review").length },
            { id:"automations",label:"Automations",   icon:<Zap size={13} />,            count: SEED.filter(c=>c.channel==="automation").length },
            { id:"templates",  label:"Templates",     icon:<LayoutTemplate size={13} /> },
            { id:"audience",   label:"Audience",      icon:<Users size={13} /> },
            { id:"segments",   label:"Segments",      icon:<Layers size={13} /> },
            { id:"abtests",    label:"A/B Tests",     icon:<Split size={13} /> },
            { id:"analytics",  label:"Analytics",     icon:<BarChart3 size={13} /> },
            { id:"archived",   label:"Archived",      icon:<Archive size={13} /> },
          ] as { id: View; label: string; icon: React.ReactNode; count?: number }[]).map(t => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setView(t.id); setFilter("all"); }}
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

      {view === "templates"  && <TemplatesView />}
      {view === "audience"   && <AudienceView />}
      {view === "segments"   && <SegmentsView />}
      {view === "abtests"    && <ABTestsView />}
      {view === "analytics"  && <AnalyticsView />}
      {view === "archived"   && <EmptyState icon={<Archive size={22} />} title="Nothing archived yet" body="Archived campaigns will appear here for future reference." />}

      {["dashboard","all","email","sms","whatsapp","voice","review","automations"].includes(view) && (
        <>
          {/* FILTER CHIPS */}
          <div className="mb-3 -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max pb-1">
              {(["all","Live","Scheduled","Draft","Paused","Completed"] as const).map(f => {
                const active = filter === f;
                const count = f === "all" ? rows.length : SEED.filter(r => r.status === f).length;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition ${
                      active ? "bg-[var(--color-ink)] text-white" : "bg-white border border-[--color-hairline] text-[--color-body] hover:bg-[--color-surface-strong]"
                    }`}
                  >
                    <StatusDot s={f === "all" ? "all" : f} />
                    {f === "all" ? "All statuses" : f}
                    <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${active ? "bg-white/15" : "bg-[--color-surface-strong]"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTION BAR */}
          <Card padded={false} className="mb-3">
            <div className="flex items-center gap-2 p-2 sm:p-2.5">
              <div className="flex-1 relative min-w-0">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-muted]" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search campaigns, audiences, tags…"
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-[--color-hairline] bg-[--color-surface] text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30"
                />
              </div>
              <Btn variant="secondary" size="sm" icon={<FilterIcon size={12} />} className="hidden sm:inline-flex">Filter</Btn>
              <Btn variant="secondary" size="sm" icon={<ListChecks size={12} />} className="hidden md:inline-flex">Views</Btn>
            </div>
          </Card>

          {/* TABLE (desktop) */}
          <Card padded={false} className="hidden md:block overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead className="bg-[--color-surface-strong]/60 text-[10.5px] uppercase tracking-widest text-[--color-muted] font-semibold">
                  <tr>
                    <th className="text-left px-4 py-2.5 w-8"><input type="checkbox" className="rounded" /></th>
                    <th className="text-left px-3 py-2.5">Campaign</th>
                    <th className="text-left px-3 py-2.5">Type</th>
                    <th className="text-left px-3 py-2.5">Status</th>
                    <th className="text-right px-3 py-2.5">Audience</th>
                    <th className="text-right px-3 py-2.5">Sent</th>
                    <th className="text-right px-3 py-2.5">Open</th>
                    <th className="text-right px-3 py-2.5">Click</th>
                    <th className="text-right px-3 py-2.5">Reply</th>
                    <th className="text-right px-3 py-2.5">Conv.</th>
                    <th className="text-right px-3 py-2.5">Revenue</th>
                    <th className="text-left px-3 py-2.5">Updated</th>
                    <th className="text-right px-3 py-2.5 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-hairline]">
                  {rows.map(c => (
                    <tr key={c.id} onClick={() => setSelected(c)} className="hover:bg-[--color-surface-strong]/40 cursor-pointer transition">
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded" /></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <ChannelIcon ch={c.channel} />
                          <div className="min-w-0">
                            <div className="font-semibold text-[--color-ink] truncate">{c.name}</div>
                            <div className="text-[11px] text-[--color-muted] truncate">{c.audience} {c.tag && <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full bg-[--color-primary-subdued] text-[--color-primary-deep] text-[9.5px] font-bold">{c.tag}</span>}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3"><ChannelTag ch={c.channel} /></td>
                      <td className="px-3 py-3"><StatusTag s={c.status} /></td>
                      <td className="px-3 py-3 text-right tabular-nums text-[--color-body]">{c.audienceSize ? c.audienceSize.toLocaleString() : "—"}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{c.sent ? c.sent.toLocaleString() : "—"}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{pct(c.opened, c.sent)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{pct(c.clicked, c.sent)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{c.replies || "—"}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{c.conversions || "—"}</td>
                      <td className="px-3 py-3 text-right tabular-nums font-semibold text-[--color-ink]">{c.revenue ? `$${c.revenue.toLocaleString()}` : "—"}</td>
                      <td className="px-3 py-3 text-[11.5px] text-[--color-muted] whitespace-nowrap">{c.updated}</td>
                      <td className="px-3 py-3 text-right" onClick={e => e.stopPropagation()}>
                        <button className="w-7 h-7 grid place-items-center rounded-md hover:bg-[--color-surface-strong]"><MoreHorizontal size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* CARD LIST (mobile) */}
          <div className="md:hidden space-y-2">
            {rows.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="w-full text-left bg-white rounded-xl border border-[--color-hairline] p-3 active:bg-[--color-surface-strong]/60 transition"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start gap-2.5">
                  <ChannelIcon ch={c.channel} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-[--color-ink] text-[13px] truncate">{c.name}</div>
                        <div className="text-[11px] text-[--color-muted] truncate">{c.audience}</div>
                      </div>
                      <StatusTag s={c.status} />
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1.5 text-[11px]">
                      <MetricPill label="Sent" v={c.sent ? kCompact(c.sent) : "—"} />
                      <MetricPill label="Open" v={pct(c.opened, c.sent)} />
                      <MetricPill label="Conv" v={String(c.conversions || "—")} />
                      <MetricPill label="Rev" v={c.revenue ? `$${kCompact(c.revenue)}` : "—"} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {rows.length === 0 && (
            <EmptyState icon={<Megaphone size={22} />} title="No campaigns match" body="Try changing filters or search terms." />
          )}
        </>
      )}

      {/* Floating AI FAB */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-5 right-5 z-40 h-12 w-12 sm:h-14 sm:w-auto sm:px-5 rounded-full text-white font-semibold text-[13px] shadow-lg flex items-center gap-2 hover:opacity-90 transition"
        style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow), 0 12px 28px -8px rgba(99,91,255,0.5)" }}
      >
        <Sparkles size={16} />
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      {selected && <DetailsDrawer c={selected} onClose={() => setSelected(null)} />}
      {wizardOpen && <CreateWizard onClose={() => setWizardOpen(false)} />}
      {aiOpen && <AiAssistant onClose={() => setAiOpen(false)} onLaunch={() => { setAiOpen(false); setWizardOpen(true); }} />}
    </div>
  );
}

/* ─────────────── Bits ─────────────── */

function kCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
function pct(part: number, total: number) {
  if (!total) return "—";
  return `${Math.round((part / total) * 1000) / 10}%`;
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

function Kpi({ label, value, icon, accent, delta, up }: {
  label: string; value: number | string; icon: React.ReactNode; accent: string; delta?: string; up?: boolean;
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
          <div className="text-[9.5px] sm:text-[10px] uppercase tracking-widest font-semibold text-[--color-muted] truncate">{label}</div>
          <div className="text-[17px] sm:text-[22px] font-semibold tracking-tight mt-1 text-[--color-ink] tabular-nums truncate">{display}</div>
          {delta && (
            <div className={`text-[10.5px] font-medium mt-0.5 inline-flex items-center gap-0.5 ${up ? "text-emerald-600" : "text-[--color-muted]"}`}>
              {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
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

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
        <div className="text-[13px] font-semibold tabular-nums text-[--color-ink]">{value}</div>
      </div>
    </div>
  );
}

function StatusDot({ s }: { s: Status | "all" }) {
  const map: Record<string, string> = {
    all: "bg-neutral-400", Live: "bg-emerald-500", Scheduled: "bg-sky-500",
    Draft: "bg-neutral-400", Paused: "bg-amber-500", Completed: "bg-violet-500",
  };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${map[s]}`} />;
}

function StatusTag({ s }: { s: Status }) {
  const map: Record<Status, { tone: "success"|"info"|"neutral"|"warning"|"primary"; dot: string }> = {
    Live:      { tone: "success", dot: "bg-emerald-500" },
    Scheduled: { tone: "info",    dot: "bg-sky-500" },
    Draft:     { tone: "neutral", dot: "bg-neutral-400" },
    Paused:    { tone: "warning", dot: "bg-amber-500" },
    Completed: { tone: "primary", dot: "bg-violet-500" },
  };
  const m = map[s];
  return (
    <Tag tone={m.tone}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {s}
    </Tag>
  );
}

function ChannelIcon({ ch }: { ch: Channel }) {
  const m = CHANNEL_META[ch];
  return <span className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${m.tint}`}>{m.icon}</span>;
}
function ChannelTag({ ch }: { ch: Channel }) {
  const m = CHANNEL_META[ch];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${m.tint}`}>
      {m.icon}{m.label}
    </span>
  );
}

function MetricPill({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg bg-[--color-surface-strong]/60 px-2 py-1.5 text-center">
      <div className="text-[9px] uppercase tracking-widest font-bold text-[--color-muted]">{label}</div>
      <div className="text-[12px] font-semibold text-[--color-ink] tabular-nums">{v}</div>
    </div>
  );
}

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

/* ─────────────── Chart ─────────────── */

function PerfChart() {
  const opens =   [22, 34, 28, 45, 39, 58, 52, 66, 61, 74, 68, 82, 79, 90];
  const clicks =  [8, 12, 10, 18, 14, 22, 19, 28, 24, 32, 27, 40, 36, 46];
  const conv =    [2,  4,  3,  6,  5,  8,  7, 10, 12, 14, 15, 19, 22, 26];
  const w = 640, h = 160, pad = 8;
  const max = Math.max(...opens);
  const step = (w - pad * 2) / (opens.length - 1);
  const line = (arr: number[]) =>
    arr.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / max) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    }).join(" ");
  const areaOf = (arr: number[]) => {
    const first = `M${pad},${h - pad}`;
    const pts = arr.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / max) * (h - pad * 2);
      return `L${x},${y}`;
    }).join(" ");
    return `${first} ${pts} L${pad + step * (arr.length - 1)},${h - pad} Z`;
  };
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28 sm:h-36" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cGradOpens" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaOf(opens)} fill="url(#cGradOpens)" />
        <path d={line(opens)} fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" />
        <path d={line(clicks)} fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeDasharray="0" />
        <path d={line(conv)} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ─────────────── Templates / Audience / Segments / A/B / Analytics ─────────────── */

function TemplatesView() {
  const templates = [
    { name: "Welcome Series",       ch: "email" as Channel, uses: 214 },
    { name: "Review Request",       ch: "review" as Channel, uses: 892 },
    { name: "Appointment Reminder", ch: "sms" as Channel, uses: 1204 },
    { name: "Holiday Offer 20%",    ch: "sms" as Channel, uses: 88 },
    { name: "Abandoned Lead",       ch: "email" as Channel, uses: 142 },
    { name: "Thank You — Post Job", ch: "whatsapp" as Channel, uses: 402 },
    { name: "Missed Call Text-back",ch: "sms" as Channel, uses: 2140 },
    { name: "Estimate Follow-up",   ch: "ai-voice" as Channel, uses: 96 },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {templates.map(t => (
        <button key={t.name} className="text-left bg-white rounded-2xl border border-[--color-hairline] p-3 hover:-translate-y-[1px] transition"
          style={{ boxShadow: "var(--shadow-card)" }}>
          <ChannelIcon ch={t.ch} />
          <div className="mt-2 text-[13px] font-semibold text-[--color-ink] truncate">{t.name}</div>
          <div className="text-[11px] text-[--color-muted] mt-0.5">{t.uses.toLocaleString()} uses</div>
          <div className="mt-3 pt-3 border-t border-[--color-hairline] flex items-center justify-between">
            <ChannelTag ch={t.ch} />
            <span className="text-[11px] font-semibold text-[--color-primary-deep] inline-flex items-center gap-0.5">Use <ArrowUpRight size={11} /></span>
          </div>
        </button>
      ))}
    </div>
  );
}

function AudienceView() {
  const groups = [
    { name: "All Customers",       size: 3402, tint: "from-indigo-500 to-violet-500" },
    { name: "Leads",               size:  684, tint: "from-sky-500 to-cyan-500" },
    { name: "VIP",                 size:  128, tint: "from-amber-500 to-orange-500" },
    { name: "Past Customers",      size: 1892, tint: "from-emerald-500 to-teal-500" },
    { name: "Inactive Customers",  size:  742, tint: "from-rose-500 to-pink-500" },
    { name: "New Leads",           size:  214, tint: "from-fuchsia-500 to-pink-500" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {groups.map(g => (
        <Card key={g.name} className="relative overflow-hidden">
          <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${g.tint} opacity-15 blur-xl`} />
          <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">{g.name}</div>
          <div className="text-[22px] font-semibold text-[--color-ink] tabular-nums mt-1">{g.size.toLocaleString()}</div>
          <div className="mt-3 flex items-center gap-2">
            <Btn size="sm" variant="secondary" icon={<Send size={12} />}>Campaign</Btn>
            <Btn size="sm" variant="ghost" icon={<Eye size={12} />}>View</Btn>
          </div>
        </Card>
      ))}
      <Card className="border-dashed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]"><Upload size={16} /></div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-[--color-ink]">Upload CSV</div>
            <div className="text-[11.5px] text-[--color-muted]">Import a custom audience list</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SegmentsView() {
  const segments = [
    "Customers with unpaid invoices",
    "Customers with completed jobs (30d)",
    "Customers who never reviewed",
    "Inactive 90+ days",
    "High-value ($5k+ LTV)",
    "New leads (7d)",
    "Returning customers",
    "By city — Denver",
    "By technician — Marcus L.",
    "By service — HVAC install",
    "AI: Likely to churn (14d)",
    "AI: Likely to book (7d)",
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {segments.map(s => (
        <button key={s} className="text-left bg-white rounded-xl border border-[--color-hairline] p-3 hover:bg-[--color-surface-strong]/40 transition flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {s.startsWith("AI:") ? <Sparkles size={14} className="text-[--color-primary-deep] shrink-0" /> : <CircleDot size={14} className="text-[--color-muted] shrink-0" />}
            <span className="text-[12.5px] font-medium text-[--color-ink] truncate">{s}</span>
          </div>
          <ChevronRight size={14} className="text-[--color-muted] shrink-0" />
        </button>
      ))}
    </div>
  );
}

function ABTestsView() {
  const tests = [
    { name: "Subject: Emoji vs Plain",     winner: "A", uplift: "+18.4%", conf: 96 },
    { name: "CTA: Book Now vs Get Quote",  winner: "B", uplift: "+7.2%",  conf: 88 },
    { name: "Send time: 9am vs 6pm",       winner: "A", uplift: "+11.9%", conf: 91 },
  ];
  return (
    <div className="space-y-2">
      {tests.map(t => (
        <Card key={t.name} className="!p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[--color-ink] truncate">{t.name}</div>
              <div className="text-[11px] text-[--color-muted] mt-0.5">Confidence {t.conf}%</div>
            </div>
            <div className="flex items-center gap-2">
              <Tag tone="success">Winner: {t.winner}</Tag>
              <span className="text-[13px] font-semibold text-emerald-600 tabular-nums">{t.uplift}</span>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${t.conf}%` }} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function AnalyticsView() {
  const rows = [
    { label: "Email",    open: 42.1, click: 8.4,  conv: 3.1 },
    { label: "SMS",      open: 96.2, click: 24.8, conv: 6.4 },
    { label: "WhatsApp", open: 94.8, click: 18.2, conv: 8.9 },
    { label: "Voice AI", open: 88.4, click: 0,    conv: 12.4 },
    { label: "Review",   open: 71.6, click: 44.2, conv: 24.1 },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Performance by Channel</div>
        <div className="space-y-3">
          {rows.map(r => (
            <div key={r.label}>
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className="font-semibold text-[--color-ink]">{r.label}</span>
                <span className="text-[--color-muted] tabular-nums">Open {r.open}% · Click {r.click}% · Conv {r.conv}%</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-[--color-surface-strong]">
                <div style={{ width: `${r.open}%`, background: "#635BFF" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Conversion Funnel</div>
        {[
          { label: "Sent",       v: 12480, pct: 100, c: "from-indigo-500 to-violet-500" },
          { label: "Delivered",  v: 12210, pct: 97,  c: "from-violet-500 to-fuchsia-500" },
          { label: "Opened",     v:  7842, pct: 63,  c: "from-fuchsia-500 to-pink-500" },
          { label: "Clicked",    v:  2914, pct: 23,  c: "from-pink-500 to-rose-500" },
          { label: "Converted",  v:   942, pct:  7,  c: "from-rose-500 to-orange-500" },
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
        <div className="text-[13px] font-semibold text-[--color-ink] mb-3">Send-time Heatmap</div>
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
            return (
              <div key={`${r}-${c}`} className="w-4 h-4 rounded-sm" style={{ background: `rgba(99, 91, 255, ${alpha})` }} />
            );
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

/* ─────────────── Details Drawer ─────────────── */

function DetailsDrawer({ c, onClose }: { c: Campaign; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:max-w-[520px] bg-white border-l border-[--color-hairline] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        <div className="p-4 sm:p-5 border-b border-[--color-hairline] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ChannelIcon ch={c.channel} />
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink] truncate">{c.name}</div>
              <div className="text-[11.5px] text-[--color-muted] flex items-center gap-2 mt-0.5"><ChannelTag ch={c.channel} /><StatusTag s={c.status} /></div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <MetricBox label="Sent"       v={c.sent ? c.sent.toLocaleString() : "—"} />
            <MetricBox label="Delivered"  v={c.delivered ? c.delivered.toLocaleString() : "—"} />
            <MetricBox label="Opened"     v={c.opened ? c.opened.toLocaleString() : "—"} />
            <MetricBox label="Clicked"    v={c.clicked ? c.clicked.toLocaleString() : "—"} />
            <MetricBox label="Replies"    v={String(c.replies || "—")} />
            <MetricBox label="Conversions" v={String(c.conversions || "—")} />
          </div>

          <div className="rounded-xl p-3 bg-gradient-to-br from-[--color-primary-subdued] to-white border border-violet-100">
            <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">Revenue</div>
            <div className="text-[22px] font-semibold tabular-nums text-[--color-ink]">{c.revenue ? `$${c.revenue.toLocaleString()}` : "$0"}</div>
            <div className="text-[11px] text-[--color-muted]">ROI 4.8x · Cost $2,600</div>
          </div>

          <section>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Audience</div>
            <div className="rounded-lg border border-[--color-hairline] p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]"><Users size={16} /></div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[--color-ink] truncate">{c.audience}</div>
                <div className="text-[11.5px] text-[--color-muted]">{c.audienceSize ? `${c.audienceSize.toLocaleString()} recipients` : "Trigger-based · rolling"}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Timeline</div>
            <ul className="space-y-2">
              {[
                { t: "Launched",       time: c.updated, icon: <Send size={12} />, tone: "text-emerald-600 bg-emerald-50" },
                { t: "AI optimized send-time", time: "2h ago", icon: <Sparkles size={12} />, tone: "text-violet-600 bg-violet-50" },
                { t: "Audience refreshed",     time: "6h ago", icon: <Users size={12} />, tone: "text-sky-600 bg-sky-50" },
                { t: "Draft created",  time: "1d ago",  icon: <LayoutTemplate size={12} />, tone: "text-[--color-muted] bg-[--color-surface-strong]" },
              ].map((e, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-lg grid place-items-center shrink-0 ${e.tone}`}>{e.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-[--color-ink]">{e.t}</div>
                    <div className="text-[11px] text-[--color-muted]">{e.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="p-3 sm:p-4 border-t border-[--color-hairline] grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Btn variant="secondary" size="sm" icon={c.status === "Paused" ? <Play size={12} /> : <Pause size={12} />} className="justify-center">{c.status === "Paused" ? "Resume" : "Pause"}</Btn>
          <Btn variant="secondary" size="sm" icon={<Copy size={12} />} className="justify-center">Duplicate</Btn>
          <Btn variant="secondary" size="sm" icon={<Sparkles size={12} />} className="justify-center">AI Version</Btn>
          <Btn variant="danger"    size="sm" icon={<Archive size={12} />} className="justify-center">Archive</Btn>
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

/* ─────────────── Create Wizard ─────────────── */

const WIZ_STEPS = ["Type","Audience","Message","Schedule","Preview"] as const;

function CreateWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<Channel>("email");
  const [audience, setAudience] = useState("All Customers");
  const [subject, setSubject] = useState("Special offer for you");
  const [body, setBody] = useState("Hi {{customer_name}},\n\nGet 20% off your next service — book by Friday.\n\n{{payment_link}}");
  const [schedule, setSchedule] = useState<"now"|"later"|"recurring">("now");
  const [device, setDevice] = useState<"desktop"|"tablet"|"mobile">("desktop");
  const [dark, setDark] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, WIZ_STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-3xl bg-white rounded-t-2xl sm:rounded-2xl border border-[--color-hairline] max-h-[94vh] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[--color-hairline]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}>
              <Plus size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink]">New Campaign</div>
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
                <div className={`h-1.5 w-8 sm:w-14 rounded-full ${i <= step ? "bg-[--color-primary]" : "bg-[--color-surface-strong]"}`} />
                <span className={`text-[11px] font-semibold pr-2 ${i === step ? "text-[--color-ink]" : "text-[--color-muted]"}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {step === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {([
                { id:"email",    label:"Email",             desc:"Rich HTML, drag-drop" },
                { id:"sms",      label:"SMS",               desc:"160-char reach, 96% open" },
                { id:"whatsapp", label:"WhatsApp",          desc:"Rich media, 2-way" },
                { id:"voice",    label:"Voice Broadcast",   desc:"Prerecorded audio" },
                { id:"ai-voice", label:"AI Voice",          desc:"Live AI conversation" },
                { id:"review",   label:"Review Request",    desc:"Google & Yelp push" },
                { id:"reminder", label:"Appointment",       desc:"Auto reminders" },
                { id:"drip",     label:"Drip",              desc:"Multi-step nurture" },
                { id:"automation",label:"Automation",       desc:"Trigger-based" },
              ] as { id: Channel; label: string; desc: string }[]).map(t => {
                const active = type === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`text-left p-3 rounded-xl border transition ${active ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}
                  >
                    <ChannelIcon ch={t.id} />
                    <div className="mt-2 text-[13px] font-semibold text-[--color-ink]">{t.label}</div>
                    <div className="text-[11px] text-[--color-muted] mt-0.5 leading-snug">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["All Customers","Leads","VIP","Past Customers","Inactive","New Leads","Custom Segment","Upload CSV","AI Smart Segment"].map(a => {
                  const active = audience === a;
                  return (
                    <button key={a} onClick={() => setAudience(a)}
                      className={`text-left p-3 rounded-xl border transition ${active ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                      <div className="flex items-center gap-2">
                        {a === "AI Smart Segment" ? <Sparkles size={13} className="text-[--color-primary-deep]" /> : <Users size={13} className="text-[--color-muted]" />}
                        <div className="text-[12.5px] font-semibold text-[--color-ink]">{a}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="rounded-xl border border-[--color-hairline] p-3 bg-[--color-surface-strong]/40">
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Estimated reach</div>
                <div className="text-[20px] font-semibold text-[--color-ink] tabular-nums">1,284 recipients</div>
                <div className="text-[11px] text-[--color-muted]">AI predicts 62% open · 14% click · 3.1% conversion</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {(type === "email") && (
                <FieldRow label="Subject">
                  <input value={subject} onChange={e => setSubject(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/30" />
                </FieldRow>
              )}
              <FieldRow label="Message">
                <div className="rounded-lg border border-[--color-hairline] bg-white overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[--color-hairline] bg-[--color-surface-strong]/40 flex-wrap">
                    {[<Bold size={12} key="b" />, <Italic size={12} key="i" />, <Link2 size={12} key="l" />, <ImageIcon size={12} key="im" />, <Smile size={12} key="s" />, <Gift size={12} key="g" />, <TagIcon size={12} key="t" />].map((ic, i) => (
                      <button key={i} className="w-7 h-7 grid place-items-center rounded hover:bg-white text-[--color-body]">{ic}</button>
                    ))}
                    <div className="ml-auto flex items-center gap-1">
                      <button className="h-7 px-2 rounded text-[11px] font-semibold text-[--color-primary-deep] bg-[--color-primary-subdued] inline-flex items-center gap-1"><Sparkles size={11} /> AI write</button>
                    </div>
                  </div>
                  <textarea value={body} onChange={e => setBody(e.target.value)} rows={7}
                    className="w-full p-3 text-[13px] text-[--color-ink] focus:outline-none resize-y" />
                </div>
              </FieldRow>
              <div>
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-1.5">Personalization</div>
                <div className="flex flex-wrap gap-1.5">
                  {["{{customer_name}}","{{business_name}}","{{appointment_date}}","{{invoice_amount}}","{{review_link}}","{{payment_link}}"].map(v => (
                    <button key={v} onClick={() => setBody(b => b + " " + v)}
                      className="text-[11px] font-semibold px-2 py-1 rounded-md bg-[--color-primary-subdued] text-[--color-primary-deep] hover:bg-[--color-primary]/15 transition inline-flex items-center gap-1">
                      <Type size={10} />{v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg p-2.5 bg-emerald-50 border border-emerald-100 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <div className="text-[11.5px] text-emerald-800"><b>Spam score 2.1/10</b> — safe. Add a clear unsubscribe link to improve deliverability.</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id:"now",       label:"Send now",      desc:"Immediate delivery",     icon:<Send size={13} /> },
                  { id:"later",     label:"Schedule",      desc:"Pick date & time",       icon:<Calendar size={13} /> },
                  { id:"recurring", label:"Recurring",     desc:"Daily / weekly / monthly",icon:<Repeat size={13} /> },
                ] as { id: typeof schedule; label: string; desc: string; icon: React.ReactNode }[]).map(o => {
                  const active = schedule === o.id;
                  return (
                    <button key={o.id} onClick={() => setSchedule(o.id)}
                      className={`text-left p-3 rounded-xl border transition ${active ? "border-[--color-primary] bg-[--color-primary]/5 ring-2 ring-[--color-primary]/20" : "border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40"}`}>
                      <div className="flex items-center gap-2 text-[--color-primary-deep]">{o.icon}<span className="text-[12.5px] font-semibold text-[--color-ink]">{o.label}</span></div>
                      <div className="text-[11px] text-[--color-muted] mt-1">{o.desc}</div>
                    </button>
                  );
                })}
              </div>
              {schedule === "later" && (
                <div className="grid grid-cols-2 gap-2">
                  <FieldRow label="Date"><input type="date" className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px]" /></FieldRow>
                  <FieldRow label="Time"><input type="time" className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] bg-white text-[13px]" /></FieldRow>
                </div>
              )}
              <div className="rounded-xl p-3 bg-gradient-to-br from-[--color-primary-subdued] to-white border border-violet-100 flex items-start gap-2">
                <Sparkles size={14} className="text-[--color-primary-deep] mt-0.5" />
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-[--color-ink]">AI Best Send Time</div>
                  <div className="text-[11.5px] text-[--color-muted]">For this audience: <b className="text-[--color-ink]">Tuesday 10:14 AM local</b> — projected +18% opens.</div>
                </div>
                <button className="ml-auto text-[11px] font-semibold text-[--color-primary-deep] whitespace-nowrap">Use time</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="inline-flex p-0.5 rounded-lg bg-[--color-surface-strong]">
                  {([
                    { id:"desktop", icon:<Monitor size={13} /> },
                    { id:"tablet",  icon:<Tablet size={13} /> },
                    { id:"mobile",  icon:<Smartphone size={13} /> },
                  ] as { id: typeof device; icon: React.ReactNode }[]).map(d => (
                    <button key={d.id} onClick={() => setDevice(d.id)}
                      className={`px-2.5 py-1.5 rounded-md text-[12px] font-semibold transition ${device === d.id ? "bg-white text-[--color-ink] shadow-sm" : "text-[--color-muted]"}`}>{d.icon}</button>
                  ))}
                </div>
                <button onClick={() => setDark(d => !d)} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold h-8 px-3 rounded-lg border border-[--color-hairline]">
                  {dark ? <Moon size={12} /> : <Sun size={12} />} {dark ? "Dark" : "Light"}
                </button>
              </div>
              <div className={`mx-auto rounded-2xl border overflow-hidden transition-all ${dark ? "bg-neutral-900 border-neutral-800 text-neutral-100" : "bg-white border-[--color-hairline]"}`}
                style={{ maxWidth: device === "mobile" ? 320 : device === "tablet" ? 560 : "100%" }}>
                <div className={`p-4 border-b ${dark ? "border-neutral-800" : "border-[--color-hairline]"}`}>
                  <div className="text-[11px] uppercase tracking-widest font-semibold opacity-60">Preview</div>
                  {type === "email" && <div className="text-[15px] font-semibold mt-1">{subject}</div>}
                </div>
                <div className="p-4 text-[13px] whitespace-pre-wrap leading-relaxed">{body}</div>
                <div className={`p-4 border-t ${dark ? "border-neutral-800" : "border-[--color-hairline]"}`}>
                  <button className="h-10 px-4 rounded-lg text-white font-semibold text-[13px]" style={{ background: "var(--color-brand-gradient-2)" }}>Book now</button>
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
            {step === WIZ_STEPS.length - 1 && <Btn variant="gradient" size="md" icon={<Send size={13} />} onClick={onClose} className="w-full sm:w-auto justify-center">Launch Campaign</Btn>}
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

/* ─────────────── AI Assistant Panel ─────────────── */

function AiAssistant({ onClose, onLaunch }: { onClose: () => void; onLaunch: () => void }) {
  const actions = [
    { icon: <Wand2 size={13} />,      label: "Generate a full campaign" },
    { icon: <Type size={13} />,       label: "Rewrite for higher conversion" },
    { icon: <Mail size={13} />,       label: "Generate subject lines" },
    { icon: <MessageSquare size={13} />, label: "Draft an SMS" },
    { icon: <Gift size={13} />,       label: "Create a promotional offer" },
    { icon: <BarChart3 size={13} />,  label: "Predict campaign performance" },
    { icon: <Users size={13} />,      label: "Recommend best audience" },
    { icon: <Clock size={13} />,      label: "Recommend best send time" },
    { icon: <ShieldCheck size={13} />,label: "Check spam score" },
    { icon: <Languages size={13} />,  label: "Translate campaign" },
    { icon: <Split size={13} />,      label: "Suggest A/B variants" },
    { icon: <Percent size={13} />,    label: "Optimize discount value" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl border border-[--color-hairline] max-h-[92vh] flex flex-col"
        style={{ boxShadow: "var(--shadow-elevated, 0 30px 60px -20px rgba(0,0,0,0.3))" }}>
        <div className="p-4 sm:p-5 border-b border-[--color-hairline] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl grid place-items-center text-white" style={{ background: "var(--color-brand-gradient-2)" }}><Bot size={17} /></div>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-[--color-ink]">AI Campaign Assistant</div>
              <div className="text-[11.5px] text-[--color-muted]">Describe your goal — I'll build the campaign</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-[--color-surface-strong] shrink-0"><X size={16} /></button>
        </div>

        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto">
          <div className="rounded-xl border border-[--color-hairline] p-3 bg-[--color-surface-strong]/40">
            <textarea rows={3} placeholder="e.g. Get 50 5-star Google reviews from last month's customers via SMS"
              className="w-full bg-transparent text-[13px] focus:outline-none resize-none" />
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <div className="flex items-center gap-1 flex-wrap">
                {["Friendly","Professional","Urgent","Playful"].map(t => (
                  <button key={t} className="text-[10.5px] font-semibold px-2 py-1 rounded-full bg-white border border-[--color-hairline]">{t}</button>
                ))}
              </div>
              <button onClick={onLaunch} className="h-8 px-3 rounded-lg text-white text-[12px] font-semibold inline-flex items-center gap-1.5" style={{ background: "var(--color-brand-gradient-2)" }}>
                <Sparkles size={12} /> Generate
              </button>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-widest font-semibold text-[--color-muted]">Quick actions</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {actions.map(a => (
              <button key={a.label} className="text-left px-3 py-2 rounded-lg border border-[--color-hairline] bg-white hover:bg-[--color-surface-strong]/40 transition flex items-center gap-2">
                <span className="w-6 h-6 rounded-md grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]">{a.icon}</span>
                <span className="text-[12px] font-medium text-[--color-ink]">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
