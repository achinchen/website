import { getTitle } from '~/helpers/get-title';
import { Metadata } from 'next';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { notFound } from 'next/navigation';
import { getAllTags } from '~/helpers/get-tags';
import TagsList from '~/components/Tags/List';
import { createTranslator } from '~/helpers/i18n/translations';

interface TagsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: TagsPageProps): Promise<Metadata> {
  const { lang: paramLang } = await params;
  const t = createTranslator(paramLang as Language);
  const title = getTitle(t('meta_tags_title'));

  return {
    title,
    description: t('meta_tags_list_description'),
    openGraph: {
      title,
      description: t('meta_tags_list_description'),
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
  }));
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { lang: paramLang } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }

  const lang = paramLang as Language;
  const t = createTranslator(lang);
  const tags = getAllTags(lang);

  return (
    <div className="mx-auto my-12 max-w-5xl">
      <div className="my-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">{t('tags')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{t('tags_browse_by_topic')}</p>
      </div>
      <TagsList tags={tags} lang={lang} />
    </div>
  );
}
