export type Language = 'en' | 'zh';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh'];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_LABELS: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: 'EN' },
  zh: { label: '繁體中文', flag: '中文' },
};
