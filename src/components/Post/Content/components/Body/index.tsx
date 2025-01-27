type Props = {
  children: React.ReactNode;
};

const PostBody = ({ children }: Props) => {
  return <div className="mx-auto leading-loose transition-colors dark:text-dark">{children}</div>;
};

export default PostBody;
