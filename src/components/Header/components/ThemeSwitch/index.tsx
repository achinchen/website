'use client';

import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      aria-label="Toggle Theme Mode"
      type="button"
      className="rounded border-none bg-transparent p-2 text-1.25em text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
      onClick={toggle}
    >
      {isDark ? (
        <span className="i-mdi-white-balance-sunny" />
      ) : (
        <span className="i-mdi-moon-waning-crescent rotate--45" />
      )}
    </button>
  );
};

export default ThemeSwitch;
