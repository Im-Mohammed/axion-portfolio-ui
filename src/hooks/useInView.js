/**
 * useInView.js
 * Tracks viewport visibility for lazy mounting of heavy components.
 * 
 * mode: 'once'   — mounts when visible, stays mounted (default)
 * mode: 'toggle' — mounts when visible, UNMOUNTS when scrolled away
 *                  use for WebGL to free GPU memory
 */
import { useState, useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const ref             = useRef(null);
  const [inView, setInView] = useState(false);
  const mode            = options.mode || 'once';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (mode === 'toggle') {
        // Unmount when scrolled away — frees WebGL context
        setInView(entry.isIntersecting);
      } else {
        // Once visible, always visible
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    }, {
      rootMargin: options.rootMargin || '200px',
      threshold:  options.threshold  || 0,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}