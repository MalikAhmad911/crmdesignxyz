import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Btn, Tag } from "@/components/app-shell/AppShell";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({ meta: [{ title: "Calendar · Revenue Sol" }] }),
  component: CalendarPage,
});

const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i); // 8am – 6pm
const DAYS = ["Mon 30", "Tue 1", "Wed 2", "Thu 3", "Fri 4", "Sat 5", "Sun 6"];

type Ev = { day: number; start: number; dur: number; title: string; who: string; tone: "primary" | "success" | "warning" };

const EVENTS: Ev[] = [
  { day: 1, start: 9,  dur: 1.5, title: "AC diagnostic",   who: "Priya Rao",   tone: "primary" },
  { day: 1, start: 14, dur: 1,   title: "Furnace tune-up", who: "Reyes HVAC",  tone: "success" },
  { day: 1, start: 18, dur: 0.5, title: "Quote call",      who: "Aisha O.",    tone: "warning" },
  { day: 2, start: 10, dur: 2,   title: "Water heater install", who: "Aisha O.", tone: "primary" },
  { day: 3, start: 11, dur: 1,   title: "Duct cleaning",   who: "Nina B.",     tone: "success" },
  { day: 4, start: 13, dur: 1.5, title: "Inspection",      who: "Devon K.",    tone: "primary" },
];

const toneMap: Record<string, string> = {
  primary: "bg-[--color-primary-subdued] border-[--color-primary] text-[--color-primary-deep]",
  success: "bg-[--color-success-subtle] border-[--color-success] text-[--color-success]",
  warning: "bg-[--color-warning-subtle] border-[--color-warning] text-[--color-warning]",
};

function CalendarPage() {
  return (
    <div className="p-8 max-w-[1440px] w-full">
      <PageHeader
        title="Calendar"
        subtitle="Week of June 30, 2026"
        actions={
          <>
            <div className="flex items-center border border-[--color-hairline] rounded-lg bg-white">
              <button className="w-9 h-9 grid place-items-center hover:bg-[--color-surface-soft] rounded-l-lg"><ChevronLeft size={14} /></button>
              <div className="px-3 text-[12px] font-medium border-x border-[--color-hairline]">This week</div>
              <button className="w-9 h-9 grid place-items-center hover:bg-[--color-surface-soft] rounded-r-lg"><ChevronRight size={14} /></button>
            </div>
            <div className="flex bg-[--color-surface-soft] rounded-lg p-0.5">
              {["Day","Week","Month"].map((v, i) => (
                <button key={v} className={`text-[12px] font-medium px-3 py-1.5 rounded-md ${i === 1 ? "bg-white shadow-sm" : "text-[--color-muted]"}`}>{v}</button>
              ))}
            </div>
            <Btn icon={<Plus size={14} />}>New event</Btn>
          </>
        }
      />

      <Card padded={false} className="overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] border-b border-[--color-hairline] bg-[--color-surface-soft]/50">
          <div />
          {DAYS.map((d, i) => (
            <div key={d} className={`px-3 py-3 border-l border-[--color-hairline] ${i === 1 ? "bg-white" : ""}`}>
              <div className="text-[10px] uppercase tracking-widest text-[--color-muted] font-semibold">{d.split(" ")[0]}</div>
              <div className={`text-[18px] font-semibold mt-0.5 ${i === 1 ? "text-[--color-ink]" : "text-[--color-body]"}`}>{d.split(" ")[1]}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative">
          {HOURS.map((h, hi) => (
            <div key={h} className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] border-b border-[--color-hairline] last:border-0" style={{ height: 64 }}>
              <div className="px-2 py-1 text-[10px] font-mono text-[--color-muted] text-right">{h > 12 ? h - 12 : h} {h >= 12 ? "PM" : "AM"}</div>
              {DAYS.map((_, di) => (
                <div key={di} className="border-l border-[--color-hairline] relative">
                  {EVENTS.filter(e => e.day === di && e.start === h).map((e, ei) => (
                    <div
                      key={ei}
                      className={`absolute left-1 right-1 rounded-md border p-1.5 text-[11px] cursor-pointer hover:shadow-sm transition ${toneMap[e.tone]}`}
                      style={{ top: 2, height: e.dur * 64 - 4 }}
                    >
                      <div className="font-semibold truncate">{e.title}</div>
                      <div className="opacity-70 truncate">{e.who}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
