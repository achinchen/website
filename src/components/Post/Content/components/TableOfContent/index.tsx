'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { getHeadingsBySource } from './utils';
import useHeading from './hooks/use-heading';

type Props = {
  source: string;
};

const T = {
  title: 'TABLE OF CONTENT',
};

const TableOfContent = ({ source }: Props) => {
  const headings = getHeadingsBySource(source);
  const [activeId, setActiveId] = useState<string>();

  const onClick = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  useHeading(setActiveId);

  return (
    <div className="mt-10">
      <p className="mb-5 text-lg text-gray-800 font-semibold transition-colors dark:text-gray-100">{T.title}</p>
      <div className="flex flex-col items-start justify-start">
        {headings.map(({ id, level, text }, index) => {
          return (
            <button
              key={index}
              type="button"
              className={clsx(
                id === activeId
                  ? 'text-primary-500 font-medium hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-gray-500 font-normal dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100',
                level === 3 && 'pl-4',
                'mb-3 border-none bg-transparent text-left text-sm transition-colors hover:underline',
              )}
              onClick={onClick(id)}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableOfContent;
