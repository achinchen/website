import { allPosts, Post as ContentLayerPost } from 'contentlayer/generated';
export type { Post } from 'contentlayer/generated';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

const getNumericDate = (date: string) => Number(date.substring(0, 10).replace(/-/g, ''));

const POST_LIST: ContentLayerPost[] = allPosts.sort((a: ContentLayerPost, b: ContentLayerPost) => (getNumericDate(a.date) > getNumericDate(b.date) ? -1 : 1));

export const getPosts = (lang: Language = DEFAULT_LANGUAGE): ContentLayerPost[] =>
  POST_LIST.filter((post: ContentLayerPost) => post.lang === lang)

export const getPostBySlug = (slug: string): ContentLayerPost | undefined => POST_LIST.find((post: ContentLayerPost) => post.slug === slug);

export const getPostBySlugAndLang = (slug: string, lang: Language): ContentLayerPost | undefined => {
  // Try to find the post in the requested language
  let post = POST_LIST.find((p: ContentLayerPost) => p.slug === slug && p.lang === lang);
  // Fallback to English if not found
  if (!post && lang !== DEFAULT_LANGUAGE) {
    post = POST_LIST.find((p: ContentLayerPost) => p.slug === slug && p.lang === DEFAULT_LANGUAGE);
  }
  return post;
};


