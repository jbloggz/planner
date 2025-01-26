import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import WorkBlockDialog from './WorkBlockDialog';

describe('WorkBlockDialog', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the dialog', () => {
    const container = render(<WorkBlockDialog id={213} />).container;
    render(<WorkBlockDialog id={1} />);
    expect(container.querySelector('dialog')).not.toBeNull();
  });

  it('renders the title input', () => {
    const { getByLabelText } = render(<WorkBlockDialog id={1} />);
    expect(getByLabelText('Title')).not.toBeNull();
  });

  it('renders the description textarea', () => {
    const { getByLabelText } = render(<WorkBlockDialog id={1} />);
    expect(getByLabelText('Description')).not.toBeNull();
  });

  it('renders the days input', () => {
    const { getByLabelText } = render(<WorkBlockDialog id={1} />);
    expect(getByLabelText('Days')).not.toBeNull();
  });

  it('renders the save button', () => {
    const { getByText } = render(<WorkBlockDialog id={1} />);
    expect(getByText('Save')).not.toBeNull();
  });

  it('renders the dialog with open prop', () => {
    const { container } = render(<WorkBlockDialog id={1} open={true} />);
    expect(container.querySelector('dialog')?.hasAttribute('open')).toBe(true);
  });

  it('does not render the dialog when open prop is false', () => {
    const { container } = render(<WorkBlockDialog id={1} open={false} />);
    expect(container.querySelector('dialog')?.hasAttribute('open')).toBe(false);
  });
});
