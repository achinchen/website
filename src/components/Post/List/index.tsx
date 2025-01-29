import Balancer from 'react-wrap-balancer';
import Link from '~/components/Link';
import formatDate from '~/helpers/format-date';
import { Post } from '~/helpers/get-posts';

const T = {
  readingUnit: 'min',
};

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <ul className="transition-colors divide-y divide-gray-200 dark:divide-gray-700">
      {posts.map(({ slug, date, title, description, path, reading }) => {
        return (
          <li key={slug} className="group list-none transition-colors">
            <Link href={path} className="decoration-none">
              <article className="rounded-xl p-4 transition-colors space-y-2 group-hover:bg-gray-100 xl:space-y-0 dark:group-hover:bg-gray-800">
                <header className="flex flex-col md:flex-row md:items-center md:gap-3">
                  <h3 className="text-lg font-bold tracking-tight transition-colors">{title}</h3>
                  <span className="flex gap-1 text-sm tracking-wide">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd>
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    · {reading}
                    {T.readingUnit}
                  </span>
                </header>
                <Balancer
                  as="p"
                  className="max-w-none text-gray-500 transition-colors md:mt-1 dark:text-gray-400 md:leading-loose"
                >
                  {description}
                </Balancer>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
