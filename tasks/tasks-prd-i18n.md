## Relevant Files

- `content/posts/post-title.en.mdx` - English version of each article.
- `content/posts/post-title.zh.mdx` - Traditional Chinese version of each article.
- `src/helpers/i18n/` - Utility functions and configuration for i18n.
- `src/app/layout.tsx` - Update to support language detection, context, and switcher.
- `src/components/Header/components/LanguageSwitch/` - New component for the language switcher with flag icons.
- `src/helpers/i18n/config.ts` - Language and locale configuration.
- `src/helpers/i18n/index.ts` - i18n helper functions.
- `src/middleware.ts` - Middleware for browser language detection and redirect.
- `public/locales/en/common.json` - English UI translations.
- `public/locales/zh/common.json` - Traditional Chinese UI translations.
- `src/components/Post/Content/index.tsx` - Update to load content based on selected language.
- `src/app/posts/[slug]/page.tsx` - Update to fetch and render the correct language version of posts.
- `next.config.ts` - Update for i18n and SEO (hreflang, etc.).

### Notes

- Unit tests should be placed alongside the code files they are testing (e.g., `LanguageSwitch.test.tsx`).
- Use `npx jest` to run tests.

## Tasks

- [ ] 1.0 Set up content structure for multilingual posts
  - [ ] 1.1 Rename or duplicate existing posts to use `.en.mdx` and `.zh.mdx` suffixes
  - [ ] 1.2 Update Contentlayer config to recognize language suffixes
  - [ ] 1.3 Ensure all new articles are created in both languages
- [ ] 2.0 Implement i18n configuration and utilities
  - [ ] 2.1 Create `src/helpers/i18n/config.ts` for language/locale settings
  - [ ] 2.2 Create `src/helpers/i18n/index.ts` for helper functions (e.g., language detection, translation)
  - [ ] 2.3 Add translation files in `public/locales/en/common.json` and `public/locales/zh/common.json`
- [ ] 3.0 Add browser language detection and redirect
  - [ ] 3.1 Implement middleware in `src/middleware.ts` for one-time redirect based on browser language
  - [ ] 3.2 Store user language preference in cookie or localStorage
- [ ] 4.0 Build the language switcher UI
  - [ ] 4.1 Create `LanguageSwitch` component with flag icons in header
  - [ ] 4.2 Integrate switcher into `src/app/layout.tsx` and `src/components/Header/`
  - [ ] 4.3 Ensure switching updates both UI and content language
- [ ] 5.0 Update content and UI to support i18n
  - [ ] 5.1 Update post rendering logic to load correct language version
  - [ ] 5.2 Update all UI components to use translation files
  - [ ] 5.3 Fallback to English if translation or content is missing
- [ ] 6.0 Implement SEO and best practices
  - [ ] 6.1 Add `hreflang` tags and localized URLs in `next.config.ts`
  - [ ] 6.2 Ensure static generation and routing work for both languages
- [ ] 7.0 Testing and QA
  - [ ] 7.1 Write unit tests for i18n utilities and language switcher
  - [ ] 7.2 Manually test language detection, switching, and fallback behavior
  - [ ] 7.3 Verify SEO tags and localized URLs 