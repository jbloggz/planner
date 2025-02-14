import { useCallback, useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker';
import PlannerTable from './components/PlannerTable';
import { Plan } from './types';
import { addDays, dateToString } from './util';

interface POCProps {
  plan: Plan;
}

/* istanbul ignore next -- @preserve */
function POC(props: POCProps) {
  const [plan, setPlan] = useState<Plan>(props.plan);

  const [zoom, setZoom] = useState(8);
  const defaultDateRange = {
    startDate: new Date(plan.range.startDate),
    endDate: new Date(plan.range.endDate),
  };
  const [dateValue, setDateValue] = useState<DateRangeType>(defaultDateRange);
  const [jsonPlan, setJsonPlan] = useState(JSON.stringify(plan, null, 2));
  const [history, setHistory] = useState({ index: 0, data: [jsonPlan] });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonPlan,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [jsonPlan]);

  const updatePlan = useCallback((newPlan: Plan) => {
    setPlan(newPlan);
    const newJsonPlan = JSON.stringify(newPlan, null, 2);
    setJsonPlan(newJsonPlan);
    setHistory((h) => ({ index: h.index + 1, data: [...h.data.slice(0, h.index + 1), newJsonPlan] }));
  }, []);

  const undo = useCallback(() => {
    setPlan(JSON.parse(history.data[history.index - 1]));
    setJsonPlan(history.data[history.index - 1]);
    setHistory((h) => ({ index: h.index - 1, data: h.data }));
  }, [history]);

  const redo = useCallback(() => {
    setPlan(JSON.parse(history.data[history.index + 1]));
    setJsonPlan(history.data[history.index + 1]);
    setHistory((h) => ({ index: h.index + 1, data: h.data }));
  }, [history]);

  const moveTask = useCallback(
    (taskId: number, personId: number, date: string) => {
      const newTasks = plan.tasks
        .map((task) => {
          if (task.id === taskId) {
            task.startDate = date;
            task.person = personId;
          }
          return task;
        })
        .toSorted((a, b) => {
          if (a.person !== b.person) {
            return (a.person ?? 0) - (b.person ?? 0);
          }
          if (a.id === taskId) {
            return -1;
          }
          if (b.id === taskId) {
            return 1;
          }
          return a.startDate.localeCompare(b.startDate);
        });

      for (let i = 0; i < newTasks.length; i++) {
        for (let j = i + 1; j < newTasks.length; j++) {
          const aStart = new Date(newTasks[i].startDate);
          const aEnd = addDays(aStart, newTasks[i].days);
          const bStart = new Date(newTasks[j].startDate);
          const bEnd = addDays(bStart, newTasks[j].days);
          if (aStart < bEnd && bStart < aEnd && newTasks[i].person === newTasks[j].person) {
            newTasks[j].startDate = dateToString(aEnd);
          }
        }
      }

      updatePlan({ ...plan, tasks: newTasks });
    },
    [plan, updatePlan]
  );

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
            onTaskMove={(taskId, personId, date) => moveTask(taskId, personId, date)}
            onTaskUpdate={(task) => updatePlan({ ...plan, tasks: plan.tasks.map((t) => (t.id === task.id ? task : t)) })}
            onTaskAdd={(task) => updatePlan({ ...plan, tasks: [...plan.tasks, task] })}
            onTaskDelete={(taskId) => updatePlan({ ...plan, tasks: plan.tasks.filter((task) => task.id !== taskId) })}
            onDecreaseStart={() => setDateValue({ startDate: addDays(dateValue.startDate ?? '', -5), endDate: dateValue.endDate })}
            onIncreaseEnd={() => setDateValue({ startDate: dateValue.startDate, endDate: addDays(dateValue.endDate ?? '', 5) })}
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
