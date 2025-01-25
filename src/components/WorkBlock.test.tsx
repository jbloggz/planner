import { cleanup, render, screen } from '@testing-library/react';
import WorkBlock from './WorkBlock';
import { beforeEach, describe, expect, it } from 'vitest';

describe('WorkBlock Component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders element with the correct id', () => {
    const container = render(<WorkBlock id={213} color={'red'} title={'ENG-43: Do the thing'} days={5} />).container;
    // The selector "\\32 13" is the escaped version of "213", because
    // querySelector does not accept numbers as the first character of the id.
    expect(container.querySelector('#\\32 13')).not.toBeNull();
  });

  it('renders with title', () => {
    const container = render(<WorkBlock id={213} color={'red'} title={'ENG-43: Do the thing'} days={5} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock).not.toBeNull();
    expect(workBlock?.firstChild?.textContent).toBe('ENG-43: Do the thing');
  });

  it('renders with title and days', () => {
    const container = render(<WorkBlock id={213} color={'red'} title={'ENG-43: Do the thing'} days={5} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock).not.toBeNull();
    expect(workBlock?.firstChild?.textContent).toBe('ENG-43: Do the thing');
    expect(workBlock?.firstChild?.nextSibling?.textContent).toBe('5 days');
  });

  it('has a teal background', () => {
    const container = render(<WorkBlock id={213} color={'teal'} title={'ENG-43: Do the thing'} days={5} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock?.classList).toContain('bg-teal-500');
  });

  it('has a purple background', () => {
    const container = render(<WorkBlock id={213} color={'purple'} title={'ENG-43: Do the thing'} days={5} />).container;
    const workBlock = container.querySelector('#\\32 13');
    expect(workBlock?.classList).toContain('bg-purple-500');
  });

  it('has the correct width at default zoom', () => {
    const container = render(<WorkBlock id={213} color={'purple'} title={'ENG-43: Do the thing'} days={5} />).container;
    const workBlock: HTMLElement | null = container.querySelector('#\\32 13');
    expect(workBlock?.style.width).toBe('425px');
  });
});
