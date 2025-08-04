/**
 * @jest-environment jsdom
 */

import { getBrowserLanguage, getUserLanguage, setUserLanguage, translate, getTranslations } from '../index';
import { DEFAULT_LANGUAGE } from '../config';

// Mock localStorage is already set up in jest.setup.js
const mockLocalStorage = window.localStorage as jest.Mocked<Storage>;

describe('i18n utilities', () => {
  beforeEach(() => {
    // Clear mocks
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    
    // Reset document.cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
    
    // Reset navigator.lang
    Object.defineProperty(navigator, 'language', {
      writable: true,
      value: 'en-US',
    });
  });

  describe('getBrowserLanguage', () => {
    test('returns "zh" for Chinese browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'zh-TW',
        writable: true,
      });
      expect(getBrowserLanguage()).toBe('zh');
    });

    test('returns "en" for English browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'en-US',
        writable: true,
      });
      expect(getBrowserLanguage()).toBe('en');
    });

    test('returns default language for unsupported browser language', () => {
      Object.defineProperty(navigator, 'language', {
        value: 'fr-FR',
        writable: true,
      });
      expect(getBrowserLanguage()).toBe(DEFAULT_LANGUAGE);
    });

    test('returns default language when navigator.lang is unavailable', () => {
      Object.defineProperty(navigator, 'language', {
        value: undefined,
        writable: true,
      });
      expect(getBrowserLanguage()).toBe(DEFAULT_LANGUAGE);
    });
  });

  describe('getUserLanguage', () => {
    test('returns language from localStorage when available', () => {
      mockLocalStorage.getItem.mockReturnValue('zh');
      expect(getUserLanguage()).toBe('zh');
    });

    test('returns language from cookie when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      document.cookie = 'lang=zh';
      expect(getUserLanguage()).toBe('zh');
    });

    test('returns browser language when no stored preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      Object.defineProperty(navigator, 'language', {
        value: 'zh-CN',
        writable: true,
      });
      expect(getUserLanguage()).toBe('zh');
    });

    test('returns default language for invalid stored language', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid');
      expect(getUserLanguage()).toBe(DEFAULT_LANGUAGE);
    });

    test('returns language from cookie string on server-side', () => {
      // Test the server-side cookie parsing directly
      expect(getUserLanguage('lang=zh; other=value')).toBe('zh');
      expect(getUserLanguage('other=value; lang=en')).toBe('en');
      expect(getUserLanguage('no-lang-cookie=value')).toBe(DEFAULT_LANGUAGE);
    });
  });

  describe('setUserLanguage', () => {
    test('sets language in localStorage and cookie', () => {
      setUserLanguage('zh');
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('lang', 'zh');
      expect(document.cookie).toContain('lang=zh');
    });
  });

  describe('translate', () => {
    const mockTranslations = {
      en: { hello: 'Hello', missing: 'English fallback' },
      zh: { hello: '你好' },
    };

    test('returns translation in requested language', () => {
      expect(translate('hello', 'zh', mockTranslations)).toBe('你好');
    });

    test('falls back to English when translation missing', () => {
      expect(translate('missing', 'zh', mockTranslations)).toBe('English fallback');
    });

    test('returns key when translation missing in all languages', () => {
      expect(translate('nonexistent', 'zh', mockTranslations)).toBe('nonexistent');
    });

    test('returns English translation when requested language is English', () => {
      expect(translate('hello', 'en', mockTranslations)).toBe('Hello');
    });
  });

  describe('getTranslations', () => {
    const mockTranslations = {
      en: { hello: 'Hello', goodbye: 'Goodbye', english_only: 'English only' },
      zh: { hello: '你好', goodbye: '再見' },
    };

    test('returns merged translations with requested language priority', () => {
      const result = getTranslations('zh', mockTranslations);
      
      expect(result.hello).toBe('你好'); // Chinese version
      expect(result.goodbye).toBe('再見'); // Chinese version
      expect(result.english_only).toBe('English only'); // Fallback to English
    });

    test('returns English translations when requested language is English', () => {
      const result = getTranslations('en', mockTranslations);
      
      expect(result.hello).toBe('Hello');
      expect(result.goodbye).toBe('Goodbye');
      expect(result.english_only).toBe('English only');
    });

    test('handles missing translation object gracefully', () => {
      const incompleteTranslations = {
        en: { hello: 'Hello' },
        zh: {}, // Empty Chinese translations
      };
      
      const result = getTranslations('zh', incompleteTranslations);
      expect(result.hello).toBe('Hello'); // Falls back to English
    });
  });
}); 