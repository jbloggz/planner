import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  const lightTheme = 'light';
  const darkTheme = 'dark';

  beforeEach(() => {
    cleanup();
  });

  it('renders ThemeToggle component', () => {
    render(<ThemeToggle lightTheme={lightTheme} darkTheme={darkTheme} />);
    const toggleInput = screen.getByRole('checkbox');
    expect(toggleInput).not.toBeNull();
  });

  it('initial theme is set based on prefers-color-scheme', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(<ThemeToggle lightTheme={lightTheme} darkTheme={darkTheme} />);
    const toggleInput: HTMLInputElement = screen.getByRole('checkbox');
    expect(toggleInput.checked).toBe(false);
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle lightTheme={lightTheme} darkTheme={darkTheme} />);
    const toggleInput: HTMLInputElement = screen.getByRole('checkbox');
    fireEvent.click(toggleInput);
    expect(toggleInput.checked).toBe(true);
    fireEvent.click(toggleInput);
    expect(toggleInput.checked).toBe(false);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<ThemeToggle lightTheme={lightTheme} darkTheme={darkTheme} className={customClass} />);
    const label = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'label');
    expect(label.classList).toContain(customClass);
  });
});
