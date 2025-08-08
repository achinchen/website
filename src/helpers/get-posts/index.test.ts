import { getPosts, getPostBySlug, getPostBySlugAndLang } from './index';
import { DEFAULT_LANGUAGE, Language } from '../i18n/config';

// Test constants
const LANGUAGES = {
  ENGLISH: 'en',
  CHINESE: 'zh',
  UNSUPPORTED: 'fr',
} as const;

const EXPECTED_COUNTS = {
  TOTAL_POSTS: 3,
  ENGLISH_POSTS: 2,
  CHINESE_POSTS: 1,
} as const;

const TEST_DATA = {
  EXISTING_SLUG: 'test-post-1',
  NON_EXISTENT_SLUG: 'non-existent',
  CHINESE_TITLE: '測試文章 1',
} as const;

const TEST_CASES = {
  LANGUAGES: [
    { lang: LANGUAGES.ENGLISH, expectedCount: EXPECTED_COUNTS.ENGLISH_POSTS },
    { lang: LANGUAGES.CHINESE, expectedCount: EXPECTED_COUNTS.CHINESE_POSTS },
  ],
  SLUG_TESTS: [
    { slug: TEST_DATA.EXISTING_SLUG, shouldExist: true },
    { slug: TEST_DATA.NON_EXISTENT_SLUG, shouldExist: false },
  ],
  FALLBACK_LANGUAGES: [
    {
      slug: TEST_DATA.EXISTING_SLUG,
      requestedLang: LANGUAGES.CHINESE,
      expectedLang: LANGUAGES.CHINESE,
      expectedTitle: TEST_DATA.CHINESE_TITLE,
    },
    {
      slug: TEST_DATA.EXISTING_SLUG,
      requestedLang: LANGUAGES.UNSUPPORTED,
      expectedLang: DEFAULT_LANGUAGE,
      shouldFallback: true,
    },
  ],
} as const;

describe('get-posts utilities', () => {
  describe('getPosts', () => {
    it('should return all posts when no language specified', () => {
      const posts = getPosts();
      expect(posts).toHaveLength(EXPECTED_COUNTS.ENGLISH_POSTS); // defaults to English
    });

    test.each(TEST_CASES.LANGUAGES)('should return posts filtered by language: $lang', ({ lang, expectedCount }) => {
      const posts = getPosts(lang as Language);
      expect(posts).toHaveLength(expectedCount);
      posts.forEach((post) => {
        expect(post.lang).toBe(lang);
      });
    });

    it('should sort posts by date (newest first)', () => {
      const posts = getPosts(LANGUAGES.ENGLISH);
      expect(posts).toHaveLength(EXPECTED_COUNTS.ENGLISH_POSTS);

      // Verify posts are sorted by date descending
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date).getTime();
        const nextDate = new Date(posts[i + 1].date).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
      }
    });
  });

  describe('getPostBySlug', () => {
    test.each(TEST_CASES.SLUG_TESTS)('should handle slug "$slug" (exists: $shouldExist)', ({ slug, shouldExist }) => {
      const post = getPostBySlug(slug);

      if (shouldExist) {
        expect(post).toBeDefined();
        expect(post?.slug).toBe(slug);
      } else {
        expect(post).toBeUndefined();
      }
    });

    it('should return first matching post regardless of language', () => {
      const post = getPostBySlug(TEST_DATA.EXISTING_SLUG);
      expect(post).toBeDefined();
      expect(post?.slug).toBe(TEST_DATA.EXISTING_SLUG);
    });
  });

  describe('getPostBySlugAndLang', () => {
    test.each(TEST_CASES.FALLBACK_LANGUAGES)(
      'should handle $requestedLang language request',
      ({ slug, requestedLang, expectedLang, expectedTitle, shouldFallback }) => {
        const post = getPostBySlugAndLang(slug, requestedLang as Language);

        expect(post).toBeDefined();
        expect(post?.slug).toBe(slug);
        expect(post?.lang).toBe(expectedLang);

        if (expectedTitle) {
          expect(post?.title).toBe(expectedTitle);
        }

        if (shouldFallback) {
          // Verify it fell back to default language
          expect(post?.lang).toBe(DEFAULT_LANGUAGE);
        }
      },
    );

    it('should return undefined for non-existent slug', () => {
      const post = getPostBySlugAndLang(TEST_DATA.NON_EXISTENT_SLUG, LANGUAGES.ENGLISH);
      expect(post).toBeUndefined();
    });

    it('should prefer exact language match over fallback', () => {
      const chinesePost = getPostBySlugAndLang(TEST_DATA.EXISTING_SLUG, LANGUAGES.CHINESE);
      const englishPost = getPostBySlugAndLang(TEST_DATA.EXISTING_SLUG, LANGUAGES.ENGLISH);

      expect(chinesePost?.lang).toBe(LANGUAGES.CHINESE);
      expect(englishPost?.lang).toBe(LANGUAGES.ENGLISH);
      expect(chinesePost?.title).not.toBe(englishPost?.title);
    });
  });
});
