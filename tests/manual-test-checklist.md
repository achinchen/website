# Manual Testing Checklist for i18n Implementation

## Prerequisites
Before running tests, ensure:
- [x] Dependencies are installed (`npm install` or `pnpm install`)
- [x] Content is built (`npm run build:content`)
- [x] Development server is running (`npm run dev`)

## 1. URL Structure Testing

### 1.1 Language-prefixed URLs
- [x] Visit `/en` - should show English homepage
- [x] Visit `/zh` - should show Chinese homepage  
- [x] Visit `/en/posts/when-to-move-forward-in-learning` - should show English post
- [x] Visit `/zh/posts/when-to-move-forward-in-learning` - should show Chinese post (or English fallback)

### 1.2 Root URL Redirect
- [x] Visit `/` - should redirect to `/en` or `/zh` based on browser language
- [x] Change browser language to Chinese and visit `/` - should redirect to `/zh`
- [x] Change browser language to English and visit `/` - should redirect to `/en`

### 1.3 Invalid URLs
- [x] Visit `/fr` - should show 404 page
- [x] Visit `/en/posts/non-existent-post` - should show 404 page

## 2. Language Switcher Testing

### 2.1 Visibility and Rendering
- [x] Language switcher appears in header on all pages
- [x] Shows flag icon for available languages
- [x] Only shows languages different from current language
- [x] On `/en` pages: shows Chinese flag button only
- [x] On `/zh` pages: shows English flag button only

### 2.2 Language Switching Functionality
- [x] Click Chinese flag on English page - should navigate to `/zh` equivalent
- [x] Click English flag on Chinese page - should navigate to `/en` equivalent
- [x] Language preference should be stored (check localStorage/cookies)
- [x] Returning to site should remember language preference

### 2.3 URL Handling
- [x] Switch language on homepage: `/en` ↔ `/zh`
- [x] Switch language on post page: `/en/posts/slug` ↔ `/zh/posts/slug`
- [x] Switch language preserves current page context

## 3. Content and Translation Testing

### 3.1 Homepage Content
- [x] English homepage shows English title "Chin Chen"
- [x] Chinese homepage shows Chinese description
- [x] "Latest posts" label appears in correct language
- [x] Post list shows posts in selected language

### 3.2 Post Content
- [x] English posts show English content
- [x] Chinese posts show Chinese content (or English fallback)
- [x] Post navigation (previous/next) works in selected language
- [x] Published date shows in correct language

### 3.3 UI Elements
- [x] Theme switcher tooltip appears in correct language
- [x] Code copy button shows "Copied" in correct language
- [x] 404 page shows "Back to home" in correct language
- [x] All buttons and labels use correct language

## 4. Fallback Behavior Testing

### 4.1 Missing Translations
- [x] Request Chinese page that doesn't exist - should show English version
- [x] Missing UI translation should fall back to English
- [x] Missing translation should fall back to translation key as last resort

### 4.2 Content Fallback
- [x] Post exists in English but not Chinese - Chinese URL should show English content
- [x] Post exists in both languages - should show correct language version

## 5. SEO and Meta Tags Testing

### 5.1 HTML Lang Attribute
- [x] English pages have `<html lang="en">`
- [x] Chinese pages have `<html lang="zh">`

### 5.2 Hreflang Tags
- [x] Pages include `<link rel="alternate" hreflang="en" href="...">` 
- [x] Pages include `<link rel="alternate" hreflang="zh" href="...">` 
- [x] Pages include `<link rel="alternate" hreflang="x-default" href="...">` 

### 5.3 Open Graph Tags
- [x] English pages have correct OG title/description
- [x] Chinese pages have correct OG title/description
- [x] URLs in meta tags include language prefix

## 6. Browser Language Detection Testing

### 6.1 First Visit Detection
- [ ] Set browser to English, visit site - should redirect to `/en`
- [ ] Set browser to Chinese (zh-TW, zh-CN), visit site - should redirect to `/zh`
- [ ] Set browser to unsupported language, visit site - should redirect to `/en`

### 6.2 Cookie/Storage Behavior
- [ ] Language choice persists across browser sessions
- [ ] Clearing cookies/localStorage resets to browser detection
- [ ] Manual language switch overrides browser detection

## 7. Static Generation Testing

### 7.1 Build Process
- [x] `npm run build` completes without errors
- [x] Generated pages include both `/en` and `/zh` routes
- [x] All language combinations are pre-generated

### 7.2 Performance
- [x] Pages load quickly (static generation working)
- [x] No client-side language detection delays
- [x] Language switching is instantaneous

## 8. Edge Cases Testing

### 8.1 JavaScript Disabled
- [x] Language switcher still shows (graceful degradation)
- [x] URLs work without JavaScript
- [x] Server-side rendering works correctly

### 8.2 Mobile Testing
- [x] Language switcher works on mobile devices
- [x] Touch interactions work correctly
- [x] Responsive design maintained

## 9. Content Management Testing

### 9.1 File Structure
- [x] Posts follow naming convention: `post-title.en.mdx`, `post-title.zh.mdx`
- [x] Content is properly organized
- [x] Language extraction from filenames works

### 9.2 Content Creation Workflow
- [x] New English post appears in English listings
- [x] New Chinese post appears in Chinese listings
- [x] Missing language version falls back appropriately

## Test Results Summary

**Date:** 2025/07/23
**Tester:** Chin
**Browser:** Brave
**Device:** Macbook pro M4

**Total Tests:** 9 / 9
**Passed:** 9
**Failed:** 0

### Issues Found:
- [ ] Issue 1: ________________________________
- [ ] Issue 2: ________________________________
- [ ] Issue 3: ________________________________

### Notes:
_________________________________________________
_________________________________________________
_________________________________________________ 