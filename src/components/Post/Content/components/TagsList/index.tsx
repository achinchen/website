import Link from 'next/link';
import { Post } from 'contentlayer/generated';

interface TagsListProps {
  post: Post;
}

export default function TagsList({ post }: TagsListProps) {
  if (!post.tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {post.tags.map((tag) => (
        <Link
          key={`${tag}-${post.lang}`}
          href={`/${post.lang}/posts/tags/${tag.toLowerCase()}`}
          className="text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 decoration-none px-2 py-1 rounded transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}