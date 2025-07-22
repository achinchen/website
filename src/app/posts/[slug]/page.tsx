'use client';

import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';
import { SITE } from '~/configs';
import PostContent from '~/components/Post/Content';
import getOgImageUrl from '~/helpers/get-og-image-url';
import { getPostBySlugAndLang, getPosts } from '~/helpers/get-posts';
import { getUserLanguage } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PostPage: NextPage<Props> = ({ params }) => {
  const [slug, setSlug] = useState<string>('');
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params.then(({ slug }) => {
      setSlug(slug);
    });
  }, [params]);

  useEffect(() => {
    setLang(getUserLanguage());
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering language-dependent content until mounted
  if (!mounted || !slug) {
    return <div>Loading...</div>;
  }

  const post = getPostBySlugAndLang(slug, lang);
  if (!post) {
    router.push('/404');
    return <div>Post not found</div>;
  }

  // Get posts filtered by the current language for navigation
  const postsInLanguage = getPosts(lang);
  const postIndexInLanguage = postsInLanguage.findIndex(p => p.slug === slug);
  
  if (postIndexInLanguage === -1) {
    router.push('/404');
    return <div>Post not found</div>;
  }

  const previous = postIndexInLanguage > 0 ? postsInLanguage[postIndexInLanguage - 1] : null;
  const next = postIndexInLanguage < postsInLanguage.length - 1 ? postsInLanguage[postIndexInLanguage + 1] : null;

  const { description, title, date, path, image } = post;
  const url = `${SITE.fqdn}${path}`;
  const ogImage = getOgImageUrl(image);

  return (
    <Fragment>
      <ArticleJsonLd
        useAppDir
        url={url}
        title={title}
        images={[ogImage]}
        datePublished={date}
        dateModified={date}
        authorName={SITE.author}
        description={description}
      />
      <PostContent post={post} previous={previous} next={next} />
    </Fragment>
  );
};

export default PostPage;
