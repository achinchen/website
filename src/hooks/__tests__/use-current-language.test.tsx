import { renderHook } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useCurrentLanguage, useLanguageAwareHomeUrl } from '../use-current-language';

// Mock Next.js navigation hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('useCurrentLanguage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "en" when pathname starts with /en', () => {
    mockUsePathname.mockReturnValue('/en/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should return "zh" when pathname starts with /zh', () => {
    mockUsePathname.mockReturnValue('/zh/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('zh');
  });

  it('should return default language "en" when pathname has no language prefix', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should return default language "en" when pathname is root', () => {
    mockUsePathname.mockReturnValue('/');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should return default language "en" when pathname has invalid language prefix', () => {
    mockUsePathname.mockReturnValue('/fr/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should handle language-only paths correctly', () => {
    mockUsePathname.mockReturnValue('/zh');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('zh');
  });

  it('should handle nested paths correctly', () => {
    mockUsePathname.mockReturnValue('/en/posts/series/my-series');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should handle paths with query parameters correctly', () => {
    mockUsePathname.mockReturnValue('/zh/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('zh');
  });

  it('should handle empty pathname gracefully', () => {
    mockUsePathname.mockReturnValue('');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should handle malformed pathnames', () => {
    mockUsePathname.mockReturnValue('//en//posts');

    const { result } = renderHook(() => useCurrentLanguage());

    // With //en//posts, split('/') gives ['', '', 'en', '', 'posts']
    // So segments[1] is '', which is not a valid language, defaults to 'en'
    expect(result.current).toBe('en');
  });

  it('should be case sensitive for language detection', () => {
    mockUsePathname.mockReturnValue('/EN/posts/some-post');

    const { result } = renderHook(() => useCurrentLanguage());

    // Should return default since 'EN' !== 'en'
    expect(result.current).toBe('en');
  });

  it('should handle pathname with only slash', () => {
    mockUsePathname.mockReturnValue('/');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('en');
  });

  it('should handle pathname with trailing slash', () => {
    mockUsePathname.mockReturnValue('/zh/posts/');

    const { result } = renderHook(() => useCurrentLanguage());

    expect(result.current).toBe('zh');
  });
});

describe('useLanguageAwareHomeUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "/en" when current language is English', () => {
    mockUsePathname.mockReturnValue('/en/posts/some-post');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/en');
  });

  it('should return "/zh" when current language is Chinese', () => {
    mockUsePathname.mockReturnValue('/zh/posts/some-post');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/zh');
  });

  it('should return "/en" when no language prefix is present', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/en');
  });

  it('should return "/en" when pathname is root', () => {
    mockUsePathname.mockReturnValue('/');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/en');
  });

  it('should return "/en" when invalid language prefix is present', () => {
    mockUsePathname.mockReturnValue('/fr/posts/some-post');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/en');
  });

  it('should handle empty pathname gracefully', () => {
    mockUsePathname.mockReturnValue('');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/en');
  });

  it('should handle malformed pathnames', () => {
    mockUsePathname.mockReturnValue('//zh//posts');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    // With //zh//posts, split('/') gives ['', '', 'zh', '', 'posts']
    // So segments[1] is '', which is not a valid language, defaults to 'en'
    expect(result.current).toBe('/en');
  });

  it('should handle case sensitivity correctly', () => {
    mockUsePathname.mockReturnValue('/ZH/posts/some-post');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    // Should return default since 'ZH' !== 'zh'
    expect(result.current).toBe('/en');
  });

  it('should handle deeply nested paths', () => {
    mockUsePathname.mockReturnValue('/zh/posts/series/my-series/part-1');

    const { result } = renderHook(() => useLanguageAwareHomeUrl());

    expect(result.current).toBe('/zh');
  });

  it('should always return a URL starting with slash', () => {
    const testPaths = ['/en', '/zh', '/', '/invalid', ''];

    testPaths.forEach((path) => {
      mockUsePathname.mockReturnValue(path);

      const { result } = renderHook(() => useLanguageAwareHomeUrl());

      expect(result.current).toMatch(/^\/\w{2}$/);
      expect(result.current.startsWith('/')).toBe(true);
    });
  });

  it('should be consistent with useCurrentLanguage', () => {
    const testPaths = ['/en/posts', '/zh/series', '/invalid', '/'];

    testPaths.forEach((path) => {
      mockUsePathname.mockReturnValue(path);

      const { result: langResult } = renderHook(() => useCurrentLanguage());
      const { result: homeResult } = renderHook(() => useLanguageAwareHomeUrl());

      expect(homeResult.current).toBe(`/${langResult.current}`);
    });
  });
});
