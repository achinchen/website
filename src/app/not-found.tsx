'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserTranslations } from '~/helpers/i18n/translations';
import { getUserLanguage } from '~/helpers/i18n';
import { DEFAULT_LANGUAGE, Language } from '~/helpers/i18n/config';

export default function NotFound() {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(getUserLanguage());
    setMounted(true);
  }, []);

  const t = getUserTranslations();
  const homeUrl = `/${lang}`;

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <main className="mx-8 h-75vh flex flex-col items-center justify-center">
        <h1 className="mb-4 mt-12 tracking-wide">404</h1>
        <Link href={`/${DEFAULT_LANGUAGE}`}>{t.back_to_home}</Link>
      </main>
    );
  }

  return (
    <main className="mx-8 h-75vh flex flex-col items-center justify-center">
      <h1 className="mb-4 mt-12 tracking-wide">404</h1>
      <Link href={homeUrl}>{t.back_to_home}</Link>
    </main>
  );
}
