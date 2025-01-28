import { cleanup, render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';
import { beforeEach, describe, expect, it } from 'vitest';

describe('SearchInput', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders search input', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('renders with correct input type', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders search icon', () => {
    render(<SearchInput />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
