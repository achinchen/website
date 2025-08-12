import { Feed } from 'feed';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';
import getOgImageUrl from '~/helpers/get-og-image-url';
import { getSeriesBySlug } from '~/helpers/get-series';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

export const FEED: Record<Language, { RSS: string; JSON: string; ATOM: string }> = {
  en: { RSS: '', JSON: '', ATOM: '' },
  zh: { RSS: '', JSON: '', ATOM: '' },
};

type FeedType = keyof (typeof FEED)[Language];

function generateFeed(lang: Language = DEFAULT_LANGUAGE) {
  const author = {
    name: SITE.author,
    email: SITE.email,
    link: SITE.fqdn,
  };

  const feed = new Feed({
    title: SITE.title,
    description: SITE.description,
    id: `${SITE.fqdn}/${lang}`,
    link: `${SITE.fqdn}/${lang}`,
    image: SITE.logoUrl,
    favicon: SITE.logoUrl,
    copyright: `Copyright © 2025 - ${new Date().getFullYear()} ${SITE.credit}`,
    feedLinks: {
      rss2: `${SITE.fqdn}/${lang}/feed.xml`,
      json: `${SITE.fqdn}/${lang}/feed.json`,
      atom: `${SITE.fqdn}/${lang}/atom.xml`,
    },
    author: author,
  });

  getPosts(lang).forEach((post) => {
    // Get series information if post is part of a series
    const series = post.seriesSlug ? getSeriesBySlug(post.seriesSlug, post.lang) : null;
    const seriesInfo = series
      ? {
          series: series.name,
          seriesUrl: `${SITE.fqdn}/${lang}/posts/series/${series.slug}`,
          seriesOrder: post.seriesOrder || undefined,
          seriesStatus: series.status,
        }
      : undefined;

    // Prepare tags information
    const tagsInfo = post.tags?.map((tag) => ({
      name: tag,
      url: `${SITE.fqdn}/${lang}/posts/tags/${tag.toLowerCase()}`,
    }));

    feed.addItem({
      id: `${SITE.fqdn}/${lang}${post.path}`,
      title: post.title,
      link: `${SITE.fqdn}/${lang}${post.path}`,
      description: post.description,
      image: (() => {
        const ogImage = getOgImageUrl(post.title, post.image);
        return ogImage.startsWith('http') ? ogImage : `${SITE.fqdn}${ogImage}`;
      })(),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
      // Add series and tags as custom extensions
      extensions: [
        {
          name: 'series',
          objects: seriesInfo ? [seriesInfo] : [],
        },
        {
          name: 'tags',
          objects: tagsInfo || [],
        },
      ],
      // Add series and tags as custom namespaces
      ...(seriesInfo && {
        series: {
          name: seriesInfo.series,
          url: seriesInfo.seriesUrl,
          order: seriesInfo.seriesOrder,
          status: seriesInfo.seriesStatus,
        },
      }),
      ...(tagsInfo &&
        tagsInfo.length > 0 && {
          tags: tagsInfo.map((tag) => ({
            name: tag.name,
            url: tag.url,
          })),
        }),
    });
  });

  FEED[lang].RSS = feed.rss2();
  FEED[lang].ATOM = feed.atom1();
  FEED[lang].JSON = feed.json1();
}

export const getFeed = (type: FeedType, lang: Language = DEFAULT_LANGUAGE) => {
  if (!FEED[lang][type]) generateFeed(lang);
  return FEED[lang][type];
};
