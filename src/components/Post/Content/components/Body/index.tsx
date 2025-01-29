type Props = {
  children: React.ReactNode;
};

const PostBody = ({ children }: Props) => {
  return <div className="prose prose-slate dark:prose-invert mx-auto transition-colors">{children}</div>;
};

export default PostBody;
