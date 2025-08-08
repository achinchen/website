import { allPosts, Post } from 'contentlayer/generated';

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

/**
 * Get all tags with their post counts for a given language
 * @param lang Language filter (en/zh)
 * @returns Array of tags with post counts
 */
export function getAllTags(lang: string = 'en'): TagInfo[] {
  const tagMap = new Map<string, TagInfo>();

  allPosts
    .filter((post) => post.lang === lang)
    .forEach((post) => {
      post.tags?.forEach((tag) => {
        const normalizedTag = tag.toLowerCase();
        const existingTag = tagMap.get(normalizedTag);

        if (existingTag) {
          existingTag.count += 1;
        } else {
          tagMap.set(normalizedTag, {
            name: tag,
            slug: normalizedTag,
            count: 1,
          });
        }
      });
    });

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Get all posts for a specific tag
 * @param tag Tag to filter by
 * @param lang Language filter (en/zh)
 * @returns Array of posts with the specified tag
 */
export function getPostsByTag(tag: string, lang: string = 'en'): Post[] {
  const normalizedTag = tag.toLowerCase();

  return allPosts
    .filter((post) => post.lang === lang && post.tags?.some((t) => t.toLowerCase() === normalizedTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Calculate tag size class based on post count
 * @param count Post count for the tag
 * @param maxCount Maximum post count across all tags
 * @param minCount Minimum post count across all tags
 * @returns CSS class name for the tag size
 */
export function getTagSize(count: number, maxCount: number, minCount: number): string {
  if (maxCount === minCount) return 'text-lg';

  const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
  const sizeRange = maxCount - minCount;
  const index = Math.floor(((count - minCount) / sizeRange) * (sizes.length - 1));

  return sizes[index];
}
