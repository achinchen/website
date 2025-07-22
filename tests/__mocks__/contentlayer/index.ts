export interface Post {
    _id: string;
    _raw: {
      sourceFileName: string;
      sourceFileDir: string;
      sourceFilePath: string;
      flattenedPath: string;
    };
    type: string;
    title: string;
    description: string;
    slug: string;
    date: string;
    image?: string;
    lang: string;
    body: {
      raw: string;
      code: string;
    };
    path: string;
    reading: number;
    language: string;
  }
  
  const mockPosts: Post[] = [
    {
      _id: 'test-post-1.en.mdx',
      _raw: {
        sourceFileName: 'test-post-1.en.mdx',
        sourceFileDir: 'posts',
        sourceFilePath: 'posts/test-post-1.en.mdx',
        flattenedPath: 'posts/test-post-1.en',
      },
      type: 'Post',
      title: 'Test Post 1',
      description: 'A test post in English',
      slug: 'test-post-1',
      date: '2025-01-01',
      lang: 'en',
      body: {
        raw: '# Test Post 1\n\nThis is a test post.',
        code: 'var Component = () => { return React.createElement("h1", null, "Test Post 1"); };',
      },
      path: '/posts/test-post-1',
      reading: 1,
      language: 'en',
    },
    {
      _id: 'test-post-1.zh.mdx',
      _raw: {
        sourceFileName: 'test-post-1.zh.mdx',
        sourceFileDir: 'posts',
        sourceFilePath: 'posts/test-post-1.zh.mdx',
        flattenedPath: 'posts/test-post-1.zh',
      },
      type: 'Post',
      title: '測試文章 1',
      description: '中文測試文章',
      slug: 'test-post-1',
      date: '2025-01-01',
      lang: 'zh',
      body: {
        raw: '# 測試文章 1\n\n這是一篇測試文章。',
        code: 'var Component = () => { return React.createElement("h1", null, "測試文章 1"); };',
      },
      path: '/posts/test-post-1',
      reading: 1,
      language: 'zh',
    },
    {
      _id: 'test-post-2.en.mdx',
      _raw: {
        sourceFileName: 'test-post-2.en.mdx',
        sourceFileDir: 'posts',
        sourceFilePath: 'posts/test-post-2.en.mdx',
        flattenedPath: 'posts/test-post-2.en',
      },
      type: 'Post',
      title: 'Test Post 2',
      description: 'Another test post in English',
      slug: 'test-post-2',
      date: '2025-01-02',
      lang: 'en',
      body: {
        raw: '# Test Post 2\n\nThis is another test post.',
        code: 'var Component = () => { return React.createElement("h1", null, "Test Post 2"); };',
      },
      path: '/posts/test-post-2',
      reading: 1,
      language: 'en',
    },
  ];
  
  export const allPosts = mockPosts;
  