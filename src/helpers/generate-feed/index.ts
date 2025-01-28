import { Feed } from 'feed';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';
import getPostOGImage from '~/helpers/get-og-image-url';

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
    feed.addItem({
      id: SITE.fqdn + post.path,
      title: post.title,
      link: SITE.fqdn + post.path,
      description: post.description,
      image: getPostOGImage(post.image),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
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
