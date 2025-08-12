import { notFound } from 'next/navigation';
import { getSeriesBySlug } from '~/helpers/get-series';
import PostList from '~/components/Post/List';
import { getTitle } from '~/helpers/get-title';
import { Metadata } from 'next';
import { allSeries } from 'contentlayer/generated';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { createTranslator } from '~/helpers/i18n/translations';
import SeriesInfo from '~/components/Series/Info';

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

  const t = createTranslator(lang as Language);
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
  const seriesSlugs = Array.from(new Set(allSeries.map((series) => series.slug)));

  return seriesSlugs.flatMap((slug) =>
    SUPPORTED_LANGUAGES.map((lang) => ({
      lang,
      slug,
    })),
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
  const t = createTranslator(lang);

  if (!series) {
    notFound();
  }


  return (
    <div className="mx-auto my-12 max-w-4xl">
      <SeriesInfo series={series} />
      <main className="my-6">
          {series.posts.map((post, index) => (
            <div key={post.slug} className="flex md:items-center space-x-4">
                <span className="mt-5 md:mt-0 font-400 text-blue-700 dark:text-blue-300">
                  #{post.seriesOrder || index + 1}
                </span>
              <div className="flex-grow">
                <PostList posts={[post]} />
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}
