import { useState, useEffect } from 'react';

const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [ref]);

  return isVisible;
};

export default useIsVisible;
