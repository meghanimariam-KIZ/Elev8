"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Advances through `count` steps every `interval` ms, then (optionally)
 * navigates to `next`. Returns the index of the step currently in progress.
 */
export function useSequence(count, { interval = 900, next, delayAfter = 700 } = {}) {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (step < count) {
      const t = setTimeout(() => setStep((s) => s + 1), interval);
      return () => clearTimeout(t);
    }
    if (next) {
      const t = setTimeout(() => router.push(next), delayAfter);
      return () => clearTimeout(t);
    }
  }, [step, count, interval, next, delayAfter, router]);

  return step;
}

/** Eases a number from 0 → target over `duration` ms. */
export function useCountUp(target, duration = 3000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}
