import { createFileRoute } from "@tanstack/react-router";
import {
  Inbox,
  Rocket,
  Users,
  Headphones,
  Hash,
  MessageSquare,
  ChevronDown,
  Search,
  Calendar,
  Settings,
  Video,
  Phone,
  MessageCircle,
  Star,
  UserPlus,
  Image as ImageIcon,
  MoreVertical,
  Maximize2,
  Lock,
  Play,
  Volume2,
  PhoneCall,
  Pause,
  Mic,
  Grid3x3,
  PhoneOff,
  PhoneForwarded,
  Plus,
  SignalHigh,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox · Revenue Sol" },
      { name: "description", content: "Unified customer inbox." },
    ],
  }),
  component: InboxPage,
});

type Msg = {
  who: "lisa" | "zoey";
  name: string;
  time: string;
  text: string;
  extra?: string;
};

const messages: Msg[] = [
  {
    who: "lisa",
    name: "Lisa Bennett",
    time: "4:43 PM",
    text: "Hi there, I have a question about the tracking for my shipment. It seems to be delayed, and I need it by tomorrow. Can you help me figure out what's going on?",
  },
  {
    who: "zoey",
    name: "Zoey Thompson",
    time: "4:44 PM",
    text: "Hi Lisa, thanks for reaching out! I'm sorry to hear about the delay. Let me check the status of your shipment and see what's happening. Can you provide me with your tracking number?",
  },
  { who: "lisa", name: "Lisa Bennett", time: "4:45 PM", text: "Sure, the tracking number is 8493267AFR." },
  {
    who: "zoey",
    name: "Zoey Thompson",
    time: "4:47 PM",
    text: "Thanks, Lisa. Give me just a moment to look into this… Alright, it looks like there was a slight delay due to weather conditions at one of our hubs.",
    extra: "However, the good news is that your shipment is now en route and is expected to arrive by tomorrow afternoon.",
  },
  {
    who: "lisa",
    name: "Lisa Bennett",
    time: "4:48 PM",
    text: "That's a relief! I was worried it might take longer. Is there anything I can do to ensure it arrives on time?",
  },
  {
    who: "zoey",
    name: "Zoey Thompson",
    time: "4:49 PM",
    text: "I totally understand your concern. Everything is on track for tomorrow, but I just need to confirm a few details to ensure the final delivery goes smoothly. Could I give you a quick call?",
  },
  { who: "lisa", name: "Lisa Bennett", time: "4:51 PM", text: "Sure, that works for me. You can call me at (907) 555-0101." },
  { who: "zoey", name: "Zoey Thompson", time: "4:52 PM", text: "" },
];

function Avatar({ who }: { who: "lisa" | "zoey" }) {
  if (who === "lisa") {
    return (
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fde68a] text-[11px] font-semibold text-[#7c5b00]">
        LB
      </div>
    );
  }
  return (
    <div className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-[#d6c5b0] text-[10px] font-semibold text-[#5b4632]">
      ZT
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  badge,
  pill,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  pill?: { text: string; color: string };
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#1f1f1f] transition-colors ${
        active ? "bg-[#e9e9ec]" : "hover:bg-[#ececef]"
      }`}
    >
      <Icon className="h-4 w-4 text-[#5a5a66]" />
      <span className="flex-1 truncate text-left">{label}</span>
      {pill ? (
        <span
          className="rounded px-1.5 py-px text-[10px] font-medium text-white"
          style={{ background: pill.color }}
        >
          {pill.text}
        </span>
      ) : null}
      {badge ? (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#6e3aff] px-1.5 text-[10px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mt-4 flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#5a5a66]">
      <ChevronDown className="h-3 w-3" />
      <span>{label}</span>
    </div>
  );
}

function ColorRow({ color, label }: { color: string; label: string }) {
  return (
    <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#1f1f1f] hover:bg-[#ececef]">
      <span className="h-3 w-3 rounded-sm" style={{ background: color }} />
      <span className="truncate">{label}</span>
    </button>
  );
}

function InboxPage() {
  return (
    <div className="h-screen w-full bg-[#f4f4f6] font-sans text-[#1f1f1f]">
      {/* Top bar */}
      <div className="flex h-12 items-center gap-3 border-b border-[#e3e3e8] bg-white px-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 grid h-7 w-7 place-items-center rounded-md bg-[#6e3aff] text-[11px] font-bold text-white">
          d
        </div>
        <div className="flex items-center gap-1 text-[#5a5a66]">
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-[#ececef]"><Phone className="h-4 w-4" /></button>
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-[#ececef]"><MessageCircle className="h-4 w-4" /></button>
          <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-[#ececef]"><Video className="h-4 w-4" /></button>
        </div>
        <div className="mx-3 flex flex-1 items-center gap-2 rounded-md bg-[#f1f1f4] px-3 py-1.5 text-[12px] text-[#7a7a85]">
          <Search className="h-3.5 w-3.5" />
          <span>Search Dialpad</span>
        </div>
        <button className="grid h-7 w-7 place-items-center rounded-md text-[#5a5a66] hover:bg-[#ececef]"><Settings className="h-4 w-4" /></button>
        <button className="grid h-7 w-7 place-items-center rounded-md text-[#5a5a66] hover:bg-[#ececef]"><Calendar className="h-4 w-4" /></button>
        <div className="flex items-center gap-2 rounded-md bg-[#f1f1f4] px-2 py-1 text-[12px] text-[#1f1f1f]">
          <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          <span>Available to chat</span>
          <div className="ml-1 grid h-6 w-6 place-items-center rounded-full bg-[#8b5cf6] text-[10px] font-semibold text-white">A</div>
        </div>
        <button className="grid h-7 w-7 place-items-center rounded-md text-[#5a5a66] hover:bg-[#ececef]"><MoreVertical className="h-4 w-4" /></button>
      </div>

      {/* Layout */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="hidden w-[240px] shrink-0 overflow-y-auto border-r border-[#e3e3e8] bg-[#f4f4f6] px-2 py-2 md:block">
          <SidebarItem icon={Inbox} label="Inbox" badge="5" />
          <SidebarItem icon={Rocket} label="Launchpad" pill={{ text: "New", color: "#a855f7" }} />
          <SidebarItem icon={Users} label="Contacts" />
          <div className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-[#ececef]">
            <Headphones className="h-4 w-4 text-[#5a5a66]" />
            <span className="flex-1 text-left">Contact Centers</span>
            <span className="flex items-center gap-1 text-[11px] text-[#22c55e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" /> Available
            </span>
            <ChevronDown className="h-3 w-3 text-[#5a5a66]" />
          </div>
          <SidebarItem icon={Hash} label="Channels" />
          <SidebarItem icon={MessageSquare} label="Threads" />

          <SectionLabel label="Coaching Teams" />
          <ColorRow color="#ec4899" label="MM New Business" />

          <SectionLabel label="Departments" />
          <ColorRow color="#2563eb" label="Sales" />
          <ColorRow color="#f9a8d4" label="Accounts Payable" />

          <SectionLabel label="Channels" />
          <SidebarItem icon={Hash} label="billing-questions" />
          <SidebarItem icon={Hash} label="help-center-questions" />
          <SidebarItem icon={Lock} label="mm-reps" />

          <SectionLabel label="Recent" />
          <button className="flex w-full items-center gap-2 rounded-md bg-[#e9e9ec] px-2 py-1.5 text-[13px]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#fde68a] text-[9px] font-semibold text-[#7c5b00]">LB</span>
            <span className="flex-1 truncate text-left">Lisa Bennett</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-[#ececef]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#c4b5fd] text-[9px] font-semibold text-[#3b1f8a]">D</span>
            <span className="flex-1 truncate text-left">Dialbot</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-[#ececef]">
            <Phone className="h-4 w-4 text-[#5a5a66]" />
            <span className="flex-1 truncate text-left">(919) 426-1801</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-[#ececef]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#fcd34d] text-[9px] font-semibold text-[#7c5b00]">SM</span>
            <span className="flex-1 truncate text-left">
              Sophia Miller
              <div className="text-[10px] text-[#5a5a66]">Working EST</div>
            </span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#6e3aff] px-1.5 text-[10px] font-semibold text-white">2</span>
          </button>

          {/* Mini player */}
          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#e3e3e8] bg-white px-2 py-2">
            <button className="grid h-6 w-6 place-items-center rounded-full bg-[#1f1f1f] text-white">
              <Play className="h-3 w-3" />
            </button>
            <span className="text-[11px] tabular-nums text-[#1f1f1f]">0:14 / 0:14</span>
            <Volume2 className="ml-auto h-3.5 w-3.5 text-[#5a5a66]" />
            <Maximize2 className="h-3.5 w-3.5 text-[#5a5a66]" />
            <MoreVertical className="h-3.5 w-3.5 text-[#5a5a66]" />
          </div>
        </aside>

        {/* Conversation */}
        <main className="flex min-w-0 flex-1 flex-col bg-white">
          {/* Ongoing call bar */}
          <div className="flex h-12 items-center gap-3 border-b border-[#e3e3e8] bg-[#0f1116] px-3 text-white">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22c55e]/15 text-[#22c55e]">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <div className="text-[12.5px] font-semibold">Ongoing call</div>
                <div className="text-[10.5px] tabular-nums text-white/60">01:24</div>
              </div>
            </div>

            <div className="mx-auto flex items-center gap-1.5">
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <Mic className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <Pause className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white">
                <Grid3x3 className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <PhoneForwarded className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <Plus className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <Video className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/80 hover:bg-white/15">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-[#ef4444] text-white hover:bg-[#dc2626]">
                <PhoneOff className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <SignalHigh className="h-4 w-4" />
              <Headphones className="h-4 w-4" />
            </div>
            <button className="ml-2 flex items-center gap-1.5 rounded-md border border-[#22c55e]/40 bg-[#22c55e]/10 px-2.5 py-1 text-[12px] font-medium text-[#22c55e] hover:bg-[#22c55e]/15">
              <Check className="h-3.5 w-3.5" />
              Mark as done
            </button>
          </div>

          {/* Conversation header */}
          <div className="flex h-12 items-center gap-3 border-b border-[#e3e3e8] px-4">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fde68a] text-[12px] font-semibold text-[#7c5b00]">LB</div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-[14px] font-semibold">
                <span className="truncate">Lisa Bennett</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#5a5a66]" />
                <Star className="ml-1 h-3.5 w-3.5 text-[#9aa0a6]" />
              </div>
              <div className="truncate text-[11px] text-[#5a5a66]">Other: (907) 555-0101</div>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[#5a5a66]">
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><Search className="h-4 w-4" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><UserPlus className="h-4 w-4" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><ImageIcon className="h-4 w-4" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><Video className="h-4 w-4" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><Phone className="h-4 w-4" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#ececef]"><ChevronDown className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-[760px] space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar who={m.who} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13px] font-semibold text-[#1f1f1f]">{m.name}</span>
                      <span className="text-[11px] text-[#5a5a66]">{m.time}</span>
                    </div>
                    {m.text ? (
                      <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[#1f1f1f]">{m.text}</p>
                    ) : null}
                    {m.extra ? (
                      <p className="mt-2 text-[13.5px] leading-[1.55] text-[#1f1f1f]">{m.extra}</p>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Call card */}
              <div className="mt-4 flex justify-center">
                <div className="flex w-full max-w-[560px] items-center gap-3 rounded-2xl border-2 border-[#c084fc] bg-white px-4 py-3 shadow-[0_0_0_4px_rgba(192,132,252,0.12)]">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#f3e8ff] text-[#7c3aed]">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold">You called Lisa Bennett</div>
                    <div className="truncate text-[11px] text-[#5a5a66]">Started 10 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-[#e3e3e8] px-6 py-3">
            <div className="mx-auto max-w-[760px]">
              <input
                placeholder="New message"
                className="w-full bg-transparent text-[13.5px] text-[#1f1f1f] outline-none placeholder:text-[#9aa0a6]"
              />
            </div>
          </div>
        </main>

        {/* Right rail */}
        <aside className="hidden w-[44px] shrink-0 flex-col items-center gap-2 border-l border-[#e3e3e8] bg-white py-3 md:flex">
          <button className="grid h-8 w-8 place-items-center rounded-md text-[#5a5a66] hover:bg-[#ececef]">
            <div className="h-4 w-4 rounded-sm border border-current" />
          </button>
          <button className="grid h-8 w-8 place-items-center rounded-md bg-[#f3e8ff] text-[#7c3aed]">
            <Star className="h-4 w-4" />
          </button>
        </aside>
      </div>
    </div>
  );
}
