import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { Plus, MapPin, Clock, Navigation, User } from "lucide-react";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({ meta: [{ title: "Jobs · Revenue Sol" }] }),
  component: JobsPage,
});

type Status = "scheduled" | "en-route" | "in-progress" | "complete";
type Job = { id: string; title: string; customer: string; address: string; when: string; tech: string; value: string; status: Status };

const JOBS: Job[] = [
  { id: "j1", title: "AC diagnostic + recharge", customer: "Priya Rao",   address: "182 W 5th St, Austin",  when: "Today · 2 PM",     tech: "Marcus L.", value: "$248",   status: "en-route" },
  { id: "j2", title: "Furnace tune-up",          customer: "Reyes HVAC",  address: "94 Rainey St",         when: "Today · 4:30 PM",  tech: "Marcus L.", value: "$189",   status: "scheduled" },
  { id: "j3", title: "Water heater install",     customer: "Aisha Osei",  address: "701 E 45th St",        when: "Tomorrow · 9 AM",  tech: "Diego R.",  value: "$1,450", status: "scheduled" },
  { id: "j4", title: "Duct cleaning",            customer: "Nina Berg",   address: "22 Cesar Chavez",      when: "Wed · 11 AM",      tech: "Marcus L.", value: "$420",   status: "in-progress" },
  { id: "j5", title: "Full inspection",          customer: "Devon Kim",   address: "56 Barton Springs",    when: "Yesterday",        tech: "Diego R.",  value: "$180",   status: "complete" },
];

const COLUMNS: { key: Status; label: string; tone: "primary" | "warning" | "info" | "success" }[] = [
  { key: "scheduled",   label: "Scheduled",   tone: "primary" },
  { key: "en-route",    label: "En route",    tone: "warning" },
  { key: "in-progress", label: "In progress", tone: "info" },
  { key: "complete",    label: "Complete",    tone: "success" },
];

function JobsPage() {
  const [view, setView] = useState<"board" | "list">("board");
  return (
    <div className="p-8 max-w-[1600px] w-full">
      <PageHeader
        title="Jobs"
        subtitle={`${JOBS.length} jobs this week · $2,487 booked`}
        actions={
          <>
            <div className="flex bg-[--color-surface-soft] rounded-lg p-0.5">
              {(["board","list"] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`text-[12px] font-medium px-3 py-1.5 rounded-md capitalize ${view === v ? "bg-white shadow-sm" : "text-[--color-muted]"}`}>
                  {v}
                </button>
              ))}
            </div>
            <Btn icon={<Plus size={14} />}>New job</Btn>
          </>
        }
      />

      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map(col => {
            const items = JOBS.filter(j => j.status === col.key);
            return (
              <div key={col.key} className="bg-[--color-surface-soft] rounded-2xl p-3">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Tag tone={col.tone}>{col.label}</Tag>
                    <span className="text-[11px] font-semibold text-[--color-muted]">{items.length}</span>
                  </div>
                  <button className="w-6 h-6 rounded-md grid place-items-center hover:bg-white"><Plus size={12} /></button>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {items.map(j => (
                    <div key={j.id} className="bg-white rounded-xl border border-[--color-hairline] p-3 cursor-pointer hover:shadow-sm transition">
                      <div className="text-[13px] font-semibold mb-1">{j.title}</div>
                      <div className="text-[11px] text-[--color-body] mb-3">{j.customer}</div>
                      <div className="space-y-1 text-[11px] text-[--color-muted]">
                        <div className="flex items-center gap-1.5"><Clock size={11} /> {j.when}</div>
                        <div className="flex items-center gap-1.5"><MapPin size={11} /> {j.address}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[--color-hairline]">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={j.tech} size={20} />
                          <span className="text-[11px] font-medium">{j.tech.split(" ")[0]}</span>
                        </div>
                        <div className="text-[13px] font-semibold">{j.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card padded={false}>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-[--color-muted] border-b border-[--color-hairline]">
                <th className="px-4 py-3 font-semibold">Job</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">When</th>
                <th className="px-4 py-3 font-semibold">Tech</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map(j => (
                <tr key={j.id} className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-surface-soft]/50">
                  <td className="px-4 py-3 font-medium">{j.title}</td>
                  <td className="px-4 py-3 text-[--color-body]">{j.customer}</td>
                  <td className="px-4 py-3 text-[--color-muted]">{j.when}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2"><Avatar name={j.tech} size={22} /><span>{j.tech}</span></div>
                  </td>
                  <td className="px-4 py-3"><Tag tone={COLUMNS.find(c => c.key === j.status)!.tone}>{j.status.replace("-"," ")}</Tag></td>
                  <td className="px-4 py-3 text-right font-semibold">{j.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
