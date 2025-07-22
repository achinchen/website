'use client';

import { useRef, useEffect } from 'react';

type setActiveId = (id: string) => void;

export default function useHeading(setActiveId: setActiveId) {
  const headingRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;

        return map;
      }, headingRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingRef.current).forEach((key) => {
        const headingElement = headingRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) => headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id),
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -70% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('article h2,h3'));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
}
