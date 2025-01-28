import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'import', '@unocss'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'typescript',
          trailingComma: 'all',
          printWidth: 120,
          tabWidth: 2,
          semi: true,
          bracketSpacing: true,
          endOfLine: 'auto',
        },
      ],
    },
  }),
];

export default eslintConfig;
