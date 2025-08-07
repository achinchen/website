import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { getSeriesBySlug, getSeriesNavigation } from '~/helpers/get-series';
import { translate } from '~/helpers/i18n';
import { Language } from '~/helpers/i18n/config';
import en from '../../../../../../public/locales/en/common.json';
import zh from '../../../../../../public/locales/zh/common.json';

const translations: Record<Language, typeof en> = { en, zh };

interface SeriesInfoProps {
  post: Post;
}

export default function SeriesInfo({ post }: SeriesInfoProps) {
  if (!post.seriesSlug) return null;

  const series = getSeriesBySlug(post.seriesSlug, post.lang);
  if (!series) return null;

  const t = (key: string) => translate(key, post.lang as Language, translations);
  const { nextPost, prevPost } = getSeriesNavigation(post);
  const currentIndex = series.posts.findIndex(p => p.slug === post.slug);
  const totalPosts = series.posts.length;

  return (
    <div className="my-8 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Series Header */}
      <div className="mb-4">
        <Link 
          href={`/${post.lang}/posts/series/${series.slug}`}
          className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors decoration-none"
        >
          {series.name}
        </Link>
        <div className="mt-2 flex items-center gap-4">
          <div className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            {t(series.status === 'completed' ? 'series_status_completed' : 'series_status_ongoing')}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Part {currentIndex + 1} of {totalPosts}
          </div>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {series.description}
        </p>
      </div>

      {/* Series Navigation */}
      <div className="flex flex-col sm:flex-row gap-4">
        {prevPost && (
          <Link
            href={`/${post.lang}/posts/${prevPost.slug}`}
            className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors decoration-none"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t('series_navigation_previous')}
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {prevPost.title}
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/${post.lang}/posts/${nextPost.slug}`}
            className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors decoration-none"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {t('series_navigation_next')}
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {nextPost.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}