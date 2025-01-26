import { cleanup, render, screen } from '@testing-library/react';
import TopBar from './TopBar';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TopBar', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the logo', () => {
    const { container } = render(<TopBar />);
    const logo = container.querySelector('img');
    expect(logo).not.toBeNull();
  });

  it('renders the title', () => {
    render(<TopBar />);
    const title = screen.getByText('Planner');
    expect(title).not.toBeNull();
  });

  it('renders the ThemeToggle component', () => {
    const { container } = render(<TopBar />);
    const themeToggle = container.querySelector('input[type="checkbox"]');
    expect(themeToggle).not.toBeNull();
  });
});
