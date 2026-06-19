import { Check, ArrowRight } from "./icons";

type Bullet = { title: string; body: string };

export function FeatureRow({
  eyebrow,
  title,
  bullets,
  stat,
  statLabel,
  reverse,
  mock,
  panelColor,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  bullets: Bullet[];
  stat: string;
  statLabel: string;
  reverse?: boolean;
  mock: React.ReactNode;
  panelColor: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
      <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          {eyebrow && <p className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-brand)] mb-4">{eyebrow}</p>}
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-[color:var(--color-heading)] leading-[1.1] tracking-tight">
            {title}
          </h2>
          <ul className="mt-8 space-y-5">
            {bullets.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="mt-1 grid place-items-center w-6 h-6 rounded-full bg-[color:var(--color-tint)] text-[color:var(--color-brand)] shrink-0">
                  <Check />
                </span>
                <p className="text-[color:var(--color-body)] leading-relaxed">
                  <span className="text-[color:var(--color-heading)] font-semibold">{b.title}:</span> {b.body}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border border-[color:var(--color-border-soft)] shadow-[0_8px_30px_-12px_rgba(10,37,64,0.08)]">
            <span className="font-display text-4xl text-[color:var(--color-brand)]">{stat}</span>
            <span className="text-sm text-[color:var(--color-body)] max-w-[220px]">{statLabel}</span>
          </div>
        </div>
        <div className="relative">
          <div
            className="rounded-3xl p-6 lg:p-10 min-h-[380px] relative overflow-hidden"
            style={{ background: panelColor }}
          >
            {mock}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionBreak() {
  return (
    <section className="mx-auto max-w-5xl px-5 lg:px-8 py-24 text-center">
      <h2 className="font-display text-4xl lg:text-6xl font-medium text-[color:var(--color-heading)] leading-[1.05] tracking-tight">
        Knowing what's going on is one thing.{" "}
        <span className="relative inline-block italic">
          <span className="absolute inset-x-[-6px] bottom-1 h-3 bg-[color:var(--color-tint)] -z-10 rounded-sm" />
          Doing something about it
        </span>{" "}
        is the part we make easy.
      </h2>
      <p className="mt-6 text-lg text-[color:var(--color-body)] max-w-2xl mx-auto">
        It's not enough to have the info. We connect to the tools you already use and help you take the next step — book the job, send the quote, follow up — without juggling tabs.
      </p>
      <a href="#" className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)]">
        Try it free <ArrowRight />
      </a>
    </section>
  );
}
