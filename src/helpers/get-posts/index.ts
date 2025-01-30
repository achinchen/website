import { allPosts } from 'contentlayer/generated';
export type { Post } from 'contentlayer/generated';

const getNumericDate = (date: string) => Number(date.substring(0, 10).replace(/-/g, ''));

const POST_LIST = allPosts.sort((a, b) => (getNumericDate(a.date) > getNumericDate(b.date) ? -1 : 1));

export const getPosts = () => POST_LIST;
export const getPostBySlug = (slug: string) => POST_LIST.find((post) => post.slug === slug);
export const getPostIndexBySlug = (slug: string) => POST_LIST.findIndex((post) => post.slug === slug);
