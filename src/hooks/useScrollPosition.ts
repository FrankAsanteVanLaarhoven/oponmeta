import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);

    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollPosition = window.pageYOffset;
      
      if (currentScrollPosition > prevScrollPosition) {
        setScrollDirection('down');
      } else if (currentScrollPosition < prevScrollPosition) {
        setScrollDirection('up');
      }
      
      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [prevScrollPosition]);

  return scrollDirection;
}
