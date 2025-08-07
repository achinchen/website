import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from './config';

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined' || !navigator.language) return DEFAULT_LANGUAGE;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('en')) return 'en';
  return DEFAULT_LANGUAGE;
}

export function getUserLanguage(cookies?: string): Language {
  // If cookies string is provided (server-side or testing), parse it
  if (cookies) {
    const langCookie = getCookieFromString('lang', cookies);
    if (langCookie && SUPPORTED_LANGUAGES.includes(langCookie as Language)) {
      return langCookie as Language;
    }
    return DEFAULT_LANGUAGE;
  }
  
  // Server-side without cookies parameter
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // Client-side: check localStorage first, then cookies
  const stored = localStorage.getItem('lang') || getCookie('lang');
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  return getBrowserLanguage();
}

export function setUserLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lang', lang);
  setCookie('lang', lang, 365);
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, null as string | null);
}

function getCookieFromString(name: string, cookieString: string): string | null {
  return cookieString.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, null as string | null);
}


export function translate(key: string, lang: Language, translations: Record<Language, Record<string, any>>): string {
  const requestedTranslation = translations[lang]?.[key];
  if (requestedTranslation) return requestedTranslation;
  
  if (lang !== DEFAULT_LANGUAGE) {
    const defaultTranslation = translations[DEFAULT_LANGUAGE]?.[key];
    if (defaultTranslation) return defaultTranslation;
  }
  
  return key;
}

export function getTranslations(lang: Language, translations: Record<Language, Record<string, any>>): Record<string, any> {
  const requested = translations[lang] || {};
  const fallback = translations[DEFAULT_LANGUAGE] || {};
  return { ...fallback, ...requested };
} 


export function getPostCountText(count: number, singular: string, plural: string): string {
  if (count === 1) {
    return singular;
  }
  return plural.replace('{{count}}', String(count));
}