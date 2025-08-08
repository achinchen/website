import { getTitle } from '~/helpers/get-title';
import { Metadata } from 'next';
import { translate } from '~/helpers/i18n';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { notFound } from 'next/navigation';
import { getAllTags } from '~/helpers/get-tags';
import TagsList from '~/components/Tags/List';
import en from '../../../../public/locales/en/common.json';
import zh from '../../../../public/locales/zh/common.json';

const translations: Record<Language, typeof en> = { en, zh };

interface TagsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: TagsPageProps): Promise<Metadata> {
  const { lang: paramLang } = await params;
  const t = (key: string) => translate(key, paramLang as Language, translations);
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
  const t = (key: string) => translate(key, lang, translations);
  const tags = getAllTags(lang);

  return (
    <div className="my-12 max-w-5xl mx-auto">
      <div className="my-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{t('tags')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t('tags_browse_by_topic')}
        </p>
      </div>
      <TagsList tags={tags} lang={lang} />
    </div>
  );
}