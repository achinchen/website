# Manual Testing Checklist for i18n Implementation

## Prerequisites
Before running tests, ensure:
- [ ] Dependencies are installed (`npm install` or `pnpm install`)
- [ ] Content is built (`npm run build:content`)
- [ ] Development server is running (`npm run dev`)

## 1. URL Structure Testing

### 1.1 Language-prefixed URLs
- [ ] Visit `/en` - should show English homepage
- [ ] Visit `/zh` - should show Chinese homepage  
- [ ] Visit `/en/posts/when-to-move-forward-in-learning` - should show English post
- [ ] Visit `/zh/posts/when-to-move-forward-in-learning` - should show Chinese post (or English fallback)

### 1.2 Root URL Redirect
- [ ] Visit `/` - should redirect to `/en` or `/zh` based on browser language
- [ ] Change browser language to Chinese and visit `/` - should redirect to `/zh`
- [ ] Change browser language to English and visit `/` - should redirect to `/en`

### 1.3 Invalid URLs
- [ ] Visit `/fr` - should show 404 page
- [ ] Visit `/en/posts/non-existent-post` - should show 404 page

## 2. Language Switcher Testing

### 2.1 Visibility and Rendering
- [ ] Language switcher appears in header on all pages
- [ ] Shows flag icon for available languages
- [ ] Only shows languages different from current language
- [ ] On `/en` pages: shows Chinese flag button only
- [ ] On `/zh` pages: shows English flag button only

### 2.2 Language Switching Functionality
- [ ] Click Chinese flag on English page - should navigate to `/zh` equivalent
- [ ] Click English flag on Chinese page - should navigate to `/en` equivalent
- [ ] Language preference should be stored (check localStorage/cookies)
- [ ] Returning to site should remember language preference

### 2.3 URL Handling
- [ ] Switch language on homepage: `/en` ↔ `/zh`
- [ ] Switch language on post page: `/en/posts/slug` ↔ `/zh/posts/slug`
- [ ] Switch language preserves current page context

## 3. Content and Translation Testing

### 3.1 Homepage Content
- [ ] English homepage shows English title "Chin Chen"
- [ ] Chinese homepage shows Chinese description
- [ ] "Latest posts" label appears in correct language
- [ ] Post list shows posts in selected language

### 3.2 Post Content
- [ ] English posts show English content
- [ ] Chinese posts show Chinese content (or English fallback)
- [ ] Post navigation (previous/next) works in selected language
- [ ] Published date shows in correct language

### 3.3 UI Elements
- [ ] Theme switcher tooltip appears in correct language
- [ ] Code copy button shows "Copied" in correct language
- [ ] 404 page shows "Back to home" in correct language
- [ ] All buttons and labels use correct language

## 4. Fallback Behavior Testing

### 4.1 Missing Translations
- [ ] Request Chinese page that doesn't exist - should show English version
- [ ] Missing UI translation should fall back to English
- [ ] Missing translation should fall back to translation key as last resort

### 4.2 Content Fallback
- [ ] Post exists in English but not Chinese - Chinese URL should show English content
- [ ] Post exists in both languages - should show correct language version

## 5. SEO and Meta Tags Testing

### 5.1 HTML Lang Attribute
- [ ] English pages have `<html lang="en">`
- [ ] Chinese pages have `<html lang="zh">`

### 5.2 Hreflang Tags
- [ ] Pages include `<link rel="alternate" hreflang="en" href="...">` 
- [ ] Pages include `<link rel="alternate" hreflang="zh" href="...">` 
- [ ] Pages include `<link rel="alternate" hreflang="x-default" href="...">` 

### 5.3 Open Graph Tags
- [ ] English pages have correct OG title/description
- [ ] Chinese pages have correct OG title/description
- [ ] URLs in meta tags include language prefix

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
- [ ] `npm run build` completes without errors
- [ ] Generated pages include both `/en` and `/zh` routes
- [ ] All language combinations are pre-generated

### 7.2 Performance
- [ ] Pages load quickly (static generation working)
- [ ] No client-side language detection delays
- [ ] Language switching is instantaneous

## 8. Edge Cases Testing

### 8.1 JavaScript Disabled
- [ ] Language switcher still shows (graceful degradation)
- [ ] URLs work without JavaScript
- [ ] Server-side rendering works correctly

### 8.2 Mobile Testing
- [ ] Language switcher works on mobile devices
- [ ] Touch interactions work correctly
- [ ] Responsive design maintained

## 9. Content Management Testing

### 9.1 File Structure
- [ ] Posts follow naming convention: `post-title.en.mdx`, `post-title.zh.mdx`
- [ ] Content is properly organized
- [ ] Language extraction from filenames works

### 9.2 Content Creation Workflow
- [ ] New English post appears in English listings
- [ ] New Chinese post appears in Chinese listings
- [ ] Missing language version falls back appropriately

## Test Results Summary

**Date:** _____________  
**Tester:** _____________  
**Browser:** _____________  
**Device:** _____________  

**Total Tests:** _____ / _____  
**Passed:** _____  
**Failed:** _____  

### Issues Found:
- [ ] Issue 1: ________________________________
- [ ] Issue 2: ________________________________
- [ ] Issue 3: ________________________________

### Notes:
_________________________________________________
_________________________________________________
_________________________________________________ 