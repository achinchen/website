import {
  getAllSeries,
  getSeriesBySlug,
  getPostsInSeries,
  isSeriesCompleted,
  getSeriesNavigation,
} from './index';

// Test constants
const LANGUAGES = {
  ENGLISH: 'en',
  CHINESE: 'zh',
  UNSUPPORTED: 'fr',
} as const;

const SERIES_DATA = {
  SLUG: 'test-series',
  NON_EXISTENT_SLUG: 'non-existent-series',
  ENGLISH: {
    name: 'Test Series',
    title: 'Getting Started',
    status: 'ongoing',
    postCount: 2,
  },
  CHINESE: {
    name: '測試系列',
    title: '開始使用',
    status: 'completed',
    postCount: 1,
  },
} as const;

const POST_DATA = {
  FIRST_POST_SLUG: 'test-post-1',
  SECOND_POST_SLUG: 'test-post-2',
  NON_SERIES_POST: 'non-series-post',
} as const;

const TEST_CASES = {
  LANGUAGES: [
    { 
      lang: LANGUAGES.ENGLISH, 
      expectedSeriesCount: 1,
      expectedSeriesName: SERIES_DATA.ENGLISH.name,
      expectedPostCount: SERIES_DATA.ENGLISH.postCount,
    },
    { 
      lang: LANGUAGES.CHINESE, 
      expectedSeriesCount: 1,
      expectedSeriesName: SERIES_DATA.CHINESE.name,
      expectedPostCount: SERIES_DATA.CHINESE.postCount,
    },
  ],
  SERIES_STATUS: [
    { lang: LANGUAGES.ENGLISH, slug: SERIES_DATA.SLUG, expectedCompleted: false },
    { lang: LANGUAGES.CHINESE, slug: SERIES_DATA.SLUG, expectedCompleted: true },
  ],
  SLUG_TESTS: [
    { slug: SERIES_DATA.SLUG, lang: LANGUAGES.ENGLISH, shouldExist: true },
    { slug: SERIES_DATA.NON_EXISTENT_SLUG, lang: LANGUAGES.ENGLISH, shouldExist: false },
  ],
} as const;

describe('Series Helpers', () => {
  describe('getAllSeries', () => {
    test.each(TEST_CASES.LANGUAGES)(
      'should return all series for $lang language',
      ({ lang, expectedSeriesCount, expectedSeriesName, expectedPostCount }) => {
        const series = getAllSeries(lang);
        
        expect(series).toHaveLength(expectedSeriesCount);
        expect(series[0].name).toBe(expectedSeriesName);
        expect(series[0].posts).toHaveLength(expectedPostCount);
        expect(series[0].type).toBe('Series');
        
        // Verify all posts belong to the series
        series[0].posts.forEach(post => {
          expect(post.seriesSlug).toBe(SERIES_DATA.SLUG);
          expect(post.lang).toBe(lang);
        });
      }
    );

    it('should default to English when no language is provided', () => {
      const defaultSeries = getAllSeries();
      const englishSeries = getAllSeries(LANGUAGES.ENGLISH);
      
      expect(defaultSeries).toEqual(englishSeries);
    });

    it('should return empty array for unsupported language', () => {
      const series = getAllSeries(LANGUAGES.UNSUPPORTED);
      expect(series).toHaveLength(0);
    });
  });

  describe('getSeriesBySlug', () => {
    test.each(TEST_CASES.SLUG_TESTS)(
      'should handle slug "$slug" in $lang (exists: $shouldExist)',
      ({ slug, lang, shouldExist }) => {
        const series = getSeriesBySlug(slug, lang);
        
        if (shouldExist) {
          expect(series).toBeTruthy();
          expect(series?.slug).toBe(slug);
          expect(series?.posts).toBeDefined();
          expect(series?.type).toBe('Series');
        } else {
          expect(series).toBeNull();
        }
      }
    );

    it('should return series with correct posts', () => {
      const series = getSeriesBySlug(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      
      expect(series).toBeTruthy();
      expect(series?.name).toBe(SERIES_DATA.ENGLISH.name);
      expect(series?.posts).toHaveLength(SERIES_DATA.ENGLISH.postCount);
      expect(series?.posts[0].seriesOrder).toBe(1);
      expect(series?.posts[1].seriesOrder).toBe(2);
    });

    it('should default to English when no language is provided', () => {
      const defaultSeries = getSeriesBySlug(SERIES_DATA.SLUG);
      const englishSeries = getSeriesBySlug(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      
      expect(defaultSeries).toEqual(englishSeries);
    });
  });

  describe('getPostsInSeries', () => {
    test.each(TEST_CASES.LANGUAGES)(
      'should return posts in series for $lang language',
      ({ lang, expectedPostCount }) => {
        const posts = getPostsInSeries(SERIES_DATA.SLUG, lang);
        
        expect(posts).toHaveLength(expectedPostCount);
        posts.forEach(post => {
          expect(post.seriesSlug).toBe(SERIES_DATA.SLUG);
          expect(post.lang).toBe(lang);
        });
      }
    );

    it('should sort posts by seriesOrder', () => {
      const posts = getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      
      expect(posts).toHaveLength(2);
      expect(posts[0].seriesOrder).toBe(1);
      expect(posts[1].seriesOrder).toBe(2);
      expect(posts[0].slug).toBe(POST_DATA.FIRST_POST_SLUG);
      expect(posts[1].slug).toBe(POST_DATA.SECOND_POST_SLUG);
    });

    it('should return empty array for non-existent series', () => {
      const posts = getPostsInSeries(SERIES_DATA.NON_EXISTENT_SLUG, LANGUAGES.ENGLISH);
      expect(posts).toHaveLength(0);
    });

    it('should default to English when no language is provided', () => {
      const defaultPosts = getPostsInSeries(SERIES_DATA.SLUG);
      const englishPosts = getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      
      expect(defaultPosts).toEqual(englishPosts);
    });
  });

  describe('isSeriesCompleted', () => {
    test.each(TEST_CASES.SERIES_STATUS)(
      'should return $expectedCompleted for $lang series',
      ({ lang, slug, expectedCompleted }) => {
        const isCompleted = isSeriesCompleted(slug, lang);
        expect(isCompleted).toBe(expectedCompleted);
      }
    );

    it('should return false for non-existent series', () => {
      const isCompleted = isSeriesCompleted(SERIES_DATA.NON_EXISTENT_SLUG, LANGUAGES.ENGLISH);
      expect(isCompleted).toBe(false);
    });

    it('should default to English when no language is provided', () => {
      const defaultCompleted = isSeriesCompleted(SERIES_DATA.SLUG);
      const englishCompleted = isSeriesCompleted(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      
      expect(defaultCompleted).toBe(englishCompleted);
    });
  });

  describe('getSeriesNavigation', () => {
    it('should return next and previous posts for series posts', () => {
      const posts = getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      const firstPost = posts[0];
      const secondPost = posts[1];
      
      // Test navigation for first post
      const firstPostNav = getSeriesNavigation(firstPost);
      expect(firstPostNav.prevPost).toBeNull();
      expect(firstPostNav.nextPost?.slug).toBe(POST_DATA.SECOND_POST_SLUG);
      
      // Test navigation for second post
      const secondPostNav = getSeriesNavigation(secondPost);
      expect(secondPostNav.prevPost?.slug).toBe(POST_DATA.FIRST_POST_SLUG);
      expect(secondPostNav.nextPost).toBeNull();
    });

    it('should return null navigation for posts not in a series', () => {
      const postWithoutSeries = { 
        ...getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.ENGLISH)[0],
        seriesSlug: undefined 
      };
      
      const navigation = getSeriesNavigation(postWithoutSeries);
      expect(navigation.prevPost).toBeNull();
      expect(navigation.nextPost).toBeNull();
    });

    it('should handle single post series', () => {
      const posts = getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.CHINESE);
      const singlePost = posts[0];
      
      const navigation = getSeriesNavigation(singlePost);
      expect(navigation.prevPost).toBeNull();
      expect(navigation.nextPost).toBeNull();
    });

    it('should handle non-existent post in series', () => {
      const posts = getPostsInSeries(SERIES_DATA.SLUG, LANGUAGES.ENGLISH);
      const fakePost = { 
        ...posts[0], 
        slug: 'non-existent-post' 
      };
      
      const navigation = getSeriesNavigation(fakePost);
      // When post is not found, findIndex returns -1
      // currentIndex > 0 is false, so prevPost is null
      // currentIndex < posts.length - 1 is true (-1 < 1), so nextPost is posts[0]
      expect(navigation.prevPost).toBeNull();
      expect(navigation.nextPost).toBe(posts[0]);
    });
  });
});
