import { useCallback, useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker';
import PlannerTable from './components/PlannerTable';
import { Plan } from './types';

/* istanbul ignore next -- @preserve */
function POC() {
  const [zoom, setZoom] = useState(8);

  const today = new Date();
  const defaultDateRange = {
    startDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
    endDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 4, 0),
  };
  const [dateValue, setDateValue] = useState<DateRangeType>(defaultDateRange);

  const [plan, setPlan] = useState<Plan>({
    people: [
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
    ],
    tasks: [
      { id: 123, person: 23, title: 'ENG-41: Seek first', description: 'foo', days: 2, startDate: '2025-02-02', color: 'blue' },
      { id: 456, person: 25, title: 'ENG-42: Seek first', description: 'bar', days: 4, startDate: '2025-01-06', color: 'green' },
      { id: 789, person: 23, title: 'ENG-43: Seek first', description: 'baz', days: 5, startDate: '2025-01-16', color: 'red' },
    ],
  });

  const [jsonPlan, setJsonPlan] = useState(JSON.stringify(plan, null, 2));
  const [history, setHistory] = useState({ index: 0, data: [jsonPlan] });

  useEffect(() => {
    console.log(history);
  }, [history]);

  const updatePlan = useCallback((newPlan: Plan) => {
    setPlan(newPlan);
    const newJsonPlan = JSON.stringify(newPlan, null, 2);
    setJsonPlan(newJsonPlan);
    setHistory((h) => ({ index: h.index + 1, data: [...h.data.slice(0, h.index + 1), newJsonPlan] }));
  }, []);

  const undo = useCallback(() => {
    setPlan(JSON.parse(history.data[history.index - 1]));
    setJsonPlan(JSON.stringify(history.data[history.index - 1], null, 2));
    setHistory((h) => ({ index: h.index - 1, data: h.data }));
  }, [history]);

  const redo = useCallback(() => {
    setPlan(JSON.parse(history.data[history.index + 1]));
    setJsonPlan(JSON.stringify(history.data[history.index + 1], null, 2));
    setHistory((h) => ({ index: h.index + 1, data: h.data }));
  }, [history]);

  return (
    <>
      <TopBar />
      <Datepicker value={dateValue} onChange={(newValue) => newValue && setDateValue(newValue)} />
      <div className="container mx-auto px-10 my-3 max-w-full flex flex-col gap-10 flex-grow">
        <div className="flex gap-5">
          <input type="range" min={0} max={14} value={14 - zoom} onChange={(ev) => setZoom(14 - +ev.currentTarget.value)} className="range my-5 w-64" />
          <div className="flex-grow"></div>
          <button className="btn btn-circle" title="undo" disabled={history.index === 0} onClick={undo}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </button>
          <button className="btn btn-circle" title="redo" disabled={history.index === history.data.length - 1} onClick={redo}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
            </svg>
          </button>
        </div>
        <div className="overflow-x-scroll">
          <PlannerTable
            startDate={dateValue.startDate ?? defaultDateRange.startDate}
            endDate={dateValue.endDate ?? defaultDateRange.endDate}
            people={plan.people}
            tasks={plan.tasks}
            zoom={zoom}
            onTaskMove={(taskId, personId, date) => {
              const newTasks = plan.tasks.map((task) => {
                if (task.id === taskId) {
                  task.startDate = date;
                  task.person = personId;
                }
                return task;
              });
              updatePlan({ ...plan, tasks: newTasks });
            }}
            onTaskUpdate={(task) => updatePlan({ ...plan, tasks: plan.tasks.map((t) => (t.id === task.id ? task : t)) })}
            onTaskAdd={(task) => updatePlan({ ...plan, tasks: [...plan.tasks, task] })}
            onTaskDelete={(taskId) => updatePlan({ ...plan, tasks: plan.tasks.filter((task) => task.id !== taskId) })}
          />
        </div>
        <div className="collapse collapse-arrow border-base-300 bg-base-200 border">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">JSON Model</div>
          <div className="collapse-content">
            <textarea className="textarea w-full font-mono h-[1000px]" value={jsonPlan} onChange={(e) => setJsonPlan(e.target.value)}></textarea>
            <button className="btn rounded float-right" onClick={() => updatePlan(JSON.parse(jsonPlan))}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default POC;
