import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from './config';

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined' || !navigator.language) return DEFAULT_LANGUAGE;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('en')) return 'en';
  return DEFAULT_LANGUAGE;
}

export function getUserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem('lang') || getCookie('lang');
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  return DEFAULT_LANGUAGE;
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
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, null as string | null);
}

export function translate(key: string, lang: Language, translations: Record<string, string>): string {
  return translations[key] || key;
} 