import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Provider as BalancerProvider } from 'react-wrap-balancer';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { SITE } from '~/configs';
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-100vh transition-colors">
        <ThemeProvider attribute="class">
          <Header />
          <BalancerProvider>
            <main className="mx-auto max-w-full px-4 lg:max-w-5xl md:max-w-3xl sm:px-6">{children}</main>
          </BalancerProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
