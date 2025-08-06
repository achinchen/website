type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = React.ComponentPropsWithRef<HeadingLevel> & {
  Component: HeadingLevel;
};

function Heading({ Component, id, children, ...otherProps }: Props) {
  return (
    <Component
      id={id}
      className="group scroll-mt-24 mt-20 mb-6 whitespace-pre-wrap text-gray-800 dark:text-gray-100"
      {...otherProps}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-3 h-6 w-6 inline-flex items-center justify-center rounded-md text-lg no-underline opacity-0 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-100 dark:text-slate-400 hover:text-slate-700 group-hover:opacity-100 hover:shadow dark:ring-slate-400/20 hover:ring-slate-900/10 dark:hover:text-slate-700"
          aria-label="Anchor"
        >
          #
        </a>
      )}
    </Component>
  );
}

export const H1 = (props: React.ComponentPropsWithRef<'h1'>) => <Heading Component="h1" {...props} />;

export const H2 = (props: React.ComponentPropsWithRef<'h2'>) => <Heading Component="h2" {...props} />;

export const H3 = (props: React.ComponentPropsWithRef<'h3'>) => <Heading Component="h3" {...props} />;

export const H4 = (props: React.ComponentPropsWithRef<'h4'>) => <Heading Component="h4" {...props} />;

export const H5 = (props: React.ComponentPropsWithRef<'h5'>) => <Heading Component="h5" {...props} />;

export const H6 = (props: React.ComponentPropsWithRef<'h6'>) => <Heading Component="h6" {...props} />;
