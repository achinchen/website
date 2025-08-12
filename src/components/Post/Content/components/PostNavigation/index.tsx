'use client';

import type { RelatedPost } from '~/components/Post/Content/types';
import Link from '~/components/Link';
import { getTranslations } from '~/helpers/i18n';
import { Language } from '~/helpers/i18n/config';
import en from '../../../../../../public/locales/en/common.json';
import zh from '../../../../../../public/locales/zh/common.json';

const translations = {
  en,
  zh,
} satisfies Record<Language, Record<string, string>>;

interface PostNavigationProps {
  next: RelatedPost;
  previous: RelatedPost;
  lang: Language;
}

export default function PostNavigation({ next, previous, lang }: PostNavigationProps) {
  const t = getTranslations(lang, translations);

  return (
    <nav className="m-auto min-w-full flex flex-col gap-4 text-base md:flex-row md:flex-row md:justify-between">
      {previous ? (
        <div className="basis-6/12">
          <h4 className="mb-1 text-sm text-gray-500 font-normal dark:text-gray-400">{t.previous_post}</h4>
          <Link
            href={previous.path}
            className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            &larr; {previous.title}
          </Link>
        </div>
      ) : (
        <div />
      )}
      {next && (
        <div className="basis-6/12 md:text-right">
          <h4 className="mb-1 text-sm text-gray-500 font-normal dark:text-gray-400">{t.next_post}</h4>
          <Link
            href={next.path}
            className="block text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            {next.title} &rarr;
          </Link>
        </div>
      )}
    </nav>
  );
}
