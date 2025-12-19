import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 300;
        if (nextVisible !== visibleRef.current) {
          visibleRef.current = nextVisible;
          setIsVisible(nextVisible);
        }
        tickingRef.current = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-600 text-white rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-[1.06] transition duration-300 z-50 flex items-center justify-center will-change-transform motion-reduce:hover:scale-100 motion-reduce:transition-none"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
