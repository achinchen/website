import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import readingTime from 'reading-time';
import imageMetadata from './script/image-metadata';

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
    lang: { type: 'string', required: true },
  },
  computedFields: {
    path: { type: 'string', resolve: (post) => `/posts/${post.slug}` },
    reading: { type: 'number', resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes) },
    language: {
      type: 'string',
      resolve: (post) => {
        const match = post._raw.sourceFileName.match(/\.([a-z]{2})\.mdx$/);
        return match ? match[1] : 'en';
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug, rehypeCodeTitles, [rehypePrism, { ignoreMissing: true }], imageMetadata],
  },
});
