import { getAllTags, getPostsByTag, getTagSize } from './index';

// Test constants
const LANGUAGES = {
  ENGLISH: 'en',
  CHINESE: 'zh',
  UNSUPPORTED: 'fr',
} as const;

const ENGLISH_TAGS = {
  MOCK: { name: 'mock', slug: 'mock', count: 2 },
  TEST: { name: 'test', slug: 'test', count: 2 },
} as const;

const CHINESE_TAGS = {
  MOCK: { name: '模擬', slug: '模擬', count: 1 },
  TEST: { name: '測試', slug: '測試', count: 1 },
} as const;

const TAG_SIZE_CLASSES = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'] as const;

const TEST_CASES = {
  LANGUAGES: [
    {
      lang: LANGUAGES.ENGLISH,
      expectedTags: [ENGLISH_TAGS.MOCK, ENGLISH_TAGS.TEST],
      expectedPostCount: 2,
    },
    {
      lang: LANGUAGES.CHINESE,
      expectedTags: [CHINESE_TAGS.MOCK, CHINESE_TAGS.TEST],
      expectedPostCount: 1,
    },
  ],
  CASE_INSENSITIVE_TAGS: [
    { tag: 'test', lang: LANGUAGES.ENGLISH },
    { tag: 'TEST', lang: LANGUAGES.ENGLISH },
    { tag: 'Test', lang: LANGUAGES.ENGLISH },
  ],
  TAG_SIZES: [
    { count: 1, maxCount: 10, minCount: 1, expected: 'text-sm' },
    { count: 3, maxCount: 10, minCount: 1, expected: 'text-sm' },
    { count: 5, maxCount: 10, minCount: 1, expected: 'text-base' },
    { count: 7, maxCount: 10, minCount: 1, expected: 'text-lg' },
    { count: 9, maxCount: 10, minCount: 1, expected: 'text-xl' },
    { count: 10, maxCount: 10, minCount: 1, expected: 'text-2xl' },
    { count: 5, maxCount: 5, minCount: 5, expected: 'text-lg' },
  ],
  TAG_SIZE_EDGE_CASES: [
    {
      description: 'minimum count',
      count: 1,
      maxCount: 10,
      minCount: 1,
      expected: 'text-sm',
    },
    {
      description: 'maximum count',
      count: 10,
      maxCount: 10,
      minCount: 1,
      expected: 'text-2xl',
    },
    {
      description: 'equal min and max',
      count: 5,
      maxCount: 5,
      minCount: 5,
      expected: 'text-lg',
    },
  ],
} as const;

describe('Tags Helpers', () => {
  describe('getAllTags', () => {
    test.each(TEST_CASES.LANGUAGES)('should return all tags for $lang posts', ({ lang, expectedTags }) => {
      const tags = getAllTags(lang);

      expect(tags).toHaveLength(expectedTags.length);
      expectedTags.forEach((expectedTag, index) => {
        expect(tags[index].name).toBe(expectedTag.name);
        expect(tags[index].slug).toBe(expectedTag.slug);
        expect(tags[index].count).toBe(expectedTag.count);
      });
    });

    it('should default to English when no language is provided', () => {
      const defaultTags = getAllTags();
      const enTags = getAllTags(LANGUAGES.ENGLISH);

      expect(defaultTags).toEqual(enTags);
    });

    it('should sort tags by count (descending) then by name (ascending)', () => {
      const tags = getAllTags(LANGUAGES.ENGLISH);

      // Both tags have same count (2), so should be sorted alphabetically
      expect(tags[0].name).toBe(ENGLISH_TAGS.MOCK.name);
      expect(tags[1].name).toBe(ENGLISH_TAGS.TEST.name);
    });

    it('should handle case-insensitive tag normalization', () => {
      const tags = getAllTags(LANGUAGES.ENGLISH);

      // Tags should be normalized to lowercase for slug
      tags.forEach((tag) => {
        expect(tag.slug).toBe(tag.name.toLowerCase());
      });
    });

    it('should return empty array for language with no posts', () => {
      const frTags = getAllTags(LANGUAGES.UNSUPPORTED);

      expect(frTags).toHaveLength(0);
    });
  });

  describe('getPostsByTag', () => {
    test.each(TEST_CASES.LANGUAGES)(
      'should return posts for a specific tag in $lang',
      ({ lang, expectedPostCount }) => {
        const tagName = lang === LANGUAGES.ENGLISH ? 'test' : '測試';
        const posts = getPostsByTag(tagName, lang);

        expect(posts).toHaveLength(expectedPostCount);
        posts.forEach((post) => {
          expect(post.lang).toBe(lang);
          expect(post.tags).toContain(tagName);
        });
      },
    );

    test.each(TEST_CASES.CASE_INSENSITIVE_TAGS)(
      'should handle case-insensitive tag matching for "$tag"',
      ({ tag, lang }) => {
        const posts = getPostsByTag(tag, lang);
        const lowerPosts = getPostsByTag(tag.toLowerCase(), lang);

        expect(posts).toEqual(lowerPosts);
        expect(posts).toHaveLength(2);
      },
    );

    it('should sort posts by date (newest first)', () => {
      const posts = getPostsByTag('test', LANGUAGES.ENGLISH);

      expect(posts).toHaveLength(2);
      expect(new Date(posts[0].date).getTime()).toBeGreaterThan(new Date(posts[1].date).getTime());
    });

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('non-existent', LANGUAGES.ENGLISH);

      expect(posts).toHaveLength(0);
    });

    it('should return empty array for tag in language with no posts', () => {
      const posts = getPostsByTag('test', LANGUAGES.UNSUPPORTED);

      expect(posts).toHaveLength(0);
    });

    it('should default to English when no language is provided', () => {
      const defaultPosts = getPostsByTag('test');
      const enPosts = getPostsByTag('test', LANGUAGES.ENGLISH);

      expect(defaultPosts).toEqual(enPosts);
    });
  });

  describe('getTagSize', () => {
    test.each(TEST_CASES.TAG_SIZES)(
      'should return $expected for count $count (range: $minCount-$maxCount)',
      ({ count, maxCount, minCount, expected }) => {
        const size = getTagSize(count, maxCount, minCount);
        expect(size).toBe(expected);
      },
    );

    test.each(TEST_CASES.TAG_SIZE_EDGE_CASES)(
      'should handle edge case: $description',
      ({ count, maxCount, minCount, expected }) => {
        const size = getTagSize(count, maxCount, minCount);
        expect(size).toBe(expected);
      },
    );

    it('should return valid CSS class names', () => {
      for (let count = 1; count <= 10; count++) {
        const size = getTagSize(count, 10, 1);
        expect(TAG_SIZE_CLASSES).toContain(size);
      }
    });

    it('should distribute sizes evenly across the range', () => {
      const minCount = 1;
      const maxCount = 5;
      const sizes: string[] = [];

      for (let count = minCount; count <= maxCount; count++) {
        sizes.push(getTagSize(count, maxCount, minCount));
      }

      // Should have variety in sizes
      const uniqueSizes = new Set(sizes);
      expect(uniqueSizes.size).toBeGreaterThan(1);
    });
  });
});
