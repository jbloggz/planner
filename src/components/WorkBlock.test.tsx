import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import WorkBlock from './WorkBlock';
import { workBlockColor } from '../types';

const mockProps = {
  task: { id: 213, days: 5, title: 'ENG-43: Do the thing', color: 'red' as workBlockColor, description: 'bar', startDate: '2025-01-01' },
};

describe('WorkBlock Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders element with the correct id', () => {
    const container = render(<WorkBlock {...mockProps} />).container;
    // The selector "\\32 13" is the escaped version of "213", because
    // querySelector does not accept numbers as the first character of the id.
    expect(container.querySelector('#\\32 13')).not.toBeNull();
  });

  it('renders with title', () => {
    const container = render(<WorkBlock {...mockProps} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock).not.toBeNull();
    expect(workBlock?.firstChild?.textContent).toBe('ENG-43: Do the thing');
  });

  it('renders with title and days', () => {
    const container = render(<WorkBlock {...mockProps} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock).not.toBeNull();
    expect(workBlock?.firstChild?.textContent).toBe('ENG-43: Do the thing');
    expect(workBlock?.firstChild?.nextSibling?.textContent).toBe('5 days');
  });

  it('has a teal background', () => {
    mockProps.task.color = 'teal';
    const container = render(<WorkBlock {...mockProps} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock?.classList).toContain('bg-teal-500');
  });

  it('has a purple background', () => {
    mockProps.task.color = 'purple';
    const container = render(<WorkBlock {...mockProps} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock?.classList).toContain('bg-purple-500');
  });

  it('has the correct width at default zoom', () => {
    const container = render(<WorkBlock {...mockProps} />).container;
    const workBlock: HTMLElement | null = container.querySelector('#\\32 13');
    expect(workBlock?.style.width).toBe('416px');
  });
});
