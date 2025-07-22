import Link from 'next/link';
import { getUserLanguage } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';
import en from '../../public/locales/en/common.json';
import zh from '../../public/locales/zh/common.json';

const translations: Record<Language, typeof en> = { en, zh };
function getTranslations(lang: Language) {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

export default function NotFound() {
  let lang: Language = DEFAULT_LANGUAGE;
  if (typeof window !== 'undefined') {
    const userLang = getUserLanguage();
    if (userLang) lang = userLang;
  }
  const t = getTranslations(lang);
  return (
    <main className="mx-8 h-75vh flex flex-col">
      <h1 className="mb-4 mt-12 tracking-wide">404</h1>
      <Link href="/">{t.back_to_home}</Link>
    </main>
  );
}
