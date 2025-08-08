# Product Requirements Document (PRD): Internationalization (i18n) Support

## Introduction/Overview

This feature introduces internationalization (i18n) to the website, enabling support for both English and Traditional Chinese. The goal is to reach a broader, global audience—specifically staffers in the software industry—by providing content and UI in their preferred language. The system will detect the user's browser language and redirect them to the appropriate language version on their first visit, with English as the default fallback. A language switcher will be available in the header, allowing users to toggle between languages at any time.

## Goals

- Support English and Traditional Chinese throughout the website (content and UI).
- Automatically detect and redirect users based on browser language preference (one-time redirect).
- Default to English if the preferred language is unavailable.
- Provide a simple, maintainable content structure using language suffixes (e.g., `post.en.mdx`, `post.zh.mdx`).
- Allow users to switch languages via a header button with flag icons.
- Ensure a seamless experience for global users, especially those in the software industry.

## User Stories

- As a global user, I want to view the website in my preferred language so I can understand the content easily.
- As a user whose browser is set to Traditional Chinese, I want to be redirected to the Chinese version on my first visit so I don’t have to switch manually.
- As a user, I want to switch languages at any time using a button in the header so I can read content in another language.
- As a user, if an article is not available in my preferred language, I want to see the English version by default.

## Functional Requirements

1. The system must support two languages: English (`en`) and Traditional Chinese (`zh`).
2. All content files must use a language suffix in their filename (e.g., `post-title.en.mdx`, `post-title.zh.mdx`).
3. On a user's first visit, the system must detect the browser's preferred language and redirect to the corresponding language version if available.
4. If the preferred language is not available for a specific article, the system must fall back to English.
5. The language switcher must be present in the header on all pages and use flag icons for each language.
6. Switching the language must update both the UI and the content to the selected language, redirecting to the same article in the other language if available.
7. The user's language preference must be remembered for future visits (e.g., via cookies or localStorage).
8. The system must use best practices for SEO, including `hreflang` tags and localized URLs if possible.
9. All UI elements (navigation, buttons, etc.) must be translated and use the appropriate language based on the user's selection.

## Non-Goals (Out of Scope)

- Support for additional languages (e.g., Simplified Chinese, RTL languages) is not included at this stage.
- Automatic machine translation of content is not required.
- Language switcher in the footer or other locations is not required.

## Design Considerations

- The language switcher should be a simple button or dropdown in the header, using recognizable flag icons for English and Traditional Chinese.
- The content folder should be organized for easy maintenance, with language suffixes for all articles and no duplicate articles in different folders.
- UI should remain clean and uncluttered, with minimal design changes for i18n.

## Technical Considerations

- Integrate with the existing Next.js and Contentlayer setup.
- Ensure that routing and static generation work correctly for both languages.
- Use browser APIs to detect language and Next.js middleware or similar for redirection.
- Store user language preference in a cookie or localStorage.
- Implement SEO best practices for multilingual sites.

## Success Metrics

- Increased visits from regions using Traditional Chinese.
- Positive user feedback regarding language accessibility.
- No broken links or missing content in either language.
- Smooth language switching experience with correct content and UI updates.

## Open Questions

- Should the URL structure include the language code (e.g., `/en/posts/...`, `/zh/posts/...`) or remain flat with language detection?
- Are there any analytics requirements for tracking language preference or usage?
