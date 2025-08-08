import getOgImageUrl from './index';

describe('getOgImageUrl', () => {
  it('should return the provided image URL when one is given', () => {
    const customImage = 'https://example.com/custom-image.jpg';
    expect(getOgImageUrl('Test Title', customImage)).toBe(customImage);
  });

  it('should return the default OG image when no custom image is provided', () => {
    expect(getOgImageUrl('Test Title')).toBe('/og-image.jpg');
  });
});
