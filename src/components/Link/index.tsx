import { default as NextLink } from 'next/link';

export type Props = React.ComponentPropsWithoutRef<'a'>;

const Link = ({ href, children, ...props }: Props) => {
  if (!href) return null;

  const isInternalLink = href.startsWith('/');
  const isAnchorLink = href.startsWith('#');

  if (isInternalLink) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
      {children}
      {typeof children === 'string' && <span className="i-mdi-launch ml-1 inline-block h-4 w-4 color-inherit" />}
    </a>
  );
};

export default Link;
