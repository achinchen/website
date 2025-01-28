import type { Post } from '~/helpers/get-posts';
import Link from '~/components/Link';
import formatDate from '~/helpers/format-date';
import Title from './components/Title';
import Body from './components/Body';
import Mdx from './components/Mdx';
import TableOfContent from './components/TableOfContent';

export type RelatedPost = {
  title: string;
  path: string;
} | null;

type Props = {
  post: Post;
  next: RelatedPost;
  previous: RelatedPost;
  children?: React.ReactNode;
};

const T = {
  previous: 'previous post',
  next: 'next post',
  'published-time': 'Published at',
};

export default function PostLayout({ post, next, previous }: Props) {
  const {
    date,
    title,
    body: { raw, code },
  } = post;

  return (
    <article className="transition-colors">
      <header className="mb-4 border-b border-slate-900/10 border-b-solid py-6 text-center transition-colors space-y-1 dark:border-slate-50/[0.06]">
        <Title>{title}</Title>
        <dl className="space-y-10">
          <dt className="sr-only">{T['published-time']}</dt>
          <dd className="text-base text-gray-500 font-medium leading-6 transition-colors dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
      </header>
      <div
        className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="pb-8 pt-10 transition-colors lg:col-span-3">
          <Body>
            <Mdx code={code} />
          </Body>
        </div>
        <aside>
          <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
            <TableOfContent source={raw} />
          </div>
        </aside>
      </div>
      <footer className="flex flex-col gap-4 pb-8 pt-4 text-base font-medium sm:flex-row sm:justify-between xl:gap-8 xl:pt-8">
        {previous ? (
          <div className="basis-6/12">
            <h2 className="mb-1 text-xs text-gray-500 tracking-wide uppercase transition-colors dark:text-gray-400">
              {T.previous}
            </h2>
            <Link
              href={previous.path}
              className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              &larr; {previous.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
        {next && (
          <div className="basis-6/12">
            <h2 className="mb-1 text-left text-xs text-gray-500 tracking-wide uppercase transition-colors sm:text-right dark:text-gray-400">
              {T.next}
            </h2>
            <Link
              href={next.path}
              className="block text-primary-500 transition-colors sm:text-right hover:text-primary-600 dark:hover:text-primary-400"
            >
              {next.title} &rarr;
            </Link>
          </div>
        )}
      </footer>
    </article>
  );
}
