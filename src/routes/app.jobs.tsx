import { createFileRoute } from "@tanstack/react-router";
import { Plus, User, MapPin, Clock } from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";
import { JOBS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/jobs")({ component: JobsPage });

const COL_TONE: Record<string, "primary" | "info" | "warning" | "success" | "neutral"> = {
  Scheduled: "primary",
  "En Route": "info",
  "In Progress": "warning",
  Completed: "success",
  Invoiced: "neutral",
};

function JobsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Jobs"
        subtitle="Kanban board of every job in flight"
        actions={<Btn variant="gradient" icon={<Plus size={14} />}>Create Job</Btn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {Object.entries(JOBS).map(([col, jobs]) => (
          <div key={col} className="min-w-0">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[--color-ink]">{col}</span>
                <Tag tone={COL_TONE[col]}>{jobs.length}</Tag>
              </div>
            </div>
            <div className="space-y-2">
              {jobs.map(j => (
                <Card key={j.id} className="!p-3">
                  <div className="text-[13.5px] font-semibold text-[--color-ink] mb-2">{j.title}</div>
                  <div className="space-y-1 text-[12px] text-[--color-body]">
                    <div className="flex items-center gap-1.5"><User size={11} /> {j.customer}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={11} /> <span className="truncate">{j.address}</span></div>
                    <div className="flex items-center gap-1.5"><Clock size={11} /> {j.time}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[--color-hairline-soft] flex items-center justify-between">
                    <span className="text-[11px] text-[--color-muted]">{j.tech}</span>
                    <Tag tone={COL_TONE[col]}>{col}</Tag>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
