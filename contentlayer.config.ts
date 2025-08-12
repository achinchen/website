import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import imageMetadata from './scripts/image-metadata';

export const Series = defineDocumentType(() => ({
  name: 'Series',
  filePathPattern: 'series/**/*.@(en|zh).mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    status: { type: 'enum', options: ['ongoing', 'completed'], required: true },
    lang: { type: 'string', required: false, default: 'en' },
  },
  computedFields: {
    type: { type: 'string', resolve: () => 'Series' },
    lang: {
      type: 'string',
      resolve: (series) => {
        const match = series._raw.sourceFileName.match(/\.([a-z]{2})\.mdx$/);
        return match ? match[1] : 'en';
      },
    },
    path: {
      type: 'string',
      resolve: (series) => {
        const match = series._raw.sourceFileName.match(/\.([a-z]{2})\.mdx$/);
        const lang = match ? match[1] : 'en';
        return `/${lang}/series/${series.slug}`;
      },
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.@(en|zh).mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    image: { type: 'string', required: false },
    lang: { type: 'string', required: false, default: 'en' },
    seriesSlug: { type: 'string', required: false },
    seriesOrder: { type: 'number', required: false },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
      default: [],
    },
  },
  computedFields: {
    type: { type: 'string', resolve: () => 'Post' },
    lang: {
      type: 'string',
      resolve: (post) => {
        const match = post._raw.sourceFileName.match(/\.([a-z]{2})\.mdx$/);
        return match ? match[1] : 'en';
      },
    },
    path: {
      type: 'string',
      resolve: (post) => {
        const match = post._raw.sourceFileName.match(/\.([a-z]{2})\.mdx$/);
        const lang = match ? match[1] : 'en';
        return `/${lang}/posts/${post.slug}`;
      },
    },
    reading: {
      type: 'number',
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Series],
  mdx: {
    remarkPlugins: [remarkBreaks],
    rehypePlugins: [rehypeSlug, rehypeCodeTitles, [rehypePrism, { ignoreMissing: true }], imageMetadata],
  },
});
