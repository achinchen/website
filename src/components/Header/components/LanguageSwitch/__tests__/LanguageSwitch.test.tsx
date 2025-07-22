import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitch from '../index';
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '~/helpers/i18n/config';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock i18n helpers
jest.mock('~/helpers/i18n', () => ({
  setUserLanguage: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('LanguageSwitch', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    });
    mockPush.mockClear();
  });

  test('renders language switcher with correct languages', () => {
    mockUsePathname.mockReturnValue('/en');
    
    render(<LanguageSwitch />);
    
    // Should show button for the non-current language (zh)
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    expect(chineseButton).toBeInTheDocument();
    
    // Should not show button for current language (en)
    const englishButton = screen.queryByRole('button', { name: LANGUAGE_LABELS.en.label });
    expect(englishButton).not.toBeInTheDocument();
  });

  test('detects current language from URL path', () => {
    mockUsePathname.mockReturnValue('/zh/posts/some-post');
    
    render(<LanguageSwitch />);
    
    // Should show button for English (non-current)
    const englishButton = screen.getByRole('button', { name: LANGUAGE_LABELS.en.label });
    expect(englishButton).toBeInTheDocument();
    
    // Should not show button for current language (zh)
    const chineseButton = screen.queryByRole('button', { name: LANGUAGE_LABELS.zh.label });
    expect(chineseButton).not.toBeInTheDocument();
  });

  test('switches language when button is clicked', async () => {
    mockUsePathname.mockReturnValue('/en/posts/test-post');
    
    render(<LanguageSwitch />);
    
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    fireEvent.click(chineseButton);
    
    // Should navigate to Chinese version of the same page
    expect(mockPush).toHaveBeenCalledWith('/zh/posts/test-post');
  });

  test('handles URL without language prefix', () => {
    mockUsePathname.mockReturnValue('/posts/test-post');
    
    render(<LanguageSwitch />);
    
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    fireEvent.click(chineseButton);
    
    // Should add language prefix to URL
    expect(mockPush).toHaveBeenCalledWith('/zh/posts/test-post');
  });

  test('displays correct flag icons', () => {
    mockUsePathname.mockReturnValue('/en');
    
    render(<LanguageSwitch />);
    
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    expect(chineseButton).toHaveTextContent(LANGUAGE_LABELS.zh.flag);
  });

  test('has proper accessibility attributes', () => {
    mockUsePathname.mockReturnValue('/en');
    
    render(<LanguageSwitch />);
    
    const nav = screen.getByRole('navigation', { name: 'Language Switcher' });
    expect(nav).toBeInTheDocument();
    
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    expect(chineseButton).toHaveAttribute('aria-label', LANGUAGE_LABELS.zh.label);
  });

  test('defaults to English when no language in URL', () => {
    mockUsePathname.mockReturnValue('/');
    
    render(<LanguageSwitch />);
    
    // Should show Chinese button (since current is default English)
    const chineseButton = screen.getByRole('button', { name: LANGUAGE_LABELS.zh.label });
    expect(chineseButton).toBeInTheDocument();
  });
}); 