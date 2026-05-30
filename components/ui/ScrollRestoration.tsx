'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create a unique key using the path + all active search params (e.g. ?filter=web)
    const queryStr = searchParams.toString();
    const key = `scroll:${pathname}${queryStr ? '?' + queryStr : ''}`;

    const savedPos = sessionStorage.getItem(key);
    if (savedPos) {
      // Provide a tiny delay to ensure Next.js has mounted and rendered all elements
      const timer = setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPos, 10),
          behavior: 'instant' as ScrollBehavior
        });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // For completely new page navigations with no stored coordinates, reset scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const queryStr = searchParams.toString();
      const key = `scroll:${pathname}${queryStr ? '?' + queryStr : ''}`;
      sessionStorage.setItem(key, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, searchParams]);

  return null;
}
