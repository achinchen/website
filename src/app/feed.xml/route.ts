import { getFeed } from '~/helpers/generate-feed';
import { DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(getFeed('RSS', DEFAULT_LANGUAGE), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
