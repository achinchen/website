import { SITE } from '~/configs';

export default function getOGImageUrl(socialImage: string | null | undefined): string {
  if (!socialImage) return SITE.bannerUrl;
  if (socialImage.startsWith('http')) return socialImage;
  return SITE.fqdn + socialImage;
}
