import { Search, Menu, Star, ArrowRight, ChevronDown } from "./icons";
import { HeroBackground } from "./HeroBackground";

export function Nav() {
  const links = ["Product", "Use Cases", "Solutions", "Resources", "Company", "Pricing"];
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-bg)] border-b border-[color:var(--color-border-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
        <a href="#" className="font-display text-lg sm:text-xl font-semibold text-[color:var(--color-heading)] tracking-tight shrink-0">
          revenue<span className="text-[color:var(--color-brand)]">.sol</span>
        </a>
        <nav className="hidden xl:flex items-center gap-1 text-sm text-[color:var(--color-body)] min-w-0">
          {links.map((l) => (
            <a key={l} href="#" className="px-3 py-2 rounded-md hover:bg-[color:var(--color-tint)] inline-flex items-center gap-1 whitespace-nowrap">
              {l} <ChevronDown className="opacity-60" />
            </a>
          ))}
        </nav>
        <div className="hidden xl:flex items-center gap-2 justify-self-end">
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[color:var(--color-border-soft)] bg-white text-xs text-[color:var(--color-muted)]">
            <Search /> <span>Search</span> <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[color:var(--color-tint)]">⌘K</kbd>
          </button>
          <a href="#" className="text-sm text-[color:var(--color-body)] px-3 py-2 hover:text-[color:var(--color-heading)] whitespace-nowrap">Log in</a>
          <a href="#" className="text-sm px-3.5 py-2 rounded-full border border-[color:var(--color-border-soft)] bg-white text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)] whitespace-nowrap">Get a demo</a>
          <a href="#" className="text-sm px-3.5 py-2 rounded-full bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-hover)] whitespace-nowrap">Start free trial</a>
        </div>
        <div className="flex items-center gap-2 justify-self-end xl:hidden">
          <a href="#" className="hidden sm:inline-flex text-xs sm:text-sm px-3 sm:px-3.5 py-2 rounded-full bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-hover)] whitespace-nowrap">Start free</a>
          <button aria-label="Menu" className="p-2 text-[color:var(--color-heading)] shrink-0"><Menu /></button>
        </div>
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
          <span className="block">A simple way to run</span>
          <span className="block">your service business</span>
          <span className="block">without missing leads.</span>
        </h1>

        <p className="relative mt-7 sm:mt-9 mx-auto max-w-xl text-base sm:text-lg text-[#3B3A36] leading-relaxed">
          We answer your calls, reply to texts and forms, and add every new job to your calendar — so you can focus on the work instead of the phone.
        </p>

        <div className="relative mt-9 sm:mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#0F0F10] text-white text-sm sm:text-base font-semibold hover:bg-black transition"
          >
            Try it free <ArrowRight />
          </a>
        </div>

        <div className="relative mt-16 sm:mt-24">
          <p className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[#6B645A] uppercase px-4">
            Used by thousands of local service businesses.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with the people who actually use it.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            <Chip><Star className="text-[#C9A227]" /> 4.9 from owners <span className="hidden sm:inline-flex"><Stars /></span></Chip>
            <Chip>👥 10K+ shops using it</Chip>
            <Chip>💬 5.0 support score <span className="hidden sm:inline-flex"><Stars /></span></Chip>
          </div>
        </div>
      </div>
    </section>
  );
}


function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] text-sm text-[color:var(--color-heading)]">
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
