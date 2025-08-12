'use client';

import { usePathname } from 'next/navigation';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from '~/helpers/i18n/config';

/**
 * Hook to get the current language from the URL pathname
 * @returns The current language extracted from the URL path
 */
export function useCurrentLanguage(): Language {
  const pathname = usePathname();
  
  // Extract current language from URL path
  const segments = pathname.split('/');
  const langFromPath = segments[1];
  
  return SUPPORTED_LANGUAGES.includes(langFromPath as Language) 
    ? (langFromPath as Language) 
    : DEFAULT_LANGUAGE;
}

/**
 * Hook to get a language-aware home URL
 * @returns The home URL with the current language prefix
 */
export function useLanguageAwareHomeUrl(): string {
  const currentLang = useCurrentLanguage();
  return `/${currentLang}`;
}
