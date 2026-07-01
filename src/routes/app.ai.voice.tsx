import { createFileRoute } from "@tanstack/react-router";
import { Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { PhoneCall } from "lucide-react";

export const Route = createFileRoute("/app/ai/voice")({
  head: () => ({ meta: [{ title: "Voice AI · Revenue Sol" }] }),
  component: Voice,
});

function Voice() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl grid place-items-center bg-[--color-success-subtle] text-[--color-success]">
            <PhoneCall size={22} />
          </div>
          <div>
            <div className="text-[16px] font-semibold text-[--color-ink]">Live</div>
            <div className="text-[11px] text-[--color-muted]">(512) 555-0199</div>
          </div>
          <Tag tone="success">98%</Tag>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[--color-hairline]">
          {[["12","Answered"],["9","Booked"],["2","Voicemail"]].map(([v,l]) => (
            <div key={l}>
              <div className="text-[20px] font-semibold text-[--color-ink]">{v}</div>
              <div className="text-[10px] text-[--color-muted]">{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <div className="text-[13px] font-semibold mb-3 text-[--color-ink]">Recent AI calls</div>
        <div className="divide-y divide-[--color-hairline]">
          {[
            { n: "Priya Rao",    d: "1:42", s: "Booked 3pm AC diagnostic.",              t: "12m" },
            { n: "Unknown",      d: "0:34", s: "Voicemail — wants estimate for repipe.", t: "42m" },
            { n: "Jordan Pike",  d: "2:11", s: "Rescheduled to Wed 4pm.",                t: "2h" },
            { n: "Alicia Weber", d: "0:58", s: "Transferred to on-call.",                t: "yday" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Avatar name={c.n} size={34} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold text-[--color-ink]">{c.n}</div>
                  <div className="text-[11px] text-[--color-muted]">{c.t}</div>
                </div>
                <div className="text-[12px] text-[--color-body] truncate">{c.s}</div>
                <div className="text-[10px] text-[--color-muted] mt-0.5">Duration {c.d}</div>
              </div>
              <Btn variant="ghost" size="sm">Transcript</Btn>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
