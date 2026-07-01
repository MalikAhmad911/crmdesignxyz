import { createFileRoute } from "@tanstack/react-router";
import { Mic, Phone, PhoneIncoming, PhoneMissed, Clock, TrendingUp, Play } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, DataTable } from "@/components/app-shell/AppShell";
import { CALLS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/voice-agent")({ component: VoicePage });

function VoicePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Voice Agent"
        subtitle="24/7 AI receptionist that books and screens calls"
        actions={<Btn variant="gradient">Test Call</Btn>}
      />

      <Card className="mb-6 relative overflow-hidden" padded={false}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: "var(--color-brand-gradient)" }} />
        <div className="relative p-6 flex items-center gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-2xl grid place-items-center text-white shrink-0" style={{ background: "var(--color-brand-gradient)" }}>
            <Mic size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[20px] font-semibold text-[--color-ink]">Voice Agent · Emma</h2>
              <Tag tone="success">● Live on +1 214-555-0100</Tag>
            </div>
            <p className="text-[13px] text-[--color-muted] mt-1">Never miss another call. Emma answers within 2 rings, screens the caller, and books straight to the calendar.</p>
          </div>
          <Btn variant="secondary">Settings</Btn>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Calls Answered" value="128" trend="↑ 34% this week" trendTone="success" icon={<PhoneIncoming size={18} />} iconTone="success" />
        <StatCard label="Booked" value="47" trend="37% booking rate" trendTone="success" icon={<Phone size={18} />} iconTone="primary" />
        <StatCard label="Avg Duration" value="2:14" trend="Short & effective" trendTone="neutral" icon={<Clock size={18} />} iconTone="info" />
        <StatCard label="Missed" value="0" trend="Perfect week" trendTone="success" icon={<PhoneMissed size={18} />} iconTone="danger" />
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-[--color-hairline]">
          <h3 className="text-[14px] font-semibold text-[--color-ink]">Call Log</h3>
        </div>
        <DataTable
          headers={["Time", "Caller", "Duration", "Outcome", "Recording", ""]}
          rows={CALLS.map(c => [
            <span className="text-[--color-muted]">{c.time}</span>,
            <span className="font-semibold">{c.caller}</span>,
            c.duration,
            <Tag tone={c.outcome === "Booked" ? "success" : c.outcome === "Missed" ? "danger" : c.outcome === "Escalated" ? "warning" : "neutral"}>{c.outcome}</Tag>,
            <button className="flex items-center gap-1.5 text-[--color-primary] text-[12px] font-semibold"><Play size={12} /> Play</button>,
            <Btn size="sm" variant="ghost">Transcript</Btn>,
          ])}
        />
      </Card>
    </div>
  );
}
