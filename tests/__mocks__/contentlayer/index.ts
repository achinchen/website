import type { Post, Series } from 'contentlayer/generated';

export const mockPosts: Post[] = [
  {
    _id: 'test-post-1.en.mdx',
    _raw: {
      sourceFilePath: 'posts/test-post-1.en.mdx',
      sourceFileName: 'test-post-1.en.mdx',
      sourceFileDir: 'posts',
      contentType: 'mdx',
      flattenedPath: 'posts/test-post-1.en',
    },
    type: 'Post',
    title: 'Test Post 1',
    description: 'A test post in English',
    slug: 'test-post-1',
    path: '/posts/test-post-1',
    date: '2025-01-01',
    body: {
      code: 'var Component = () => { return React.createElement("h1", null, "Test Post 1"); };',
      raw: '# Test Post 1\nThis is a test post.',
    },
    reading: 1,
    lang: 'en',
    tags: ['test', 'mock'],
    series: 'Test Series',
    seriesSlug: 'test-series',
    seriesOrder: 1,
  },
  {
    _id: 'test-post-2.en.mdx',
    _raw: {
      sourceFilePath: 'posts/test-post-2.en.mdx',
      sourceFileName: 'test-post-2.en.mdx',
      sourceFileDir: 'posts',
      contentType: 'mdx',
      flattenedPath: 'posts/test-post-2.en',
    },
    type: 'Post',
    title: 'Test Post 2',
    description: 'Another test post in English',
    slug: 'test-post-2',
    path: '/posts/test-post-2',
    date: '2025-01-02',
    body: {
      code: 'var Component = () => { return React.createElement("h1", null, "Test Post 2"); };',
      raw: '# Test Post 2\nThis is another test post.',
    },
    reading: 1,
    lang: 'en',
    tags: ['test', 'mock'],
    series: 'Test Series',
    seriesSlug: 'test-series',
    seriesOrder: 2,
  },
  {
    _id: 'test-post-1.zh.mdx',
    _raw: {
      sourceFilePath: 'posts/test-post-1.zh.mdx',
      sourceFileName: 'test-post-1.zh.mdx',
      sourceFileDir: 'posts',
      contentType: 'mdx',
      flattenedPath: 'posts/test-post-1.zh',
    },
    type: 'Post',
    title: '測試文章 1',
    description: '繁體中文測試文章',
    slug: 'test-post-1',
    path: '/posts/test-post-1',
    date: '2025-01-01',
    body: {
      code: 'var Component = () => { return React.createElement("h1", null, "測試文章 1"); };',
      raw: '# 測試文章 1\n這是一篇測試文章。',
    },
    reading: 1,
    lang: 'zh',
    tags: ['測試', '模擬'],
    series: '測試系列',
    seriesSlug: 'test-series',
    seriesOrder: 1,
  }
];

export const mockSeries: Series[] = [
  {
    _id: 'getting-started.en.mdx',
    _raw: {
      sourceFilePath: 'series/getting-started.en.mdx',
      sourceFileName: 'getting-started.en.mdx',
      sourceFileDir: 'series',
      contentType: 'mdx',
      flattenedPath: 'series/getting-started.en',
    },
    type: 'Series',
    title: 'Getting Started',
    description: 'A beginner-friendly series',
    name: 'Test Series',
    slug: 'test-series',
    status: 'ongoing',
    lang: 'en',
    body: {
      code: 'var Component = () => { return React.createElement("div", null, "Getting Started"); };',
      raw: '# Getting Started\nThis is a test series.',
    },
  },
  {
    _id: 'getting-started.zh.mdx',
    _raw: {
      sourceFilePath: 'series/getting-started.zh.mdx',
      sourceFileName: 'getting-started.zh.mdx',
      sourceFileDir: 'series',
      contentType: 'mdx',
      flattenedPath: 'series/getting-started.zh',
    },
    type: 'Series',
    title: '開始使用',
    description: '新手友善的系列',
    name: '測試系列',
    slug: 'test-series',
    status: 'completed',
    lang: 'zh',
    body: {
      code: 'var Component = () => { return React.createElement("div", null, "開始使用"); };',
      raw: '# 開始使用\n這是一個測試系列。',
    },
  },
];

// Export allPosts and allSeries as expected by the actual contentlayer import
export const allPosts = mockPosts;
export const allSeries = mockSeries;