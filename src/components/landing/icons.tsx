import type { SVGProps } from "react";

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" {...p}>
    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Search = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);

export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" {...p}>
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" {...p}>
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" {...p}>
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" {...p}>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const LinkedIn = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H18.6v-5.45c0-1.3-.02-2.97-1.8-2.97-1.82 0-2.1 1.42-2.1 2.88V21H10z" />
  </svg>
);

export const YouTube = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...p}>
    <path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6A3 3 0 001 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 002.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 002.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.75 15.5v-7L15.5 12l-5.75 3.5z" />
  </svg>
);

export const XSocial = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...p}>
    <path d="M18.244 2H21l-6.52 7.45L22 22h-6.94l-4.55-6.18L5.3 22H2.54l6.98-7.98L2 2h7.1l4.1 5.62L18.24 2zm-1.22 18h1.55L7.04 4H5.4l11.62 16z" />
  </svg>
);

export const Slack = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...p}>
    <path d="M6 15a2 2 0 11-2-2h2v2zm1 0a2 2 0 014 0v5a2 2 0 11-4 0v-5zm2-9a2 2 0 11-2-2v2H7zm0 1a2 2 0 010 4H4a2 2 0 010-4h5zm9 2a2 2 0 112 2h-2V9zm-1 0a2 2 0 11-4 0V4a2 2 0 114 0v5zm-2 9a2 2 0 112 2v-2h-2zm0-1a2 2 0 010-4h5a2 2 0 010 4h-5z"/>
  </svg>
);

// Integration wordmarks — plain text marks (CSP-safe, no external assets)
export const integrationMarks = ["Twilio", "Stripe", "QuickBooks", "Google", "RingCentral"] as const;

export const Blob = ({ color, className }: { color: string; className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden>
    <path
      fill={color}
      d="M44.8,-58.5C57.3,-49.2,65.7,-33.9,69.4,-17.7C73.1,-1.5,72.2,15.6,64.7,28.7C57.2,41.8,43.2,50.9,28.4,57.4C13.6,63.8,-2.1,67.6,-17.7,64.7C-33.2,61.8,-48.7,52.2,-58.5,38.3C-68.3,24.5,-72.5,6.4,-69.6,-10C-66.8,-26.4,-57,-41.1,-43.8,-50.4C-30.6,-59.7,-14,-63.6,1.5,-65.6C17,-67.6,34,-67.7,44.8,-58.5Z"
      transform="translate(100 100)"
    />
  </svg>
);
