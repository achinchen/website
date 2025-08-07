import Link from 'next/link';
import { TagInfo, getTagSize } from '~/helpers/get-tags';
import { translate } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';
import { getPostCountText } from '~/helpers/i18n';
import type { Translations } from '../../../../src/helpers/i18n/types';

const translations = {
  en: require('../../../../public/locales/en/common.json'),
  zh: require('../../../../public/locales/zh/common.json'),
} as Record<Language, Translations>;

interface TagsListProps {
  tags: TagInfo[];
  lang: Language;
}

interface TagItemProps {
  tag: TagInfo;
  lang: Language;
  maxCount: number;
  minCount: number;
}

function TagItem({ tag, lang, maxCount, minCount }: TagItemProps) {
  const t = (key: string) => translate(key, lang || DEFAULT_LANGUAGE, translations);

  return (
    <Link
      href={`/${lang}/posts/tags/${tag.slug}`}
      className={`${getTagSize(tag.count, maxCount, minCount)} px-4 py-2 rounded text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors decoration-none`}
    >
      {tag.name}
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
        {getPostCountText(tag.count, t('tags_post_count'), t('tags_post_count_plural'))}
      </span>
    </Link>
  );
}

export default function TagsList({ tags, lang }: TagsListProps) {
  const t = (key: string) => translate(key, lang || DEFAULT_LANGUAGE, translations);

  if (tags.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        {t('no_tags_available')}
      </div>
    );
  }

  const maxCount = Math.max(...tags.map((tag) => tag.count));
  const minCount = Math.min(...tags.map((tag) => tag.count));

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {tags.map((tag) => (
        <TagItem
          key={`${tag.slug}-${lang}`}
          tag={tag}
          lang={lang}
          maxCount={maxCount}
          minCount={minCount}
        />
      ))}
    </div>
  );
}