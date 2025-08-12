'use client';

import Link from '~/components/Link';
import ThemeSwitch from './components/ThemeSwitch';
import LanguageSwitch from './components/LanguageSwitch';
import { SITE } from '~/configs';
import { TITLE } from './constants';
import { useLanguageAwareHomeUrl } from '~/hooks';

export default function Header() {
  const homeUrl = useLanguageAwareHomeUrl();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-900/10 border-b-solid bg-white/70 py-3 backdrop-blur transition-colors dark:border-slate-50/[0.06] dark:bg-gray-900/60">
      <div className="mx-auto max-w-full flex items-baseline justify-between px-4 lg:max-w-7xl md:max-w-3xl sm:px-6">
        <Link
          href={homeUrl}
          aria-label={SITE.author}
          className="h-6 flex items-center justify-between text-2xl font-semibold decoration-none sm:block"
        >
          {TITLE}
        </Link>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
