
import { useEffect, useRef } from 'react';

type RevealOnScrollProps = {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
};

const RevealOnScroll = ({ children, threshold = 0.1, delay = 0 }: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, delay);
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold, // Trigger when percentage of the element is visible
      }
    );

    const current = ref.current;

    if (current) {
      scrollObserver.observe(current);
    }

    return () => {
      if (current) {
        scrollObserver.unobserve(current);
      }
    };
  }, [threshold, delay]);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};

export default RevealOnScroll;
