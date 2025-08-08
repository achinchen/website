import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from './helpers/i18n/config';

function getCookieFromString(name: string, cookieString: string): string | null {
  return cookieString.split('; ').reduce(
    (r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    },
    null as string | null,
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Get cookies as string for parsing
    const cookies = request.headers.get('cookie') || '';

    // Check if user has a stored language preference
    const storedLang = getCookieFromString('lang', cookies);
    let targetLang: string = DEFAULT_LANGUAGE;

    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang as Language)) {
      // Use stored language preference
      targetLang = storedLang;
    } else {
      // Fallback to browser language detection
      const acceptLang = request.headers.get('accept-language') || '';
      const preferred = acceptLang.split(',')[0].toLowerCase();

      if (preferred.startsWith('zh')) targetLang = 'zh';
      else if (preferred.startsWith('en')) targetLang = 'en';
    }

    // Redirect to language-prefixed URL
    const response = NextResponse.redirect(new URL(`/${targetLang}${pathname}${search || ''}`, request.url));

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js paths and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
