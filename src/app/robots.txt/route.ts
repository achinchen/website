import { SITE } from '~/configs';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Host: ${SITE.fqdn}
Sitemap: ${SITE.fqdn}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
      },
    },
  );
}
