import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Delete,
  Search,
  Clock,
  Users,
  Voicemail,
  Settings,
  MessageSquare,
  BarChart3,
  Inbox,
  ChevronDown,
  ChevronRight,
  Plus,
  Mic,
  Video,
  UserPlus,
  Star,
  MoreHorizontal,
  Filter,
  Command,
  Bell,
  ArrowUpRight,
  CircleDot,
  MicOff,
  Volume2,
  Grid3x3,
  Pause,
  PhoneOff,
  GripHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/dialpad")({
  head: () => ({
    meta: [
      { title: "Dialer · Revenue Sol" },
      { name: "description", content: "Professional cloud dialer." },
    ],
  }),
  component: DialpadPage,
});

const keys: { d: string; l: string }[] = [
  { d: "1", l: "" },
  { d: "2", l: "ABC" },
  { d: "3", l: "DEF" },
  { d: "4", l: "GHI" },
  { d: "5", l: "JKL" },
  { d: "6", l: "MNO" },
  { d: "7", l: "PQRS" },
  { d: "8", l: "TUV" },
  { d: "9", l: "WXYZ" },
  { d: "*", l: "" },
  { d: "0", l: "+" },
  { d: "#", l: "" },
];

type CallType = "in" | "out" | "miss";
const recent: {
  name: string; company: string; number: string; time: string; dur: string; type: CallType; initials: string;
}[] = [
  { name: "Lisa Bennett", company: "Acme Logistics", number: "+1 (907) 555-0101", time: "2 min ago", dur: "4:12", type: "in", initials: "LB" },
  { name: "Ralph Edwards", company: "Rocket Inc.", number: "+1 (415) 555-0118", time: "18 min ago", dur: "11:02", type: "out", initials: "RE" },
  { name: "Annette Black", company: "Check Point", number: "+1 (212) 555-0143", time: "1 hr ago", dur: "—", type: "miss", initials: "AB" },
  { name: "Dianne Russell", company: "HP", number: "+1 (650) 555-0192", time: "3 hr ago", dur: "2:48", type: "in", initials: "DR" },
  { name: "Kathryn Murphy", company: "Nintendo", number: "+1 (206) 555-0177", time: "Yesterday", dur: "7:30", type: "out", initials: "KM" },
  { name: "Carlos Smith", company: "Northstar RE", number: "+1 (305) 555-0166", time: "Yesterday", dur: "—", type: "miss", initials: "CS" },
];

function TypeBadge({ type }: { type: CallType }) {
  const map = {
    in: { Icon: PhoneIncoming, color: "text-emerald-500" },
    out: { Icon: PhoneOutgoing, color: "text-sky-500" },
    miss: { Icon: PhoneMissed, color: "text-rose-500" },
  } as const;
  const { Icon, color } = map[type];
  return <Icon className={`h-3 w-3 ${color}`} strokeWidth={2.5} />;
}

function NavItem({
  icon: Icon,
  label,
  badge,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  active?: boolean;
}) {
  return (
    <button
      className={`group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
        active
          ? "bg-white/8 text-white"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {badge ? (
        <span className="rounded bg-white/10 px-1.5 py-px text-[10px] font-medium text-white/80">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function DialpadPage() {
  const [number, setNumber] = useState("");
  const [onCall, setOnCall] = useState(false);
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [held, setHeld] = useState(false);
  const press = (k: string) => setNumber((n) => (n + k).slice(0, 18));
  const back = () => setNumber((n) => n.slice(0, -1));
  const startCall = () => {
    if (!number) setNumber("(907) 555-0101");
    setOnCall(true);
  };
  const endCall = () => {
    setOnCall(false);
    setSecs(0);
    setMuted(false);
    setHeld(false);
    setSpeaker(false);
  };

  useEffect(() => {
    if (!onCall) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [onCall]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="min-h-screen w-full bg-[#fafafa] font-sans text-[#0a0a0a] antialiased lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col lg:h-full lg:flex-row">
        {/* App sidebar — dark SaaS rail */}
        <aside className="hidden w-[232px] shrink-0 flex-col border-r border-[#1c1c20] bg-[#0b0b0e] px-3 py-3 lg:flex">

          {/* Brand */}
          <div className="flex items-center gap-2 px-1.5 py-1">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-white text-[12px] font-bold text-[#0b0b0e]">
              R
            </div>
            <div className="leading-tight">
              <div className="text-[12.5px] font-semibold text-white">Revenue Sol</div>
              <div className="text-[10.5px] text-white/45">Workspace</div>
            </div>
            <button className="ml-auto grid h-6 w-6 place-items-center rounded text-white/50 hover:bg-white/5">
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/45">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1">Search</span>
            <span className="flex items-center gap-0.5 rounded border border-white/10 px-1 text-[10px] text-white/40">
              <Command className="h-2.5 w-2.5" /> K
            </span>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-0.5">
            <NavItem icon={Phone} label="Dialer" active />
            <NavItem icon={Inbox} label="Inbox" badge="5" />
            <NavItem icon={Clock} label="Recents" />
            <NavItem icon={Voicemail} label="Voicemail" badge="2" />
            <NavItem icon={MessageSquare} label="Messages" />
            <NavItem icon={Users} label="Contacts" />
            <NavItem icon={BarChart3} label="Analytics" />
          </nav>

          <div className="mt-5 px-2.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/40">
            Lines
          </div>
          <div className="mt-1 space-y-0.5">
            <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-white/60 hover:bg-white/5 hover:text-white">
              <CircleDot className="h-3 w-3 text-emerald-400" />
              <span className="flex-1 text-left">Sales · Main</span>
              <span className="text-[10.5px] text-white/40">+1 415</span>
            </button>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] text-white/60 hover:bg-white/5 hover:text-white">
              <CircleDot className="h-3 w-3 text-amber-400" />
              <span className="flex-1 text-left">Support</span>
              <span className="text-[10.5px] text-white/40">+1 628</span>
            </button>
          </div>

          {/* User */}
          <div className="mt-auto flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.02] px-2 py-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[#6e3aff] text-[10.5px] font-semibold text-white">
              SM
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[12px] font-medium text-white">Sophia Miller</div>
              <div className="flex items-center gap-1 text-[10.5px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available
              </div>
            </div>
            <button className="ml-auto grid h-6 w-6 place-items-center rounded text-white/50 hover:bg-white/5">
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>

        {/* Main workspace */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top header */}
          <header className="flex h-14 items-center gap-3 border-b border-[#ececef] bg-white px-5">
            <div className="flex items-center gap-1.5 text-[12.5px] text-[#6b6b76]">
              <span>Workspace</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#0a0a0a]">Dialer</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-md border border-[#e6e6ea] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#3a3a44] hover:bg-[#f5f5f7]">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-md border border-[#e6e6ea] text-[#3a3a44] hover:bg-[#f5f5f7]">
                <Bell className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center gap-1.5 rounded-md bg-[#0a0a0a] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1f1f24]">
                <Plus className="h-3.5 w-3.5" />
                New call
              </button>
            </div>
          </header>

          {/* Body */}
          <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[1fr_400px_320px]">
            {/* Recents list */}
            <section className="flex min-w-0 flex-col border-r border-[#ececef] bg-white">
              <div className="flex items-center justify-between border-b border-[#ececef] px-5 py-3">
                <div>
                  <div className="text-[14px] font-semibold tracking-tight">Recent calls</div>
                  <div className="text-[11.5px] text-[#6b6b76]">Today · 24 calls · 1h 42m talk time</div>
                </div>
                <div className="flex gap-0.5 rounded-md border border-[#e6e6ea] bg-[#f7f7f9] p-0.5 text-[11.5px]">
                  {["All", "Missed", "Inbound", "Outbound"].map((t, i) => (
                    <button
                      key={t}
                      className={`rounded px-2.5 py-1 ${
                        i === 0 ? "bg-white text-[#0a0a0a] shadow-[0_1px_0_rgba(15,15,18,0.06)]" : "text-[#6b6b76] hover:text-[#0a0a0a]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column header */}
              <div className="grid grid-cols-[1fr_120px_90px_40px] items-center gap-3 border-b border-[#ececef] bg-[#fbfbfc] px-5 py-2 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[#8a8a94]">
                <span>Contact</span>
                <span>Number</span>
                <span>Duration</span>
                <span />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {recent.map((r, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-[1fr_120px_90px_40px] items-center gap-3 border-b border-[#f1f1f3] px-5 py-3 hover:bg-[#fafafb]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#f0f0f3] text-[11.5px] font-semibold text-[#3a3a44]">
                          {r.initials}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-white">
                          <TypeBadge type={r.type} />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`truncate text-[13px] font-medium ${r.type === "miss" ? "text-rose-600" : "text-[#0a0a0a]"}`}>
                            {r.name}
                          </span>
                          <span className="rounded bg-[#f0f0f3] px-1.5 py-px text-[10px] font-medium text-[#6b6b76]">
                            {r.company}
                          </span>
                        </div>
                        <div className="truncate text-[11.5px] text-[#8a8a94]">{r.time}</div>
                      </div>
                    </div>
                    <div className="truncate text-[12px] tabular-nums text-[#3a3a44]">{r.number}</div>
                    <div className="text-[12px] tabular-nums text-[#6b6b76]">{r.dur}</div>
                    <button className="grid h-7 w-7 place-items-center rounded-md text-[#8a8a94] opacity-0 transition-opacity hover:bg-[#f0f0f3] hover:text-[#0a0a0a] group-hover:opacity-100">
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Dialer card column */}
            <section className="flex min-w-0 flex-col border-r border-[#ececef] bg-[#fafafa] p-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8a94]">Dialer</div>

              <div className="mt-3 rounded-2xl border border-[#ececef] bg-white shadow-[0_1px_0_rgba(15,15,18,0.04)]">
                {/* Caller controls */}
                <div className="flex items-center justify-between border-b border-[#f1f1f3] px-4 py-2.5">
                  <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[12px] font-medium text-[#3a3a44] hover:bg-[#f5f5f7]">
                    <span className="grid h-4 w-5 place-items-center rounded-[2px] bg-gradient-to-b from-[#3c3b6e] to-[#b22234] text-[8px] font-bold text-white">
                      US
                    </span>
                    +1
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11.5px] font-medium text-[#3a3a44] hover:bg-[#f5f5f7]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Sales · Main
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                {/* Number display */}
                <div className="px-4 pt-5 pb-1 text-center">
                  <div className="min-h-[40px] text-[28px] font-semibold tracking-tight tabular-nums text-[#0a0a0a]">
                    {number || <span className="text-[#d1d1d6]">(000) 000-0000</span>}
                  </div>
                  <div className="text-[11.5px] text-[#8a8a94]">
                    {number ? "Mobile · United States" : "Enter a number or paste from clipboard"}
                  </div>
                </div>

                {/* Keys */}
                <div className="grid grid-cols-3 gap-px bg-[#f1f1f3] p-px">
                  {keys.map((k) => (
                    <button
                      key={k.d}
                      onClick={() => press(k.d)}
                      className="flex h-14 flex-col items-center justify-center bg-white text-[#0a0a0a] transition-colors hover:bg-[#fafafa] active:bg-[#f5f5f7]"
                    >
                      <span className="text-[19px] font-medium leading-none">{k.d}</span>
                      <span className="mt-0.5 h-2.5 text-[9px] font-medium tracking-[0.14em] text-[#8a8a94]">
                        {k.l}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3">
                  <div className="flex justify-end">
                    <button className="grid h-9 w-9 place-items-center rounded-full text-[#3a3a44] hover:bg-[#f5f5f7]">
                      <UserPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={startCall}
                    className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_8px_24px_-12px_rgba(16,185,129,0.7)] transition-transform hover:bg-emerald-600 active:scale-95"
                    aria-label="Call"
                  >
                    <PhoneCall className="h-4.5 w-4.5" />
                  </button>
                  <div className="flex justify-start">
                    <button
                      onClick={back}
                      className="grid h-9 w-9 place-items-center rounded-full text-[#3a3a44] hover:bg-[#f5f5f7]"
                    >
                      <Delete className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { Icon: MessageSquare, label: "SMS" },
                  { Icon: Video, label: "Video" },
                  { Icon: Mic, label: "Record" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center justify-center gap-1.5 rounded-md border border-[#ececef] bg-white px-3 py-2 text-[11.5px] font-medium text-[#3a3a44] hover:bg-[#f7f7f9]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Quality strip */}
              <div className="mt-3 flex items-center gap-2 rounded-md border border-[#ececef] bg-white px-3 py-2 text-[11.5px] text-[#6b6b76]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-[#0a0a0a]">Excellent</span>
                <span className="text-[#c7c7cd]">·</span>
                <span>Latency 38ms</span>
                <span className="text-[#c7c7cd]">·</span>
                <span>Opus 48kHz</span>
              </div>
            </section>

            {/* Right pane — context */}
            <aside className="hidden min-w-0 flex-col bg-white xl:flex">
              <div className="flex items-center justify-between border-b border-[#ececef] px-5 py-3">
                <div className="text-[14px] font-semibold tracking-tight">Details</div>
                <button className="grid h-7 w-7 place-items-center rounded-md text-[#6b6b76] hover:bg-[#f5f5f7]">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto px-5 py-4">
                {/* Contact card */}
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#fde68a] text-[14px] font-semibold text-[#7c5b00]">
                    LB
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[14px] font-semibold">Lisa Bennett</span>
                      <Star className="h-3.5 w-3.5 text-[#d1d1d6]" />
                    </div>
                    <div className="truncate text-[12px] text-[#6b6b76]">Operations · Acme Logistics</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { Icon: Phone, l: "Call" },
                    { Icon: MessageSquare, l: "Text" },
                    { Icon: Video, l: "Meet" },
                  ].map(({ Icon, l }) => (
                    <button key={l} className="flex flex-col items-center gap-1 rounded-md border border-[#ececef] py-2 text-[11px] text-[#3a3a44] hover:bg-[#fafafb]">
                      <Icon className="h-3.5 w-3.5" />
                      {l}
                    </button>
                  ))}
                </div>

                {/* Fields */}
                <div className="mt-5 space-y-2.5 text-[12px]">
                  {[
                    ["Mobile", "+1 (907) 555-0101"],
                    ["Email", "lisa@acme.co"],
                    ["Timezone", "PT · 2:47 PM"],
                    ["Owner", "Sophia Miller"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-[#f1f1f3] pb-2 last:border-0">
                      <span className="text-[#8a8a94]">{k}</span>
                      <span className="font-medium text-[#0a0a0a]">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Insights */}
                <div className="mt-5 rounded-xl border border-[#ececef] bg-gradient-to-br from-[#fafafb] to-white p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8a94]">
                    <span className="grid h-4 w-4 place-items-center rounded bg-[#0a0a0a] text-[8px] font-bold text-white">AI</span>
                    Insights
                  </div>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-[#3a3a44]">
                    Lisa is following up on a shipment delay. Prior sentiment is positive; she has called twice this week.
                  </p>
                  <button className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-[#0b5cff] hover:underline">
                    Open in CRM <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Tags */}
                <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8a94]">Tags</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["VIP", "Logistics", "Renewal Q4"].map((t) => (
                    <span key={t} className="rounded-md border border-[#ececef] bg-[#fafafb] px-2 py-0.5 text-[11px] font-medium text-[#3a3a44]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {onCall ? (
        <ActiveCallWindow
          number={number}
          timer={`${mm}:${ss}`}
          muted={muted}
          speaker={speaker}
          held={held}
          onToggleMute={() => setMuted((v) => !v)}
          onToggleSpeaker={() => setSpeaker((v) => !v)}
          onToggleHold={() => setHeld((v) => !v)}
          onEnd={endCall}
        />
      ) : null}
    </div>
  );
}

function ActiveCallWindow({
  number,
  timer,
  muted,
  speaker,
  held,
  onToggleMute,
  onToggleSpeaker,
  onToggleHold,
  onEnd,
}: {
  number: string;
  timer: string;
  muted: boolean;
  speaker: boolean;
  held: boolean;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onToggleHold: () => void;
  onEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ dx: number; dy: number; on: boolean }>({ dx: 0, dy: 0, on: false });

  useEffect(() => {
    if (pos || typeof window === "undefined") return;
    setPos({ x: window.innerWidth - 360, y: 80 });
  }, [pos]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag.current.on) return;
      const w = ref.current?.offsetWidth ?? 320;
      const h = ref.current?.offsetHeight ?? 460;
      const x = Math.max(8, Math.min(window.innerWidth - w - 8, e.clientX - drag.current.dx));
      const y = Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - drag.current.dy));
      setPos({ x, y });
    };
    const up = () => (drag.current.on = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top, on: true };
  };

  const ActionBtn = ({
    Icon,
    label,
    active,
    onClick,
  }: {
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 text-white/80 transition-colors hover:text-white"
    >
      <span
        className={`grid h-14 w-14 place-items-center rounded-full border transition-colors ${
          active
            ? "border-white/30 bg-white text-[#0a0a0a]"
            : "border-white/15 bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[10.5px] font-medium">{label}</span>
    </button>
  );

  return (
    <div
      ref={ref}
      style={{ left: pos?.x ?? -9999, top: pos?.y ?? -9999 }}
      className="fixed z-50 w-[300px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1c1c22] via-[#121216] to-[#0a0a0e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_10px_30px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Drag handle */}
      <div
        onMouseDown={startDrag}
        className="flex cursor-grab items-center justify-center py-2 active:cursor-grabbing"
      >
        <GripHorizontal className="h-3.5 w-3.5 text-white/30" />
      </div>

      {/* Caller */}
      <div className="px-6 pb-5 pt-1 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[#fde68a] to-[#f59e0b] text-[22px] font-semibold text-[#7c5b00] shadow-[0_8px_24px_-8px_rgba(245,158,11,0.6)]">
          LB
        </div>
        <div className="mt-3 text-[17px] font-semibold text-white">Lisa Bennett</div>
        <div className="text-[12px] text-white/55">
          {number || "+1 (907) 555-0101"}
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {held ? "On hold" : "In call"} · {timer}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-y-5 px-6 pb-5">
        <div className="flex justify-center">
          <ActionBtn Icon={muted ? MicOff : Mic} label={muted ? "Unmute" : "Mute"} active={muted} onClick={onToggleMute} />
        </div>
        <div className="flex justify-center">
          <ActionBtn Icon={Grid3x3} label="Keypad" />
        </div>
        <div className="flex justify-center">
          <ActionBtn Icon={Volume2} label="Speaker" active={speaker} onClick={onToggleSpeaker} />
        </div>
        <div className="flex justify-center">
          <ActionBtn Icon={UserPlus} label="Add" />
        </div>
        <div className="flex justify-center">
          <ActionBtn Icon={Video} label="Video" />
        </div>
        <div className="flex justify-center">
          <ActionBtn Icon={Pause} label={held ? "Resume" : "Hold"} active={held} onClick={onToggleHold} />
        </div>
      </div>

      {/* Hang up */}
      <div className="flex justify-center pb-6">
        <button
          onClick={onEnd}
          className="grid h-14 w-14 place-items-center rounded-full bg-[#ef4444] text-white shadow-[0_10px_24px_-8px_rgba(239,68,68,0.6)] transition-transform hover:bg-[#dc2626] active:scale-95"
          aria-label="End call"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

