import { createFileRoute } from "@tanstack/react-router";
import { Card, Btn } from "@/components/app-shell/AppShell";
import { Sparkles, MessageSquare, PhoneCall, CalendarCheck, Star } from "lucide-react";

export const Route = createFileRoute("/app/ai/employee")({
  head: () => ({ meta: [{ title: "AI Employee · Revenue Sol" }] }),
  component: Employee,
});

function Employee() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep]">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="text-[16px] font-semibold text-[--color-ink]">All systems normal</div>
            <div className="text-[12px] text-[--color-muted]">42 tasks handled today · 7 waiting for approval</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[--color-success] animate-pulse" />
            <span className="text-[10px] text-[--color-success] font-semibold">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[[MessageSquare,"28","Replies"],[PhoneCall,"12","Calls"],[CalendarCheck,"9","Bookings"],[Star,"4","Reviews"]].map(([I,v,l]:any,i) => (
            <div key={i} className="rounded-xl p-3 bg-[--color-canvas] border border-[--color-hairline]">
              <I size={14} className="text-[--color-muted]" />
              <div className="text-[20px] font-semibold mt-1 text-[--color-ink]">{v}</div>
              <div className="text-[10px] text-[--color-muted]">{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3 text-[--color-ink]">Knowledge base</div>
        <div className="space-y-2.5 text-[12px]">
          {[["Website pages","42"],["FAQs","128"],["Service prices","34"],["Last refresh","Today 8:14 AM"]].map(([k,v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-[--color-muted]">{k}</span>
              <span className="font-medium text-[--color-ink]">{v}</span>
            </div>
          ))}
        </div>
        <Btn variant="secondary" size="sm" className="w-full mt-4">Manage sources</Btn>
      </Card>

      <Card className="lg:col-span-2">
        <div className="text-[13px] font-semibold mb-4 text-[--color-ink]">Auto-reply settings</div>
        <div className="divide-y divide-[--color-hairline]">
          {[
            ["Answer inbound calls", "24/7 AI receptionist", true],
            ["Reply to missed calls", "SMS in <60 seconds", true],
            ["Reply to webchat", "Book jobs directly", true],
            ["Ask for reviews after job", "After 'complete' status", false],
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[--color-ink]">{t[0] as string}</div>
                <div className="text-[11px] text-[--color-muted]">{t[1] as string}</div>
              </div>
              <div className={`w-10 h-6 rounded-full p-0.5 transition ${t[2] ? "bg-[--color-primary]" : "bg-[--color-hairline]"}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition ${t[2] ? "ml-4" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3 text-[--color-ink]">Approval queue</div>
        <div className="space-y-3">
          {[
            { t: "Reply to Priya Rao", d: "3pm confirmation" },
            { t: "Quote for Jordan Pike", d: "$980 repipe" },
          ].map((q, i) => (
            <div key={i} className="rounded-xl p-3 border border-[--color-hairline] bg-[--color-accent-subtle]">
              <div className="text-[12px] font-semibold text-[--color-ink]">{q.t}</div>
              <div className="text-[11px] text-[--color-muted] mb-2">{q.d}</div>
              <div className="flex gap-1.5">
                <Btn size="sm">Approve</Btn>
                <Btn size="sm" variant="ghost">Skip</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
