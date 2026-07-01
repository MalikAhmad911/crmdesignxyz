import { createFileRoute } from "@tanstack/react-router";
import { Plus, Megaphone, Send, Users, TrendingUp } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, DataTable } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/campaigns")({ component: CampaignsPage });

const CAMP = [
  { name: "July Tune-up Promo", channel: "SMS", audience: "342 customers", sent: "312", replies: "48", status: "Live" },
  { name: "Cold Lead Reactivation", channel: "Email", audience: "128 leads", sent: "128", replies: "12", status: "Complete" },
  { name: "5-Star Google Push", channel: "SMS", audience: "89 recent jobs", sent: "89", replies: "34", status: "Complete" },
  { name: "Fall Furnace Check", channel: "SMS + Email", audience: "512 customers", sent: "—", replies: "—", status: "Draft" },
];

function CampaignsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Campaigns"
        subtitle="Bulk SMS + Email outreach with AI personalization"
        actions={<Btn variant="gradient" icon={<Plus size={14} />}>New Campaign</Btn>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active Campaigns" value="3" icon={<Megaphone size={18} />} iconTone="primary" />
        <StatCard label="Messages Sent" value="1,842" trend="↑ 24% this month" trendTone="success" icon={<Send size={18} />} iconTone="info" />
        <StatCard label="Total Reach" value="971" icon={<Users size={18} />} iconTone="ai" />
        <StatCard label="Reply Rate" value="18%" trend="Above industry avg" trendTone="success" icon={<TrendingUp size={18} />} iconTone="success" />
      </div>

      <Card padded={false}>
        <DataTable
          headers={["Name", "Channel", "Audience", "Sent", "Replies", "Status", ""]}
          rows={CAMP.map(c => [
            <span className="font-semibold">{c.name}</span>,
            <Tag tone="primary">{c.channel}</Tag>,
            c.audience, c.sent, c.replies,
            <Tag tone={c.status === "Live" ? "success" : c.status === "Draft" ? "warning" : "neutral"}>{c.status}</Tag>,
            <Btn size="sm" variant="ghost">View</Btn>,
          ])}
        />
      </Card>
    </div>
  );
}
