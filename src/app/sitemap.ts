import type { Post as ContentLayerPost } from 'contentlayer/generated';
import { MetadataRoute } from 'next';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';
import { getAllSeries } from '~/helpers/get-series';
import { getAllTags } from '~/helpers/get-tags';
import { SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Home page with language alternates
  sitemapEntries.push({
    url: SITE.fqdn,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${SITE.fqdn}/en`,
        zh: `${SITE.fqdn}/zh`,
      },
    },
  });

  // Add language-specific home pages
  SUPPORTED_LANGUAGES.forEach((lang) => {
    // Home page
    sitemapEntries.push({
      url: `${SITE.fqdn}/${lang}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE.fqdn}/en`,
          zh: `${SITE.fqdn}/zh`,
        },
      },
    });

    // Series listing page
    sitemapEntries.push({
      url: `${SITE.fqdn}/${lang}/series`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE.fqdn}/en/series`,
          zh: `${SITE.fqdn}/zh/series`,
        },
      },
    });

    // Tags listing page
    sitemapEntries.push({
      url: `${SITE.fqdn}/${lang}/tags`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE.fqdn}/en/tags`,
          zh: `${SITE.fqdn}/zh/tags`,
        },
      },
    });
  });

  // Get all posts and create entries with language alternates
  const allPosts = getPosts();
  const postsBySlug = allPosts.reduce(
    (acc, post) => {
      if (!acc[post.slug]) {
        acc[post.slug] = {};
      }
      acc[post.slug][post.lang] = post;
      return acc;
    },
    {} as Record<string, Record<string, ContentLayerPost>>,
  );

  // Create sitemap entries for each unique post slug
  Object.entries(postsBySlug).forEach(([, langVersions]) => {
    const languages: Record<string, string> = {};
    const lastModified = new Date(
      Math.max(...Object.values(langVersions).map((post) => new Date(post.date).getTime())),
    );

    // Build language alternates for this post
    SUPPORTED_LANGUAGES.forEach((lang) => {
      if (langVersions[lang]) {
        languages[lang] = `${SITE.fqdn}${langVersions[lang].path}`;
      } else if (langVersions['en']) {
        // Fallback to English version if translation doesn't exist
        languages[lang] = `${SITE.fqdn}${langVersions['en'].path}`;
      }
    });

    // Add the main post entry (using English as default)
    const defaultPost = langVersions['en'] || Object.values(langVersions)[0];
    sitemapEntries.push({
      url: `${SITE.fqdn}${defaultPost.path}`,
      lastModified,
      alternates: {
        languages,
      },
    });
  });

  // Add series pages
  const seriesBySlug = new Map<string, { en?: string; zh?: string; lastModified: Date }>();

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const series = getAllSeries(lang);
    series.forEach((s) => {
      const entry = seriesBySlug.get(s.slug) || { lastModified: new Date(0) };
      entry[lang] = s.name;
      entry.lastModified = new Date(
        Math.max(entry.lastModified.getTime(), ...s.posts.map((p) => new Date(p.date).getTime())),
      );
      seriesBySlug.set(s.slug, entry);
    });
  });

  seriesBySlug.forEach((info, slug) => {
    sitemapEntries.push({
      url: `${SITE.fqdn}/en/posts/series/${slug}`,
      lastModified: info.lastModified,
      alternates: {
        languages: {
          en: `${SITE.fqdn}/en/posts/series/${slug}`,
          zh: `${SITE.fqdn}/zh/posts/series/${slug}`,
        },
      },
    });
  });

  // Add tag pages
  const tagsBySlug = new Map<string, { en?: string; zh?: string; lastModified: Date }>();

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const tags = getAllTags(lang);
    tags.forEach((tag) => {
      const entry = tagsBySlug.get(tag.slug) || { lastModified: new Date(0) };
      entry[lang] = tag.name;
      // Use current date for tags as they're dynamically generated
      entry.lastModified = new Date();
      tagsBySlug.set(tag.slug, entry);
    });
  });

  tagsBySlug.forEach((info, slug) => {
    sitemapEntries.push({
      url: `${SITE.fqdn}/en/posts/tags/${slug}`,
      lastModified: info.lastModified,
      alternates: {
        languages: {
          en: `${SITE.fqdn}/en/posts/tags/${slug}`,
          zh: `${SITE.fqdn}/zh/posts/tags/${slug}`,
        },
      },
    });
  });

  return sitemapEntries;
}
