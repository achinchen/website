import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { getSeriesBySlug, getSeriesNavigation } from '~/helpers/get-series';
import { createTranslator } from '~/helpers/i18n/translations';
import { Language } from '~/helpers/i18n/config';

interface SeriesNavigationProps {
  post: Post;
}

export default function SeriesNavigation({ post }: SeriesNavigationProps) {
  if (!post.seriesSlug) return null;

  const series = getSeriesBySlug(post.seriesSlug, post.lang);
  if (!series) return null;

  const t = createTranslator(post.lang as Language);
  const { nextPost, prevPost } = getSeriesNavigation(post);
  const currentIndex = series.posts.findIndex(p => p.slug === post.slug);
  const totalPosts = series.posts.length;

  return (
    <div className="m-auto min-w-80vw md:max-w-3xl">
      <div className="mb-4">
        <Link 
          href={`/${post.lang}/posts/series/${series.slug}`}
          className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200 mb-3 mr-2 transition-colors decoration-none hover:underline"
        >
          {t('series')}: {series.name}
        </Link>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          ({currentIndex + 1}/{totalPosts})
        </span>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {series.description}
        </p>
      </div>

      <nav className="flex gap-4 flex-col md:flex-row md:flex-row md:justify-between">
        {prevPost && (
          <div className="basis-6/12">
            <h4 className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-1">
              {t('series_navigation_previous')}
            </h4>
            <Link
              href={`/${post.lang}/posts/${prevPost.slug}`}
              className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"          >
              &larr; {prevPost.title}
            </Link>
          </div>
        )}
        {nextPost && (
          <div className={`basis-6/12 ${prevPost ? 'md:text-right' : ''}`}>
            <h4 className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-1">
              {t('series_navigation_next')}
            </h4>
             <Link
                href={`/${post.lang}/posts/${nextPost.slug}`}
                className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                >
              {nextPost.title} &rarr;
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}