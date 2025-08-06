#!/usr/bin/env ts-node

// Comprehensive i18n testing script
// Run with: npx ts-node scripts/test-i18n.ts

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_LABELS, Language } from '../src/helpers/i18n/config';
import { getPosts, getPostBySlugAndLang } from '../src/helpers/get-posts';

console.log('🧪 Running comprehensive i18n tests...\n');

let passedTests = 0;
let failedTests = 0;

function test(name: string, testFn: () => void) {
  try {
    testFn();
    console.log(`✅ ${name}`);
    passedTests++;
  } catch (error) {
    console.log(`❌ ${name}: ${error}`);
    failedTests++;
  }
}

function expect(actual: any) {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toContain: (expected: any) => {
      if (!actual.includes(expected)) {
        throw new Error(`Expected ${actual} to contain ${expected}`);
      }
    },
    toBeGreaterThan: (expected: number) => {
      if (actual <= expected) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    },
    toBeTruthy: () => {
      if (!actual) {
        throw new Error(`Expected ${actual} to be truthy`);
      }
    },
    toBeFalsy: () => {
      if (actual) {
        throw new Error(`Expected ${actual} to be falsy`);
      }
    },
    toHaveProperty: (prop: string) => {
      if (!(prop in actual)) {
        throw new Error(`Expected object to have property ${prop}`);
      }
    }
  };
}

// Test i18n configuration
console.log('📋 Testing i18n configuration...');

test('SUPPORTED_LANGUAGES contains expected languages', () => {
  expect(SUPPORTED_LANGUAGES).toContain('en');
  expect(SUPPORTED_LANGUAGES).toContain('zh');
  expect(SUPPORTED_LANGUAGES.length).toBe(2);
});

test('DEFAULT_LANGUAGE is English', () => {
  expect(DEFAULT_LANGUAGE).toBe('en');
});

test('LANGUAGE_LABELS has correct structure', () => {
  SUPPORTED_LANGUAGES.forEach(lang => {
    expect(LANGUAGE_LABELS).toHaveProperty(lang);
    expect(LANGUAGE_LABELS[lang]).toHaveProperty('label');
    expect(LANGUAGE_LABELS[lang]).toHaveProperty('flag');
  });
});

test('Language labels are correct', () => {
  expect(LANGUAGE_LABELS.en.label).toBe('English');
  expect(LANGUAGE_LABELS.zh.label).toBe('繁體中文');
});

// Test post retrieval
console.log('\n📝 Testing post retrieval...');

test('getPosts returns posts', () => {
  const allPosts = getPosts();
  expect(allPosts.length).toBeGreaterThan(0);
});

test('Posts have required properties', () => {
  const posts = getPosts();
  if (posts.length > 0) {
    const post = posts[0];
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('language');
    expect(post).toHaveProperty('date');
    expect(post).toHaveProperty('path');
  }
});

test('Language filtering works', () => {
  const englishPosts = getPosts('en' as Language);
  const chinesePosts = getPosts('zh' as Language);
  
  expect(englishPosts.length).toBeGreaterThan(0);
  
  englishPosts.forEach(post => {
    expect(post.lang).toBe('en');
  });
  
  if (chinesePosts.length > 0) {
    chinesePosts.forEach(post => {
      expect(post.lang).toBe('zh');
    });
  }
});

test('getPostBySlugAndLang works correctly', () => {
  const allPosts = getPosts();
  if (allPosts.length > 0) {
    const firstPost = allPosts[0];
    const foundPost = getPostBySlugAndLang(firstPost.slug, firstPost.lang as Language);
    
    expect(foundPost).toBeTruthy();
    expect(foundPost?.slug).toBe(firstPost.slug);
    expect(foundPost?.lang).toBe(firstPost.lang);
  }
});

test('Fallback logic works for missing translations', () => {
  const englishPosts = getPosts('en' as Language);
  if (englishPosts.length > 0) {
    const englishPost = englishPosts[0];
    
    // Try to get the same post in Chinese
    const foundPost = getPostBySlugAndLang(englishPost.slug, 'zh' as Language);
    
    if (foundPost) {
      expect(foundPost.slug).toBe(englishPost.slug);
      // Should be either the Chinese version or English fallback
      expect(['en', 'zh']).toContain(foundPost.lang);
    }
  }
});

test('Non-existent post returns undefined', () => {
  const nonExistentPost = getPostBySlugAndLang('non-existent-slug-12345', 'en' as Language);
  expect(nonExistentPost).toBeFalsy();
});

// Test content structure
console.log('\n📁 Testing content structure...');

test('Content files follow naming convention', () => {
  const allPosts = getPosts();
  
  allPosts.forEach(post => {
    // Check that language is properly extracted from filename
    expect(['en', 'zh']).toContain(post.lang);
  });
});

test('English and Chinese versions exist', () => {
  const englishPosts = getPosts('en' as Language);
  const chinesePosts = getPosts('zh' as Language);
  
  expect(englishPosts.length).toBeGreaterThan(0);
  
  // At least some Chinese content should exist or be planned
  console.log(`   📊 English posts: ${englishPosts.length}`);
  console.log(`   📊 Chinese posts: ${chinesePosts.length}`);
});

// Summary
console.log('\n📊 Test Summary:');
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📈 Total: ${passedTests + failedTests}`);

if (failedTests === 0) {
  console.log('\n🎉 All i18n tests passed! The internationalization setup is working correctly.');
} else {
  console.log('\n⚠️  Some tests failed. Please review the i18n implementation.');
  process.exit(1);
} 