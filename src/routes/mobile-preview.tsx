import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home, Inbox, Users, Calendar, Wrench, Phone, MessageSquare, Mail,
  Sparkles, PhoneCall, CalendarCheck, Star, CreditCard, FileText,
  DollarSign, ChevronRight, Search, Plus, MoreHorizontal, Send,
  CheckCircle2, Navigation, ArrowLeft, Bell, TrendingUp, Camera,
  Clock, PhoneForwarded, Zap, Building2, Link2, Check,
} from "lucide-react";

export const Route = createFileRoute("/mobile-preview")({
  head: () => ({
    meta: [
      { title: "Mobile App Preview — Revenue Sol" },
      { name: "description", content: "Preview all Revenue Sol mobile app screens inside a phone frame." },
    ],
  }),
  component: MobilePreview,
});

/* ============================================================
   PALETTE (mirrors mobile/src/theme/tokens.ts)
============================================================ */
const C = {
  bg: "#FFFFFF",
  surface: "#F6F9FC",
  surfaceStrong: "#EEF2F7",
  ink: "#0A2540",
  body: "#425466",
  muted: "#8898AA",
  hairline: "#E6EBF1",
  primary: "#635BFF",
  primaryDeep: "#4B44D9",
  primarySoft: "#EEF0FF",
  success: "#00A870",
  successSoft: "#E5F6EE",
  warning: "#F59E0B",
  warningSoft: "#FFF7E5",
  danger: "#E5484D",
  dangerSoft: "#FDECEE",
};

/* ============================================================
   SCREEN CATALOG
============================================================ */
type ScreenDef = { id: string; label: string; group: string; render: () => React.ReactElement };

const SCREENS: ScreenDef[] = [
  // Onboarding
  { id: "welcome",         label: "Welcome",           group: "Onboarding", render: () => <Welcome /> },
  { id: "sign-in",         label: "Sign in",           group: "Onboarding", render: () => <SignIn /> },
  { id: "workspace",       label: "Workspace",         group: "Onboarding", render: () => <Workspace /> },
  { id: "connect-phone",   label: "Connect phone",     group: "Onboarding", render: () => <ConnectPhone /> },
  { id: "connect-email",   label: "Connect email",     group: "Onboarding", render: () => <ConnectEmail /> },
  { id: "connect-calendar",label: "Connect calendar",  group: "Onboarding", render: () => <ConnectCalendar /> },
  { id: "import-website",  label: "Train AI on site",  group: "Onboarding", render: () => <ImportWebsite /> },
  { id: "complete",        label: "All set",           group: "Onboarding", render: () => <Complete /> },
  // Core tabs
  { id: "dashboard",       label: "Dashboard",         group: "Core tabs",  render: () => <Dashboard /> },
  { id: "inbox",           label: "Inbox",             group: "Core tabs",  render: () => <InboxList /> },
  { id: "contacts",        label: "Contacts",          group: "Core tabs",  render: () => <Contacts /> },
  { id: "calendar",        label: "Calendar",          group: "Core tabs",  render: () => <CalendarTab /> },
  { id: "jobs",            label: "Jobs",              group: "Core tabs",  render: () => <Jobs /> },
  // Detail
  { id: "conversation",    label: "Conversation",      group: "Detail",     render: () => <Conversation /> },
  { id: "contact-detail",  label: "Contact detail",    group: "Detail",     render: () => <ContactDetail /> },
  { id: "job-detail",      label: "Job detail",        group: "Detail",     render: () => <JobDetail /> },
  { id: "appt-detail",     label: "Appointment",       group: "Detail",     render: () => <ApptDetail /> },
  // AI
  { id: "ai-employee",     label: "AI Employee",       group: "AI",         render: () => <AIEmployee /> },
  { id: "ai-brain",        label: "AI Brain",          group: "AI",         render: () => <AIBrain /> },
  { id: "ai-voice",        label: "Voice AI",          group: "AI",         render: () => <VoiceAI /> },
  // Money
  { id: "quotes",          label: "Quotes",            group: "Money",      render: () => <Quotes /> },
  { id: "invoices",        label: "Invoices",          group: "Money",      render: () => <Invoices /> },
  { id: "payments",        label: "Payments",          group: "Money",      render: () => <Payments /> },
  { id: "reviews",         label: "Reviews",           group: "Money",      render: () => <Reviews /> },
];

/* ============================================================
   PAGE
============================================================ */
function MobilePreview() {
  const [active, setActive] = useState<string>("dashboard");
  const current = SCREENS.find(s => s.id === active) ?? SCREENS[0];
  const groups = Array.from(new Set(SCREENS.map(s => s.group)));

  return (
    <div className="min-h-screen bg-[#0a1a1a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} /> Back to site
        </Link>
        <div className="text-sm font-medium">Revenue Sol · Mobile app preview</div>
        <div className="text-xs text-white/50">{SCREENS.length} screens</div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px] gap-8 px-6 py-8 max-w-[1600px] mx-auto">
        {/* Screen list */}
        <aside className="space-y-6">
          {groups.map(g => (
            <div key={g}>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2 px-2">{g}</div>
              <div className="space-y-1">
                {SCREENS.filter(s => s.group === g).map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      active === s.id
                        ? "bg-white text-[#0a1a1a] font-medium"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Phone frame */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-sm text-white/60">{current.group} · <span className="text-white">{current.label}</span></div>
          <PhoneFrame>{current.render()}</PhoneFrame>
          <div className="text-xs text-white/40 max-w-md text-center leading-relaxed">
            Static visual preview built in React. The real app is a separate Expo/React Native project in the <code className="text-white/70">mobile/</code> folder — run with <code className="text-white/70">bunx expo start</code>.
          </div>
        </div>

        {/* Info panel */}
        <aside className="space-y-4 text-sm">
          <div className="rounded-xl border border-white/10 p-4">
            <div className="text-white/50 text-xs uppercase tracking-widest mb-2">About</div>
            <p className="text-white/80 leading-relaxed">
              Every mobile screen at a glance. Click any item in the left list to render it in the phone frame.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Run locally</div>
            <pre className="text-[11px] leading-relaxed bg-black/40 p-3 rounded-lg overflow-auto text-white/80">{`cd mobile
bun install
bunx expo start`}</pre>
            <p className="text-white/60 text-xs mt-2">Scan QR with Expo Go.</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Coverage</div>
            <ul className="space-y-1 text-white/80">
              <li>8 onboarding screens</li>
              <li>5 core tabs</li>
              <li>4 detail views</li>
              <li>3 AI surfaces</li>
              <li>4 money surfaces</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================================================
   PHONE FRAME
============================================================ */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        width: 380,
        height: 780,
        borderRadius: 54,
        background: "#0a1a1a",
        padding: 12,
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset",
      }}
    >
      <div
        className="w-full h-full overflow-hidden relative"
        style={{ borderRadius: 44, background: C.bg }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30" />
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 text-[11px] font-semibold text-[#0A2540] z-20">
          <span>9:41</span>
          <span className="opacity-0">.</span>
          <span>􀛨􀋨</span>
        </div>
        {/* Content scroll area */}
        <div className="absolute inset-0 pt-10 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHARED UI PRIMITIVES
============================================================ */
const Screen = ({ children, pad = true }: { children: React.ReactNode; pad?: boolean }) => (
  <div style={{ padding: pad ? 20 : 0, paddingBottom: 32, background: C.bg, minHeight: "100%" }}>{children}</div>
);

const Header = ({ title, subtitle, back, right }: { title: string; subtitle?: string; back?: boolean; right?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    {back && (
      <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.surface }}>
        <ArrowLeft size={16} color={C.ink} />
      </button>
    )}
    <div className="flex-1 min-w-0">
      <div className="text-[20px] font-bold tracking-tight" style={{ color: C.ink }}>{title}</div>
      {subtitle && <div className="text-[12px]" style={{ color: C.muted }}>{subtitle}</div>}
    </div>
    {right}
  </div>
);

const Card = ({ children, style, onClick }: any) => (
  <div
    onClick={onClick}
    className={onClick ? "cursor-pointer" : ""}
    style={{
      background: C.bg,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: C.hairline,
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 1px 2px rgba(10,37,64,0.04)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Badge = ({ label, tone = "neutral", dot }: { label: string; tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral"; dot?: boolean }) => {
  const map: any = {
    primary: [C.primarySoft, C.primaryDeep],
    success: [C.successSoft, C.success],
    warning: [C.warningSoft, C.warning],
    danger:  [C.dangerSoft, C.danger],
    info:    [C.primarySoft, C.primaryDeep],
    neutral: [C.surface, C.body],
  };
  const [bg, fg] = map[tone];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: bg, color: fg }}>
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: fg }} />}
      {label}
    </span>
  );
};

const Btn = ({ label, variant = "primary", icon, full, onClick }: any) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-4 h-11 rounded-xl"
    style={{
      background: variant === "primary" ? C.primary : C.surface,
      color: variant === "primary" ? "#fff" : C.ink,
      width: full ? "100%" : undefined,
      border: variant === "primary" ? "none" : `1px solid ${C.hairline}`,
    }}
  >
    {icon}
    {label}
  </button>
);

const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => {
  const initials = name.split(" ").map(n => n[0]).slice(0,2).join("");
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold flex-shrink-0"
      style={{ width: size, height: size, background: C.primarySoft, color: C.primaryDeep, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
};

const Section = ({ title, action }: { title: string; action?: string }) => (
  <div className="flex items-center justify-between mt-6 mb-3">
    <div className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: C.muted }}>{title}</div>
    {action && <button className="text-[12px] font-semibold" style={{ color: C.primaryDeep }}>{action}</button>}
  </div>
);

const TabBar = ({ active }: { active: string }) => {
  const tabs = [
    { id: "dashboard", label: "Home",     icon: Home },
    { id: "inbox",     label: "Inbox",    icon: Inbox },
    { id: "contacts",  label: "Contacts", icon: Users },
    { id: "calendar",  label: "Calendar", icon: Calendar },
    { id: "jobs",      label: "Jobs",     icon: Wrench },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around pt-2 pb-6" style={{ background: C.bg, borderTop: `1px solid ${C.hairline}` }}>
      {tabs.map(t => {
        const I = t.icon;
        const on = t.id === active;
        return (
          <div key={t.id} className="flex flex-col items-center gap-1" style={{ color: on ? C.primaryDeep : C.muted }}>
            <I size={20} />
            <div className="text-[10px] font-semibold">{t.label}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ============================================================
   ONBOARDING SCREENS
============================================================ */
function Welcome() {
  return (
    <div style={{ background: C.bg, minHeight: "100%", display: "flex", flexDirection: "column", padding: 24 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: C.primary }}>
          <Sparkles size={30} color="#fff" />
        </div>
        <div>
          <div className="text-[34px] font-bold leading-[1.1] tracking-tight" style={{ color: C.ink }}>Run your business from anywhere.</div>
          <div className="text-[15px] leading-relaxed mt-4" style={{ color: C.body }}>The operator OS for service shops — AI answers every call, replies in seconds, and books jobs to your calendar.</div>
        </div>
        <div className="space-y-3">
          {[
            "24/7 AI receptionist",
            "Auto-booking to your calendar",
            "Get paid, send quotes, ask reviews",
          ].map(t => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.successSoft }}>
                <Check size={13} color={C.success} />
              </div>
              <span className="text-[14px]" style={{ color: C.ink }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Btn label="Get started" full />
        <Btn label="I already have an account" variant="secondary" full />
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <Screen>
      <Header title="Welcome back" subtitle="Sign in to your workspace" />
      <div className="space-y-3">
        <InputLike label="Work email" value="you@reyeshvac.com" />
        <InputLike label="Password" value="••••••••••" />
        <Btn label="Sign in" full />
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px" style={{ background: C.hairline }} />
          <span className="text-[11px]" style={{ color: C.muted }}>OR</span>
          <div className="flex-1 h-px" style={{ background: C.hairline }} />
        </div>
        <Btn label="Continue with Google" variant="secondary" full />
        <Btn label="Continue with Apple" variant="secondary" full />
      </div>
    </Screen>
  );
}

function InputLike({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: C.surface, border: `1px solid ${C.hairline}` }}>
      <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.muted }}>{label}</div>
      <div className="text-[15px] font-medium" style={{ color: C.ink }}>{value}</div>
    </div>
  );
}

function Workspace() {
  return (
    <Screen>
      <Header title="Tell us about your shop" subtitle="Step 1 of 5" back />
      <div className="space-y-3">
        <InputLike label="Business name" value="Reyes HVAC" />
        <InputLike label="Industry" value="HVAC · Plumbing" />
        <InputLike label="Team size" value="4 – 10 techs" />
        <InputLike label="City" value="Austin, TX" />
      </div>
      <Btn label="Continue" full onClick={() => {}} />
      <div className="h-3" />
    </Screen>
  );
}

function ConnectPhone() {
  return (
    <Screen>
      <Header title="Connect your phone" subtitle="Step 2 of 5" back />
      <Card style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.primarySoft }}>
          <Phone size={22} color={C.primaryDeep} />
        </div>
        <div className="flex-1">
          <div className="font-semibold" style={{ color: C.ink }}>Business line</div>
          <div className="text-[12px]" style={{ color: C.muted }}>(512) 555-0199</div>
        </div>
        <Badge label="Ready" tone="success" dot />
      </Card>
      <Section title="Provider" />
      <div className="space-y-2">
        {[{n:"Twilio", ok:true},{n:"RingCentral", ok:true},{n:"OpenPhone"}].map(p => (
          <Card key={p.n} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span className="font-medium" style={{ color: C.ink }}>{p.n}</span>
            {p.ok ? <Badge label="Connected" tone="success" /> : <Badge label="Connect" tone="primary" />}
          </Card>
        ))}
      </div>
      <Btn label="Continue" full />
    </Screen>
  );
}

function ConnectEmail() {
  return (
    <Screen>
      <Header title="Connect your inbox" subtitle="Step 3 of 5" back />
      <div className="space-y-3">
        {[
          { n: "Gmail", d: "1-click OAuth", tone: "primary" },
          { n: "Outlook / Microsoft 365", d: "1-click OAuth", tone: "primary" },
          { n: "IMAP / SMTP", d: "Any provider", tone: "neutral" },
        ].map(p => (
          <Card key={p.n} style={{ display:"flex", alignItems:"center", gap: 12 }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: C.primarySoft }}>
              <Mail size={18} color={C.primaryDeep} />
            </div>
            <div className="flex-1">
              <div className="font-semibold" style={{ color: C.ink }}>{p.n}</div>
              <div className="text-[12px]" style={{ color: C.muted }}>{p.d}</div>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </Card>
        ))}
      </div>
      <Btn label="Continue" full />
    </Screen>
  );
}

function ConnectCalendar() {
  return (
    <Screen>
      <Header title="Sync your calendar" subtitle="Step 4 of 5" back />
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.successSoft }}>
            <CalendarCheck size={22} color={C.success} />
          </div>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: C.ink }}>Google Calendar</div>
            <div className="text-[12px]" style={{ color: C.muted }}>2-way sync · marcus@reyeshvac.com</div>
          </div>
          <Badge label="Live" tone="success" dot />
        </div>
      </Card>
      <Section title="Booking rules" />
      <Card style={{ padding: 0 }}>
        {[
          ["Business hours", "Mon–Sat 7am–7pm"],
          ["Buffer between jobs", "30 min"],
          ["Slot length", "60 min"],
        ].map((r, i, arr) => (
          <div key={r[0]} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <span className="text-[13px]" style={{ color: C.body }}>{r[0]}</span>
            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{r[1]}</span>
          </div>
        ))}
      </Card>
      <Btn label="Continue" full />
    </Screen>
  );
}

function ImportWebsite() {
  return (
    <Screen>
      <Header title="Train AI on your site" subtitle="Step 5 of 5" back />
      <InputLike label="Website URL" value="https://reyeshvac.com" />
      <Card style={{ marginTop: 12, background: "#FBFAFF", borderColor: C.primarySoft }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} color={C.primaryDeep} />
          <div className="font-semibold text-[13px]" style={{ color: C.primaryDeep }}>Extracted knowledge</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["42","Pages"],["128","FAQs"],["34","Services"]].map(([v,l]) => (
            <div key={l} className="rounded-lg py-2" style={{ background: "#fff" }}>
              <div className="font-bold text-[18px]" style={{ color: C.ink }}>{v}</div>
              <div className="text-[10px]" style={{ color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Btn label="Finish setup" full />
    </Screen>
  );
}

function Complete() {
  return (
    <div style={{ background: C.bg, minHeight: "100%", display: "flex", flexDirection: "column", padding: 24, alignItems: "center", justifyContent: "center", textAlign: "center", gap: 20 }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: C.successSoft }}>
        <CheckCircle2 size={40} color={C.success} />
      </div>
      <div>
        <div className="text-[26px] font-bold" style={{ color: C.ink }}>You're live.</div>
        <div className="text-[14px] mt-2" style={{ color: C.body }}>Your AI receptionist is now answering (512) 555-0199 and will book jobs straight to your calendar.</div>
      </div>
      <div className="w-full space-y-3 mt-6">
        <Btn label="Enter dashboard" full />
        <Btn label="Take a tour" variant="secondary" full />
      </div>
    </div>
  );
}

/* ============================================================
   CORE TABS
============================================================ */
function Dashboard() {
  return (
    <div style={{ background: C.bg, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ padding: 20 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[12px]" style={{ color: C.muted }}>Tuesday, Jul 1</div>
            <div className="text-[24px] font-bold" style={{ color: C.ink }}>Good morning, Marcus</div>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: C.surface }}>
            <Bell size={18} color={C.ink} />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: C.danger }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric label="Revenue today" value="$4,280" trend="+22%" tone="success" />
          <Metric label="Jobs booked"   value="12"     trend="+3"   tone="primary" />
          <Metric label="AI replies"    value="28"     trend="24/7" tone="neutral" />
          <Metric label="Pending pay"   value="$2,589" trend="4 inv" tone="warning" />
        </div>

        <Section title="Quick actions" />
        <div className="grid grid-cols-4 gap-2">
          {[
            { i: Plus, l: "New job" },
            { i: FileText, l: "Quote" },
            { i: DollarSign, l: "Invoice" },
            { i: MessageSquare, l: "Reply" },
          ].map(a => {
            const I = a.i;
            return (
              <div key={a.l} className="flex flex-col items-center gap-1.5 py-3 rounded-xl" style={{ background: C.surface }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#fff" }}>
                  <I size={16} color={C.primaryDeep} />
                </div>
                <span className="text-[10px] font-semibold" style={{ color: C.ink }}>{a.l}</span>
              </div>
            );
          })}
        </div>

        <Section title="AI activity" action="See all" />
        <Card style={{ background: "#FBFAFF", borderColor: C.primarySoft }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} color={C.primaryDeep} />
            <div className="font-semibold text-[12px]" style={{ color: C.primaryDeep }}>AI EMPLOYEE · WORKING</div>
          </div>
          <div className="text-[14px]" style={{ color: C.ink }}>Handled 42 tasks today. 7 waiting for your approval.</div>
        </Card>

        <Section title="Recent activity" />
        <div className="space-y-2">
          {[
            { who: "AI Receptionist", what: "Booked Priya Rao for 3pm", t: "2m" },
            { who: "Marcus L.",       what: "En route to Reyes HVAC",  t: "18m" },
            { who: "Stripe",          what: "$1,450 from Aisha O.",     t: "3h" },
          ].map((a, i) => (
            <div key={i} className="flex gap-3 py-2">
              <div className="w-2 h-2 rounded-full mt-2" style={{ background: C.primary }} />
              <div className="flex-1">
                <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{a.who}</div>
                <div className="text-[12px]" style={{ color: C.body }}>{a.what}</div>
              </div>
              <div className="text-[11px]" style={{ color: C.muted }}>{a.t}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="dashboard" />
    </div>
  );
}

function Metric({ label, value, trend, tone }: any) {
  const toneMap: any = { success: C.success, primary: C.primaryDeep, warning: C.warning, neutral: C.muted };
  return (
    <div style={{ background: C.surface, borderRadius: 14, padding: 14 }}>
      <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: C.muted }}>{label}</div>
      <div className="text-[22px] font-bold mt-1" style={{ color: C.ink }}>{value}</div>
      <div className="text-[11px] font-semibold mt-1" style={{ color: toneMap[tone] }}>{trend}</div>
    </div>
  );
}

function InboxList() {
  const items = [
    { name: "Priya Rao",     ch: "SMS",     preview: "Yes, 3pm works — see you then.", t: "2m",  unread: true },
    { name: "Reyes HVAC",    ch: "Webchat", preview: "New lead: AC not cooling.",      t: "8m",  ai: true },
    { name: "Jordan Pike",   ch: "Call",    preview: "Missed call · 24s voicemail",    t: "12m" },
    { name: "Maya Sørensen", ch: "Email",   preview: "Re: Furnace tune-up quote",     t: "1h",  ai: true },
    { name: "Devon Kim",     ch: "SMS",     preview: "Thanks, I'll think it over.",    t: "3h" },
    { name: "Alicia Weber",  ch: "Webchat", preview: "Is anyone available tonight?",   t: "5h",  unread: true },
  ];
  return (
    <div style={{ background: C.bg, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ padding: 20, paddingBottom: 0 }}>
        <Header title="Inbox" subtitle="12 conversations · 3 unread" right={
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
            <Plus size={18} color="#fff" />
          </button>
        } />
        <div className="flex items-center gap-2 rounded-xl px-3 h-10 mb-3" style={{ background: C.surface }}>
          <Search size={15} color={C.muted} />
          <span className="text-[13px]" style={{ color: C.muted }}>Search messages</span>
        </div>
        <div className="flex gap-2 mb-3">
          {["All", "Unread", "AI handled", "Needs reply"].map((f, i) => (
            <div key={f} className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ background: i === 0 ? C.ink : C.surface, color: i === 0 ? "#fff" : C.body }}>
              {f}
            </div>
          ))}
        </div>
      </div>
      <div>
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3" style={{ borderTop: `1px solid ${C.hairline}` }}>
            <Avatar name={c.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-[14px] truncate" style={{ color: C.ink }}>{c.name}</div>
                <div className="text-[11px]" style={{ color: C.muted }}>{c.t}</div>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.muted }}>{c.ch}</span>
                {c.ai && <Badge label="AI" tone="primary" />}
                {c.unread && <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.primary }} />}
              </div>
              <div className="text-[12px] truncate mt-0.5" style={{ color: C.body }}>{c.preview}</div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="inbox" />
    </div>
  );
}

function Contacts() {
  const list = [
    { n: "Priya Rao",     t: "Website form", s: 92 },
    { n: "Jordan Pike",   t: "Missed call",  s: 78 },
    { n: "Maya Sørensen", t: "Google Ads",   s: 64 },
    { n: "Devon Kim",     t: "Referral",     s: 41 },
    { n: "Aisha O.",      t: "Repeat",       s: 88 },
    { n: "Nina B.",       t: "Repeat",       s: 74 },
  ];
  return (
    <div style={{ background: C.bg, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ padding: 20 }}>
        <Header title="Contacts" subtitle="248 total" right={
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
            <Plus size={18} color="#fff" />
          </button>
        } />
        <div className="flex items-center gap-2 rounded-xl px-3 h-10 mb-3" style={{ background: C.surface }}>
          <Search size={15} color={C.muted} />
          <span className="text-[13px]" style={{ color: C.muted }}>Search contacts</span>
        </div>
        <div className="space-y-2">
          {list.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: `1px solid ${C.hairline}` }}>
              <Avatar name={c.n} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px]" style={{ color: C.ink }}>{c.n}</div>
                <div className="text-[11px]" style={{ color: C.muted }}>{c.t}</div>
              </div>
              <Badge label={`Score ${c.s}`} tone={c.s >= 80 ? "success" : c.s >= 60 ? "warning" : "neutral"} />
            </div>
          ))}
        </div>
      </div>
      <TabBar active="contacts" />
    </div>
  );
}

function CalendarTab() {
  const appts = [
    { t: "AC diagnostic",   c: "Priya Rao",   s: "2:00", tone: "success" },
    { t: "Furnace tune-up", c: "Reyes HVAC",  s: "4:30", tone: "success" },
    { t: "Quote call",      c: "Aisha O.",    s: "6:00", tone: "warning" },
  ];
  return (
    <div style={{ background: C.bg, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ padding: 20 }}>
        <Header title="Calendar" subtitle="Tuesday, Jul 1" right={
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
            <Plus size={18} color="#fff" />
          </button>
        } />
        <div className="flex gap-2 mb-4 overflow-hidden">
          {["M 30","T 1","W 2","T 3","F 4","S 5","S 6"].map((d, i) => (
            <div key={d} className="flex-1 text-center rounded-xl py-2" style={{ background: i === 1 ? C.primary : C.surface }}>
              <div className="text-[10px] font-semibold" style={{ color: i === 1 ? "#fff" : C.muted }}>{d.split(" ")[0]}</div>
              <div className="text-[16px] font-bold mt-0.5" style={{ color: i === 1 ? "#fff" : C.ink }}>{d.split(" ")[1]}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {appts.map((a, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ border: `1px solid ${C.hairline}` }}>
              <div className="text-center pr-3" style={{ borderRight: `1px solid ${C.hairline}` }}>
                <div className="text-[16px] font-bold" style={{ color: C.ink }}>{a.s}</div>
                <div className="text-[10px]" style={{ color: C.muted }}>PM</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[14px]" style={{ color: C.ink }}>{a.t}</div>
                <div className="text-[12px]" style={{ color: C.body }}>{a.c}</div>
              </div>
              <Badge label={a.tone === "success" ? "Confirmed" : "Pending"} tone={a.tone as any} />
            </div>
          ))}
        </div>
      </div>
      <TabBar active="calendar" />
    </div>
  );
}

function Jobs() {
  const items = [
    { t: "AC diagnostic + recharge", c: "Priya Rao", w: "Today · 2 PM", s: "En route",  tone: "warning", v: "$248" },
    { t: "Furnace tune-up",          c: "Reyes HVAC", w: "Today · 4:30 PM", s: "Scheduled", tone: "primary", v: "$189" },
    { t: "Water heater install",     c: "Aisha O.",   w: "Tomorrow · 9 AM",   s: "Scheduled", tone: "primary", v: "$1,450" },
    { t: "Duct cleaning",            c: "Nina B.",    w: "Yesterday",         s: "Complete",  tone: "success", v: "$420" },
  ];
  return (
    <div style={{ background: C.bg, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ padding: 20 }}>
        <Header title="Jobs" subtitle="4 active this week" right={
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
            <Plus size={18} color="#fff" />
          </button>
        } />
        <div className="space-y-2">
          {items.map((j, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ border: `1px solid ${C.hairline}` }}>
              <div className="flex items-start justify-between mb-1">
                <div className="font-semibold text-[14px]" style={{ color: C.ink }}>{j.t}</div>
                <Badge label={j.s} tone={j.tone as any} />
              </div>
              <div className="text-[12px]" style={{ color: C.body }}>{j.c} · {j.w}</div>
              <div className="text-[16px] font-bold mt-2" style={{ color: C.ink }}>{j.v}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="jobs" />
    </div>
  );
}

/* ============================================================
   DETAIL SCREENS
============================================================ */
function Conversation() {
  return (
    <div style={{ background: C.bg, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${C.hairline}` }}>
        <ArrowLeft size={18} color={C.ink} />
        <Avatar name="Priya Rao" size={34} />
        <div className="flex-1">
          <div className="font-semibold text-[14px]" style={{ color: C.ink }}>Priya Rao</div>
          <div className="text-[10px]" style={{ color: C.muted }}>SMS · (512) 555-0123</div>
        </div>
        <Phone size={16} color={C.primaryDeep} />
        <MoreHorizontal size={18} color={C.ink} />
      </div>
      <div className="flex-1 p-5 space-y-3 overflow-auto">
        <div className="flex justify-start">
          <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-md text-[13px]" style={{ background: C.surface, color: C.ink }}>
            Hi — my AC stopped cooling this morning, can someone come today?
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge label="AI reply · sent for you" tone="primary" dot />
          <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-br-md text-[13px]" style={{ background: C.primary, color: "#fff" }}>
            Hi Priya, I have a 2pm slot open with Marcus. Should I book it?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-md text-[13px]" style={{ background: C.surface, color: C.ink }}>
            Yes, 3pm would be better if possible.
          </div>
        </div>
        <Card style={{ background: "#FBFAFF", borderColor: C.primarySoft }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} color={C.primaryDeep} />
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.primaryDeep }}>Suggested reply</div>
          </div>
          <div className="text-[13px]" style={{ color: C.ink }}>"No problem — 3pm works. I'll send Marcus your way and text his ETA."</div>
          <div className="flex gap-2 mt-3">
            <Btn label="Approve & send" />
            <Btn label="Edit" variant="secondary" />
          </div>
        </Card>
      </div>
      <div className="flex items-center gap-2 p-3" style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div className="flex-1 h-10 rounded-full px-4 flex items-center text-[13px]" style={{ border: `1px solid ${C.hairline}`, color: C.muted }}>Message</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
          <Send size={16} color="#fff" />
        </div>
      </div>
    </div>
  );
}

function ContactDetail() {
  return (
    <Screen>
      <Header title="Contact" back />
      <div className="flex flex-col items-center gap-2 py-4">
        <Avatar name="Priya Rao" size={72} />
        <div className="text-[22px] font-bold" style={{ color: C.ink }}>Priya Rao</div>
        <div className="flex gap-2">
          <Badge label="Website" tone="primary" />
          <Badge label="Score 92" tone="success" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Btn label="Call" />
        <Btn label="Text" variant="secondary" />
        <Btn label="Email" variant="secondary" />
      </div>
      <Card style={{ padding: 0 }}>
        {[
          ["Phone", "(512) 555-0111"],
          ["Email", "priya.rao@mail.com"],
          ["Source", "Website form"],
          ["Address", "182 W 5th St, Austin"],
        ].map((r, i, arr) => (
          <div key={r[0]} className="flex justify-between px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <span className="text-[13px]" style={{ color: C.muted }}>{r[0]}</span>
            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{r[1]}</span>
          </div>
        ))}
      </Card>
      <Section title="Activity timeline" />
      <Card style={{ padding: 0 }}>
        {[
          ["AI Receptionist", "Booked AC diagnostic", "2m"],
          ["Marcus L.", "En route to job", "18m"],
          ["AI Employee", "Sent review request", "1h"],
        ].map((a, i, arr) => (
          <div key={i} className="flex gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: C.primary }} />
            <div className="flex-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{a[0]}</div>
              <div className="text-[12px]" style={{ color: C.body }}>{a[1]}</div>
            </div>
            <div className="text-[11px]" style={{ color: C.muted }}>{a[2]}</div>
          </div>
        ))}
      </Card>
    </Screen>
  );
}

function JobDetail() {
  const check = [
    { t: "Confirm arrival window", d: true },
    { t: "Load parts: R-410a",     d: true },
    { t: "Run diagnostic",         d: false },
    { t: "Present quote",          d: false },
  ];
  return (
    <Screen>
      <Header title="Job detail" back />
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="text-[20px] font-bold" style={{ color: C.ink }}>AC diagnostic + recharge</div>
          <div className="text-[13px]" style={{ color: C.body }}>Priya Rao</div>
        </div>
        <Badge label="En route" tone="warning" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Btn label="Route" icon={<Navigation size={13} color="#fff" />} />
        <Btn label="Call" variant="secondary" />
        <Btn label="Update" variant="secondary" />
      </div>
      <Card style={{ padding: 0 }}>
        {[["When","Today · 2 PM"],["Address","182 W 5th St"],["Tech","Marcus L."],["Value","$248"]].map((r, i, arr) => (
          <div key={r[0]} className="flex justify-between px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <span className="text-[13px]" style={{ color: C.muted }}>{r[0]}</span>
            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{r[1]}</span>
          </div>
        ))}
      </Card>
      <Section title="Checklist" />
      <Card style={{ padding: 0 }}>
        {check.map((c, i, arr) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: c.d ? C.success : "transparent", border: `1.5px solid ${c.d ? C.success : C.hairline}` }}>
              {c.d && <Check size={12} color="#fff" />}
            </div>
            <span className="text-[13px] flex-1" style={{ color: c.d ? C.muted : C.ink, textDecoration: c.d ? "line-through" : "none" }}>{c.t}</span>
          </div>
        ))}
      </Card>
      <Section title="Photos" action="Add" />
      <div className="grid grid-cols-3 gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: C.surface, border: `1px solid ${C.hairline}` }}>
            <Camera size={20} color={C.muted} />
          </div>
        ))}
      </div>
    </Screen>
  );
}

function ApptDetail() {
  return (
    <Screen>
      <Header title="Appointment" back />
      <div className="text-[22px] font-bold" style={{ color: C.ink }}>AC diagnostic</div>
      <div className="text-[13px]" style={{ color: C.body }}>Priya Rao</div>
      <div className="flex gap-2 mt-2">
        <Badge label="Confirmed" tone="success" />
        <Badge label="On-site" tone="neutral" />
      </div>
      <Card style={{ marginTop: 16, padding: 0 }}>
        {[["Starts","Today · 2:00 PM"],["Ends","3:00 PM"],["Assigned","Marcus L."],["Reminder","SMS 30 min before"]].map((r, i, arr) => (
          <div key={r[0]} className="flex justify-between px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <span className="text-[13px]" style={{ color: C.muted }}>{r[0]}</span>
            <span className="text-[13px] font-semibold" style={{ color: C.ink }}>{r[1]}</span>
          </div>
        ))}
      </Card>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Btn label="Reschedule" variant="secondary" />
        <Btn label="Cancel" variant="secondary" />
        <Btn label="Complete" />
      </div>
    </Screen>
  );
}

/* ============================================================
   AI SCREENS
============================================================ */
function AIEmployee() {
  return (
    <Screen>
      <Header title="AI Employee" subtitle="Working 24/7" back />
      <Card style={{ background: "#FBFAFF", borderColor: C.primarySoft }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.primary }}>
            <Sparkles size={22} color="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-bold" style={{ color: C.ink }}>All systems normal</div>
            <div className="text-[11px]" style={{ color: C.muted }}>42 tasks today · 7 need approval</div>
          </div>
          <Badge label="Active" tone="success" dot />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[[MessageSquare,"28","Replies"],[PhoneCall,"12","Calls"],[CalendarCheck,"9","Booked"],[Star,"4","Reviews"]].map(([I,v,l]:any,i) => (
            <div key={i} className="rounded-lg p-2" style={{ background: "#fff" }}>
              <I size={13} color={C.primaryDeep} />
              <div className="text-[16px] font-bold mt-1" style={{ color: C.ink }}>{v}</div>
              <div className="text-[9px]" style={{ color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
      <Section title="Auto-reply settings" />
      <Card style={{ padding: 0 }}>
        {[
          ["Answer inbound calls", "24/7 AI receptionist", true],
          ["Reply to missed calls", "SMS in <60 sec", true],
          ["Reply to webchat", "Book jobs directly", true],
          ["Ask reviews after job", "After 'complete' status", false],
        ].map((t, i, arr) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <div className="flex-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{t[0]}</div>
              <div className="text-[11px]" style={{ color: C.muted }}>{t[1]}</div>
            </div>
            <div className="w-10 h-6 rounded-full p-0.5" style={{ background: t[2] ? C.primary : C.hairline }}>
              <div className="w-5 h-5 rounded-full bg-white" style={{ marginLeft: t[2] ? 16 : 0 }} />
            </div>
          </div>
        ))}
      </Card>
      <Section title="Approval queue" action="See all" />
      <Card style={{ background: "#FBFAFF", borderColor: C.primarySoft }}>
        <div className="text-[13px] font-semibold" style={{ color: C.ink }}>Approve reply to Priya Rao</div>
        <div className="text-[12px] mt-1" style={{ color: C.body }}>Confirming 3pm today. Sends tech's ETA text automatically.</div>
        <div className="flex gap-2 mt-3">
          <Btn label="Approve" />
          <Btn label="Dismiss" variant="secondary" />
        </div>
      </Card>
    </Screen>
  );
}

function AIBrain() {
  return (
    <Screen>
      <Header title="AI Brain" subtitle="Give it any task in plain English" back />
      <Card style={{ background: "#FBFAFF", borderColor: C.primarySoft }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
            <Sparkles size={14} color="#fff" />
          </div>
          <div className="text-[15px] font-bold" style={{ color: C.ink }}>Command center</div>
        </div>
        <div className="rounded-lg p-3 min-h-[80px] text-[13px]" style={{ background: "#fff", border: `1px solid ${C.hairline}`, color: C.muted }}>
          Ask AI to do anything — draft, book, send, follow up…
        </div>
        <div className="mt-3">
          <Btn label="Plan it" icon={<Send size={13} color="#fff" />} full />
        </div>
      </Card>
      <Section title="Try an example" />
      <div className="space-y-2">
        {[
          "Text every unpaid invoice from last week a friendly reminder.",
          "Book Priya at 3pm and confirm by SMS.",
          "Draft review replies for anything ≥4 stars.",
          "Follow up with all leads quiet for 48 hours.",
        ].map(e => (
          <div key={e} className="p-3 rounded-xl text-[13px] font-semibold" style={{ background: C.surface, color: C.ink }}>{e}</div>
        ))}
      </div>
    </Screen>
  );
}

function VoiceAI() {
  const recent = [
    { n: "Priya Rao",    d: "1:42", s: "Booked 3pm AC diagnostic.",       t: "12m" },
    { n: "Unknown",      d: "0:34", s: "Voicemail — wants estimate.",     t: "42m" },
    { n: "Jordan Pike",  d: "2:11", s: "Rescheduled to Wed 4pm.",         t: "2h" },
  ];
  return (
    <Screen>
      <Header title="Voice AI Receptionist" subtitle="Answering (512) 555-0199" back />
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.successSoft }}>
            <Phone size={22} color={C.success} />
          </div>
          <div className="flex-1">
            <div className="text-[18px] font-bold" style={{ color: C.ink }}>Live</div>
            <div className="text-[11px]" style={{ color: C.muted }}>12 calls today · 9 booked</div>
          </div>
          <Badge label="98% pickup" tone="success" />
        </div>
      </Card>
      <Section title="Call routing" />
      <Card style={{ padding: 0 }}>
        {[
          ["AI answers first", "Warm greeting, qualifies lead", true],
          ["Transfer emergencies", "Detects 'flood, leak, no heat'", true],
          ["SMS summary to owner", "After every AI call", true],
        ].map((t, i, arr) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <div className="flex-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{t[0]}</div>
              <div className="text-[11px]" style={{ color: C.muted }}>{t[1]}</div>
            </div>
            <div className="w-10 h-6 rounded-full p-0.5" style={{ background: C.primary }}>
              <div className="w-5 h-5 rounded-full bg-white ml-4" />
            </div>
          </div>
        ))}
      </Card>
      <Section title="Recent AI calls" action="See all" />
      <Card style={{ padding: 0 }}>
        {recent.map((c, i, arr) => (
          <div key={i} className="flex gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <Avatar name={c.n} size={32} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{c.n}</div>
                <div className="text-[11px]" style={{ color: C.muted }}>{c.t}</div>
              </div>
              <div className="text-[12px]" style={{ color: C.body }}>{c.s}</div>
              <div className="text-[10px] mt-0.5" style={{ color: C.muted }}>Duration {c.d}</div>
            </div>
          </div>
        ))}
      </Card>
    </Screen>
  );
}

/* ============================================================
   MONEY SCREENS
============================================================ */
function Quotes() {
  const list = [
    { n: "Q-241", c: "Aisha O.",    a: "$1,450", s: "Accepted", t: "success" },
    { n: "Q-242", c: "Jordan Pike", a: "$980",   s: "Sent",     t: "primary" },
    { n: "Q-243", c: "Alicia W.",   a: "$2,300", s: "Viewed",   t: "primary" },
  ];
  return (
    <Screen>
      <Header title="Quotes" subtitle="3 open" back right={
        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
          <Plus size={18} color="#fff" />
        </button>
      } />
      <div className="space-y-2">
        {list.map((q, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-[14px]" style={{ color: C.ink }}>{q.n}</div>
              <Badge label={q.s} tone={q.t as any} />
            </div>
            <div className="text-[12px] mt-1" style={{ color: C.body }}>{q.c}</div>
            <div className="text-[20px] font-bold mt-2" style={{ color: C.ink }}>{q.a}</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function Invoices() {
  const list = [
    { n: "INV-1042", c: "Aisha O.",    a: "$1,450", s: "Paid",    t: "success", d: "Paid Jun 28" },
    { n: "INV-1043", c: "Reyes HVAC",  a: "$189",   s: "Sent",    t: "primary", d: "Due Jul 5" },
    { n: "INV-1044", c: "Jordan Pike", a: "$980",   s: "Overdue", t: "danger",  d: "5 days overdue" },
    { n: "INV-1045", c: "Nina B.",     a: "$420",   s: "Draft",   t: "neutral", d: "Draft" },
  ];
  return (
    <Screen>
      <Header title="Invoices" back right={
        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.primary }}>
          <Plus size={18} color="#fff" />
        </button>
      } />
      <div className="grid grid-cols-3 gap-2">
        <Card style={{ padding: 12 }}>
          <div className="text-[9px] uppercase font-semibold" style={{ color: C.muted }}>Outstanding</div>
          <div className="text-[15px] font-bold mt-1" style={{ color: C.ink }}>$2,589</div>
        </Card>
        <Card style={{ padding: 12 }}>
          <div className="text-[9px] uppercase font-semibold" style={{ color: C.muted }}>Overdue</div>
          <div className="text-[15px] font-bold mt-1" style={{ color: C.danger }}>$980</div>
        </Card>
        <Card style={{ padding: 12 }}>
          <div className="text-[9px] uppercase font-semibold" style={{ color: C.muted }}>Paid MTD</div>
          <div className="text-[15px] font-bold mt-1" style={{ color: C.success }}>$18,240</div>
        </Card>
      </div>
      <div className="space-y-2 mt-3">
        {list.map((v, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-[14px]" style={{ color: C.ink }}>{v.n}</div>
              <Badge label={v.s} tone={v.t as any} />
            </div>
            <div className="text-[12px]" style={{ color: C.body }}>{v.c} · {v.d}</div>
            <div className="text-[20px] font-bold mt-1" style={{ color: C.ink }}>{v.a}</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function Payments() {
  const hist = [
    { c: "Aisha O.",    m: "Stripe · card",  a: "$1,450", t: "Today, 9:14" },
    { c: "Nina B.",     m: "Stripe · ACH",   a: "$420",   t: "Yesterday" },
    { c: "Reyes HVAC",  m: "Card in-person", a: "$189",   t: "Jun 28" },
  ];
  return (
    <Screen>
      <Header title="Payments" subtitle="Revenue overview" back />
      <Card>
        <div className="text-[9px] uppercase font-semibold" style={{ color: C.muted }}>Revenue (MTD)</div>
        <div className="text-[32px] font-bold mt-1" style={{ color: C.ink }}>$18,240</div>
        <div className="flex gap-2 mt-2">
          <Badge label="+22% vs last mo" tone="success" />
          <Badge label="4 payouts pending" tone="primary" />
        </div>
        <div className="flex items-end gap-1.5 mt-4 h-14">
          {[24,40,33,55,48,70,62].map((h,i) => (
            <div key={i} className="flex-1 rounded" style={{ height: `${h}%`, background: i === 6 ? C.primary : C.primarySoft }} />
          ))}
        </div>
      </Card>
      <Section title="Payment history" action="Export" />
      <Card style={{ padding: 0 }}>
        {hist.map((h, i, arr) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i === arr.length-1 ? "none" : `1px solid ${C.hairline}` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[13px]" style={{ background: C.successSoft, color: C.success }}>$</div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{h.c}</div>
              <div className="text-[11px]" style={{ color: C.muted }}>{h.m} · {h.t}</div>
            </div>
            <div className="text-[13px] font-bold" style={{ color: C.ink }}>{h.a}</div>
          </div>
        ))}
      </Card>
    </Screen>
  );
}

function Reviews() {
  const list = [
    { n: "Priya Rao",   src: "Google",   r: 5, t: "Fast, professional, and honest.", w: "2d" },
    { n: "Jordan Pike", src: "Yelp",     r: 4, t: "Great work, arrival window wide.", w: "5d" },
    { n: "Devon Kim",   src: "Facebook", r: 2, t: "Price was higher than the estimate.", w: "1w" },
  ];
  return (
    <Screen>
      <Header title="Reviews" subtitle="4.8 avg · 132 total" back />
      <Card>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <div className="text-[32px] font-bold" style={{ color: C.ink }}>4.8</div>
            <div className="flex gap-0.5">{[0,1,2,3,4].map(i => <Star key={i} size={11} color="#F59E0B" fill="#F59E0B" />)}</div>
          </div>
          <div className="flex-1 space-y-1">
            {[5,4,3,2,1].map(n => {
              const pct = [80,14,4,1,1][5-n];
              return (
                <div key={n} className="flex items-center gap-2">
                  <span className="text-[10px] w-2" style={{ color: C.muted }}>{n}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.surface }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: C.primary }} />
                  </div>
                  <span className="text-[10px] w-6 text-right" style={{ color: C.muted }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <Btn label="Send request" />
        <Btn label="Preview widget" variant="secondary" />
      </div>
      <Section title="Recent" action="Filters" />
      <div className="space-y-2">
        {list.map((r, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center mb-1">
              <div className="text-[13px] font-semibold" style={{ color: C.ink }}>{r.n}</div>
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(k => <Star key={k} size={11} color={k < r.r ? "#F59E0B" : C.hairline} fill={k < r.r ? "#F59E0B" : C.hairline} />)}
              </div>
            </div>
            <div className="text-[11px] mb-1" style={{ color: C.muted }}>{r.src} · {r.w} ago</div>
            <div className="text-[12px]" style={{ color: C.body }}>{r.t}</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
