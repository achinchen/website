import type { Metadata } from 'next';
import type { NextPage } from 'next';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostContent from '~/components/Post/Content';
import getOgImageUrl from '~/helpers/get-og-image-url';
import { getPostBySlugAndLang, getPosts } from '~/helpers/get-posts';
import { Language, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';

export const revalidate = 1800;
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = getPosts();
  const params: { lang: string; slug: string }[] = [];
  
  // Generate params for all language/slug combinations
  posts.forEach(post => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      params.push({ lang, slug: post.slug });
    });
  });
  
  return params;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug, lang: paramLang } = await params;
  const lang = SUPPORTED_LANGUAGES.includes(paramLang as Language) ? paramLang as Language : DEFAULT_LANGUAGE;
  const post = getPostBySlugAndLang(slug, lang);
  if (!post) return notFound();

  const { description, title, date, path, image } = post;
  const ogImage = getOgImageUrl(image);
  const url = `${SITE.fqdn}/${lang}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
        },
      ],
      type: 'article',
      publishedTime: date,
      authors: [SITE.author],
    },
  };
};

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

const PostPage: NextPage<Props> = async ({ params }) => {
  const { slug, lang: paramLang } = await params;
  
  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }
  
  const lang = paramLang as Language;
  const post = getPostBySlugAndLang(slug, lang);
  if (!post) return notFound();

  // Get posts in the same language for navigation
  const posts = getPosts(lang);
  const postIndex = posts.findIndex(p => p.slug === slug);
  const previous = postIndex !== -1 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const next = postIndex > 0 ? posts[postIndex - 1] : null; 

  const { description, title, date, path, image } = post;
  const url = `${SITE.fqdn}/${lang}${path}`;
  const ogImage = getOgImageUrl(image);

  return (
    <Fragment>
      <ArticleJsonLd
        useAppDir
        url={url}
        title={title}
        images={[ogImage]}
        datePublished={date}
        dateModified={date}
        authorName={SITE.author}
        description={description}
      />
      <PostContent post={post} previous={previous} next={next} />
    </Fragment>
  );
};

export default PostPage; 