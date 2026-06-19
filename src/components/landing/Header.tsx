import { Search, Menu, Star, ArrowRight, ChevronDown } from "./icons";
import { HeroBackground } from "./HeroBackground";

export function Nav() {
  const links = ["Product", "Use Cases", "Solutions", "Resources", "Company", "Pricing"];
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-bg)]/85 backdrop-blur border-b border-[color:var(--color-border-soft)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center gap-6">
        <a href="#" className="font-display text-xl font-semibold text-[color:var(--color-heading)] tracking-tight shrink-0">
          revenue<span className="text-[color:var(--color-brand)]">.sol</span>
        </a>
        <nav className="hidden lg:flex items-center gap-1 text-sm text-[color:var(--color-body)]">
          {links.map((l) => (
            <a key={l} href="#" className="px-3 py-2 rounded-md hover:bg-[color:var(--color-tint)] inline-flex items-center gap-1">
              {l} <ChevronDown className="opacity-60" />
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[color:var(--color-border-soft)] bg-white text-xs text-[color:var(--color-muted)]">
            <Search /> <span>Search</span> <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[color:var(--color-tint)]">⌘K</kbd>
          </button>
          <a href="#" className="text-sm text-[color:var(--color-body)] px-3 py-2 hover:text-[color:var(--color-heading)]">Log in</a>
          <a href="#" className="text-sm px-3.5 py-2 rounded-full border border-[color:var(--color-border-soft)] bg-white text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]">Get a demo</a>
          <a href="#" className="text-sm px-3.5 py-2 rounded-full bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-hover)]">Start free trial</a>
        </div>
        <button className="ml-auto lg:hidden p-2 text-[color:var(--color-heading)]"><Menu /></button>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 text-center relative">


        <h1 className="relative font-display text-[44px] leading-[1.05] sm:text-6xl lg:text-7xl font-medium text-[color:var(--color-heading)] tracking-tight">
          Run your service business<br />
          <span className="italic text-[color:var(--color-brand)]">with unique data</span> — and<br />
          the AI to act on it
        </h1>
        <p className="relative mt-7 max-w-2xl mx-auto text-lg text-[color:var(--color-body)]">
          Bring AI employees, customer enrichment, and intent signals together — and turn every call, text, and form into a booked job.
        </p>
        <div className="relative mt-9 flex justify-center">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-medium hover:bg-[color:var(--color-brand-hover)] shadow-[0_10px_30px_-10px_rgba(99,91,255,0.6)]">
            Start building for free <ArrowRight />
          </a>
        </div>

        <div className="relative mt-20">
          <p className="text-xs tracking-[0.18em] text-[color:var(--color-muted)] uppercase">
            Trusted by thousands of local service businesses · Built with care
          </p>
          <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
            <Chip><Star className="text-[color:var(--color-brand)]" /> 4.9 <Stars /></Chip>
            <Chip>👥 10K+ Operator community</Chip>
            <Chip>💬 5.0 <Stars /></Chip>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[color:var(--color-border-soft)] bg-white text-sm text-[color:var(--color-heading)]">
      {children}
    </span>
  );
}

export function Stars() {
  return (
    <span className="inline-flex text-[color:var(--color-brand)]">
      {[0,1,2,3,4].map(i => <Star key={i} />)}
    </span>
  );
}

export function IntegrationsStrip() {
  const items = ["Twilio", "Stripe", "QuickBooks", "Google", "RingCentral", "HubSpot", "Salesforce", "Zapier", "Slack", "Gmail"];
  return (
    <section className="border-y border-[color:var(--color-border-soft)] bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
        <p className="text-center text-xs tracking-[0.18em] uppercase text-[color:var(--color-muted)] mb-6">
          Integrations
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-6 items-center">
          {items.map((n) => (
            <div key={n} className="text-center font-display text-xl text-[color:var(--color-heading)]/70">
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
