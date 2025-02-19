import { useState } from 'react';
import { Person, Task } from '../types';
import { dateToString, getCellHeight, getCellWidth, toEpochDays } from '../util';
import SearchInput from './SearchInput';
import DraggableWorkBlock from './DraggableWorkBlock';
import WorkBlock from './WorkBlock';
import WorkBlockDialog from './WorkBlockDialog';

interface PlannerTableProps {
  startDate: Date;
  endDate: Date;
  people: Person[];
  tasks: Task[];
  zoom: number;
  onTaskMove: (taskId: number, personId: number, date: string) => void;
  onTaskUpdate: (task: Task) => void;
  onTaskAdd: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onDecreaseStart: () => void;
  onIncreaseEnd: () => void;
}

function PlannerTable(props: PlannerTableProps) {
  const [newTask, setNewTask] = useState<Task | null>(null);

  const days = Array.from({ length: toEpochDays(props.endDate) - toEpochDays(props.startDate) + 1 })
    .map((_, index) => {
      const date = new Date(props.startDate);
      date.setDate(date.getDate() + index);
      return date;
    })
    .filter((day) => day.getDay() !== 0 && day.getDay() !== 6);
  const months = days.reduce((acc, day) => {
    const month = day.toLocaleString('en-US', { month: 'long' });
    if (!acc.has(month)) {
      acc.set(month, 0);
    }
    acc.set(month, acc.get(month) + 1);
    return acc;
  }, new Map());

  const cellWidth = getCellWidth(props.zoom);

  return (
    <>
      <table className="table order-collapse text-nowrap table-pin-cols table-fixed">
        <thead>
          <tr>
            <th className="w-64 text-right">
              <button className="btn btn-ghost btn-xs" onClick={props.onDecreaseStart}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
              </button>
            </th>
            {Array.from(months.entries()).map(([name, count]) => (
              <td className="overflow-hidden overflow-ellipsis" colSpan={count} style={{ width: cellWidth * count }} key={name}>
                {name}
              </td>
            ))}
            <th>
              <button className="btn btn-ghost btn-xs" onClick={props.onIncreaseEnd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </th>
          </tr>
          <tr className="text-center">
            <th>
              <SearchInput />
            </th>
            {days.map((day) => (
              <td className="w-8 overflow-hidden overflow-ellipsis" key={day.toISOString()}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {day.getDate()}
              </td>
            ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {props.people.map((person, rowIndex) => (
            <tr key={person.name} style={{ height: getCellHeight() }}>
              <th>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={person.avatar} alt={person.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{person.name}</div>
                    <div className="text-sm opacity-50">{person.role}</div>
                  </div>
                </div>
              </th>
              {days.map((day, colIndex) => (
                <td
                  key={day.toISOString()}
                  onClick={() => {
                    if (
                      props.tasks.filter(
                        (task) =>
                          task.person === person.id &&
                          toEpochDays(task.startDate) <= toEpochDays(day) &&
                          toEpochDays(task.startDate) + task.days > toEpochDays(day)
                      ).length === 0
                    ) {
                      setNewTask({
                        id: new Date().getTime(),
                        person: person.id,
                        title: '',
                        description: '',
                        days: 1,
                        startDate: dateToString(day),
                        color: 'gray',
                      });
                    }
                  }}>
                  {props.tasks
                    .filter((task) => task.person === person.id && toEpochDays(task.startDate) === toEpochDays(day))
                    .map((task) => (
                      <DraggableWorkBlock
                        key={task.id}
                        task={task}
                        zoom={props.zoom}
                        row={rowIndex}
                        col={colIndex}
                        nrows={props.people.length}
                        ncols={days.length}
                        onTaskMove={(id, row, col) => props.onTaskMove(id, props.people[row].id, dateToString(days[col]))}
                        onTaskUpdate={props.onTaskUpdate}
                        onTaskDelete={props.onTaskDelete}
                      />
                    ))}

                  {colIndex === 0 &&
                    props.tasks
                      .filter(
                        (task) =>
                          task.person === person.id &&
                          toEpochDays(task.startDate) < toEpochDays(day) &&
                          toEpochDays(task.startDate) + task.days >= toEpochDays(day)
                      )
                      .map((task) => (
                        <div key={task.id} style={{ transform: `translate(${cellWidth * (toEpochDays(task.startDate) - toEpochDays(day))}px)` }}>
                          <WorkBlock task={task} zoom={props.zoom} />
                        </div>
                      ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {newTask && (
        <WorkBlockDialog
          task={newTask}
          open
          onClose={() => setNewTask(null)}
          onSave={(task) => {
            props.onTaskAdd(task);
            setNewTask(null);
          }}
        />
      )}
    </>
  );
}

export default PlannerTable;
