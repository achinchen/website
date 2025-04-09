export const SNS = {
  email: 'greeting.to.chin@gmail.com',
  github: 'https://github.com/achinchen',
  threads: 'https://www.threads.net/@a.chin.logs',
} as const;

export type SNSType = keyof typeof SNS;

export const STYLE: { [key in SNSType]: string } = {
  email: 'hover:text-primary-600 dark:hover:text-primary-400 i-mdi-email',
  github: 'hover:text-gray-500 dark:hover:text-gray-400 i-mdi-github',
  threads: 'hover:text-gray-500 dark:hover:text-gray-400 i-custom-sns-threads',
} as const;
