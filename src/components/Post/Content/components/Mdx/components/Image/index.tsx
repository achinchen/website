import { ImageProps, default as NextImage } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function Image({ src, height, width, base64, alt, ...otherProps }: Props) {
  if (!src) return null;

  if (typeof src === 'string' && (!height || !width)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} height={height} width={width} alt={alt} {...otherProps} />;
  }

  return (
    <NextImage
      layout="responsive"
      src={src}
      alt={alt}
      height={height}
      width={width}
      sizes="(min-width: 40em) 40em, 100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
    />
  );
}
