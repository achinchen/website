import Link from 'next/link';
import { Post } from 'contentlayer/generated';

interface TagsListProps {
  post: Post;
}

export default function TagsList({ post }: TagsListProps) {
  if (!post.tags?.length) return null;

  return (
    <div className="mb-12 mt-20 flex flex-wrap gap-3">
      {post.tags.map((tag) => (
        <Link
          key={`${tag}-${post.lang}`}
          href={`/${post.lang}/posts/tags/${tag.toLowerCase()}`}
          className="rounded px-2 py-1 text-sm text-gray-800 decoration-none transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
