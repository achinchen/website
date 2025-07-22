import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Provider as BalancerProvider } from 'react-wrap-balancer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import LanguageHtmlUpdater from '~/components/LanguageHtmlUpdater';
import { SITE } from '~/configs';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, Language } from '~/helpers/i18n/config';
import './styles/index.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.titleShort}`,
    default: SITE.titleShort,
  },
  description: SITE.description,
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png' }],
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.fqdn,
    images: [
      {
        url: SITE.bannerUrl,
      },
    ],
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml' }],
      'application/atom+xml': [{ url: '/atom.xml' }],
    },
    languages: {
      'en': `${SITE.fqdn}/en`,
      'zh': `${SITE.fqdn}/zh`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use default language for HTML lang attribute
  // The actual language will be determined by the route
  const lang = DEFAULT_LANGUAGE;

  return (
    <html lang={lang}>
      <head>
        <link rel="alternate" hrefLang="en" href={`${SITE.fqdn}/en`} />
        <link rel="alternate" hrefLang="zh" href={`${SITE.fqdn}/zh`} />
        <link rel="alternate" hrefLang="x-default" href={SITE.fqdn} />
      </head>
      <body className="min-h-100vh transition-colors">
        <LanguageHtmlUpdater />
        <ThemeProvider attribute="class">
          <Header />
          <BalancerProvider>
            <main className="mx-auto max-w-full px-6 lg:max-w-5xl md:max-w-3xl">{children}</main>
          </BalancerProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
