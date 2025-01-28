import { MetadataRoute } from 'next';
import { SITE } from '~/configs';
import { getPosts } from '~/helpers/get-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const HOME_PAGE = {
    url: SITE.fqdn,
    lastModified: new Date(),
  };
  const posts = getPosts().map(({ path, date }) => ({
    url: `${SITE.fqdn}${path}`,
    lastModified: date,
  }));

  return [HOME_PAGE, ...posts];
}
