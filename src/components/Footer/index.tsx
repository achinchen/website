import Link from '~/components/Link';
import SocialApps from './components/SocialApps';
import { CREDIT } from './constants';

const date = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        <SocialApps />
      </div>
      <div className="mb-8 flex text-sm text-gray-500 transition-colors space-x-2 dark:text-gray-400">
        <div>{`Copyright © 2024 - ${date}`}</div>
        <Link href="/">{CREDIT}</Link>
      </div>
    </footer>
  );
}
