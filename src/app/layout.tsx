import type { Metadata } from 'next';
import Footer from '~/components/Footer';
import './styles/index.css';
import Header from '~/components/Header';
import { ThemeProvider } from 'next-themes';
import { SITE } from '~/configs';

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.titleShort}`,
    default: SITE.titleShort,
  },
  description: SITE.description,
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
      <body className="min-h-100vh bg-white text-black antialiased transition-colors dark:bg-gray-900 dark:text-white">
        <ThemeProvider attribute="class">
          <Header />
          <main className="mx-auto max-w-full px-4 lg:max-w-5xl md:max-w-3xl sm:px-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
