import { Fragment } from 'react';
import { ArticleJsonLd } from 'next-seo';
import { notFound } from 'next/navigation';
import { SITE } from '~/configs';
import PostList from '~/components/Post/List';
import Divider from '~/components/Divider';
import { getPosts } from '~/helpers/get-posts';
import { Language, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';
import { getTranslations } from '~/helpers/i18n/translations';

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
  const t = getTranslations(lang);
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
      <div className="mx-auto max-w-3xl py-12">
        <header className="my-12 transition-colors">
          <h1 className="text-center text-5xl sm:text-left">{t.homepage_title}</h1>
          <p className="mt-14 whitespace-break-spaces text-wrap leading-loose md:leading-3em">
            {t.homepage_description}
          </p>
        </header>
        <Divider className="text-center md:text-left" />
        <main className="py-3 transition-colors">
          <h2 className="mb-4 text-xl">{t.homepage_latest}</h2>
          <PostList posts={posts} />
        </main>
      </div>
    </Fragment>
  );
}
