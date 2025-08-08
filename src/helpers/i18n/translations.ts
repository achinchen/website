import { Language, DEFAULT_LANGUAGE } from './config';
import { getUserLanguage, translate } from './index';

// Import translation files
import en from '../../../public/locales/en/common.json';
import zh from '../../../public/locales/zh/common.json';

// Create the translations object
const translations: Record<Language, typeof en> = { en, zh };

/**
 * Get translations for a specific language with fallback to default language
 */
export function getTranslations(lang: Language): typeof en {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

/**
 * Get translations for the current user's language (client-side)
 * This function handles SSR/hydration safely by defaulting to DEFAULT_LANGUAGE on server
 */
export function getUserTranslations(): typeof en {
  let lang: Language = DEFAULT_LANGUAGE;

  if (typeof window !== 'undefined') {
    const userLang = getUserLanguage();
    if (userLang) lang = userLang;
  }

  return getTranslations(lang);
}

/**
 * Hook-like function for getting user translations with state management
 * Useful for components that need to update when language changes
 */
export function useUserTranslations(): { t: typeof en; lang: Language } {
  let lang: Language = DEFAULT_LANGUAGE;

  if (typeof window !== 'undefined') {
    const userLang = getUserLanguage();
    if (userLang) lang = userLang;
  }

  const t = getTranslations(lang);
  return { t, lang };
}

/**
 * Create a translation function for a specific language
 * Useful for server components where language is known from params
 */
export function createTranslator(lang: Language) {
  return (key: string) => translate(key, lang, translations);
}

// Export the translations object for cases where the existing pattern is needed
export { translations };
