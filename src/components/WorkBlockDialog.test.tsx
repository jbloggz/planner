import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import WorkBlockDialog from './WorkBlockDialog';
import { workBlockColor } from '../types';

const mockTask = { id: 1, days: 5, title: 'foo', color: 'blue' as workBlockColor, description: 'bar', startDate: '2025-01-01' };

describe('WorkBlockDialog', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the dialog', () => {
    const container = render(<WorkBlockDialog task={mockTask} onClose={() => {}} />).container;
    render(<WorkBlockDialog task={mockTask} onClose={() => {}} />);
    expect(container.querySelector('dialog')).not.toBeNull();
  });

  it('renders the title input', () => {
    const { getByLabelText } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} />);
    expect(getByLabelText('Title')).not.toBeNull();
  });

  it('renders the description textarea', () => {
    const { getByLabelText } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} />);
    expect(getByLabelText('Description')).not.toBeNull();
  });

  it('renders the days input', () => {
    const { getByLabelText } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} />);
    expect(getByLabelText('Days')).not.toBeNull();
  });

  it('renders the save button', () => {
    const { getByText } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} />);
    expect(getByText('Save')).not.toBeNull();
  });

  it('renders the dialog with open prop', () => {
    const { container } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} open={true} />);
    expect(container.querySelector('dialog')?.hasAttribute('open')).toBe(true);
  });

  it('does not render the dialog when open prop is false', () => {
    const { container } = render(<WorkBlockDialog task={mockTask} onClose={() => {}} open={false} />);
    expect(container.querySelector('dialog')?.hasAttribute('open')).toBe(false);
  });
});
