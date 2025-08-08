'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { SUPPORTED_LANGUAGES, Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

export default function LanguageHtmlUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract language from pathname
    const segments = pathname.split('/');
    const langFromPath = segments[1];
    const currentLang = SUPPORTED_LANGUAGES.includes(langFromPath as Language)
      ? (langFromPath as Language)
      : DEFAULT_LANGUAGE;

    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
