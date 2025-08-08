import { SUPPORTED_LANGUAGES, Language } from '~/helpers/i18n/config';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LanguageLayout({ children, params }: Props) {
  const { lang: paramLang } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(paramLang as Language)) {
    return notFound();
  }

  // This layout doesn't need to wrap with html/body since that's handled by the root layout
  // It just ensures the language parameter is valid
  return <>{children}</>;
}
