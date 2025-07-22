import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_LABELS } from '../config';

describe('i18n configuration', () => {
  test('SUPPORTED_LANGUAGES contains expected languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(SUPPORTED_LANGUAGES).toContain('zh');
    expect(SUPPORTED_LANGUAGES).toHaveLength(2);
  });

  test('DEFAULT_LANGUAGE is English', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  test('LANGUAGE_LABELS has entries for all supported languages', () => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      expect(LANGUAGE_LABELS).toHaveProperty(lang);
      expect(LANGUAGE_LABELS[lang]).toHaveProperty('label');
      expect(LANGUAGE_LABELS[lang]).toHaveProperty('flag');
    });
  });

  test('English language label is correct', () => {
    expect(LANGUAGE_LABELS.en.label).toBe('English');
    expect(LANGUAGE_LABELS.en.flag).toBe('🇬🇧');
  });

  test('Chinese language label is correct', () => {
    expect(LANGUAGE_LABELS.zh.label).toBe('繁體中文');
    expect(LANGUAGE_LABELS.zh.flag).toBe('🇹🇼');
  });
}); 