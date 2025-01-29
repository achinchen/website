import clsx from 'clsx';
import { STYLE, SNS, SNSType } from './constants';

const SocialApps = () => {
  return Object.entries(SNS).map(([type, url]) => (
    <a
      key={type}
      className="text-sm text-gray-500 transition-colors hover:text-gray-700"
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      <span className="sr-only">{type}</span>
      <span className={clsx('h-6 w-6 fill-current  transition-colors', STYLE[type as SNSType])} />
    </a>
  ));
};

export default SocialApps;
