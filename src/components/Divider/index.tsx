type Props = {
  className?: string;
};

export default function Divider({ className = '' }: Props) {
  return <div className={`my-8 text-0.75rem color-gray-500 dark:color-gray-400 ${className}`}>{'//////'}</div>;
}
