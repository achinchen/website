import Link from 'next/link';
import { TagInfo, getTagSize } from '~/helpers/get-tags';
import { Language } from '~/helpers/i18n/config';
import { getPostCountText } from '~/helpers/i18n';
import { createTranslator } from '~/helpers/i18n/translations';

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
  const t = createTranslator(lang);

  return (
    <Link
      href={`/${lang}/posts/tags/${tag.slug}`}
      className={`${getTagSize(tag.count, maxCount, minCount)} rounded px-4 py-2 text-gray-800 decoration-none transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800`}
    >
      {tag.name}
      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
        {getPostCountText(tag.count, t('tags_post_count'), t('tags_post_count_plural'))}
      </span>
    </Link>
  );
}

export default function TagsList({ tags, lang }: TagsListProps) {
  const t = createTranslator(lang);

  if (tags.length === 0) {
    return <div className="py-12 text-center text-gray-500 dark:text-gray-400">{t('no_tags_available')}</div>;
  }

  const maxCount = Math.max(...tags.map((tag) => tag.count));
  const minCount = Math.min(...tags.map((tag) => tag.count));

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tags.map((tag) => (
        <TagItem key={`${tag.slug}-${lang}`} tag={tag} lang={lang} maxCount={maxCount} minCount={minCount} />
      ))}
    </div>
  );
}
