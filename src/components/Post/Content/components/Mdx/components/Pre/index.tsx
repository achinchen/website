'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { copyToClipboard, removeDuplicateNewLine } from './utils';
import { getUserLanguage } from '~/helpers/i18n';
import { Language, DEFAULT_LANGUAGE } from '~/helpers/i18n/config';

// Use require to avoid TypeScript linter errors for deep JSON imports
const en = require('public/locales/en/common.json');
const zh = require('public/locales/zh/common.json');

const translations: Record<Language, typeof en> = { en, zh };
function getTranslations(lang: Language) {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

type Props = React.ComponentPropsWithoutRef<'pre'>;

function CustomPre({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  let lang: Language = DEFAULT_LANGUAGE;
  if (typeof window !== 'undefined') {
    const userLang = getUserLanguage();
    if (userLang) lang = userLang;
  }
  const t = getTranslations(lang);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(removeDuplicateNewLine(preRef.current.innerText));
      setCopied(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="group relative">
      <pre {...props} ref={preRef} className={clsx(className, 'focus:outline-none')}>
        <div className="absolute right-0 top-0 m-2 flex items-center rounded-md bg-[#282a36] dark:bg-[#262626]">
          <span
            className={clsx('hidden px-2 text-xs text-blue-400 ease-in', {
              'group-hover:flex': copied,
            })}
          >
            {t.copied}
          </span>
          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={clsx(
              'hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex',
              {
                'border-blue-400': copied,
                'border-gray-600 hover:border-gray-400 focus:ring-4 focus:ring-gray-200/50 dark:border-gray-700 dark:hover:border-gray-400':
                  !copied,
              },
            )}
          >
            <span
              className={clsx('pointer-events-none h-4 w-4 i-mdi-content-copy', {
                block: !copied,
                hidden: copied,
              })}
            />
            <span
              className={clsx('pointer-events-none h-4 w-4 i-mdi-check', {
                hidden: !copied,
                block: copied,
              })}
            />
          </button>
        </div>
        {children}
      </pre>
    </div>
  );
}

export default CustomPre;
