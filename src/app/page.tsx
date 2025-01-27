import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostList from '~/components/Post/List';

const posts = [
  {
    slug: 'getting-started-with-web-development',
    date: '2024-03-15',
    title: 'Getting Started with Modern Web Development',
    description:
      'Learn the fundamentals of modern web development, including React, TypeScript, and Next.js. This comprehensive guide will help you understand the basics and get started with your first project.',
    path: '/posts/getting-started-with-web-development',
  },
  {
    slug: 'mastering-typescript',
    date: '2024-03-10',
    title: 'Mastering TypeScript: A Comprehensive Guide',
    description:
      'Dive deep into TypeScript features, from basic types to advanced concepts like generics and utility types. Discover how TypeScript can improve your development workflow and code quality.',
    path: '/posts/mastering-typescript',
  },
  {
    slug: 'react-best-practices-2024',
    date: '2024-03-05',
    title: 'React Best Practices for 2024',
    description:
      'Explore the latest React best practices, including hooks, state management, and performance optimization techniques. Learn how to write clean, maintainable React code.',
    path: '/posts/react-best-practices-2024',
  },
  {
    slug: 'nextjs-server-components',
    date: '2024-02-28',
    title: 'Understanding Next.js Server Components',
    description:
      'A detailed look at Next.js Server Components and how they revolutionize web development. Learn when and how to use them effectively in your applications.',
    path: '/posts/nextjs-server-components',
  },
  {
    slug: 'tailwind-css-tips',
    date: '2024-02-20',
    title: 'Advanced Tailwind CSS Tips and Tricks',
    description:
      'Discover advanced Tailwind CSS techniques to streamline your styling workflow. Learn about custom configurations, responsive design, and dark mode implementation.',
    path: '/posts/tailwind-css-tips',
  },
  {
    slug: 'web-performance-optimization',
    date: '2024-02-15',
    title: 'Web Performance Optimization Techniques',
    description:
      "Learn essential techniques for optimizing web performance, including code splitting, lazy loading, and image optimization. Improve your website's speed and user experience.",
    path: '/posts/web-performance-optimization',
  },
];

const T = {
  title: 'Hey, this is Chin.',
  description: [
    'I advocate for software engineering management',
    'I believe simple things have their beauty like the laws govern the universe',
  ],
  latest: 'Latest posts',
};

export default function Home() {
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
        <h2 className="my-8 text-2xl dark:text-dark">{T.latest}</h2>
        <PostList posts={posts} />
      </main>
    </Fragment>
  );
}
