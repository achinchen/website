import { MetadataRoute } from 'next';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';
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
  SUPPORTED_LANGUAGES.forEach(lang => {
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
  });

  // Get all posts and create entries with language alternates
  const allPosts = getPosts();
  const postsBySlug = allPosts.reduce((acc, post) => {
    if (!acc[post.slug]) {
      acc[post.slug] = {};
    }
    acc[post.slug][post.lang] = post;
    return acc;
  }, {} as Record<string, Record<string, any>>);

  // Create sitemap entries for each unique post slug
  Object.entries(postsBySlug).forEach(([slug, langVersions]) => {
    const languages: Record<string, string> = {};
    const lastModified = new Date(Math.max(...Object.values(langVersions).map(post => new Date(post.date).getTime())));

    // Build language alternates for this post
    SUPPORTED_LANGUAGES.forEach(lang => {
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

  return sitemapEntries;
}
