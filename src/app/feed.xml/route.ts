import { getFeed } from '~/helpers/generate-feed';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(getFeed('RSS'), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
