import { H1, H2, H3, H4, H5, H6 } from './components/Heading';
import Image from './components/Image';
import Link from '~/components/Link';
import Pre from './components/Pre';

const MdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  a: Link,
  img: Image,
};

export default MdxComponents;
