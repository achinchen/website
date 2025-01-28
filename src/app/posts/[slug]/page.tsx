import type { Metadata, NextPage } from 'next';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostContent from '~/components/Post/Content';
import getOgImageUrl from '~/helpers/get-og-image-url';
import { getPostBySlug, getPostIndexBySlug, getPosts } from '~/helpers/get-posts';

export const revalidate = 1800;
export const dynamicParams = true;

export const generateStaticParams = async () => getPosts().map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const { description, title, date, path, image } = post;

  const ogImage = getOgImageUrl(image);
  const url = `${SITE.fqdn}${path}`;

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
    slug: string;
  }>;
};

const PostPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;
  const postIndex = getPostIndexBySlug(slug);
  if (postIndex === -1) return notFound();

  const posts = getPosts();
  const post = posts[postIndex];

  const previous = postIndex ? posts[postIndex - 1] : null;
  const next = postIndex !== posts.length - 1 ? posts[postIndex + 1] : null;

  const { description, title, date, path, image } = post;
  const url = `${SITE.fqdn}${path}`;
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
