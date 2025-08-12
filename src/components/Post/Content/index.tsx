'use client';

import type { RelatedPost } from './types';
import { Fragment, useState, useEffect } from 'react';
import { Post } from 'contentlayer/generated';
import formatDate from '~/helpers/format-date';
import { getUserLanguage } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';
import { createTranslator } from '~/helpers/i18n/translations';
import Divider from '~/components/Divider';
import Title from './components/Title';
import Body from './components/Body';
import SeriesInfo from './components/SeriesNavigation';
import TagsList from './components/TagsList';
import Mdx from './components/Mdx';
import TableOfContent from './components/TableOfContent';
import PostNavigation from './components/PostNavigation';

interface Props {
  post: Post;
  next: RelatedPost;
  previous: RelatedPost;
  children?: React.ReactNode;
}

export default function PostLayout({ post, next, previous }: Props) {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);

  const {
    date,
    title,
    body: { raw, code },
  } = post;

  useEffect(() => {
    setLang(getUserLanguage());
  }, []);

  const t = createTranslator(post.lang as Language);

  return (
    <article className="transition-colors">
      <header className="mb-4 border-b border-slate-900/10 border-b-solid py-6 text-center transition-colors space-y-1 dark:border-slate-50/[0.06]">
        <Title>{title}</Title>
        <dl className="space-y-10">
          <dt className="sr-only">{t('published_at')}</dt>
          <dd className="text-base text-gray-500 font-medium leading-6 transition-colors dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
      </header>

      <div className="pb-8 transition-colors lg:grid lg:grid-rows-[auto_1fr] lg:grid-cols-4 lg:gap-x-6">
        <div className="pb-8 pt-10 transition-colors lg:col-span-3">
          <Body>
            <Fragment>
              <Mdx code={code} />
              <TagsList post={post} />
            </Fragment>
          </Body>
        </div>
        <aside>
          <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
            <TableOfContent source={raw} />
          </div>
        </aside>
      </div>

      {post.seriesSlug && (
        <Fragment>
          <SeriesInfo post={post} />
          <Divider className="text-center" />
        </Fragment>
      )}

      <PostNavigation next={next} previous={previous} lang={lang} />
    </article>
  );
}
