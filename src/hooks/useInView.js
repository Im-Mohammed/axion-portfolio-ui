/**
 * useInView.js
 * Returns true once an element has entered the viewport.
 * Once true, stays true — component stays mounted forever after.
 * Uses IntersectionObserver — no scroll listeners, zero performance cost.
 */
import { useState, useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const ref             = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // stop observing — never unmount again
      }
    }, {
      rootMargin: options.rootMargin || '200px', // start loading 200px before visible
      threshold:  options.threshold  || 0,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}