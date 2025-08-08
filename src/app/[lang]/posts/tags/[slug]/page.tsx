import { notFound } from 'next/navigation';
import PostList from '~/components/Post/List';
import { getTitle } from '~/helpers/get-title';
import { Metadata } from 'next';
import { getPostCountText } from '~/helpers/i18n';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { getPostsByTag } from '~/helpers/get-tags';
import { allPosts } from 'contentlayer/generated';
import { createTranslator } from '~/helpers/i18n/translations';

interface TagPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const posts = getPostsByTag(slug, lang);

  if (posts.length === 0) {
    return {};
  }

  const t = createTranslator(lang as Language);
  const title = getTitle(t('meta_tag_title').replace('{{tag}}', slug));
  const description = t('meta_tag_description').replace('{{tag}}', slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const allTags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      allTags.add(tag.toLowerCase());
    });
  });

  return Array.from(allTags).flatMap((slug) =>
    SUPPORTED_LANGUAGES.map((lang) => ({
      lang,
      slug,
    })),
  );
}

export default async function TagPage({ params }: TagPageProps) {
  const { lang: paramLang, slug } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }

  const lang = paramLang as Language;
  const t = createTranslator(lang);
  const posts = getPostsByTag(slug, lang);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="my-12">
      <div className="my-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">{t('tags_posts_with_tag').replace('{{tag}}', slug)}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {getPostCountText(posts.length, t('tags_post_count'), t('tags_post_count_plural'))}
        </p>
      </div>

      <div className="space-y-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
