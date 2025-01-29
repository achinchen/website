import Balancer from 'react-wrap-balancer';

type Props = {
  children: React.ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <Balancer
      as="h1"
      className="text-3xl text-gray-800 font-extrabold leading-9 tracking-tight transition-colors md:text-5xl sm:text-4xl dark:text-gray-100 md:leading-14 sm:leading-10"
    >
      {children}
    </Balancer>
  );
};

export default PostTitle;
