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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 text-center relative">

        <h1
          className="relative font-[family-name:var(--font-hero)] font-extrabold tracking-[-0.035em] text-[#0F0F10] text-[44px] leading-[0.98] sm:text-[68px] md:text-[84px] lg:text-[104px]"
        >
          <span className="block">Run your service business</span>
          <span className="block">with unique data</span>
          <span className="block">— and the AI to act on it</span>
        </h1>

        <p className="relative mt-7 sm:mt-9 mx-auto max-w-xl text-base sm:text-lg text-[#3B3A36] leading-relaxed">
          Bring AI employees, customer enrichment, and intent signals together
          <br className="hidden sm:block" />
          {" "}and turn every call, text, and form into a booked job.
        </p>

        <div className="relative mt-9 sm:mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#0F0F10] text-white text-sm sm:text-base font-semibold hover:bg-black transition shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
          >
            Start building for free <ArrowRight />
          </a>
        </div>

        <div className="relative mt-16 sm:mt-24">
          <p className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[#6B645A] uppercase px-4">
            Trusted by thousands of local service businesses.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with love, inspired by our customers.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            <Chip><Star className="text-[#C9A227]" /> 4.9 <span className="hidden sm:inline-flex"><Stars /></span></Chip>
            <Chip>👥 10K+ community</Chip>
            <Chip>💬 5.0 <span className="hidden sm:inline-flex"><Stars /></span></Chip>
          </div>
        </div>
      </div>
    </section>
  );
}


function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5DFD3] bg-white/70 backdrop-blur text-sm text-[#1A1916]">
      {children}
    </span>
  );
}

export function Stars() {
  return (
    <span className="inline-flex text-[#C9A227]">
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
