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
          className="relative font-[family-name:var(--font-hero)] font-extrabold tracking-[-0.035em] text-[#0F0F10] text-[36px] leading-[1.05] sm:text-[52px] md:text-[68px] lg:text-[84px]"
        >
          <span className="block">A simple way to run</span>
          <span className="block">your service business</span>
          <span className="block">without missing leads.</span>
        </h1>

        <p className="relative mt-5 sm:mt-7 mx-auto max-w-xl text-base sm:text-lg text-[#3B3A36] leading-relaxed">
          We answer your calls, reply to texts and forms, and add every new job to your calendar — so you can focus on the work instead of the phone.
        </p>

        <div className="relative mt-6 sm:mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0F0F10] text-white text-sm sm:text-base font-semibold hover:bg-black transition"
          >
            Try it free <ArrowRight />
          </a>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <p className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[#6B645A] uppercase px-4">
            Used by thousands of local service businesses.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with the people who actually use it.
          </p>
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
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
  // Reliable real brand favicons from Google's favicon service, with an inline fallback so no logo slot disappears.
  const rowA: Brand[] = [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Anthropic", domain: "anthropic.com" },
    { name: "OpenAI", domain: "openai.com" },
    { name: "ChatGPT", domain: "chatgpt.com" },
    { name: "Zapier", domain: "zapier.com" },
    { name: "Slack", domain: "slack.com" },
    { name: "Notion", domain: "notion.so" },
    { name: "HubSpot", domain: "hubspot.com" },
    { name: "Salesforce", domain: "salesforce.com" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "QuickBooks", domain: "quickbooks.intuit.com" },
    { name: "Intuit", domain: "intuit.com" },
    { name: "Twilio", domain: "twilio.com" },
    { name: "RingCentral", domain: "ringcentral.com" },
    { name: "Shopify", domain: "shopify.com" },
    { name: "Airtable", domain: "airtable.com" },
    { name: "Figma", domain: "figma.com" },
    { name: "Linear", domain: "linear.app" },
    { name: "Asana", domain: "asana.com" },
    { name: "Monday", domain: "monday.com" },
    { name: "ClickUp", domain: "clickup.com" },
    { name: "Clay", domain: "clay.com" },
    { name: "GoHighLevel", domain: "gohighlevel.com" },
  ];
  const rowB: Brand[] = [
    { name: "Calendly", domain: "calendly.com" },
    { name: "Gmail", domain: "gmail.com" },
    { name: "Google Calendar", domain: "calendar.google.com" },
    { name: "Google Maps", domain: "maps.google.com" },
    { name: "Google Drive", domain: "drive.google.com" },
    { name: "Google Sheets", domain: "sheets.google.com" },
    { name: "AWS", domain: "aws.amazon.com" },
    { name: "Cloudflare", domain: "cloudflare.com" },
    { name: "Vercel", domain: "vercel.com" },
    { name: "Supabase", domain: "supabase.com" },
    { name: "GitHub", domain: "github.com" },
    { name: "GitLab", domain: "gitlab.com" },
    { name: "Discord", domain: "discord.com" },
    { name: "Zendesk", domain: "zendesk.com" },
    { name: "Intercom", domain: "intercom.com" },
    { name: "Mailchimp", domain: "mailchimp.com" },
    { name: "SendGrid", domain: "sendgrid.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "LinkedIn", domain: "linkedin.com" },
    { name: "Instagram", domain: "instagram.com" },
    { name: "WhatsApp", domain: "whatsapp.com" },
    { name: "TikTok", domain: "tiktok.com" },
    { name: "YouTube", domain: "youtube.com" },
    { name: "Dropbox", domain: "dropbox.com" },
    { name: "Zoom", domain: "zoom.us" },
  ];

  return (
    <section className="border-y border-[color:var(--color-border-soft)] bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-8 sm:pt-10 pb-2">
        <p className="text-center text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[color:var(--color-muted)]">
          Plays nicely with 1,000+ tools your team already uses
        </p>
      </div>
      <div className="space-y-4 sm:space-y-6 py-6 sm:py-10">
        <Marquee items={rowA} duration={60} />
        <Marquee items={rowB} duration={75} reverse />
      </div>
    </section>
  );
}

type Brand = { name: string; domain: string };

function Marquee({ items, duration, reverse = false }: { items: Brand[]; duration: number; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex w-max gap-10 sm:gap-14 lg:gap-20 items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((b, i) => (
          <a
            key={`${b.domain}-${i}`}
            href="#"
            title={b.name}
            className="shrink-0 inline-flex items-center gap-2 opacity-90 hover:opacity-100 transition"
          >
            <img
              src={logoSrc(b.domain)}
              alt={b.name}
              loading="lazy"
              width={36}
              height={36}
              className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 object-contain block rounded-md"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = fallbackLogo(b.name);
                } else {
                  img.style.visibility = "hidden";
                }
              }}
            />
            <span className="text-sm sm:text-base font-medium text-[color:var(--color-ink)] whitespace-nowrap">
              {b.name}
            </span>
          </a>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function logoSrc(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function fallbackLogo(name: string) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#F1F5F9"/><text x="64" y="76" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#0F172A">${initials}</text></svg>`,
  )}`;
}
