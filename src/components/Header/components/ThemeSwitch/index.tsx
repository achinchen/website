'use client';

import { useTheme } from 'next-themes';
import { getUserLanguage } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';
const en = require('public/locales/en/common.json');
const zh = require('public/locales/zh/common.json');

const translations: Record<Language, typeof en> = { en, zh };
function getTranslations(lang: Language) {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  let lang: Language = DEFAULT_LANGUAGE;
  if (typeof window !== 'undefined') {
    const userLang = getUserLanguage();
    if (userLang) lang = userLang;
  }
  const t = getTranslations(lang);

  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      aria-label={t.toggle_theme_mode || 'Toggle Theme Mode'}
      type="button"
      className="rounded border-none bg-transparent p-2 text-1.25em text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
      onClick={toggle}
    >
      {isDark ? (
        <span className="i-mdi-white-balance-sunny" />
      ) : (
        <span className="i-mdi-moon-waning-crescent rotate--45" />
      )}
    </button>
  );
};

export default ThemeSwitch;
