'use client';

import { H1, H2, H3, H4, H5, H6 } from './components/Heading';
import { useMDXComponent } from '~/hooks';
import Link, { Props as LinkProps } from '~/components/Link';
import Image from './components/Image';
import Pre from './components/Pre';
import Spacer from './components/Spacer';
import { Post } from '~/helpers/get-posts';
import './styles/index.css';

type Props = {
  code: Post['body']['code'];
};

const CUSTOMIZED_COMPONENT = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  a: (props: LinkProps) => (
    <Link
      {...props}
      className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
    />
  ),
  img: Image,
  Spacer,
};

export default function MDX({ code }: Props) {
  const MdxComponent = useMDXComponent(code);
  return <MdxComponent components={CUSTOMIZED_COMPONENT} />;
}
