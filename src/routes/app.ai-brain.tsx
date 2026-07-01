import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, Brain, Zap, TrendingUp, Users, Play, Pause } from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/ai-brain")({ component: AIBrainPage });

const PROMPTS = [
  "How many leads did I get this week?",
  "Send review requests to today's completed jobs",
  "Which jobs are still unpaid over $500?",
  "Draft a follow-up for cold leads from last month",
];

const AUTOMATIONS = [
  { name: "Auto-respond to new leads within 60s", active: true, count: 142 },
  { name: "Request review after job completion", active: true, count: 89 },
  { name: "Follow-up cold leads after 3 days", active: true, count: 34 },
  { name: "Send payment reminder after 5 days", active: false, count: 0 },
  { name: "Book missed calls automatically", active: true, count: 27 },
];

function AIBrainPage() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { role: "ai", text: "Hi Mike! I'm your AI Brain. Ask me anything or run an automation. 🧠" },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setChat(c => [...c, { role: "user", text: msg }, { role: "ai", text: "Working on that... I found 24 new leads this week — 8 above your average conversion score. Want me to draft outreach?" }]);
    setMsg("");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="AI Brain"
        subtitle="Your always-on operator, powered by real business context"
        actions={<Tag tone="ai">Autopilot ON</Tag>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chat */}
        <Card className="lg:col-span-2 !p-0 flex flex-col h-[560px]">
          <div className="p-4 border-b border-[--color-hairline] flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg grid place-items-center text-white" style={{ background: "var(--color-brand-gradient)" }}>
              <Brain size={15} />
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[--color-ink]">Command Center</div>
              <div className="text-[11px] text-[--color-muted]">Powered by RevSol GPT-4o</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] ${
                  m.role === "user" ? "text-white rounded-br-md" : "bg-[--color-surface-strong] rounded-bl-md text-[--color-ink]"
                }`} style={m.role === "user" ? { background: "var(--color-brand-gradient)" } : undefined}>{m.text}</div>
              </div>
            ))}
            <div className="pt-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[--color-muted] mb-2">Try asking</div>
              <div className="flex flex-wrap gap-1.5">
                {PROMPTS.map(p => (
                  <button key={p} onClick={() => setMsg(p)} className="text-[11.5px] px-2.5 py-1.5 rounded-full bg-[--color-ai-subtle] text-[--color-ai] hover:opacity-80">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-[--color-hairline] flex gap-2">
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask AI or run a command..." className="flex-1 h-10 px-3 rounded-lg border border-[--color-hairline] text-[13px] focus:outline-none focus:border-[--color-primary]" />
            <Btn variant="gradient" icon={<Send size={13} />} onClick={send}>Send</Btn>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="text-[14px] font-semibold text-[--color-ink] mb-3 flex items-center gap-1.5"><Zap size={15} className="text-[--color-ai]" /> Autopilot</h3>
            <div className="space-y-2">
              {AUTOMATIONS.map(a => (
                <div key={a.name} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-[--color-surface-strong]">
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-[--color-ink] truncate">{a.name}</div>
                    <div className="text-[11px] text-[--color-muted]">{a.count} triggered today</div>
                  </div>
                  <button className={`w-10 h-6 rounded-full relative transition ${a.active ? "" : "bg-[--color-hairline]"}`} style={a.active ? { background: "var(--color-brand-gradient)" } : undefined}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${a.active ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-[14px] font-semibold text-[--color-ink] mb-3">This Week</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><div className="text-[22px] font-bold text-[--color-ink]">324</div><div className="text-[11px] text-[--color-muted]">Actions taken</div></div>
              <div><div className="text-[22px] font-bold text-[--color-ink]">$12k</div><div className="text-[11px] text-[--color-muted]">Revenue driven</div></div>
              <div><div className="text-[22px] font-bold text-[--color-ink]">48h</div><div className="text-[11px] text-[--color-muted]">Time saved</div></div>
              <div><div className="text-[22px] font-bold text-[--color-ink]">92%</div><div className="text-[11px] text-[--color-muted]">Success rate</div></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
