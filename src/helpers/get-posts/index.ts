import { allPosts } from 'contentlayer/generated';
export type { Post } from 'contentlayer/generated';

const POST_LIST = allPosts.sort((a, b) => Number(a) - Number(b));

export const getPosts = () => POST_LIST;
export const getPostBySlug = (slug: string) => POST_LIST.find((post) => post.slug === slug);
export const getPostIndexBySlug = (slug: string) => POST_LIST.findIndex((post) => post.slug === slug);
