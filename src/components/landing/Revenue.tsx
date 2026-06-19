import {
  ArrowRight, Check, Phone, MessageSquare, Mail, Star, Calendar, CreditCard,
  Sparkles, Bot, Inbox, Zap, Shield, BarChart3, Users, Wrench, Hammer,
  PlugZap, Home, ChevronRight, PhoneCall, Mic, Volume2, X, Plus, Search,
  Bell, Settings, MoreHorizontal, TrendingUp, DollarSign, Clock, MapPin,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─────────────────────────────── NAV ─────────────────────────────── */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[color:var(--color-bg)]/70 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display font-bold text-white tracking-tight">RevenueSol</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#compare" className="hover:text-white">Compare</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#customers" className="hover:text-white">Customers</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden sm:inline text-sm text-white/70 hover:text-white px-3 py-2">Sign in</a>
          <a href="#cta" className="text-sm font-medium text-white px-4 py-2 rounded-full brand-gradient glow-violet">
            Start free trial
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="h-8 w-8 rounded-lg brand-gradient grid place-items-center glow-violet">
      <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
    </div>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-0">
      {/* glow bg */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[700px] w-[1100px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(closest-side, #8B5CF6 0%, transparent 70%)" }}/>
        <div className="absolute top-[10%] right-[-10%] h-[500px] w-[700px] rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(closest-side, #3B82F6 0%, transparent 70%)" }}/>
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }}/>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs sm:text-sm text-white/80 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-dot" />
          #1 AI Business Operating System
        </div>

        <h1 className="mt-6 font-display text-[40px] leading-[1.04] sm:text-6xl lg:text-[84px] font-extrabold tracking-tight animate-fade-up">
          <span className="text-white">Run Your Business.</span><br />
          <span className="text-gradient">Automate Everything.</span><br />
          <span className="text-white/90">Grow Without Limits.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/65 animate-fade-up">
          Capture leads, answer customers, automate follow-ups, collect reviews, manage jobs and get paid faster — all from one AI-powered platform built for local service businesses.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up">
          <a href="#cta" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full brand-gradient text-white font-medium glow-violet">
            Start Free Trial <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </a>
          <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-white font-medium hover:bg-white/10">
            Book Demo
          </a>
        </div>
        <p className="mt-4 text-xs text-white/45">14-day free trial · No credit card · Cancel anytime</p>

        {/* dashboard showcase */}
        <div className="relative mt-14 sm:mt-20">
          <DashboardShowcase />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CODE-BUILT DASHBOARD ───────────────────── */
export function DashboardShowcase() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* outer frame */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-2 sm:p-3 shadow-[0_40px_120px_-20px_rgba(139,92,246,0.45)]">
        <div className="rounded-xl overflow-hidden bg-[#0B0B14] border border-white/5">
          {/* topbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/30">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/40 px-3 py-1 rounded-md bg-white/5">
              <Search className="h-3 w-3" /> app.revenuesol.com / dashboard
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Bell className="h-3.5 w-3.5" /><Settings className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-[180px_minmax(0,1fr)] min-h-[420px]">
            {/* sidebar */}
            <aside className="hidden md:flex flex-col gap-1 p-3 border-r border-white/5 bg-black/20">
              <SideItem icon={<BarChart3 className="h-4 w-4" />} label="Dashboard" active />
              <SideItem icon={<Inbox className="h-4 w-4" />} label="Inbox" badge="12" />
              <SideItem icon={<Phone className="h-4 w-4" />} label="Calls" />
              <SideItem icon={<Users className="h-4 w-4" />} label="Customers" />
              <SideItem icon={<Calendar className="h-4 w-4" />} label="Jobs" />
              <SideItem icon={<Star className="h-4 w-4" />} label="Reviews" />
              <SideItem icon={<CreditCard className="h-4 w-4" />} label="Payments" />
              <SideItem icon={<Bot className="h-4 w-4" />} label="AI Employee" />
              <SideItem icon={<Zap className="h-4 w-4" />} label="Automations" />
            </aside>

            {/* main */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg">Good morning, Jake 👋</h3>
                  <p className="text-xs text-white/45">Here's what your AI handled overnight.</p>
                </div>
                <button className="hidden sm:inline-flex text-xs items-center gap-1.5 px-3 py-1.5 rounded-md brand-gradient text-white">
                  <Plus className="h-3 w-3" /> New job
                </button>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                <KPI label="Calls answered" value="48" delta="+18%" icon={<PhoneCall className="h-3.5 w-3.5" />} accent="violet" />
                <KPI label="Jobs booked" value="14" delta="+9" icon={<Calendar className="h-3.5 w-3.5" />} accent="blue" />
                <KPI label="Revenue" value="$28.4k" delta="+22%" icon={<DollarSign className="h-3.5 w-3.5" />} accent="cyan" />
                <KPI label="5★ Reviews" value="9" delta="this wk" icon={<Star className="h-3.5 w-3.5" />} accent="violet" />
              </div>

              {/* two cols */}
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">
                {/* unified inbox */}
                <div className="rounded-lg border border-white/8 bg-white/[0.03]">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/70 font-medium"><Inbox className="h-3.5 w-3.5" /> Unified Inbox</div>
                    <span className="text-[10px] text-white/40">Live</span>
                  </div>
                  <ul className="divide-y divide-white/5 text-xs">
                    <InboxRow channel="call" name="Sarah M." preview="AC not cooling — needs same-day" time="2m" />
                    <InboxRow channel="sms" name="Mike R." preview="Can you confirm tomorrow at 9?" time="6m" unread />
                    <InboxRow channel="email" name="Acme Realty" preview="Quote for 12-unit HVAC tune-up" time="22m" />
                    <InboxRow channel="call" name="Diane P." preview="Voicemail — clogged drain" time="41m" />
                    <InboxRow channel="sms" name="James K." preview="Thanks, just paid the invoice 👍" time="1h" />
                  </ul>
                </div>

                {/* AI activity */}
                <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
                    <div className="h-5 w-5 rounded-md brand-gradient grid place-items-center"><Bot className="h-3 w-3 text-white" /></div>
                    AI Employee · Active
                  </div>
                  <ActivityRow text="Answered call from Sarah M., booked 2pm slot" />
                  <ActivityRow text="Sent quote to Acme Realty — $4,200" />
                  <ActivityRow text="Requested review from James K." />
                  <ActivityRow text="Rescheduled Mike R. (weather delay)" />
                  <div className="pt-1 border-t border-white/5 flex items-center gap-2 text-[11px] text-white/50">
                    <Sparkles className="h-3 w-3 text-violet-300" /> Saved you ~3h 20m today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating highlights */}
      <FloatChip className="hidden lg:flex -left-4 top-24 animate-float-slow" icon={<PhoneCall className="h-3.5 w-3.5" />} title="Call answered" sub="AI receptionist · 0.8s" />
      <FloatChip className="hidden lg:flex -right-6 top-40 animate-float-slow" style={{ animationDelay: "1.2s" }} icon={<Star className="h-3.5 w-3.5 text-yellow-300" />} title="New 5★ review" sub="Auto-requested" />
      <FloatChip className="hidden lg:flex -right-2 bottom-10 animate-float-slow" style={{ animationDelay: "2s" }} icon={<DollarSign className="h-3.5 w-3.5 text-emerald-300" />} title="$1,250 paid" sub="Deposit collected" />
    </div>
  );
}

function SideItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px] ${active ? "bg-white/8 text-white" : "text-white/55 hover:text-white"}`}>
      <span className="flex items-center gap-2">{icon}{label}</span>
      {badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full brand-gradient text-white">{badge}</span>}
    </div>
  );
}
function KPI({ label, value, delta, icon, accent }: any) {
  const ring = accent === "blue" ? "from-blue-500/30 to-blue-500/0" : accent === "cyan" ? "from-cyan-400/30 to-cyan-400/0" : "from-violet-500/30 to-violet-500/0";
  return (
    <div className="relative rounded-lg border border-white/8 bg-white/[0.03] p-3 overflow-hidden">
      <div className={`absolute -top-8 -right-8 h-20 w-20 rounded-full blur-2xl bg-gradient-to-br ${ring}`} />
      <div className="flex items-center justify-between text-[10px] text-white/45">
        <span className="flex items-center gap-1">{icon}{label}</span>
        <span className="text-emerald-300/90">{delta}</span>
      </div>
      <div className="mt-1.5 text-lg sm:text-xl font-semibold text-white">{value}</div>
    </div>
  );
}
function InboxRow({ channel, name, preview, time, unread }: any) {
  const C = channel === "call" ? Phone : channel === "sms" ? MessageSquare : Mail;
  const color = channel === "call" ? "text-violet-300 bg-violet-500/15" : channel === "sms" ? "text-blue-300 bg-blue-500/15" : "text-cyan-300 bg-cyan-500/15";
  return (
    <li className="flex items-center gap-3 px-3 py-2.5">
      <div className={`h-6 w-6 rounded-md grid place-items-center ${color}`}><C className="h-3 w-3" /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2"><span className="text-white text-[12px] font-medium truncate">{name}</span>{unread && <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />}</div>
        <div className="text-white/45 truncate text-[11px]">{preview}</div>
      </div>
      <div className="text-[10px] text-white/35">{time}</div>
    </li>
  );
}
function ActivityRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-[11px] text-white/70">
      <Check className="h-3 w-3 mt-0.5 text-emerald-300 shrink-0" />
      <span>{text}</span>
    </div>
  );
}
function FloatChip({ icon, title, sub, className = "", style }: any) {
  return (
    <div className={`absolute glass rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-xl ${className}`} style={style}>
      <div className="h-7 w-7 rounded-lg bg-white/10 grid place-items-center">{icon}</div>
      <div>
        <div className="text-[11px] font-semibold text-white leading-tight">{title}</div>
        <div className="text-[10px] text-white/50 leading-tight">{sub}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────── LOGO STRIP ─────────────────────────── */
export function TrustStrip() {
  const items = ["HVAC Pros", "RoofMax", "PlumbCo", "Bright Electric", "HomeFix", "Drain King", "CoolAir Inc.", "SparkPro"];
  return (
    <section className="!py-12 border-y border-white/5">
      <p className="text-center text-xs uppercase tracking-[0.18em] text-white/40 mb-6">Trusted by 4,000+ local service businesses</p>
      <div className="relative overflow-hidden">
        <div className="flex gap-12 animate-marquee w-max">
          {[...items, ...items].map((n, i) => (
            <div key={i} className="text-white/35 font-display font-bold text-xl whitespace-nowrap">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */
const FEATURES = [
  { icon: Phone, title: "Never Miss A Lead", body: "AI answers calls, texts and emails 24/7 — every lead captured, every time." },
  { icon: Inbox, title: "Unified Inbox", body: "SMS, Calls, Email and Social in one beautifully organized place." },
  { icon: Bot, title: "AI Employee", body: "Automates follow-ups and customer communication — like a teammate that never sleeps." },
  { icon: Star, title: "Reviews On Autopilot", body: "Generate more 5-star reviews automatically after every job." },
  { icon: Calendar, title: "Jobs & Dispatch", body: "Manage crews, appointments and work orders from one calendar." },
  { icon: CreditCard, title: "Payments & Invoices", body: "Get paid faster with deposits, recurring billing and tap-to-pay." },
  { icon: Sparkles, title: "AI Command Center", body: "Tell RevenueSol what to do using plain English. It just gets done." },
];

export function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Everything you need</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">One platform. <span className="text-gradient">Every job covered.</span></h2>
          <p className="mt-4 text-white/60 text-lg">From the first ring to the final invoice — RevenueSol replaces 5+ tools with a single AI-native operating system.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group relative rounded-2xl glass p-6 hover:bg-white/[0.06] transition">
              <div className="h-11 w-11 rounded-xl brand-gradient grid place-items-center glow-violet"><f.icon className="h-5 w-5 text-white" /></div>
              <h3 className="mt-5 text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.body}</p>
              <div className="mt-5 flex items-center gap-1 text-sm text-violet-300/90 opacity-0 group-hover:opacity-100 transition">
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── DEEP FEATURE: Voice AI ─────────────────────── */
export function VoiceAI() {
  return (
    <section id="platform" className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Voice AI Receptionist</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">Answers every call. <span className="text-gradient">Books every job.</span></h2>
          <p className="mt-4 text-white/65 text-lg">A hyper-realistic AI receptionist that picks up in under one second, qualifies the lead, checks your calendar, and books the appointment — 24/7.</p>
          <ul className="mt-6 space-y-3 text-white/75">
            {["Picks up in 0.8 seconds — never sends to voicemail",
              "Speaks naturally in 30+ voices and accents",
              "Knows your services, pricing, and service area",
              "Sends instant SMS confirmations to customers"].map(t => (
              <li key={t} className="flex gap-3"><Check className="h-5 w-5 text-violet-300 shrink-0 mt-0.5" />{t}</li>
            ))}
          </ul>
        </div>
        <CallMock />
      </div>
    </section>
  );
}

function CallMock() {
  return (
    <div className="relative rounded-3xl glass p-6 sm:p-8 glow-violet">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full brand-gradient grid place-items-center"><Mic className="h-5 w-5 text-white" /></div>
        <div>
          <div className="text-white font-semibold">Incoming call · Sarah Mitchell</div>
          <div className="text-xs text-white/50 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" /> AI answering in 0.8s</div>
        </div>
        <div className="ml-auto text-white/50"><Volume2 className="h-5 w-5" /></div>
      </div>
      <div className="mt-6 space-y-3">
        <Bubble who="ai">Hi, this is Ava with HVAC Pros — how can I help you today?</Bubble>
        <Bubble who="caller">My AC just stopped cooling. It's 95° in here.</Bubble>
        <Bubble who="ai">I'm so sorry. I can get a tech out today between 2 and 4 PM. Can I confirm your address as 1442 Oak St?</Bubble>
        <Bubble who="caller">Yes, that works.</Bubble>
        <Bubble who="ai">Booked. You'll get a text confirmation in a moment. Anything else?</Bubble>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <Stat n="0.8s" l="pickup" />
        <Stat n="2:14" l="call length" />
        <Stat n="$420" l="job booked" />
      </div>
    </div>
  );
}
function Bubble({ who, children }: any) {
  const ai = who === "ai";
  return (
    <div className={`flex ${ai ? "" : "justify-end"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${ai ? "bg-white/10 text-white" : "brand-gradient text-white"}`}>{children}</div>
    </div>
  );
}
function Stat({ n, l }: any) {
  return <div className="rounded-lg bg-white/5 border border-white/8 py-2"><div className="text-white font-semibold">{n}</div><div className="text-[10px] text-white/45 uppercase tracking-wider">{l}</div></div>;
}

/* ─────────────────────────── INDUSTRIES ─────────────────────────── */
export function Industries() {
  const list = [
    { icon: Wrench, name: "HVAC" },
    { icon: Hammer, name: "Roofing" },
    { icon: PlugZap, name: "Electrical" },
    { icon: Home, name: "Plumbing" },
    { icon: Shield, name: "Pest Control" },
    { icon: Sparkles, name: "Cleaning" },
  ];
  return (
    <section className="!py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Built for the trades</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">For the businesses that keep America running.</h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {list.map(i => (
            <div key={i.name} className="glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-white/[0.07] transition">
              <div className="h-10 w-10 rounded-xl brand-gradient grid place-items-center"><i.icon className="h-5 w-5 text-white" /></div>
              <div className="text-white font-medium text-sm">{i.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── COMPARE ─────────────────────────── */
export function Compare() {
  const rows = [
    "CRM & Customer Records",
    "AI Voice Receptionist",
    "Unified Inbox (SMS/Call/Email)",
    "Automated Reviews",
    "Jobs & Dispatch",
    "Payments & Invoicing",
    "Marketing Automations",
    "AI Employee (natural language)",
  ];
  const cols = [
    { name: "RevenueSol", highlight: true, has: [true, true, true, true, true, true, true, true] },
    { name: "Podium", has: [false, false, true, true, false, true, false, false] },
    { name: "Jobber", has: [true, false, false, false, true, true, false, false] },
  ];
  return (
    <section id="compare" className="relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Compare</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">Why teams switch to <span className="text-gradient">RevenueSol</span></h2>
          <p className="mt-4 text-white/60">Stop duct-taping tools together. One platform does the work of five.</p>
        </div>

        <div className="mt-10 rounded-2xl glass overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-sm">
            <div className="p-4 text-white/40 text-xs uppercase tracking-wider">Capability</div>
            {cols.map(c => (
              <div key={c.name} className={`p-4 text-center font-semibold ${c.highlight ? "text-white bg-gradient-to-b from-violet-500/20 to-transparent" : "text-white/60"}`}>
                {c.name}
              </div>
            ))}
            {rows.map((r, i) => (
              <RowFrag key={r} label={r} cols={cols} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function RowFrag({ label, cols, i }: any) {
  return (
    <>
      <div className={`p-4 text-white/80 border-t border-white/5 ${i % 2 ? "bg-white/[0.02]" : ""}`}>{label}</div>
      {cols.map((c: any) => (
        <div key={c.name} className={`p-4 text-center border-t border-white/5 ${c.highlight ? "bg-violet-500/5" : ""} ${i % 2 && !c.highlight ? "bg-white/[0.02]" : ""}`}>
          {c.has[i]
            ? <Check className={`h-5 w-5 mx-auto ${c.highlight ? "text-violet-300" : "text-white/60"}`} />
            : <X className="h-5 w-5 mx-auto text-white/20" />}
        </div>
      ))}
    </>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */
export function Testimonials() {
  const t = [
    { name: "Jake Reynolds", co: "Reynolds HVAC · Dallas, TX", quote: "We went from missing 4 calls a day to zero. RevenueSol books jobs while we're under a house. Paid for itself in week one.", stat: "+38% bookings" },
    { name: "Maria Chen", co: "Bright Spark Electric · Phoenix, AZ", quote: "The AI receptionist sounds like a real person. Customers don't even realize. Our review count tripled in 60 days.", stat: "3x reviews" },
    { name: "Tom Bishop", co: "Bishop Roofing · Tampa, FL", quote: "Killed Podium, Jobber, and our old CRM. One login, one bill, one team that actually loves using it.", stat: "$1,800/mo saved" },
  ];
  return (
    <section id="customers" className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Customer stories</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">Loved by operators who run real shops.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {t.map(x => (
            <figure key={x.name} className="rounded-2xl glass p-6 flex flex-col">
              <div className="flex gap-0.5">{[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-yellow-300 text-yellow-300" />)}</div>
              <blockquote className="mt-4 text-white/85 leading-relaxed">"{x.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full brand-gradient grid place-items-center text-white font-bold">{x.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{x.name}</div>
                  <div className="text-white/45 text-xs truncate">{x.co}</div>
                </div>
                <div className="text-xs text-violet-300 font-semibold whitespace-nowrap">{x.stat}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRICING ─────────────────────────── */
export function Pricing() {
  const plans = [
    { name: "Starter", price: 65, tag: "For solo operators", features: ["Up to 500 contacts", "AI receptionist (200 min)", "Unified inbox", "Review automations", "Email support"] },
    { name: "Professional", price: 199, tag: "Most popular", popular: true, features: ["Up to 5,000 contacts", "AI receptionist (1,500 min)", "Jobs & dispatch", "Payments & invoicing", "AI Employee · 3 workflows", "Priority chat support"] },
    { name: "Scale", price: 399, tag: "For growing teams", features: ["Unlimited contacts", "AI receptionist (5,000 min)", "Multi-location dispatch", "Advanced automations", "AI Employee · unlimited", "Dedicated success manager"] },
    { name: "Enterprise", price: null as any, tag: "Custom built", features: ["Unlimited everything", "SSO + advanced security", "Custom AI training", "API & integrations", "White-glove onboarding", "24/7 phone support"] },
  ];
  return (
    <section id="pricing" className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Pricing</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">Simple, transparent pricing.</h2>
          <p className="mt-4 text-white/60">All plans include a 14-day free trial. No credit card required.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-2xl p-6 flex flex-col ${p.popular ? "border border-violet-400/40 bg-gradient-to-b from-violet-500/10 to-transparent glow-violet" : "glass"}`}>
              {p.popular && <div className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full brand-gradient text-white">Most popular</div>}
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-xs text-white/50">{p.tag}</div>
              <div className="mt-5 flex items-baseline gap-1">
                {p.price !== null
                  ? <><span className="text-4xl font-extrabold text-white">${p.price}</span><span className="text-white/45 text-sm">/mo</span></>
                  : <span className="text-3xl font-extrabold text-white">Let's talk</span>}
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-white/75 flex-1">
                {p.features.map(f => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-violet-300 shrink-0 mt-0.5" />{f}</li>)}
              </ul>
              <a href="#cta" className={`mt-6 text-sm font-medium text-center py-2.5 rounded-full ${p.popular ? "brand-gradient text-white" : "bg-white/8 text-white hover:bg-white/12"}`}>
                {p.price !== null ? "Start free trial" : "Contact sales"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FINAL CTA ─────────────────────────── */
export function FinalCta() {
  return (
    <section id="cta" className="relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center border border-white/10"
             style={{ background: "radial-gradient(80% 120% at 50% 0%, rgba(139,92,246,0.35), transparent 60%), linear-gradient(180deg, #0F0B22, #07070C)" }}>
          <div aria-hidden className="absolute inset-0 opacity-[0.06]"
               style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}/>
          <h2 className="relative font-display text-4xl sm:text-6xl font-extrabold text-white">
            Stop paying for 5 different tools.<br />
            <span className="text-gradient">Run your entire business on RevenueSol.</span>
          </h2>
          <p className="relative mt-5 text-white/70 max-w-xl mx-auto">Join 4,000+ local service businesses growing faster — with less effort — on the AI operating system built for the trades.</p>
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full brand-gradient text-white font-medium glow-violet">Start Free Trial <ArrowRight className="h-4 w-4" /></a>
            <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-medium hover:bg-white/10">Book Demo</a>
          </div>
          <p className="relative mt-4 text-xs text-white/45">14-day free trial · No credit card · Setup in under 10 minutes</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2"><Logo /><span className="font-display font-bold text-white">RevenueSol</span></div>
            <p className="mt-4 text-sm text-white/55 max-w-sm">The AI operating system for local service businesses. Run your shop, automate everything, grow without limits.</p>
          </div>
          <FootCol title="Product" items={["Platform", "Features", "Pricing", "Integrations", "Changelog"]} />
          <FootCol title="Industries" items={["HVAC", "Plumbing", "Electrical", "Roofing", "Cleaning"]} />
          <FootCol title="Company" items={["About", "Customers", "Careers", "Contact", "Security"]} />
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <div>© 2026 RevenueSol · Powered by Infinite Rankers LLC</div>
          <div className="flex gap-5"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">DPA</a></div>
        </div>
      </div>
    </footer>
  );
}
function FootCol({ title, items }: any) {
  return (
    <div>
      <div className="text-white font-semibold text-sm">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/55">
        {items.map((i: string) => <li key={i}><a href="#" className="hover:text-white">{i}</a></li>)}
      </ul>
    </div>
  );
}
