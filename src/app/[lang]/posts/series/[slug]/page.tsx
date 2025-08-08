import { notFound } from 'next/navigation';
import { getSeriesBySlug } from '~/helpers/get-series';
import PostList from '~/components/Post/List';
import { getTitle } from '~/helpers/get-title';
import { Metadata } from 'next';
import { allSeries } from 'contentlayer/generated';
import { translate, getPostCountText } from '~/helpers/i18n';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import en from '../../../../../../public/locales/en/common.json';
import zh from '../../../../../../public/locales/zh/common.json';

const translations: Record<Language, typeof en> = { en, zh };

interface SeriesPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const series = getSeriesBySlug(slug, lang);

  if (!series) {
    return {};
  }

  const t = (key: string) => translate(key, lang as Language, translations);
  const title = getTitle(t('meta_series_title').replace('{{name}}', series.name));
  
  return {
    title,
    description: series.description,
    openGraph: {
      title,
      description: series.description,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const seriesSlugs = Array.from(new Set(allSeries.map(series => series.slug)));

  return seriesSlugs.flatMap(slug => 
    SUPPORTED_LANGUAGES.map(lang => ({
      lang,
      slug,
    }))
  );
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { lang: paramLang, slug } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }

  const lang = paramLang as Language;
  const series = getSeriesBySlug(slug, lang);
  const t = (key: string) => translate(key, lang, translations);

  if (!series) {
    notFound();
  }

  const postCount = series.posts.length;

  return (
    <div className="my-12 max-w-4xl mx-auto">
      <div className="my-6 text-center">
        <h1 className="text-3xl font-bold">{series.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {series.description}
        </p>
        <div className="mt-2 flex items-center gap-4 justify-center">
          <div className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {t(series.status === 'completed' ? 'series_status_completed' : 'series_status_ongoing')}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getPostCountText(postCount, t('series_post_count'), t('series_post_count_plural'))}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          {series.posts.map((post, index) => (
            <div key={post.slug} className="relative">
              <div className="relative flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {post.seriesOrder || index + 1}
                  </span>
                </div>
                <div className="flex-grow">
                  <PostList posts={[post]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}