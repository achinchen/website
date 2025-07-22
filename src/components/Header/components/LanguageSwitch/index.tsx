"use client";

import { usePathname, useRouter } from 'next/navigation';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, Language, DEFAULT_LANGUAGE } from "~/helpers/i18n/config";
import { setUserLanguage } from "~/helpers/i18n";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Extract current language from URL path
  const getCurrentLang = (): Language => {
    const segments = pathname.split('/');
    const langFromPath = segments[1];
    return SUPPORTED_LANGUAGES.includes(langFromPath as Language) 
      ? langFromPath as Language 
      : DEFAULT_LANGUAGE;
  };

  const currentLang = getCurrentLang();

  const onSwitch = (targetLang: Language) => {
    if (targetLang !== currentLang) {
      // Store user preference
      setUserLanguage(targetLang);
      
      // Navigate to the same page in the target language
      const segments = pathname.split('/');
      if (SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
        // Replace current language with target language
        segments[1] = targetLang;
      } else {
        // Add language prefix if not present
        segments.splice(1, 0, targetLang);
      }
      
      const newPath = segments.join('/');
      router.push(newPath);
    }
  };

  return (
    <nav aria-label="Language Switcher" className="flex gap-2 items-center">
      {SUPPORTED_LANGUAGES.filter((language) => language !== currentLang).map((language) => (
        <button
          key={language}
          type="button"
          aria-label={LANGUAGE_LABELS[language].label}
          className="px-2 py-1 rounded-md border transition-colors focus:outline-none border-gray-300 bg-white dark:bg-gray-800 hover:border-blue-400"
          onClick={() => onSwitch(language)}
        >
          <span className="text-xl" role="img" aria-hidden="true">
            {LANGUAGE_LABELS[language].flag}
          </span>
        </button>
      ))}
    </nav>
  );
} 