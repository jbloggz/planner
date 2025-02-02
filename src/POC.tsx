import { useState } from 'react';
import TopBar from './components/TopBar';
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker';
import PlannerTable from './components/PlannerTable';
import { Person, Task } from './types';

/* istanbul ignore next -- @preserve */
function POC() {
  const [zoom, setZoom] = useState(8);

  const today = new Date();
  const defaultDateRange = {
    startDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
    endDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 4, 0),
  };
  const [dateValue, setDateValue] = useState<DateRangeType>(defaultDateRange);

  const [people, setPeople] = useState<Person[]>([
    {
      id: 23,
      name: 'Hart Hagerty',
      avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
      role: 'Frontend',
    },
    {
      id: 25,
      name: 'Brice Swyre',
      avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
      role: 'Backend',
    },
    {
      id: 54,
      name: 'Marjy Ferencz',
      avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
      role: 'QA',
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 123, person: 23, title: 'ENG-41: Seek first', description: 'foo', days: 2, startDate: '2025-02-02', color: 'blue' },
    { id: 456, person: 25, title: 'ENG-42: Seek first', description: 'bar', days: 4, startDate: '2025-01-06', color: 'green' },
    { id: 789, person: 23, title: 'ENG-43: Seek first', description: 'baz', days: 5, startDate: '2025-01-16', color: 'red' },
  ]);

  const [plan, setPlan] = useState(JSON.stringify({ people, tasks }, null, 2));

  return (
    <>
      <TopBar />
      <Datepicker value={dateValue} onChange={(newValue) => newValue && setDateValue(newValue)} />
      <div className="container mx-auto px-10 my-3 max-w-full flex flex-col gap-10 flex-grow">
        <input type="range" min={0} max={14} value={14 - zoom} onChange={(ev) => setZoom(14 - +ev.currentTarget.value)} className="range my-5 w-64" />
        <div className="overflow-x-scroll">
          <PlannerTable
            startDate={dateValue.startDate ?? defaultDateRange.startDate}
            endDate={dateValue.endDate ?? defaultDateRange.endDate}
            people={people}
            tasks={tasks}
            zoom={zoom}
            onTaskMove={(taskId, personId, date) => {
              console.log(taskId, personId, date);
              const newTasks = tasks.map((task) => {
                if (task.id === taskId) {
                  task.startDate = date;
                  task.person = personId;
                }
                return task;
              });
              setTasks(newTasks);
              setPlan(JSON.stringify({ people, tasks: newTasks }, null, 2));
            }}
          />
        </div>
        <div className="collapse collapse-arrow border-base-300 bg-base-200 border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">JSON Model</div>
          <div className="collapse-content">
            <textarea className="textarea w-full font-mono h-[1000px]" value={plan} onChange={(e) => setPlan(e.target.value)}></textarea>
            <button
              className="btn rounded float-right"
              onClick={() => {
                setPeople(JSON.parse(plan).people);
                setTasks(JSON.parse(plan).tasks);
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default POC;
