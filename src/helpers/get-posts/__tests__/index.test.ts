import { getPosts, getPostBySlug, getPostBySlugAndLang } from '../index';
import { DEFAULT_LANGUAGE } from '../../i18n/config';

describe('get-posts utilities', () => {

  const EXPECTED_TOTAL_POSTS = 3;
  const EXPECTED_ENGLISH_POSTS = 2;
  const EXPECTED_CHINESE_POSTS = 1;
  
  const TEST_SLUG_EXISTS = 'test-post-1';
  const TEST_SLUG_NOT_EXISTS = 'non-existent';
  const TEST_CHINESE_TITLE = '測試文章 1';
  const TEST_UNSUPPORTED_LANGUAGE = 'fr' as any;
  
  const ENGLISH_LANGUAGE = 'en' as const;
  const CHINESE_LANGUAGE = 'zh' as const;

  describe('getPosts', () => {
    test('returns all posts when no language specified', () => {
      const posts = getPosts();
      expect(posts).toHaveLength(EXPECTED_TOTAL_POSTS);
    });

    test('returns posts filtered by language', () => {
      const englishPosts = getPosts(ENGLISH_LANGUAGE);
      expect(englishPosts).toHaveLength(EXPECTED_ENGLISH_POSTS);
      expect(englishPosts[0].lang).toBe(ENGLISH_LANGUAGE);

      const chinesePosts = getPosts(CHINESE_LANGUAGE);
      expect(chinesePosts).toHaveLength(EXPECTED_CHINESE_POSTS);
      expect(chinesePosts[0].lang).toBe(CHINESE_LANGUAGE);
    });
  });

  describe('getPostBySlug', () => {
    test('returns post by slug', () => {
      const post = getPostBySlug(TEST_SLUG_EXISTS);
      expect(post).toBeDefined();
      expect(post?.slug).toBe(TEST_SLUG_EXISTS);
    });

    test('returns undefined for non-existent slug', () => {
      const post = getPostBySlug(TEST_SLUG_NOT_EXISTS);
      expect(post).toBeUndefined();
    });
  });

  describe('getPostBySlugAndLang', () => {
    test('returns post in requested language', () => {
      const post = getPostBySlugAndLang(TEST_SLUG_EXISTS, CHINESE_LANGUAGE);
      expect(post).toBeDefined();
      expect(post?.lang).toBe(CHINESE_LANGUAGE);
      expect(post?.title).toBe(TEST_CHINESE_TITLE);
    });

    test('falls back to English when requested language not available', () => {
      const post = getPostBySlugAndLang(TEST_SLUG_EXISTS, TEST_UNSUPPORTED_LANGUAGE);
      expect(post).toBeDefined();
      expect(post?.lang).toBe(DEFAULT_LANGUAGE);
    });

    test('returns undefined when slug does not exist', () => {
      const post = getPostBySlugAndLang(TEST_SLUG_NOT_EXISTS, ENGLISH_LANGUAGE);
      expect(post).toBeUndefined();
    });
  });
}); 