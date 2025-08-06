# Task List: Series and Tags Implementation

*Generated from PRD: prd-series-and-tags.md*

## Relevant Files

- `contentlayer.config.ts` - Update schema to support series and tags metadata
- `src/helpers/get-posts/index.ts` - Extend post fetching logic for series and tags
- `src/helpers/get-posts/index.test.ts` - Unit tests for enhanced post fetching
- `src/app/[lang]/posts/series/[slug]/page.tsx` - Series detail page component
- `src/app/[lang]/posts/tags/[slug]/page.tsx` - Tag detail page component  
- `src/app/[lang]/series/page.tsx` - Series listing page component
- `src/app/[lang]/tags/page.tsx` - Tags listing page component
- `src/components/Post/Content/components/SeriesInfo/index.tsx` - Series metadata display component
- `src/components/Post/Content/components/SeriesInfo/index.test.tsx` - Unit tests for SeriesInfo component
- `src/components/Post/Content/components/TagsList/index.tsx` - Tags display component
- `src/components/Post/Content/components/TagsList/index.test.tsx` - Unit tests for TagsList component
- `src/components/Post/Content/components/SeriesNavigation/index.tsx` - Previous/Next series navigation
- `src/components/Post/Content/components/SeriesNavigation/index.test.tsx` - Unit tests for SeriesNavigation component
- `src/helpers/get-series/index.ts` - Utility functions for series operations
- `src/helpers/get-series/index.test.ts` - Unit tests for series helpers
- `src/helpers/get-tags/index.ts` - Utility functions for tags operations (normalization, etc.)
- `src/helpers/get-tags/index.test.ts` - Unit tests for tags helpers
- `src/app/sitemap.ts` - Update sitemap to include series and tag pages

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Series and tags must maintain i18n support with existing `/[lang]/` structure
- Tag normalization should be case-insensitive (React = react)

## Tasks

- [ ] 1.0 Update Contentlayer Schema and Configuration
  - [ ] 1.1 Add `series`, `seriesSlug`, `seriesOrder`, and `tags` fields to Post schema in `contentlayer.config.ts`
  - [ ] 1.2 Add validation rules for series and tags fields (e.g., tags array normalization)
  - [ ] 1.3 Create Series document type with `seriesName`, `seriesSlug`, `seriesDescription`, `seriesStatus` fields
  - [ ] 1.4 Test schema changes by adding sample frontmatter to existing posts
  - [ ] 1.5 Update TypeScript types for posts to include new fields

- [ ] 2.0 Implement Series Functionality  
  - [ ] 2.1 Create `src/helpers/get-series/index.ts` with functions to get all series, get series by slug, get posts in series
  - [ ] 2.2 Implement series ordering logic (by seriesOrder field, fallback to published date)
  - [ ] 2.3 Create `src/app/[lang]/posts/series/[slug]/page.tsx` for individual series pages
  - [ ] 2.4 Create `src/app/[lang]/series/page.tsx` for series listing page
  - [ ] 2.5 Implement series completion status logic (ongoing vs complete)
  - [ ] 2.6 Add series metadata generation for pages (title, description, etc.)
  - [ ] 2.7 Write unit tests for series helper functions

- [ ] 3.0 Implement Tags Functionality
  - [ ] 3.1 Create `src/helpers/get-tags/index.ts` with tag normalization and retrieval functions
  - [ ] 3.2 Implement case-insensitive tag normalization (React = react)
  - [ ] 3.3 Create `src/app/[lang]/posts/tags/[slug]/page.tsx` for individual tag pages
  - [ ] 3.4 Create `src/app/[lang]/tags/page.tsx` for tags listing page
  - [ ] 3.5 Implement tag filtering and sorting for tag pages
  - [ ] 3.6 Add tag metadata generation for pages
  - [ ] 3.7 Write unit tests for tag helper functions

- [ ] 4.0 Create UI Components and Navigation
  - [ ] 4.1 Create `SeriesInfo` component to display series name, position, and status
  - [ ] 4.2 Create `SeriesNavigation` component for Previous/Next navigation within series
  - [ ] 4.3 Create `TagsList` component to display article tags with links
  - [ ] 4.4 Integrate series and tags components into `src/components/Post/Content/index.tsx`
  - [ ] 4.5 Add series and tags navigation links to header/footer as needed
  - [ ] 4.6 Ensure all components are responsive and accessible (WCAG 2.1 AA)
  - [ ] 4.7 Write unit tests for all new UI components
  - [ ] 4.8 Test components with both English and Chinese content

- [ ] 5.0 Update Feeds, Sitemap and SEO Integration
  - [ ] 5.1 Update `src/app/sitemap.ts` to include series and tag pages
  - [ ] 5.2 Update RSS feed generation to include series and tag metadata
  - [ ] 5.3 Update JSON feed to include series and tag information
  - [ ] 5.4 Add proper meta tags and structured data for series/tag pages
  - [ ] 5.5 Ensure cross-language series synchronization (same publication dates)
  - [ ] 5.6 Test feed output includes proper series/tag representation
  - [ ] 5.7 Verify SEO meta tags are correctly generated for all new page types 