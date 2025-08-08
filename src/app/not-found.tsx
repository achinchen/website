import Link from 'next/link';
import { getUserTranslations } from '~/helpers/i18n/translations';

export default function NotFound() {
  const t = getUserTranslations();
  return (
    <main className="mx-8 h-75vh flex flex-col items-center justify-center">
      <h1 className="mb-4 mt-12 tracking-wide">404</h1>
      <Link href="/">{t.back_to_home}</Link>
    </main>
  );
}
