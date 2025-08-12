import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { getFeed } from '~/helpers/generate-feed';
import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
  }));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return new Response(getFeed('JSON', lang), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
