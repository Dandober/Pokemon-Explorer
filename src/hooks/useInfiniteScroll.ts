import { useEffect, useRef } from 'react';

// Calls `onIntersect` when the returned ref's element scrolls into view.
// Used to load the next page of pokemon once the user reaches the bottom
// of the grid/list.

export function useInfiniteScroll(onIntersect: () => void, enabled: boolean, watch?: unknown) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { rootMargin: '400px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled, watch]);

  return targetRef;
}
