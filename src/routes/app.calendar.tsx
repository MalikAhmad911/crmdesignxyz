import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/calendar")({ component: CalendarPage });

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

const EVENTS = [
  { day: 0, hour: 1, dur: 2, title: "AC Repair", tech: "Mike", tone: "primary" as const },
  { day: 0, hour: 4, dur: 1, title: "Estimate", tech: "Ana", tone: "warning" as const },
  { day: 1, hour: 2, dur: 3, title: "HVAC Install", tech: "Chris", tone: "success" as const },
  { day: 2, hour: 0, dur: 2, title: "Water Heater", tech: "Ana", tone: "primary" as const },
  { day: 3, hour: 3, dur: 2, title: "Furnace", tech: "Mike", tone: "success" as const },
  { day: 4, hour: 1, dur: 1, title: "Drain Clean", tech: "Chris", tone: "primary" as const },
  { day: 4, hour: 5, dur: 2, title: "Zone Repair", tech: "Ana", tone: "warning" as const },
];

const TONE: Record<string, string> = {
  primary: "bg-[--color-primary-subdued] text-[--color-primary-deep] border-[--color-primary]",
  success: "bg-[--color-success-subtle] text-[--color-success] border-[--color-success]",
  warning: "bg-[--color-warning-subtle] text-[--color-warning] border-[--color-warning]",
};

function CalendarPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Calendar"
        subtitle="Week of Jul 1 — Jul 7, 2025"
        actions={
          <>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong]"><ChevronLeft size={16} /></button>
              <Btn size="sm" variant="secondary">Today</Btn>
              <button className="w-8 h-8 rounded-lg grid place-items-center hover:bg-[--color-surface-strong]"><ChevronRight size={16} /></button>
            </div>
            <Btn variant="gradient" icon={<Plus size={14} />}>New Event</Btn>
          </>
        }
      />

      <Card padded={false}>
        <div className="overflow-x-auto">
          <div className="min-w-[720px] grid grid-cols-[60px_repeat(7,1fr)] text-[12px]">
            <div />
            {DAYS.map((d, i) => (
              <div key={d} className="p-3 text-center border-b border-l border-[--color-hairline]">
                <div className="text-[10px] uppercase tracking-widest text-[--color-muted]">{d}</div>
                <div className="text-[15px] font-semibold text-[--color-ink] mt-0.5">{i + 1}</div>
              </div>
            ))}

            {HOURS.map((h, hi) => (
              <>
                <div key={"h" + hi} className="p-2 text-[10px] text-[--color-muted] border-b border-[--color-hairline-soft] text-right pr-2">{h}</div>
                {DAYS.map((_, di) => {
                  const evt = EVENTS.find(e => e.day === di && e.hour === hi);
                  return (
                    <div key={di + "-" + hi} className="relative min-h-[54px] border-b border-l border-[--color-hairline-soft]">
                      {evt && (
                        <div
                          className={`absolute inset-x-1 top-1 rounded-md border-l-2 p-1.5 ${TONE[evt.tone]}`}
                          style={{ height: `calc(${evt.dur * 54}px - 8px)` }}
                        >
                          <div className="text-[11.5px] font-semibold leading-tight">{evt.title}</div>
                          <div className="text-[10.5px] opacity-80 mt-0.5">{evt.tech}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
