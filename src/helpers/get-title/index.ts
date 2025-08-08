import { SITE } from '~/configs';

/**
 * Generates a page title with the site name
 * @param pageTitle The title of the current page
 * @returns Full page title with site name
 */
export function getTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return SITE.titleShort;
  }
  return `${pageTitle} | ${SITE.titleShort}`;
}
