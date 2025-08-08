type Props = {
  children: React.ReactNode;
};

const PostBody = ({ children }: Props) => {
  return <div className="mx-auto transition-colors prose prose-slate lg:max-w-2xl dark:prose-invert">{children}</div>;
};

export default PostBody;
