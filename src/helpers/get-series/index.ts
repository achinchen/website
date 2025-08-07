import { allPosts, allSeries, Post, Series } from 'contentlayer/generated';

export interface SeriesWithPosts extends Omit<Series, 'type'> {
  type: 'Series';
  posts: Post[];
}

/**
 * Get all series with their associated posts
 * @param lang Language filter (en/zh)
 * @returns Array of series with their posts
 */
export function getAllSeries(lang: string = 'en'): SeriesWithPosts[] {
  const series = allSeries.filter((s) => s.lang === lang);
  
  return series.map((s) => ({
    ...s,
    posts: getPostsInSeries(s.slug, lang),
  }));
}

/**
 * Get a specific series by its slug
 * @param slug Series slug
 * @param lang Language filter (en/zh)
 * @returns Series with its posts or null if not found
 */
export function getSeriesBySlug(slug: string, lang: string = 'en'): SeriesWithPosts | null {
  const series = allSeries.find((s) => s.slug === slug && s.lang === lang);
  if (!series) return null;

  return {
    ...series,
    posts: getPostsInSeries(slug, lang),
  };
}

/**
 * Get all posts in a series, ordered by seriesOrder or date
 * @param slug Series slug
 * @param lang Language filter (en/zh)
 * @returns Array of posts in the series
 */
export function getPostsInSeries(slug: string, lang: string = 'en'): Post[] {
  const posts = allPosts.filter(
    (post) => post.seriesSlug === slug && post.lang === lang
  );

  // Sort by seriesOrder if available, otherwise by date
  return posts.sort((a, b) => {
    if (a.seriesOrder && b.seriesOrder) {
      return a.seriesOrder - b.seriesOrder;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Check if a series is completed
 * @param slug Series slug
 * @param lang Language filter (en/zh)
 * @returns boolean indicating if series is completed
 */
export function isSeriesCompleted(slug: string, lang: string = 'en'): boolean {
  const series = allSeries.find((s) => s.slug === slug && s.lang === lang);
  return series?.status === 'completed';
}

/**
 * Get the next and previous posts in a series
 * @param currentPost Current post
 * @returns Object containing next and previous posts
 */
export function getSeriesNavigation(currentPost: Post): { 
  nextPost: Post | null;
  prevPost: Post | null;
} {
  if (!currentPost.seriesSlug) {
    return { nextPost: null, prevPost: null };
  }

  const posts = getPostsInSeries(currentPost.seriesSlug, currentPost.lang);
  const currentIndex = posts.findIndex((post) => post.slug === currentPost.slug);

  return {
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}