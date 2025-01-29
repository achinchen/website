import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostList from '~/components/Post/List';
import { getPosts } from '~/helpers/get-posts';

const T = {
  title: 'Chin Chen',
  description: [
    `Hey, I'm Chin Chen, a passionate learner and web-focused engineer.`,
    `I read books, listen to podcasts, and actively advocate for better software engineering management.`,
    `I believe simplicity holds its own beauty—just like the laws that govern the universe.`,
    `Let’s keep exploring what sparks curiosity.`,
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
      <main className="my-4 transition-colors">
        <h2 className="my-8 text-xl">{T.latest}</h2>
        <PostList posts={posts} />
      </main>
    </Fragment>
  );
}
