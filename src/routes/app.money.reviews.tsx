import { createFileRoute } from "@tanstack/react-router";
import { Card, Btn } from "@/components/app-shell/AppShell";
import { Star } from "lucide-react";

export const Route = createFileRoute("/app/money/reviews")({
  head: () => ({ meta: [{ title: "Reviews · Revenue Sol" }] }),
  component: Reviews,
});

function Reviews() {
  const reviews = [
    { n: "Priya Rao",    src: "Google",   r: 5, t: "Fast, professional, and honest. Booked within minutes of my call.", w: "2d" },
    { n: "Jordan Pike",  src: "Yelp",     r: 4, t: "Great work, arrival window was a little wide.",                     w: "5d" },
    { n: "Devon Kim",    src: "Facebook", r: 2, t: "Price was higher than the estimate.",                               w: "1w" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">Average rating</div>
        <div className="flex items-baseline gap-2 mt-1">
          <div className="text-[42px] font-semibold tracking-tight text-[--color-ink]">4.8</div>
          <div className="flex gap-0.5">{[0,1,2,3,4].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
        </div>
        <div className="text-[12px] text-[--color-muted]">132 reviews · 96% positive</div>
        <div className="space-y-1.5 mt-4">
          {[[5,80],[4,14],[3,4],[2,1],[1,1]].map(([n,pct]) => (
            <div key={n} className="flex items-center gap-2 text-[11px]">
              <span className="w-3 text-[--color-muted]">{n}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[--color-canvas] overflow-hidden">
                <div className="h-full bg-[--color-primary]" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-right text-[--color-muted]">{pct}%</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        {reviews.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[13px] font-semibold text-[--color-ink]">{r.n}</div>
                <div className="text-[11px] text-[--color-muted]">{r.src} · {r.w} ago</div>
              </div>
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(k => <Star key={k} size={13} className={k < r.r ? "fill-amber-400 text-amber-400" : "text-[--color-hairline]"} />)}
              </div>
            </div>
            <div className="text-[13px] text-[--color-body] leading-relaxed">{r.t}</div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[--color-hairline]">
              <Btn size="sm" variant="secondary">AI draft reply</Btn>
              <Btn size="sm" variant="ghost">Mark handled</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
