# Testing Guide for i18n Implementation

This directory contains tests and testing utilities for the internationalization (i18n) implementation.

## Setup Instructions

### 1. Install Jest Dependencies

To set up the Jest testing environment, run:

```bash
npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

Or with pnpm:

```bash
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

### 2. Verify Configuration Files

Ensure these files exist in the project root:

- `jest.config.js` - Jest configuration (JavaScript - **avoids ts-node dependency**)
- `jest.setup.ts` - Jest setup and mocks (TypeScript)
- `tsconfig.test.json` - Separate TypeScript config for tests
- `package.json` - Updated with test scripts

### 3. Run Tests

Once dependencies are installed:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- LanguageSwitch.test.tsx
```

## Test Structure

### Unit Tests

- `src/helpers/i18n/__tests__/` - Tests for i18n utility functions
- `src/helpers/get-posts/__tests__/` - Tests for post retrieval functions
- `src/components/**/__tests__/` - Tests for React components

### Integration Tests

- `scripts/test-i18n.ts` - Comprehensive integration test script

### Manual Tests

- `tests/manual-test-checklist.md` - Comprehensive manual testing checklist

## Configuration Files

### jest.config.js

JavaScript configuration file for Jest with:

- **No ts-node dependency** - Jest config is in JavaScript
- Next.js integration via `next/jest`
- TypeScript support with `ts-jest` using separate test config
- Path aliases matching `tsconfig.json`
- Coverage thresholds and collection rules
- References `tsconfig.test.json` for TypeScript compilation

### jest.setup.ts

TypeScript setup file with:

- Testing Library DOM matchers
- Next.js router and navigation mocks
- Browser API mocks (localStorage, matchMedia, etc.)
- Console suppression for cleaner test output

### tsconfig.test.json

Separate TypeScript configuration for tests:

- Extends main `tsconfig.json`
- Includes Jest and testing-library types
- Uses CommonJS modules for Jest compatibility
- Includes all test files and Jest setup files
- **Used by ts-jest for TypeScript compilation**

### tsconfig.json (Updated)

Main TypeScript configuration:

- **Excludes test files** to avoid conflicts
- Keeps app build separate from test build
- Maintains Next.js optimizations

## Architecture Benefits

This setup provides the best of both worlds:

✅ **No ts-node dependency** - Jest config is JavaScript  
✅ **TypeScript test files** - Full TypeScript support for tests  
✅ **Separate configurations** - Clean separation between app and test builds  
✅ **Type safety** - Jest, testing-library, and custom types included  
✅ **Performance** - No extra compilation overhead for Jest config

## Running Tests Without Jest

If you prefer not to set up Jest, you can use alternative testing approaches:

### 1. Manual Testing

Use the comprehensive checklist in `manual-test-checklist.md` to verify all functionality.

### 2. Simple Script Testing

Run the integration test script:

```bash
npx ts-node scripts/test-i18n.ts
```

### 3. Browser Testing

Start the development server and test in browser:

```bash
npm run dev
```

Then visit:

- http://localhost:3000/en
- http://localhost:3000/zh
- Test language switching functionality

## Test Coverage Areas

### ✅ Configuration Testing

- Language constants and labels
- Supported languages validation
- Default language settings

### ✅ Utility Function Testing

- Browser language detection
- User language preferences (localStorage/cookies)
- Translation fallback logic
- Server-side vs client-side behavior

### ✅ Content Management Testing

- Post retrieval with language filtering
- Language-based content fallback
- File naming convention validation

### ✅ Component Testing

- Language switcher rendering
- URL-based language detection
- Navigation functionality
- Accessibility compliance

### ✅ Integration Testing

- End-to-end language switching
- URL routing with language prefixes
- SEO meta tags and hreflang
- Static generation verification

## Troubleshooting

### Common Issues

1. **TypeScript errors in tests**
   - Ensure `@types/jest` is installed
   - Check `tsconfig.test.json` includes test files
   - Verify Jest uses separate test config (`tsconfig.test.json`)

2. **Module resolution errors**
   - Check `moduleNameMapper` in `jest.config.js`
   - Ensure path aliases match both `tsconfig.json` and `tsconfig.test.json`
   - Verify imports use correct paths

3. **React component test failures**
   - Ensure `@testing-library/react` is installed
   - Check `jest.setup.ts` includes necessary mocks
   - Verify Next.js mocks are properly configured

4. **Jest configuration issues**
   - Ensure `jest.config.js` references `tsconfig.test.json` in transform
   - Check that `tsconfig.test.json` extends main config
   - Verify test files are excluded from main `tsconfig.json`

5. **ts-node dependency errors**
   - This setup **completely avoids ts-node**
   - Jest config is JavaScript (`jest.config.js`)
   - TypeScript compilation handled by `ts-jest` with `tsconfig.test.json`
   - No additional dependencies required

### Getting Help

If you encounter issues:

1. Check the manual testing checklist first
2. Run the integration test script
3. Verify all dependencies are installed
4. Check Jest configuration matches project structure

## Contributing

When adding new i18n features:

1. Add corresponding unit tests
2. Update the manual testing checklist
3. Update integration test script if needed
4. Ensure all tests pass before submitting
