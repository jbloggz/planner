import { render } from '@testing-library/react';
import PlannerTable from './PlannerTable';
import { describe, it, expect, vi } from 'vitest';
import { Task, workBlockColor } from '../types';

/* Mock the react-draggable component */
vi.mock('react-draggable', () => {
  const mockDraggable = () => <div />;
  return { default: vi.fn().mockImplementation(mockDraggable) };
});

describe('PlannerTable', () => {
  const props = {
    startDate: new Date('2025-01-17'),
    endDate: new Date('2025-04-23'),
    people: [
      {
        id: 23,
        name: 'Hart Hagerty',
        avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
        role: 'Frontend',
        tasks: [
          { id: 123, title: 'ENG-41: Seek first', days: 2, description: 'foo', startDate: '2025-02-02', color: 'blue' },
          { id: 456, title: 'ENG-42: Seek first', days: 4, description: 'bar', startDate: '2025-02-06', color: 'green' },
        ] as Task[],
      },
      {
        id: 25,
        name: 'Brice Swyre',
        avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
        role: 'Backend',
        tasks: [{ id: 789, title: 'ENG-43: Seek first', days: 5, description: 'baz', startDate: '2025-01-26', color: 'red' }] as Task[],
      },
      {
        id: 54,
        name: 'Marjy Ferencz',
        avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
        role: 'QA',
        tasks: [],
      },
    ],
    tasks: [
      { id: 123, person: 23, title: 'ENG-41: Seek first', days: 2, description: 'foo', startDate: '2025-02-02', color: 'blue' as workBlockColor },
      { id: 456, person: 23, title: 'ENG-42: Seek first', days: 4, description: 'bar', startDate: '2025-02-06', color: 'green' as workBlockColor },
      { id: 789, person: 25, title: 'ENG-43: Seek first', days: 5, description: 'baz', startDate: '2025-01-26', color: 'red' as workBlockColor },
    ],
  };

  it('renders a table', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('displays the correct number of header rows', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    expect(container.querySelectorAll('thead tr')).toHaveLength(2);
  });

  it('displays the correct number of data rows', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    expect(container.querySelectorAll('tbody tr')).toHaveLength(3);

    const props2 = {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      people: props.people.slice(0, 2),
      tasks: props.tasks,
    };

    expect(
      render(
        <PlannerTable
          {...props2}
          zoom={1}
          onTaskMove={vi.fn()}
          onTaskAdd={() => {}}
          onTaskUpdate={() => {}}
          onTaskDelete={() => {}}
          onDecreaseStart={() => {}}
          onIncreaseEnd={() => {}}
        />
      ).container.querySelectorAll('tbody tr')
    ).toHaveLength(2);
  });

  it('displays a header column with an empty top column, then a search input and the people below', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    expect(container.querySelector('thead tr:first-child th:first-child')?.innerHTML).not.toEqual('');
    expect(container.querySelector('thead tr:last-child th:first-child input')).not.toBeNull();
    const people = container.querySelectorAll('tbody tr th');
    expect(people).toHaveLength(3);
    expect(people[0].textContent).toEqual('Hart HagertyFrontend');
    expect(people[1].textContent).toEqual('Brice SwyreBackend');
    expect(people[2].textContent).toEqual('Marjy FerenczQA');
  });

  it('displays the correct number of days', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    const days = container.querySelectorAll('thead tr:last-child td');
    expect(days).toHaveLength(70);
  });

  it('displays the correct number of months', () => {
    const { container } = render(
      <PlannerTable
        {...props}
        zoom={1}
        onTaskMove={vi.fn()}
        onTaskAdd={() => {}}
        onTaskUpdate={() => {}}
        onTaskDelete={() => {}}
        onDecreaseStart={() => {}}
        onIncreaseEnd={() => {}}
      />
    );
    const days = container.querySelectorAll('thead tr:first-child td');
    expect(days).toHaveLength(4);
  });
});
