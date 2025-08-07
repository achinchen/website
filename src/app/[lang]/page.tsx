import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostList from '~/components/Post/List';
import { getPosts } from '~/helpers/get-posts';
import { getTranslations } from '~/helpers/i18n';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import en from '../../../public/locales/en/common.json';
import zh from '../../../public/locales/zh/common.json';
import { notFound } from 'next/navigation';

const translations: Record<Language, typeof en> = { en, zh };

export const revalidate = 1800;
export const dynamicParams = false;

// Generate static params for all supported languages
export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
  }));
}

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function LanguagePage({ params }: Props) {
  const { lang: paramLang } = await params;
  
  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }
  
  const lang = paramLang as Language;
  const t = getTranslations(lang, translations);
  const posts = getPosts(lang).slice(0, 5);

  return (
    <Fragment>
      <ArticleJsonLd
        type="Blog"
        useAppDir
        url={`${SITE.fqdn}/${lang}`}
        title={SITE.title}
        images={[SITE.bannerUrl]}
        datePublished={SITE.datePublished}
        authorName={SITE.author}
        description={SITE.description}
      />
      <header className="my-12 transition-colors space-y-2 md:space-y-5">
        <h1 className="text-center text-5xl sm:text-left">{t.homepage_title}</h1>
        <p className="whitespace-break-spaces text-wrap leading-loose md:leading-3em">{t.homepage_description.join('\n')}</p>
      </header>
      <main className="my-4 transition-colors">
        <h2 className="my-8 text-xl">{t.homepage_latest}</h2>
        <PostList posts={posts} />
      </main>
    </Fragment>
  );
} 