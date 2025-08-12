'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, Language } from '~/helpers/i18n/config';
import { setUserLanguage } from '~/helpers/i18n';
import { useCurrentLanguage } from '~/hooks';

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = useCurrentLanguage();

  const onSwitch = (targetLang: Language) => {
    if (targetLang !== currentLang) {
      setUserLanguage(targetLang);

      const segments = pathname.split('/');
      if (SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
        segments[1] = targetLang;
      } else {
        segments.splice(1, 0, targetLang);
      }

      const newPath = segments.join('/');
      router.push(newPath);
    }
  };

  return (
    <nav aria-label="Language Switcher" className="flex items-center gap-2">
      {SUPPORTED_LANGUAGES.filter((language) => language !== currentLang).map((language) => (
        <button
          key={language}
          type="button"
          aria-label={LANGUAGE_LABELS[language].label}
          className="rounded-md border-none bg-transparent p-2 text-sm text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
          onClick={() => onSwitch(language)}
        >
          <span className="text-md" role="img" aria-hidden="true">
            {LANGUAGE_LABELS[language].flag}
          </span>
        </button>
      ))}
    </nav>
  );
}
