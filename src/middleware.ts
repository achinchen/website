import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './helpers/i18n/config';

const LANGUAGE_COOKIE = 'lang_redirected';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Check if pathname already has a language prefix
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Check if user has been redirected before
    const redirected = request.cookies.get(LANGUAGE_COOKIE)?.value;
    
    if (!redirected) {
      // Detect browser language
      const acceptLang = request.headers.get('accept-language') || '';
      const preferred = acceptLang.split(',')[0].toLowerCase();
      let lang: string = DEFAULT_LANGUAGE;
      
      if (preferred.startsWith('zh')) lang = 'zh';
      else if (preferred.startsWith('en')) lang = 'en';
      
      // Redirect to language-prefixed URL
      const response = NextResponse.redirect(
        new URL(`/${lang}${pathname}${search || ''}`, request.url)
      );
      response.cookies.set(LANGUAGE_COOKIE, '1', { path: '/', maxAge: 60 * 60 * 24 * 365 });
      return response;
    } else {
      // User has been redirected before, redirect to default language
      const response = NextResponse.redirect(
        new URL(`/${DEFAULT_LANGUAGE}${pathname}${search || ''}`, request.url)
      );
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js paths and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}; 