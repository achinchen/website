'use client';

import { useEffect } from 'react';
import { useCurrentLanguage } from '~/hooks';

export default function LanguageHtmlUpdater() {
  const currentLang = useCurrentLanguage();

  useEffect(() => {
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  return null; // This component doesn't render anything
}
