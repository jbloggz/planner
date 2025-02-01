import { describe, expect, it, Mock, vi } from 'vitest';
import { render } from '@testing-library/react';
import DraggableWorkBlock from './DraggableWorkBlock';
import { workBlockColor } from '../types';
import Draggable, { DraggableData, DraggableEvent, DraggableProps } from 'react-draggable';

const mockTask = { id: 1, days: 5, title: 'foo', color: 'blue' as workBlockColor, description: 'bar', startDate: '2025-01-01' };

vi.mock('react-draggable', () => {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    }),
  };
});

const draggableInstance = (): DraggableProps => {
  const calls = (Draggable as unknown as Mock).mock.calls;
  return calls[calls.length - 1][0];
};

describe('DraggableWorkBlock', () => {
  it('renders without crashing', () => {
    const { container } = render(<DraggableWorkBlock task={mockTask} nrows={10} ncols={10} row={2} col={3} zoom={1} onTaskMove={() => {}} />);
    const draggableElement = container.querySelector('div');
    expect(draggableElement).not.toBeNull();
  });

  it('calls onChange with correct parameters when dragged', () => {
    const handleChange = vi.fn();
    render(<DraggableWorkBlock task={mockTask} nrows={10} ncols={100} row={2} col={3} zoom={1} onTaskMove={handleChange} />);
    expect(draggableInstance().grid).toEqual([80, 85]);
    draggableInstance().onStop({} as DraggableEvent, { x: 240, y: 170 } as DraggableData);
    expect(handleChange).toHaveBeenCalledWith(1, 4, 6);
  });
});
