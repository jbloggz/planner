import Draggable from 'react-draggable';
import { Person } from '../types';
import { getCellWidth } from '../util';
import SearchInput from './SearchInput';
import WorkBlock from './WorkBlock';

interface PlannerTableProps {
  startDate: Date;
  endDate: Date;
  people: Person[];
  zoom: number;
}

function PlannerTable(props: PlannerTableProps) {
  const days = Array.from({ length: (props.endDate.getTime() - props.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1 }).map((_, index) => {
    const date = new Date(props.startDate);
    date.setDate(date.getDate() + index);
    date.setHours(0, 0, 0, 0);
    return date;
  });
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
    <table className="table order-collapse text-nowrap table-pin-cols table-fixed">
      <thead>
        <tr>
          <th className="w-64"></th>
          {Array.from(months.entries()).map(([name, count]) => (
            <td className="overflow-hidden overflow-ellipsis" colSpan={count} style={{ width: cellWidth * count }} key={name}>
              {name}
            </td>
          ))}
          <th></th>
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
        {props.people.map((person) => (
          <tr key={person.name} className="h-[85px]">
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
            {days.map((day, index) => (
              <td key={day.toISOString()}>
                {person.tasks
                  .filter((task) => {
                    const taskDate = new Date(task.startDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.getTime() == day.getTime();
                  })
                  .map((task) => (
                    <Draggable key={task.id} grid={[cellWidth, 85]} bounds={{ left: -cellWidth * index, right: cellWidth * 12, top: 0, bottom: 170 }}>
                      <div>
                        <WorkBlock id={task.id} key={task.title} color={task.color} title={task.title} days={task.days} zoom={props.zoom} />
                      </div>
                    </Draggable>
                  ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlannerTable;
