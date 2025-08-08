import { getTitle } from './index';
import { SITE } from '~/configs';

describe('getTitle', () => {
  it('should return site name when no page title is provided', () => {
    expect(getTitle()).toBe(SITE.titleShort);
  });

  it('should combine page title with site name', () => {
    const pageTitle = 'Test Page';
    expect(getTitle(pageTitle)).toBe(`${pageTitle} | ${SITE.titleShort}`);
  });
});
