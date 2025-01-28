type Props = {
  children: React.ReactNode;
};

const PostBody = ({ children }: Props) => {
  return (
    <div className="dark: mx-auto text-gray-900 leading-loose transition-colors dark:text-gray-100">{children}</div>
  );
};

export default PostBody;
