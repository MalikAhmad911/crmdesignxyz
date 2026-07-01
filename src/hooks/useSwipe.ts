import { useRef, useCallback } from "react";

type Dir = "left" | "right" | "up" | "down";
interface SwipeMeta { startX: number; startY: number; dx: number; dy: number; dt: number; }

interface Options {
  onSwipe?: (dir: Dir, meta: SwipeMeta) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Minimum horizontal distance in px to count as a swipe. */
  threshold?: number;
  /** Max off-axis drift in px before we treat it as a scroll instead. */
  maxOffAxis?: number;
  /** Max duration in ms for a valid swipe. */
  maxDurationMs?: number;
  /** If set, the touch must start within this many px of the given edge. */
  edge?: "left" | "right";
  edgeSize?: number;
}

/**
 * Lightweight, reliable pointer-based swipe detection tuned for mobile
 * slide-over panels. Uses pointer events so it works for touch, pen and
 * mouse without a second listener path, and cancels itself when the user
 * is clearly scrolling vertically.
 */
export function useSwipe(opts: Options) {
  const {
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    threshold = 55,
    maxOffAxis = 45,
    maxDurationMs = 700,
    edge,
    edgeSize = 32,
  } = opts;

  const state = useRef<{
    x: number;
    y: number;
    t: number;
    active: boolean;
    id: number;
  } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return; // touch/pen only
    if (edge === "left" && e.clientX > edgeSize) return;
    if (edge === "right" && window.innerWidth - e.clientX > edgeSize) return;
    state.current = {
      x: e.clientX,
      y: e.clientY,
      t: performance.now(),
      active: true,
      id: e.pointerId,
    };
  }, [edge, edgeSize]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = state.current;
    if (!s || !s.active || s.id !== e.pointerId) return;
    const dy = Math.abs(e.clientY - s.y);
    // Bail if the gesture is clearly a vertical scroll.
    if (dy > maxOffAxis && Math.abs(e.clientX - s.x) < dy) {
      s.active = false;
    }
  }, [maxOffAxis]);

  const finish = useCallback((e: React.PointerEvent) => {
    const s = state.current;
    state.current = null;
    if (!s || !s.active) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    const dt = performance.now() - s.t;
    if (dt > maxDurationMs) return;
    if (Math.abs(dy) > maxOffAxis) return;
    if (Math.abs(dx) < threshold) return;
    const dir: Dir = dx > 0 ? "right" : "left";
    onSwipe?.(dir, { startX: s.x, startY: s.y, dx, dy, dt });
    if (dir === "right") onSwipeRight?.();
    else onSwipeLeft?.();
  }, [maxDurationMs, maxOffAxis, threshold, onSwipe, onSwipeLeft, onSwipeRight]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: () => { state.current = null; },
    // Prevent the browser back-swipe from stealing horizontal gestures on the pane.
    style: { touchAction: "pan-y" as const },
  };
}
