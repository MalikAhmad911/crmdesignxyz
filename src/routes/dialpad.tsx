import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Delete,
  Search,
  Star,
  Clock,
  Users,
  Voicemail,
  Settings,
  Mic,
  Video,
  MoreHorizontal,
  Plus,
  ChevronDown,
  Headphones,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/dialpad")({
  head: () => ({
    meta: [
      { title: "Dialpad · Revenue Sol" },
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
const recent: { name: string; sub: string; time: string; type: CallType; initials: string; color: string }[] = [
  { name: "Lisa Bennett", sub: "Mobile · (907) 555-0101", time: "2m", type: "in", initials: "LB", color: "#fde68a" },
  { name: "Ralph Edwards", sub: "Rocket Inc · Work", time: "18m", type: "out", initials: "RE", color: "#bfdbfe" },
  { name: "Annette Black", sub: "Check Point · Mobile", time: "1h", type: "miss", initials: "AB", color: "#fecaca" },
  { name: "Dianne Russell", sub: "HP · Work", time: "3h", type: "in", initials: "DR", color: "#c7d2fe" },
  { name: "Kathryn Murphy", sub: "Nintendo · Mobile", time: "Yesterday", type: "out", initials: "KM", color: "#fcd34d" },
  { name: "Carlos Smith", sub: "Real estate · Mobile", time: "Yesterday", type: "miss", initials: "CS", color: "#a7f3d0" },
];

function TypeIcon({ type }: { type: CallType }) {
  if (type === "in") return <PhoneIncoming className="h-3 w-3 text-[#22c55e]" />;
  if (type === "out") return <PhoneOutgoing className="h-3 w-3 text-[#3b82f6]" />;
  return <PhoneMissed className="h-3 w-3 text-[#ef4444]" />;
}

function SideIcon({
  icon: Icon,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <button
      className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
        active ? "bg-[#0b5cff] text-white shadow-[0_8px_22px_-10px_rgba(11,92,255,0.7)]" : "text-[#5a5a66] hover:bg-[#eef0f5]"
      }`}
    >
      <Icon className="h-4.5 w-4.5" />
    </button>
  );
}

function DialpadPage() {
  const [number, setNumber] = useState("");

  const press = (k: string) => setNumber((n) => (n + k).slice(0, 18));
  const back = () => setNumber((n) => n.slice(0, -1));

  return (
    <div className="h-screen w-full bg-[#f4f5f8] font-sans text-[#0f172a]">
      {/* Top bar */}
      <div className="flex h-12 items-center gap-3 border-b border-[#e3e3e8] bg-white px-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[#0b5cff] to-[#1e3a8a] text-[11px] font-bold text-white">
            R
          </div>
          <span className="text-[13px] font-semibold tracking-tight">Revenue Dialer</span>
        </div>
        <div className="mx-3 flex flex-1 items-center gap-2 rounded-md bg-[#f1f2f6] px-3 py-1.5 text-[12px] text-[#7a7a85]">
          <Search className="h-3.5 w-3.5" />
          <span>Search contacts, calls, numbers…</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-[#ecfdf5] px-2 py-1 text-[12px] text-[#047857]">
          <span className="h-2 w-2 rounded-full bg-[#10b981]" />
          <span>Available</span>
          <ChevronDown className="h-3 w-3" />
        </div>
        <div className="grid h-7 w-7 place-items-center rounded-full bg-[#6e3aff] text-[10px] font-semibold text-white">SM</div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Icon rail */}
        <aside className="hidden w-[64px] shrink-0 flex-col items-center gap-2 border-r border-[#e3e3e8] bg-white py-4 md:flex">
          <SideIcon icon={Phone} active />
          <SideIcon icon={Clock} />
          <SideIcon icon={Users} />
          <SideIcon icon={Voicemail} />
          <SideIcon icon={Star} />
          <div className="mt-auto" />
          <SideIcon icon={Settings} />
        </aside>

        {/* Recents column */}
        <section className="hidden w-[340px] shrink-0 flex-col border-r border-[#e3e3e8] bg-white md:flex">
          <div className="flex items-center justify-between border-b border-[#e3e3e8] px-4 py-3">
            <div>
              <div className="text-[15px] font-semibold tracking-tight">Recents</div>
              <div className="text-[11px] text-[#64748b]">All calls today</div>
            </div>
            <button className="grid h-8 w-8 place-items-center rounded-md text-[#5a5a66] hover:bg-[#eef0f5]">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-1 border-b border-[#e3e3e8] px-3 py-2 text-[12px]">
            {["All", "Missed", "Inbound", "Outbound"].map((t, i) => (
              <button
                key={t}
                className={`rounded-full px-3 py-1 ${
                  i === 0 ? "bg-[#0f172a] text-white" : "text-[#475569] hover:bg-[#eef0f5]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {recent.map((r, i) => (
              <button
                key={i}
                className="flex w-full items-center gap-3 border-b border-[#f1f2f6] px-4 py-3 text-left hover:bg-[#f8fafc]"
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-[#1f2937]"
                  style={{ background: r.color }}
                >
                  {r.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <TypeIcon type={r.type} />
                    <span className={`truncate text-[13.5px] font-semibold ${r.type === "miss" ? "text-[#ef4444]" : ""}`}>
                      {r.name}
                    </span>
                  </div>
                  <div className="truncate text-[11.5px] text-[#64748b]">{r.sub}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] text-[#94a3b8]">{r.time}</span>
                  <Phone className="h-3.5 w-3.5 text-[#0b5cff]" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Dialer */}
        <section className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#f4f5f8] to-[#e0f2fe] px-4 py-6">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(11,92,255,0.18), transparent 60%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18), transparent 60%)" }}
          />

          <div className="relative w-full max-w-[360px] rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            {/* Caller line */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-[#475569] hover:bg-[#eef0f5]">
                <span className="grid h-5 w-7 place-items-center rounded-sm bg-gradient-to-b from-[#3c3b6e] to-[#b22234] text-[9px] font-bold text-white">
                  US
                </span>
                +1
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-[#475569] hover:bg-[#eef0f5]">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" />
                Caller ID · Main
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            {/* Number display */}
            <div className="mt-3 flex min-h-[64px] items-center justify-center px-2">
              <div className="text-center text-[34px] font-semibold tracking-tight tabular-nums text-[#0f172a]">
                {number || <span className="text-[#cbd5e1]">Enter a number</span>}
              </div>
            </div>
            <div className="text-center text-[12px] text-[#64748b]">
              {number ? "Mobile · United States" : "Type or paste · Use keyboard"}
            </div>

            {/* Keys */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {keys.map((k) => (
                <button
                  key={k.d}
                  onClick={() => press(k.d)}
                  className="group flex h-16 flex-col items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white text-[#0f172a] shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-all hover:-translate-y-px hover:border-[#0b5cff]/30 hover:shadow-[0_8px_24px_-12px_rgba(11,92,255,0.45)] active:translate-y-0"
                >
                  <span className="text-[22px] font-semibold leading-none">{k.d}</span>
                  {k.l ? (
                    <span className="mt-1 text-[9.5px] font-medium tracking-[0.12em] text-[#94a3b8]">{k.l}</span>
                  ) : (
                    <span className="mt-1 h-[10px]" />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <button className="grid h-10 w-10 place-items-center justify-self-end rounded-full text-[#475569] hover:bg-[#eef0f5]">
                <Plus className="h-4 w-4" />
              </button>
              <button
                className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_18px_40px_-14px_rgba(16,185,129,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
                aria-label="Call"
              >
                <PhoneCall className="h-5 w-5" />
              </button>
              <button
                onClick={back}
                className="grid h-10 w-10 place-items-center justify-self-start rounded-full text-[#475569] hover:bg-[#eef0f5]"
              >
                <Delete className="h-4 w-4" />
              </button>
            </div>

            {/* Secondary */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11.5px] text-[#64748b]">
              <button className="flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 hover:bg-[#e2e8f0]">
                <Mic className="h-3.5 w-3.5" /> SMS
              </button>
              <button className="flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 hover:bg-[#e2e8f0]">
                <Video className="h-3.5 w-3.5" /> Video
              </button>
              <button className="flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 hover:bg-[#e2e8f0]">
                <Headphones className="h-3.5 w-3.5" /> Transfer
              </button>
            </div>
          </div>
        </section>

        {/* Right details */}
        <aside className="hidden w-[300px] shrink-0 flex-col border-l border-[#e3e3e8] bg-white p-4 xl:flex">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">Active line</div>
          <div className="mt-3 rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4 text-white">
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>Main Line</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" /> Live</span>
            </div>
            <div className="mt-2 text-[18px] font-semibold tracking-tight">+1 (415) 555 · 0142</div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/70">
              <Volume2 className="h-3.5 w-3.5" /> HD voice · Opus 48 kHz
            </div>
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">Today</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { l: "Calls", v: "24" },
              { l: "Talk", v: "1h 42m" },
              { l: "Missed", v: "3" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
                <div className="text-[16px] font-semibold tracking-tight">{s.v}</div>
                <div className="text-[10.5px] text-[#64748b]">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">Quick contacts</div>
          <div className="mt-2 space-y-1">
            {recent.slice(0, 4).map((r, i) => (
              <button key={i} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] hover:bg-[#f1f5f9]">
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-[#1f2937]"
                  style={{ background: r.color }}
                >
                  {r.initials}
                </span>
                <span className="flex-1 truncate text-left">{r.name}</span>
                <Phone className="h-3.5 w-3.5 text-[#0b5cff]" />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
