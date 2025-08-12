import Mdx from '~/components/Post/Content/components/Mdx';
import { getPostCountText } from '~/helpers/i18n';
import { useMDXComponent } from '~/hooks';
import { SeriesWithPosts } from '~/helpers/get-series';
import { Language } from '~/helpers/i18n/config';
import { createTranslator } from '~/helpers/i18n/translations';

interface Props {
  series: SeriesWithPosts;
}

export default function SeriesInfo({ series }: Props) {
  const MdxComponent = useMDXComponent(series.body.code);
  const t = createTranslator(series.lang as Language);
  const postCount = series.posts.length;

  return (
    <div className="my-6 text-center">
      <h1 className="text-3xl font-bold">{series.name}</h1>
      <div className="my-6 text-left text-lg text-gray-600 md:text-center dark:text-gray-300">
        <MdxComponent />
      </div>
      <div className="my-2 flex items-center justify-center gap-4">
        <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {t(series.status === 'completed' ? 'series_status_completed' : 'series_status_ongoing')}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {getPostCountText(postCount, t('series_post_count'), t('series_post_count_plural'))}
        </span>
      </div>
    </div>
  );
}
