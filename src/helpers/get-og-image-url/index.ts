/**
 * Generates an Open Graph image URL for social sharing
 * @param title The title to display on the OG image
 * @param image Optional custom image URL to use as background
 * @returns URL for the OG image
 */
export default function getOgImageUrl(title: string, image?: string): string {
  // If a custom image is provided, use it
  if (image) {
    return image;
  }

  // Otherwise, use the default OG image
  return '/og-image.jpg';
}