import Link from '~/components/Link';
import formatDate from '~/helpers/format-date';

export interface PostMeta {
  slug: string;
  date: string;
  title: string;
  description: string;
  path: string;
}

type Props = {
  posts: PostMeta[];
};

export default function PostList({ posts }: Props) {
  return (
    <ul className="transition-colors divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map((post) => {
        const { slug, date, title, description, path } = post;
        return (
          <li key={slug} className="group list-none transition-colors">
            <Link href={path}>
              <article className="rounded-xl p-4 transition-colors xl:grid xl:grid-cols-4 xl:items-baseline space-y-2 group-hover:bg-gray-100 xl:space-y-0 dark:group-hover:bg-gray-800">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-sm text-gray-500 font-medium leading-6 transition-colors md:text-base dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>
                <main className="xl:col-span-3 space-y-3">
                  <h3 className="text-lg text-gray-900 font-bold tracking-tight transition-colors md:text-2xl sm:text-xl dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="max-w-none text-gray-500 transition-colors dark:text-gray-400 md:leading-loose">
                    {description}
                  </p>
                </main>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
