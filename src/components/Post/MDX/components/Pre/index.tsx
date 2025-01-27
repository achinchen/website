'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { copyToClipboard, removeDuplicateNewLine } from './utils';

type Props = React.ComponentPropsWithoutRef<'pre'>;

const T = {
  copied: 'copied',
};

function CustomPre({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

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
            className={clsx('hidden px-2 text-xs text-green-400 ease-in', {
              'group-hover:flex': copied,
            })}
          >
            {T.copied}
          </span>
          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={clsx(
              'hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex',
              {
                'border-green-400': copied,
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
