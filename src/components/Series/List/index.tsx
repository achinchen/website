import Link from 'next/link';
import { SeriesWithPosts } from '~/helpers/get-series';
import { Language } from '~/helpers/i18n/config';
import { getPostCountText } from '~/helpers/i18n';
import { createTranslator } from '~/helpers/i18n/translations';

interface SeriesListProps {
  series: SeriesWithPosts[];
  lang: Language;
}

interface SeriesCardProps {
  series: SeriesWithPosts;
  lang: Language;
}

function SeriesCard({ series, lang }: SeriesCardProps) {
  const t = createTranslator(lang);

  return (
    <div className="group list-none transition-colors">
      <Link href={`/${lang}/posts/series/${series.slug}`} className="decoration-none">
        <article className="border border-gray-200 rounded-lg p-6 text-gray-800 transition-colors space-y-4 dark:border-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          <header className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{series.name}</h2>
            <div className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100">
              {t(series.status === 'completed' ? 'series_status_completed' : 'series_status_ongoing')}
            </div>
          </header>

          <p className="text-gray-600 dark:text-gray-300">{series.description}</p>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {getPostCountText(series.posts.length, t('series_post_count'), t('series_post_count_plural'))}
          </div>
        </article>
      </Link>
    </div>
  );
}

export default function SeriesList({ series, lang }: SeriesListProps) {
  const t = createTranslator(lang);

  if (series.length === 0) {
    return <div className="py-12 text-center text-gray-500 dark:text-gray-400">{t('no_series_available')}</div>;
  }

  return (
    <div className="grid gap-6">
      {series.map((item) => (
        <SeriesCard key={`${item.slug}-${lang}`} series={item} lang={lang} />
      ))}
    </div>
  );
}
