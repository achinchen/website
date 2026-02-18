import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { getFeed } from '~/helpers/generate-feed';
import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
  }));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Language };
  return new Response(getFeed('RSS', lang), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
