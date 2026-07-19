import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 rounded-full bg-red-600 p-3 text-lg text-white shadow-lg transition hover:bg-red-700 hover:-translate-y-0.5"
    >
      ↑
    </button>
  );
}
