import { Feed } from 'feed';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';
import getPostOGImage from '~/helpers/get-og-image-url';
import { getSeriesBySlug } from '~/helpers/get-series';

export const FEED = {
  RSS: '',
  JSON: '',
  ATOM: '',
};

type FeedType = keyof typeof FEED;

function generateFeed() {
  const author = {
    name: SITE.author,
    email: SITE.email,
    link: SITE.fqdn,
  };

  const feed = new Feed({
    title: SITE.title,
    description: SITE.description,
    id: SITE.fqdn,
    link: SITE.fqdn,
    image: SITE.logoUrl,
    favicon: SITE.logoUrl,
    copyright: `Copyright © 2025 - ${new Date().getFullYear()} ${SITE.credit}`,
    feedLinks: {
      rss2: `${SITE.fqdn}/feed.xml`,
      json: `${SITE.fqdn}/feed.json`,
      atom: `${SITE.fqdn}/atom.xml`,
    },
    author: author,
  });

  getPosts().forEach((post) => {
    // Get series information if post is part of a series
    const series = post.seriesSlug ? getSeriesBySlug(post.seriesSlug, post.lang) : null;
    const seriesInfo = series ? {
      series: series.name,
      seriesUrl: `${SITE.fqdn}/${post.lang}/posts/series/${series.slug}`,
      seriesOrder: post.seriesOrder || undefined,
      seriesStatus: series.status,
    } : undefined;

    // Prepare tags information
    const tagsInfo = post.tags?.map(tag => ({
      name: tag,
      url: `${SITE.fqdn}/${post.lang}/posts/tags/${tag.toLowerCase()}`,
    }));

    feed.addItem({
      id: SITE.fqdn + post.path,
      title: post.title,
      link: SITE.fqdn + post.path,
      description: post.description,
      image: getPostOGImage(post.image),
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
      // Add series and tags to JSON feed
      custom_elements: [
        ...(seriesInfo ? [{
          'series:info': {
            _attr: {
              name: seriesInfo.series,
              url: seriesInfo.seriesUrl,
              order: seriesInfo.seriesOrder,
              status: seriesInfo.seriesStatus,
            },
          },
        }] : []),
        ...(tagsInfo ? [{
          'tags:list': {
            'tag': tagsInfo.map(tag => ({
              _attr: {
                name: tag.name,
                url: tag.url,
              },
            })),
          },
        }] : []),
      ],
    });
  });

  FEED.RSS = feed.rss2();
  FEED.ATOM = feed.atom1();
  FEED.JSON = feed.json1();
}

export const getFeed = (type: FeedType) => {
  if (!FEED[type]) generateFeed();
  return FEED[type];
};