import { useState } from 'react';
import TopBar from './components/TopBar';
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker';
import PlannerTable from './components/PlannerTable';
import { Person } from './types';

/* istanbul ignore next -- @preserve */
function POC() {
  const [zoom, setZoom] = useState(4);

  const today = new Date();
  const defaultDateRange = {
    startDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
    endDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 4, 0),
  };
  const [dateValue, setDateValue] = useState<DateRangeType>(defaultDateRange);

  const [plan, setPlan] = useState<Person[]>([
    {
      id: 23,
      name: 'Hart Hagerty',
      avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
      role: 'Frontend',
      tasks: [
        { id: 123, title: 'ENG-41: Seek first', description: 'foo', days: 2, startDate: '2025-02-02', color: 'blue' },
        { id: 456, title: 'ENG-42: Seek first', description: 'bar', days: 4, startDate: '2025-02-06', color: 'green' },
      ],
    },
    {
      id: 25,
      name: 'Brice Swyre',
      avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
      role: 'Backend',
      tasks: [{ id: 789, title: 'ENG-43: Seek first', description: 'baz', days: 5, startDate: '2025-01-26', color: 'red' }],
    },
    {
      id: 54,
      name: 'Marjy Ferencz',
      avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
      role: 'QA',
      tasks: [],
    },
  ]);

  const moveTask = (taskId: number, oldPersonId: number, newPersonId: number, date: string) => {
    const taskToMove = plan.find((person) => person.id === oldPersonId)?.tasks.find((task) => task.id === taskId);
    if (!taskToMove) {
      return;
    }

    const newPlan = plan.map((person) => {
      if (person.id === oldPersonId) {
        person.tasks = person.tasks.filter((task) => task.id !== taskId);
      }
      if (person.id === newPersonId) {
        person.tasks.push({ ...taskToMove, startDate: date });
      }
      return person;
    });
    setPlan(newPlan);
  };

  return (
    <>
      <TopBar />
      <Datepicker value={dateValue} onChange={(newValue) => newValue && setDateValue(newValue)} />
      <div className="container mx-auto px-10 my-3 max-w-full">
        <input type="range" min={0} max={14} value={zoom} onChange={(ev) => setZoom(+ev.currentTarget.value)} className="range my-5 w-64" />
        <div className="overflow-x-scroll">
          <PlannerTable
            startDate={dateValue.startDate ?? defaultDateRange.startDate}
            endDate={dateValue.endDate ?? defaultDateRange.endDate}
            people={plan}
            zoom={14 - zoom}
            onTaskMove={(taskId, oldPersonId, newPersonId, date) => moveTask(taskId, oldPersonId, newPersonId, date)}
          />
        </div>
      </div>
    </>
  );
}

export default POC;
