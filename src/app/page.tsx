import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostList from '~/components/Post/List';
import { getPosts } from '~/helpers/get-posts';

const T = {
  title: 'Hey, this is Chin.',
  description: [
    'I advocate for software engineering management',
    'I believe simple things have their beauty like the laws govern the universe',
  ],
  latest: 'Latest posts',
};

export const revalidate = 1800;

export const dynamicParams = false;

export default function Home() {
  const posts = getPosts().slice(0, 5);

  return (
    <Fragment>
      <ArticleJsonLd
        type="Blog"
        useAppDir
        url={SITE.fqdn}
        title={SITE.title}
        images={[SITE.bannerUrl]}
        datePublished={SITE.datePublished}
        authorName={SITE.author}
        description={SITE.description}
      />
      <header className="my-12 transition-colors space-y-2 md:space-y-5">
        <h1 className="text-center text-5xl sm:text-left">{T.title}</h1>
        <p className="whitespace-break-spaces text-wrap leading-loose md:leading-3em">{T.description.join('\n')} </p>
      </header>
      <main className="my-4 transition-colors divide-y divide-gray-200 dark:divide-gray-700">
        <h2 className="my-8 text-2xl">{T.latest}</h2>
        <PostList posts={posts} />
      </main>
    </Fragment>
  );
}
