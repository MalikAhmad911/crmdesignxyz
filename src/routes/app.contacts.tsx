import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Download, Upload, Phone, Mail, MessageSquare, MoreHorizontal,
  Star, Users, UserPlus, Crown, Clock, Bookmark, Tag as TagIcon, Archive, Building2,
  ChevronDown, ChevronRight, X, Sparkles, TrendingUp, DollarSign, CalendarDays,
  Briefcase, ReceiptText, MessageCircle, Video, FileText, MapPin, Globe, Cake,
  Send, ClipboardList, Wand2, AlertTriangle, CheckCircle2, PhoneCall, PhoneIncoming,
  Layers, Command, ArrowUpRight, Zap, Heart, Paperclip, Image as ImageIcon,
  Pin, ShieldCheck, Flame, Bell, LayoutGrid, Rows3,
} from "lucide-react";
import { Avatar } from "@/components/app-shell/AppShell";
import { CONTACTS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/contacts")({ component: ContactsPage });

const ACCENT = "#635BFF";
const ACCENT_SOFT = "rgba(99,91,255,0.10)";
const ACCENT_GRAD = "linear-gradient(135deg,#635BFF 0%,#8A80FF 100%)";

// ---------- Derived rich data ----------
type Rich = {
  id: string; name: string; phone: string; email: string; stage: string;
  tags: string[]; score: number; activity: string;
  company: string; ltv: number; openJobs: number; jobsDone: number;
  appts: number; balance: number; reviews: number; rating: number;
  assigned: string; source: string; pipeline: string; birthday: string;
  address: string; website: string; timezone: string; notes: string;
  aiScore: number; health: number; churnRisk: number;
  calls: number; sms: number; emails: number;
  isFav: boolean; needsFollowUp: boolean;
};

const OWNERS = ["Mike T.", "Ana R.", "Chris L.", "Priya D.", "Sam W."];
const PIPES = ["New Lead", "Contacted", "Quoted", "Won", "Customer", "Repeat"];
const SOURCES = ["Google Ads", "Referral", "Website", "Facebook", "Instagram", "AI Voice"];
const CITIES = ["Dallas, TX", "Plano, TX", "Frisco, TX", "Arlington, TX", "Irving, TX"];
const STREETS = ["Main St", "Oak Ave", "Elm St", "Cedar Rd", "Poplar Blvd", "Birch Ct"];

function enrich(c: (typeof CONTACTS)[number], i: number): Rich {
  const seed = c.id.charCodeAt(1) + i;
  const ltv = 380 + (seed % 60) * 187;
  const openJobs = seed % 3;
  const jobsDone = 2 + (seed % 9);
  const balance = c.stage === "Customer" && seed % 4 === 0 ? 100 + (seed % 6) * 45 : 0;
  return {
    ...c,
    company: `${c.name.split(" ")[1] ?? c.name} & Co.`,
    ltv,
    openJobs,
    jobsDone,
    appts: 1 + (seed % 6),
    balance,
    reviews: seed % 4,
    rating: 4 + ((seed % 10) / 10),
    assigned: OWNERS[seed % OWNERS.length],
    source: SOURCES[seed % SOURCES.length],
    pipeline: c.stage === "Customer" ? "Customer" : c.stage === "Lead" ? PIPES[seed % 3] : "New Lead",
    birthday: `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][seed % 12]} ${1 + seed % 27}`,
    address: `${100 + seed} ${STREETS[seed % STREETS.length]}, ${CITIES[seed % CITIES.length]}`,
    website: `${c.name.split(" ")[0].toLowerCase()}.example.com`,
    timezone: "CT · Dallas",
    notes: "Prefers text over calls. Interested in maintenance plan.",
    aiScore: Math.min(99, c.score + (seed % 6)),
    health: c.score,
    churnRisk: 100 - c.score,
    calls: 2 + (seed % 12),
    sms: 5 + (seed % 30),
    emails: seed % 8,
    isFav: seed % 5 === 0,
    needsFollowUp: c.stage !== "Customer" || balance > 0,
  };
}

const ROWS: Rich[] = CONTACTS.map(enrich);

// ---------- Small primitives ----------
function Pill({ children, tone = "neutral", className = "" }: {
  children: React.ReactNode;
  tone?: "brand" | "success" | "warning" | "danger" | "info" | "neutral" | "gold";
  className?: string;
}) {
  const map: Record<string, string> = {
    brand: "bg-indigo-50 text-indigo-700 border-indigo-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    info: "bg-sky-50 text-sky-700 border-sky-100",
    gold: "bg-yellow-50 text-yellow-700 border-yellow-100",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full border ${map[tone]} ${className}`}>{children}</span>
  );
}

function KpiCard({ label, value, sub, icon: I, tone = "brand" }: {
  label: string; value: string; sub?: string; icon: React.ComponentType<{ size?: number; className?: string }>;
  tone?: "brand" | "success" | "warning" | "danger" | "info";
}) {
  const toneMap: Record<string, string> = {
    brand: "text-indigo-600 bg-indigo-50",
    success: "text-emerald-600 bg-emerald-50",
    warning: "text-amber-600 bg-amber-50",
    danger: "text-rose-600 bg-rose-50",
    info: "text-sky-600 bg-sky-50",
  };
  return (
    <div className="rounded-2xl bg-white border border-[--color-hairline] px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm flex items-center gap-2.5 sm:gap-3 min-w-0">
      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl grid place-items-center shrink-0 ${toneMap[tone]}`}><I size={15} /></div>
      <div className="min-w-0 flex-1">
        <div className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold text-[--color-muted] truncate">{label}</div>
        <div className="text-[15px] sm:text-[17px] font-bold text-[--color-ink] leading-tight truncate">{value}</div>
        {sub && <div className="text-[10px] sm:text-[10.5px] text-[--color-muted] truncate">{sub}</div>}
      </div>
    </div>
  );
}

// ---------- Left rail ----------
type RailKey =
  | "all" | "companies" | "leads" | "customers" | "vip" | "recent"
  | "fav" | "assigned" | "follow" | "smart" | "archived";

const RAIL: { key: RailKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; count?: number }[] = [
  { key: "all",       label: "All Contacts",     icon: Users, count: ROWS.length },
  { key: "companies", label: "Companies",        icon: Building2, count: 6 },
  { key: "leads",     label: "Leads",            icon: UserPlus, count: ROWS.filter(r => r.stage === "Lead").length },
  { key: "customers", label: "Customers",        icon: CheckCircle2, count: ROWS.filter(r => r.stage === "Customer").length },
  { key: "vip",       label: "VIP Customers",    icon: Crown, count: ROWS.filter(r => r.tags.includes("VIP")).length },
  { key: "recent",    label: "Recently Added",   icon: Clock, count: 4 },
  { key: "fav",       label: "Favorites",        icon: Star, count: ROWS.filter(r => r.isFav).length },
  { key: "assigned",  label: "Assigned to me",   icon: ShieldCheck, count: 3 },
  { key: "follow",    label: "Needs Follow-up",  icon: Flame, count: ROWS.filter(r => r.needsFollowUp).length },
  { key: "smart",     label: "Smart Lists",      icon: Sparkles, count: 4 },
  { key: "archived",  label: "Archived",         icon: Archive, count: 2 },
];

const SMART_TAGS = ["VIP","Hot Lead","Cold","Returning","Late Payment","Do Not Call","Subscribed","Follow-up"];

function LeftRail({ active, onSelect }: { active: RailKey; onSelect: (k: RailKey) => void }) {
  return (
    <aside className="hidden lg:flex w-[232px] shrink-0 flex-col border-r border-[--color-hairline] bg-[--color-canvas]">
      <div className="p-3 border-b border-[--color-hairline]">
        <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-[--color-hairline] shadow-sm">
          <Search size={13} className="text-[--color-muted]" />
          <input placeholder="Search lists…" className="bg-transparent flex-1 text-[12px] focus:outline-none placeholder:text-[--color-muted]" />
          <kbd className="text-[9.5px] font-mono px-1 py-0.5 rounded bg-[--color-surface-strong] text-[--color-muted] inline-flex items-center gap-0.5"><Command size={9} />K</kbd>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[--color-muted]">Lists</div>
        {RAIL.map(it => {
          const on = active === it.key;
          const I = it.icon;
          return (
            <button key={it.key} onClick={() => onSelect(it.key)}
              className={`group w-full h-9 pl-3 pr-2 rounded-lg flex items-center gap-2.5 text-[12.5px] font-medium transition relative ${
                on ? "bg-white shadow-sm text-[--color-ink]" : "text-[--color-body] hover:bg-white"
              }`}
            >
              {on && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r" style={{ background: ACCENT }} />}
              <I size={14} className={on ? "" : "text-[--color-muted]"} />
              <span className="flex-1 text-left truncate">{it.label}</span>
              {typeof it.count === "number" && (
                <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-full ${on ? "bg-indigo-50 text-indigo-700" : "bg-[--color-surface-strong] text-[--color-body]"}`}>{it.count}</span>
              )}
            </button>
          );
        })}

        <div className="px-2 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[--color-muted]">Saved Views</div>
        {["Last 30 days","Hot Leads · $1k+","Late Payments","VIPs w/ open jobs"].map((v,i) => (
          <button key={i} className="w-full h-8 pl-3 pr-2 rounded-lg flex items-center gap-2.5 text-[12px] text-[--color-body] hover:bg-white">
            <Bookmark size={12} className="text-[--color-muted]" />
            <span className="flex-1 text-left truncate">{v}</span>
          </button>
        ))}

        <div className="px-2 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[--color-muted]">Tags</div>
        <div className="px-2 flex flex-wrap gap-1">
          {SMART_TAGS.map(t => (
            <span key={t} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[--color-hairline] text-[--color-body]">{t}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-[--color-hairline] p-3">
        <button className="w-full h-9 rounded-lg text-[12.5px] font-semibold text-white inline-flex items-center justify-center gap-1.5" style={{ background: ACCENT_GRAD }}>
          <Sparkles size={13} /> Ask AI to segment
        </button>
      </div>
    </aside>
  );
}

// ---------- Contact profile drawer ----------
function ProfileDrawer({ c, onClose }: { c: Rich | null; onClose: () => void }) {
  const [tab, setTab] = useState<"timeline" | "jobs" | "financials" | "files" | "ai" | "notes">("timeline");
  if (!c) return null;
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] xl:hidden" />
      <aside className="fixed xl:static top-0 right-0 z-50 h-full w-full sm:w-[440px] xl:w-[420px] xl:shrink-0 bg-white border-l border-[--color-hairline] flex flex-col shadow-2xl xl:shadow-none">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#EEF0FF 0%,#F5F3FF 100%)" }} />
          <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full" style={{ background: "radial-gradient(closest-side,rgba(99,91,255,0.22),transparent)" }} />
          <div className="relative p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <Avatar name={c.name} size={56} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white grid place-items-center">
                    <CheckCircle2 size={10} className="text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-[18px] font-bold text-[--color-ink] truncate">{c.name}</h2>
                    {c.tags.includes("VIP") && <Pill tone="gold"><Crown size={9} /> VIP</Pill>}
                    {c.tags.includes("Hot Lead") && <Pill tone="danger"><Flame size={9} /> Hot</Pill>}
                  </div>
                  <div className="text-[12px] text-[--color-body] flex items-center gap-1 truncate">
                    <Building2 size={11} /> {c.company}
                  </div>
                  <div className="text-[11px] text-[--color-muted] mt-0.5">Owner · {c.assigned} · {c.source}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-white/70 text-[--color-body]" title="Favorite"><Star size={14} /></button>
                <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-white/70 text-[--color-body]" title="More"><MoreHorizontal size={14} /></button>
                <button onClick={onClose} className="w-8 h-8 rounded-lg grid place-items-center hover:bg-white/70 text-[--color-body]"><X size={14} /></button>
              </div>
            </div>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              <a className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white border border-[--color-hairline] text-[11.5px] text-[--color-ink] font-medium shadow-sm hover:shadow" href="#"><Phone size={11} className="text-emerald-600" /> {c.phone}</a>
              <a className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white border border-[--color-hairline] text-[11.5px] text-[--color-ink] font-medium shadow-sm" href="#"><Mail size={11} className="text-sky-600" /> {c.email}</a>
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white border border-[--color-hairline] text-[11.5px] text-[--color-body] font-medium"><MapPin size={11} className="text-rose-500" /> {c.address}</span>
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white border border-[--color-hairline] text-[11.5px] text-[--color-body] font-medium"><Globe size={11} className="text-indigo-500" /> {c.website}</span>
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white border border-[--color-hairline] text-[11.5px] text-[--color-body] font-medium"><Cake size={11} className="text-amber-500" /> {c.birthday}</span>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-5 gap-1.5 mt-4">
              {[
                { i: Phone, l: "Call", tone: "emerald" },
                { i: MessageSquare, l: "SMS", tone: "sky" },
                { i: Mail, l: "Email", tone: "indigo" },
                { i: Video, l: "Meet", tone: "purple" },
                { i: CalendarDays, l: "Book", tone: "amber" },
              ].map(a => (
                <button key={a.l} className="flex flex-col items-center gap-1 py-2 rounded-xl bg-white border border-[--color-hairline] hover:shadow-sm transition">
                  <a.i size={15} className="text-[--color-ink]" />
                  <span className="text-[10.5px] font-semibold text-[--color-body]">{a.l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div className="px-4 py-3 grid grid-cols-3 gap-2 border-b border-[--color-hairline]">
          <MiniKpi label="LTV" value={`$${c.ltv.toLocaleString()}`} tone="brand" />
          <MiniKpi label="Jobs" value={String(c.jobsDone)} sub={`${c.openJobs} open`} tone="success" />
          <MiniKpi label="Balance" value={c.balance ? `$${c.balance}` : "$0"} tone={c.balance ? "danger" : "neutral"} />
          <MiniKpi label="Calls" value={String(c.calls)} tone="neutral" />
          <MiniKpi label="Reviews" value={`${c.rating.toFixed(1)}★`} sub={`${c.reviews} left`} tone="warning" />
          <MiniKpi label="AI Score" value={`${c.aiScore}`} tone="brand" />
        </div>

        {/* Scores bars */}
        <div className="px-4 py-3 space-y-2 border-b border-[--color-hairline] bg-[--color-canvas]">
          <ScoreBar label="Customer Health" value={c.health} tone="emerald" />
          <ScoreBar label="Buying Probability" value={c.aiScore} tone="indigo" />
          <ScoreBar label="Churn Risk" value={c.churnRisk} tone="rose" />
        </div>

        {/* AI suggestion */}
        <div className="mx-4 my-3 rounded-2xl border border-indigo-100 bg-[#F5F7FF] p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md grid place-items-center" style={{ background: ACCENT }}><Sparkles size={11} className="text-white" /></div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600">AI Insight</span>
            <span className="ml-auto text-[10px] font-medium text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">92% confidence</span>
          </div>
          <p className="text-[12.5px] leading-relaxed text-[--color-ink]">
            {c.name.split(" ")[0]} is a <b>high-value</b> customer, {c.jobsDone} jobs completed. Suggest offering the <b>Annual Maintenance Plan</b> — projected +${Math.round(c.ltv * 0.18)} LTV.
          </p>
          <div className="flex gap-1.5 mt-2">
            <button className="h-7 px-2.5 rounded-lg text-[11.5px] font-semibold text-white inline-flex items-center gap-1" style={{ background: ACCENT }}><Send size={11} /> Send offer</button>
            <button className="h-7 px-2.5 rounded-lg text-[11.5px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong]">Draft email</button>
            <button className="h-7 px-2.5 rounded-lg text-[11.5px] font-semibold text-[--color-muted] hover:bg-white">Dismiss</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-1 flex gap-1 border-b border-[--color-hairline] overflow-x-auto no-scrollbar">
          {([
            ["timeline", "Timeline", ClipboardList],
            ["jobs", "Jobs", Briefcase],
            ["financials", "Financials", DollarSign],
            ["files", "Files", FileText],
            ["ai", "AI", Sparkles],
            ["notes", "Notes", Pin],
          ] as const).map(([k, l, I]) => {
            const on = tab === k;
            return (
              <button key={k} onClick={() => setTab(k)}
                className={`shrink-0 inline-flex items-center gap-1 h-9 px-2.5 text-[12px] font-semibold border-b-2 -mb-px transition ${
                  on ? "text-[--color-ink]" : "text-[--color-muted] border-transparent hover:text-[--color-body-strong]"
                }`}
                style={on ? { borderColor: ACCENT, color: ACCENT } : undefined}
              >
                <I size={12} /> {l}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "timeline" && <Timeline c={c} />}
          {tab === "jobs" && <JobsTab c={c} />}
          {tab === "financials" && <FinancialsTab c={c} />}
          {tab === "files" && <FilesTab />}
          {tab === "ai" && <AiTab c={c} />}
          {tab === "notes" && <NotesTab c={c} />}
        </div>
      </aside>
    </>
  );
}

function MiniKpi({ label, value, sub, tone = "neutral" }: {
  label: string; value: string; sub?: string;
  tone?: "brand" | "success" | "warning" | "danger" | "neutral";
}) {
  const map: Record<string, string> = {
    brand: "text-indigo-700",
    success: "text-emerald-700",
    warning: "text-amber-700",
    danger: "text-rose-700",
    neutral: "text-[--color-ink]",
  };
  return (
    <div className="rounded-xl bg-white border border-[--color-hairline] px-2.5 py-2">
      <div className="text-[10px] uppercase font-bold tracking-wider text-[--color-muted]">{label}</div>
      <div className={`text-[15px] font-bold leading-tight mt-0.5 ${map[tone]}`}>{value}</div>
      {sub && <div className="text-[10px] text-[--color-muted]">{sub}</div>}
    </div>
  );
}

function ScoreBar({ label, value, tone }: { label: string; value: number; tone: "emerald" | "indigo" | "rose" }) {
  const bar: Record<string, string> = {
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
    rose: "bg-rose-500",
  };
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="font-medium text-[--color-body]">{label}</span>
        <span className="font-bold text-[--color-ink] tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full rounded-full ${bar[tone]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Timeline({ c }: { c: Rich }) {
  const items = [
    { i: PhoneIncoming, tone: "emerald", title: "Inbound call · 3m 24s", desc: "AI transcribed · sentiment positive", time: "2h ago" },
    { i: MessageSquare, tone: "sky", title: "SMS conversation", desc: `${c.name.split(" ")[0]}: "2pm would be great" — 4 messages`, time: "3h ago" },
    { i: CalendarDays, tone: "amber", title: "AC Repair booked", desc: "Today · 2:00 PM · Tech Mike T.", time: "3h ago" },
    { i: Sparkles, tone: "indigo", title: "AI sent maintenance offer", desc: "Email · 97% match to buyer intent", time: "1d ago" },
    { i: ReceiptText, tone: "emerald", title: "Payment received $450", desc: "Invoice #INV-1042 · Stripe", time: "3d ago" },
    { i: Star, tone: "amber", title: "5★ Google review", desc: "Prompt, tidy, honest pricing.", time: "1w ago" },
    { i: Briefcase, tone: "slate", title: "Job completed · Furnace tune-up", desc: "Tech Chris L. · $320", time: "2w ago" },
  ];
  const toneMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    sky: "bg-sky-50 text-sky-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-indigo-50 text-indigo-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="relative pl-4">
      <div className="absolute left-[13px] top-1 bottom-1 w-px bg-[--color-hairline]" />
      <div className="space-y-3">
        {items.map((it, i) => {
          const I = it.i;
          return (
            <div key={i} className="relative">
              <div className={`absolute -left-4 w-6 h-6 rounded-full grid place-items-center ring-2 ring-white ${toneMap[it.tone]}`}>
                <I size={11} />
              </div>
              <div className="ml-6 rounded-xl border border-[--color-hairline] bg-white p-2.5">
                <div className="flex items-center gap-2 justify-between">
                  <div className="text-[12.5px] font-semibold text-[--color-ink]">{it.title}</div>
                  <div className="text-[10.5px] text-[--color-muted] shrink-0">{it.time}</div>
                </div>
                <div className="text-[11.5px] text-[--color-body] mt-0.5">{it.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobsTab({ c }: { c: Rich }) {
  const jobs = [
    { title: "AC Repair", status: "Scheduled", tone: "info", time: "Today 2:00 PM", tech: "Mike T.", amt: "$450" },
    { title: "Furnace Tune-up", status: "Completed", tone: "success", time: "Jun 30", tech: "Chris L.", amt: "$320" },
    { title: "Water Heater Install", status: "Invoiced", tone: "warning", time: "Jun 15", tech: "Ana R.", amt: "$2,100" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[--color-muted]">{c.jobsDone} jobs · {c.openJobs} open</div>
        <button className="text-[11.5px] font-semibold inline-flex items-center gap-1" style={{ color: ACCENT }}><Plus size={11} /> New job</button>
      </div>
      {jobs.map((j,i) => (
        <div key={i} className="rounded-xl border border-[--color-hairline] bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-[--color-ink] truncate">{j.title}</div>
              <div className="text-[11.5px] text-[--color-muted]">{j.time} · {j.tech}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[13px] font-bold text-[--color-ink]">{j.amt}</div>
              <Pill tone={j.tone as never}>{j.status}</Pill>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FinancialsTab({ c }: { c: Rich }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <MiniKpi label="Lifetime Spend" value={`$${c.ltv.toLocaleString()}`} tone="brand" />
        <MiniKpi label="Outstanding" value={c.balance ? `$${c.balance}` : "$0"} tone={c.balance ? "danger" : "neutral"} />
      </div>
      <div className="rounded-xl border border-[--color-hairline] bg-white overflow-hidden">
        {[
          { d: "INV-1042", label: "AC Repair", amt: "$450", st: "Paid", tone: "success" },
          { d: "INV-1021", label: "Furnace tune-up", amt: "$320", st: "Paid", tone: "success" },
          { d: "INV-1005", label: "Water heater install", amt: "$2,100", st: "Paid", tone: "success" },
          { d: "EST-0079", label: "Maintenance plan", amt: "$540/yr", st: "Draft", tone: "neutral" },
        ].map((r,i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 border-b border-[--color-hairline-soft] last:border-0">
            <ReceiptText size={14} className="text-[--color-muted]" />
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{r.label}</div>
              <div className="text-[10.5px] text-[--color-muted]">{r.d}</div>
            </div>
            <div className="text-[12.5px] font-bold text-[--color-ink]">{r.amt}</div>
            <Pill tone={r.tone as never}>{r.st}</Pill>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        <button className="flex-1 h-8 rounded-lg text-[12px] font-semibold text-white" style={{ background: ACCENT }}>Take Payment</button>
        <button className="flex-1 h-8 rounded-lg text-[12px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong]">Create Invoice</button>
      </div>
    </div>
  );
}

function FilesTab() {
  const files = [
    { i: FileText, name: "Service Contract.pdf", size: "1.2 MB", tone: "indigo" },
    { i: ImageIcon, name: "Before repair.jpg", size: "3.4 MB", tone: "emerald" },
    { i: ImageIcon, name: "After repair.jpg", size: "2.8 MB", tone: "emerald" },
    { i: FileText, name: "Warranty.pdf", size: "480 KB", tone: "indigo" },
    { i: Phone, name: "Call recording · Jun 30.m4a", size: "6.1 MB", tone: "amber" },
  ];
  return (
    <div className="space-y-2">
      <div className="rounded-xl border-2 border-dashed border-[--color-hairline] bg-white/60 p-4 text-center">
        <Paperclip size={16} className="mx-auto text-[--color-muted]" />
        <div className="text-[12px] font-semibold text-[--color-body] mt-1">Drop files here or click to upload</div>
      </div>
      {files.map((f,i) => {
        const I = f.i;
        const map: Record<string, string> = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600" };
        return (
          <div key={i} className="flex items-center gap-2.5 rounded-xl border border-[--color-hairline] bg-white p-2.5">
            <div className={`w-8 h-8 rounded-lg grid place-items-center ${map[f.tone]}`}><I size={14} /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-[--color-ink] truncate">{f.name}</div>
              <div className="text-[10.5px] text-[--color-muted]">{f.size}</div>
            </div>
            <button className="text-[--color-muted] hover:text-[--color-body-strong]"><MoreHorizontal size={14} /></button>
          </div>
        );
      })}
    </div>
  );
}

function AiTab({ c }: { c: Rich }) {
  const items = [
    { i: TrendingUp, t: "Upsell suggestion", d: "Offer annual maintenance plan — 78% conversion prob." },
    { i: AlertTriangle, t: "Churn risk", d: `${c.churnRisk}% risk if no contact in 60 days` },
    { i: MessageCircle, t: "Personality", d: "Direct, price-conscious, responds fast to texts" },
    { i: Wand2, t: "Rewrite last email", d: "Shorter, more confident tone" },
    { i: Layers, t: "Cross-sell", d: "Water softener install ($1.2k) likely fit" },
  ];
  return (
    <div className="space-y-2">
      {items.map((x,i) => {
        const I = x.i;
        return (
          <div key={i} className="rounded-xl border border-indigo-100 bg-[#F8F8FF] p-3 flex gap-3">
            <div className="w-8 h-8 rounded-lg grid place-items-center shrink-0" style={{ background: ACCENT_SOFT, color: ACCENT }}><I size={14} /></div>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-bold text-[--color-ink]">{x.t}</div>
              <div className="text-[11.5px] text-[--color-body] mt-0.5">{x.d}</div>
            </div>
            <button className="text-[11.5px] font-semibold self-start inline-flex items-center gap-0.5" style={{ color: ACCENT }}>Run <ArrowUpRight size={11} /></button>
          </div>
        );
      })}
    </div>
  );
}

function NotesTab({ c }: { c: Rich }) {
  return (
    <div className="space-y-2">
      <textarea placeholder="Add a note about this customer…" className="w-full min-h-[90px] resize-none rounded-xl border border-[--color-hairline] bg-white p-3 text-[12.5px] focus:outline-none focus:border-indigo-300" />
      <button className="h-8 px-3 rounded-lg text-[12px] font-semibold text-white" style={{ background: ACCENT }}>Save note</button>
      <div className="mt-3 space-y-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-0.5 flex items-center gap-1"><Pin size={9} /> Pinned</div>
          <div className="text-[12.5px] text-[--color-ink]">{c.notes}</div>
          <div className="text-[10.5px] text-[--color-muted] mt-1">by {c.assigned} · 2d ago</div>
        </div>
        <div className="rounded-xl border border-[--color-hairline] bg-white p-3">
          <div className="text-[12.5px] text-[--color-ink]">Checked parts availability, gasket on hand.</div>
          <div className="text-[10.5px] text-[--color-muted] mt-1">by Mike T. · 5d ago</div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main page ----------
function ContactsPage() {
  const [rail, setRail] = useState<RailKey>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Rich | null>(null);
  const [view, setView] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<"name" | "ltv" | "score" | "activity">("ltv");

  const filtered = useMemo(() => {
    let r = ROWS;
    if (rail === "leads") r = r.filter(x => x.stage === "Lead");
    else if (rail === "customers") r = r.filter(x => x.stage === "Customer");
    else if (rail === "vip") r = r.filter(x => x.tags.includes("VIP"));
    else if (rail === "fav") r = r.filter(x => x.isFav);
    else if (rail === "follow") r = r.filter(x => x.needsFollowUp);
    if (q) r = r.filter(x => (x.name + x.phone + x.email + x.company).toLowerCase().includes(q.toLowerCase()));
    const s = [...r];
    if (sortBy === "name") s.sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === "ltv") s.sort((a,b) => b.ltv - a.ltv);
    if (sortBy === "score") s.sort((a,b) => b.aiScore - a.aiScore);
    return s;
  }, [rail, q, sortBy]);

  const totals = useMemo(() => ({
    all: ROWS.length,
    customers: ROWS.filter(r => r.stage === "Customer").length,
    leads: ROWS.filter(r => r.stage === "Lead").length,
    vips: ROWS.filter(r => r.tags.includes("VIP")).length,
    ltv: ROWS.reduce((a, r) => a + r.ltv, 0),
    outstanding: ROWS.reduce((a, r) => a + r.balance, 0),
  }), []);

  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id));
  const toggleAll = () => {
    const n = new Set(selected);
    if (allSelected) filtered.forEach(r => n.delete(r.id));
    else filtered.forEach(r => n.add(r.id));
    setSelected(n);
  };
  const toggle = (id: string) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-[--color-canvas] overflow-hidden">
      <LeftRail active={rail} onSelect={setRail} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <div className="shrink-0 bg-white border-b border-[--color-hairline]">
          <div className="px-3 sm:px-6 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:flex sm:flex-wrap sm:items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight text-[--color-ink] truncate">Contacts</h1>
                <Pill tone="brand">{filtered.length}</Pill>
              </div>
              <div className="text-[11.5px] sm:text-[12px] text-[--color-muted] mt-0.5 line-clamp-2 sm:line-clamp-none">One unified profile per customer — 360° across calls, jobs, payments, and AI.</div>
            </div>
            <div className="sm:ml-auto flex items-center gap-1.5 shrink-0">
              <button aria-label="Import" className="hidden sm:inline-flex h-9 px-3 rounded-lg text-[12.5px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong] hover:bg-[--color-surface-strong] items-center gap-1.5"><Upload size={13} /> Import</button>
              <button aria-label="Export" className="hidden sm:inline-flex h-9 px-3 rounded-lg text-[12.5px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong] hover:bg-[--color-surface-strong] items-center gap-1.5"><Download size={13} /> Export</button>
              <button aria-label="Import" className="sm:hidden w-9 h-9 rounded-lg bg-white border border-[--color-hairline] text-[--color-body-strong] grid place-items-center"><Upload size={14} /></button>
              <button className="h-9 px-3 sm:px-3.5 rounded-lg text-[12.5px] font-semibold text-white inline-flex items-center gap-1.5 shadow-sm" style={{ background: ACCENT_GRAD }}><Plus size={13} /><span className="hidden xs:inline sm:inline">Add</span><span className="hidden sm:inline"> Contact</span></button>
            </div>
          </div>

          {/* KPI strip */}
          <div className="px-3 sm:px-6 pb-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
            <KpiCard label="Total" value={String(totals.all)} sub="in CRM" icon={Users} tone="brand" />
            <KpiCard label="Customers" value={String(totals.customers)} sub="active" icon={CheckCircle2} tone="success" />
            <KpiCard label="Leads" value={String(totals.leads)} sub="in pipeline" icon={UserPlus} tone="info" />
            <KpiCard label="VIPs" value={String(totals.vips)} sub="high value" icon={Crown} tone="warning" />
            <KpiCard label="LTV" value={`$${(totals.ltv/1000).toFixed(1)}k`} sub="lifetime" icon={TrendingUp} tone="brand" />
            <KpiCard label="Unpaid" value={`$${totals.outstanding}`} sub="outstanding" icon={AlertTriangle} tone="danger" />
          </div>

          {/* Toolbar */}
          <div className="px-3 sm:px-6 pb-3 flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] flex-1 min-w-0 sm:min-w-[220px] sm:max-w-[440px]">
              <Search size={14} className="text-[--color-muted] shrink-0" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search contacts…" className="bg-transparent flex-1 min-w-0 text-[13px] focus:outline-none" />
              <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[--color-hairline] text-[--color-muted]">⌘K</kbd>
            </div>
            <button className="h-9 px-3 rounded-lg text-[12.5px] font-semibold bg-white border border-[--color-hairline] text-[--color-body-strong] inline-flex items-center gap-1.5 shrink-0"><Filter size={12} /> <span className="hidden sm:inline">Filters</span> <Pill tone="brand">2</Pill></button>
            <div className="hidden md:inline-flex items-center gap-1 rounded-lg bg-white border border-[--color-hairline] p-0.5">
              {(["ltv","score","name","activity"] as const).map(k => (
                <button key={k} onClick={() => setSortBy(k)} className={`h-7 px-2.5 rounded-md text-[11.5px] font-semibold capitalize ${sortBy === k ? "bg-[--color-surface-strong] text-[--color-ink]" : "text-[--color-muted]"}`}>{k}</button>
              ))}
            </div>
            <div className="hidden md:inline-flex items-center gap-1 rounded-lg bg-white border border-[--color-hairline] p-0.5">
              <button onClick={() => setView("table")} className={`w-7 h-7 rounded-md grid place-items-center ${view === "table" ? "bg-[--color-surface-strong] text-[--color-ink]" : "text-[--color-muted]"}`}><Rows3 size={13} /></button>
              <button onClick={() => setView("cards")} className={`w-7 h-7 rounded-md grid place-items-center ${view === "cards" ? "bg-[--color-surface-strong] text-[--color-ink]" : "text-[--color-muted]"}`}><LayoutGrid size={13} /></button>
            </div>
          </div>

          {/* Bulk bar */}
          {selected.size > 0 && (
            <div className="mx-3 sm:mx-6 mb-3 flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 px-2.5 py-2 overflow-x-auto no-scrollbar">
              <span className="text-[12px] font-bold text-indigo-700 shrink-0">{selected.size} selected</span>
              <div className="w-px h-4 bg-indigo-200 shrink-0" />
              <BulkBtn icon={MessageSquare} label="SMS" />
              <BulkBtn icon={Mail} label="Email" />
              <BulkBtn icon={Zap} label="Automation" />
              <BulkBtn icon={TagIcon} label="Tag" />
              <BulkBtn icon={ShieldCheck} label="Assign" />
              <BulkBtn icon={Layers} label="Merge" />
              <BulkBtn icon={Archive} label="Archive" />
              <button onClick={() => setSelected(new Set())} className="ml-auto text-[11.5px] font-semibold text-indigo-700 hover:underline shrink-0">Clear</button>
            </div>
          )}
        </div>

        {/* List area */}
        <div className="flex-1 overflow-auto">
          {view === "table" ? (
            <>
            {/* Mobile: card list */}
            <div className="md:hidden p-3 space-y-2">
              {filtered.map(c => (
                <button key={c.id} onClick={() => setActive(c)} className="w-full text-left rounded-2xl border border-[--color-hairline] bg-white p-3 active:scale-[0.99] transition">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-[14px] text-[--color-ink] truncate">{c.name}</span>
                        {c.isFav && <Star size={11} className="text-amber-500 fill-amber-500 shrink-0" />}
                        {c.tags.includes("VIP") && <Crown size={11} className="text-amber-500 shrink-0" />}
                      </div>
                      <div className="text-[11.5px] text-[--color-muted] truncate">{c.company} · {c.pipeline}</div>
                      <div className="text-[11px] text-[--color-muted] truncate">{c.phone}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[13px] font-bold text-[--color-ink]">${(c.ltv/1000).toFixed(1)}k</div>
                      <Pill tone={c.stage === "Customer" ? "success" : c.stage === "Lead" ? "brand" : "neutral"}>{c.stage}</Pill>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[--color-hairline-soft]">
                    <div className="flex items-center gap-1 text-[11px] text-[--color-body]"><Briefcase size={11} className="text-[--color-muted]" /> {c.jobsDone}{c.openJobs > 0 && <span className="text-amber-600 font-semibold"> · {c.openJobs} open</span>}</div>
                    <div className="flex items-center gap-1 text-[11px] text-[--color-body]"><Star size={11} className="text-amber-500 fill-amber-500" /> {c.rating.toFixed(1)}</div>
                    {c.balance > 0 && <div className="text-[11px] font-bold text-rose-600">${c.balance} due</div>}
                    <div className="ml-auto flex items-center gap-0.5">
                      <IconBtn onClick={e => e.stopPropagation()}><Phone size={12} /></IconBtn>
                      <IconBtn onClick={e => e.stopPropagation()}><MessageSquare size={12} /></IconBtn>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[--color-hairline] grid place-items-center mx-auto mb-2"><Users size={22} className="text-[--color-muted]" /></div>
                  <div className="text-[13.5px] font-bold text-[--color-ink]">No matches</div>
                  <div className="text-[12px] text-[--color-muted] mt-1">Try clearing filters or search.</div>
                </div>
              )}
            </div>
            {/* Desktop: full table */}
            <div className="hidden md:block">
              <table className="w-full text-[12.5px]">
                <thead className="sticky top-0 z-10 bg-[--color-canvas]/95 backdrop-blur">
                  <tr className="text-left text-[10.5px] uppercase tracking-wider text-[--color-muted] font-bold">
                    <Th className="w-8 pl-4"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-indigo-600" /></Th>
                    <Th>Customer</Th>
                    <Th className="hidden xl:table-cell">Company</Th>
                    <Th>Contact</Th>
                    <Th>Stage</Th>
                    <Th className="hidden 2xl:table-cell">Pipeline</Th>
                    <Th>Revenue</Th>
                    <Th className="hidden lg:table-cell">Jobs</Th>
                    <Th className="hidden lg:table-cell">Balance</Th>
                    <Th className="hidden 2xl:table-cell">Reviews</Th>
                    <Th className="hidden 2xl:table-cell">Assigned</Th>
                    <Th>AI</Th>
                    <Th className="hidden xl:table-cell">Last</Th>
                    <Th className="pr-4 text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const on = active?.id === c.id;
                    const sel = selected.has(c.id);
                    return (
                      <tr key={c.id} onClick={() => setActive(c)}
                        className={`group border-t border-[--color-hairline-soft] cursor-pointer transition ${on ? "bg-indigo-50/50" : "hover:bg-white"}`}
                      >
                        <Td className="pl-4"><input type="checkbox" checked={sel} onChange={() => toggle(c.id)} onClick={e => e.stopPropagation()} className="accent-indigo-600" /></Td>
                        <Td>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar name={c.name} size={32} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-[--color-ink] truncate">{c.name}</span>
                                {c.isFav && <Star size={11} className="text-amber-500 fill-amber-500" />}
                                {c.tags.includes("VIP") && <Crown size={11} className="text-amber-500" />}
                              </div>
                              <div className="text-[10.5px] text-[--color-muted] truncate">{c.source} · {c.timezone}</div>
                            </div>
                          </div>
                        </Td>
                        <Td><span className="text-[--color-body]">{c.company}</span></Td>
                        <Td>
                          <div className="flex flex-col leading-tight">
                            <span className="text-[--color-ink]">{c.phone}</span>
                            <span className="text-[10.5px] text-[--color-muted] truncate">{c.email}</span>
                          </div>
                        </Td>
                        <Td>
                          <Pill tone={c.stage === "Customer" ? "success" : c.stage === "Lead" ? "brand" : "neutral"}>{c.stage}</Pill>
                        </Td>
                        <Td><span className="text-[11.5px] text-[--color-body-strong]">{c.pipeline}</span></Td>
                        <Td><span className="font-bold text-[--color-ink]">${c.ltv.toLocaleString()}</span></Td>
                        <Td>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-[--color-ink]">{c.jobsDone}</span>
                            {c.openJobs > 0 && <Pill tone="warning">{c.openJobs} open</Pill>}
                          </div>
                        </Td>
                        <Td>
                          {c.balance > 0 ? <span className="font-bold text-rose-600">${c.balance}</span> : <span className="text-[--color-muted]">—</span>}
                        </Td>
                        <Td>
                          <div className="flex items-center gap-1">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="font-semibold text-[--color-ink]">{c.rating.toFixed(1)}</span>
                            <span className="text-[10.5px] text-[--color-muted]">({c.reviews})</span>
                          </div>
                        </Td>
                        <Td>
                          <div className="inline-flex items-center gap-1.5 h-6 px-1.5 rounded-full bg-[--color-surface-strong] text-[11px] font-semibold text-[--color-body-strong]">
                            <div className="w-4 h-4 rounded-full bg-indigo-100 grid place-items-center text-[9px] text-indigo-700 font-bold">{c.assigned.split(" ")[0][0]}</div>
                            {c.assigned}
                          </div>
                        </Td>
                        <Td>
                          <div className="flex items-center gap-1.5">
                            <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${c.aiScore}%`, background: ACCENT_GRAD }} />
                            </div>
                            <span className="text-[11.5px] font-bold text-[--color-ink] tabular-nums">{c.aiScore}</span>
                          </div>
                        </Td>
                        <Td><span className="text-[10.5px] text-[--color-muted]">{c.activity}</span></Td>
                        <Td className="pr-4">
                          <div className="flex items-center gap-0.5 justify-end opacity-70 group-hover:opacity-100 transition">
                            <IconBtn onClick={e => e.stopPropagation()}><Phone size={12} /></IconBtn>
                            <IconBtn onClick={e => e.stopPropagation()}><MessageSquare size={12} /></IconBtn>
                            <IconBtn onClick={e => e.stopPropagation()}><Mail size={12} /></IconBtn>
                            <IconBtn onClick={e => e.stopPropagation()}><MoreHorizontal size={12} /></IconBtn>
                          </div>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="h-60 grid place-items-center">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[--color-hairline] grid place-items-center mx-auto mb-2"><Users size={22} className="text-[--color-muted]" /></div>
                    <div className="text-[13.5px] font-bold text-[--color-ink]">No matches</div>
                    <div className="text-[12px] text-[--color-muted] mt-1">Try clearing filters or search.</div>
                  </div>
                </div>
              )}
            </div>
            </>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map(c => (
                <button key={c.id} onClick={() => setActive(c)} className="text-left rounded-2xl border border-[--color-hairline] bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size={44} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <div className="font-bold text-[--color-ink] truncate">{c.name}</div>
                        {c.tags.includes("VIP") && <Pill tone="gold"><Crown size={9} /> VIP</Pill>}
                      </div>
                      <div className="text-[11.5px] text-[--color-muted] truncate">{c.company}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <MiniKpi label="LTV" value={`$${(c.ltv/1000).toFixed(1)}k`} tone="brand" />
                    <MiniKpi label="Jobs" value={String(c.jobsDone)} tone="success" />
                    <MiniKpi label="AI" value={String(c.aiScore)} tone="brand" />
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <IconBtn><Phone size={12} /></IconBtn>
                    <IconBtn><MessageSquare size={12} /></IconBtn>
                    <IconBtn><Mail size={12} /></IconBtn>
                    <span className="ml-auto text-[10.5px] text-[--color-muted]">{c.activity}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProfileDrawer c={active} onClose={() => setActive(null)} />
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-3 py-2.5 font-bold ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2.5 align-middle ${className}`}>{children}</td>;
}
function IconBtn({ children, onClick }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
  return <button onClick={onClick} className="w-7 h-7 rounded-md grid place-items-center text-[--color-muted] hover:bg-[--color-surface-strong] hover:text-[--color-ink]">{children}</button>;
}
function BulkBtn({ icon: I, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <button className="h-7 px-2.5 rounded-lg text-[11.5px] font-semibold bg-white border border-indigo-200 text-indigo-700 inline-flex items-center gap-1 hover:bg-white">
      <I size={11} /> {label}
    </button>
  );
}
