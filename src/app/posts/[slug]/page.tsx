import type { Metadata, NextPage } from 'next';
import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import PostContent from '~/components/Post/Content';
import getOgImageUrl from '~/helpers/get-og-image-url';
import { SITE } from '~/configs';

const post = {
  title: 'Understanding React Server Components',
  description: "A deep dive into React Server Components and how they can improve your application's performance",
  date: '2024-03-20',
  path: '/posts/understanding-react-server-components',
  socialImage: null,
  body: {
    code: `
      # Understanding React Server Components

      React Server Components (RSC) represent a paradigm shift in how we build React applications. 
      They allow components to run on the server, reducing the JavaScript bundle sent to the client 
      and improving performance.

      ## Key Benefits

      - Reduced Client-side JavaScript
      - Improved Initial Page Load
      - Better SEO Performance
      - Direct Backend Access

      ## How They Work

      Server Components run on the server and can access server-side resources directly. 
      They're pre-rendered and send only the necessary HTML to the client, reducing the 
      JavaScript bundle size significantly.

      ## Use Cases

      1. Data Fetching
      2. Database Access
      3. File System Operations
      4. Complex Calculations

      ## Best Practices

      - Keep server components pure
      - Use client components for interactivity
      - Leverage streaming for better UX
      - Consider the data requirements carefully
    `,
    raw: 'dummy raw content',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  // { params, searchParams }: Props,
  // parent: ResolvingMetadata
  const {
    description,
    title,
    date,
    path,
    socialImage,
    body: { code },
  } = post;

  // read route params
  // const id = (await params).id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  const ogImage = getOgImageUrl(socialImage);
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
      publishedTime: post.date,
      authors: [SITE.author],
    },
  };
}

const PostPage: NextPage = () => {
  const { description, title, date, path, socialImage } = post;
  const url = `${SITE.fqdn}${path}`;
  const ogImage = getOgImageUrl(socialImage);

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
      <PostContent post={post} previous={null} next={null} />
    </Fragment>
  );
};

export default PostPage;
