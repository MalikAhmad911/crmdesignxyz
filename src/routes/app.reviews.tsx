import { createFileRoute } from "@tanstack/react-router";
import { Send, Star, MessageSquare, TrendingUp } from "lucide-react";
import { Card, PageHeader, StatCard, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { REVIEWS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/reviews")({ component: ReviewsPage });

function ReviewsPage() {
  const dist = [80, 12, 5, 2, 1];
  const total = dist.reduce((a, b) => a + b, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Reviews"
        subtitle="Your reputation across Google, Facebook & Yelp"
        actions={<Btn variant="gradient" icon={<Send size={14} />}>Request Reviews</Btn>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Overall Rating" value="4.8" trend="⭐⭐⭐⭐⭐" trendTone="neutral" icon={<Star size={18} />} iconTone="warning" />
        <StatCard label="Total Reviews" value="342" trend="↑ 18 this month" trendTone="success" icon={<MessageSquare size={18} />} iconTone="primary" />
        <StatCard label="Response Rate" value="98%" trend="↑ 4% vs last month" trendTone="success" icon={<TrendingUp size={18} />} iconTone="success" />
        <StatCard label="Avg Response" value="2h" trend="↓ 30% faster" trendTone="success" icon={<Send size={18} />} iconTone="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1">
          <h3 className="text-[14px] font-semibold mb-3 text-[--color-ink]">Rating Distribution</h3>
          <div className="space-y-2">
            {dist.map((count, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px]">
                <span className="w-3">{5 - i}</span>
                <Star size={12} className="text-[--color-warning]" fill="currentColor" />
                <div className="flex-1 h-2 rounded-full bg-[--color-surface-strong] overflow-hidden">
                  <div className="h-full bg-[--color-warning]" style={{ width: `${(count / total) * 100}%` }} />
                </div>
                <span className="w-8 text-right text-[--color-muted]">{count}%</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-3">
          {REVIEWS.map(r => (
            <Card key={r.id}>
              <div className="flex items-start gap-3">
                <Avatar name={r.name} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <div className="text-[14px] font-semibold text-[--color-ink]">{r.name}</div>
                      <div className="text-[11px] text-[--color-muted]">{r.source} · {r.time}</div>
                    </div>
                    <div className="text-[13px]">{"⭐".repeat(r.rating)}</div>
                  </div>
                  <p className="text-[13px] text-[--color-body] mt-2">{r.text}</p>
                  <div className="flex gap-2 mt-3">
                    {r.replied
                      ? <Tag tone="success">✓ Replied</Tag>
                      : <Btn size="sm" variant="gradient">Reply with AI</Btn>}
                    <Btn size="sm" variant="ghost">Share</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
