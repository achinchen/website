import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './helpers/i18n/config';

const LANGUAGE_COOKIE = 'lang_redirected';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only run on root or top-level routes (customize as needed)
  if (pathname === '/' || /^\/posts(\/|$)/.test(pathname)) {
    const redirected = request.cookies.get(LANGUAGE_COOKIE)?.value;
    if (!redirected) {
      // Detect browser language
      const acceptLang = request.headers.get('accept-language') || '';
      const preferred = acceptLang.split(',')[0].toLowerCase();
      let lang: string = DEFAULT_LANGUAGE;
      if (preferred.startsWith('zh')) lang = 'zh';
      else if (preferred.startsWith('en')) lang = 'en';
      // Only redirect if not already on the preferred language
      if (!pathname.includes(`.${lang}.mdx`)) {
        // Set cookie to prevent repeated redirects
        const response = NextResponse.redirect(
          new URL(pathname + (search || ''), request.url)
        );
        response.cookies.set(LANGUAGE_COOKIE, '1', { path: '/', maxAge: 60 * 60 * 24 * 365 });
        // Optionally, adjust URL structure to include language if needed
        return response;
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/posts/:path*',
  ],
}; 