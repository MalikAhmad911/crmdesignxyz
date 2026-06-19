/**
 * Flat single-color hero background. No gradients, no glass, no blobs.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ background: "var(--color-bg)" }}
    />
  );
}
