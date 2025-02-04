import { useState } from 'react';
import { Task, workBlockColor } from '../types';

interface WorkBlockDialogProps {
  task: Task;
  open?: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (id: number) => void;
}

function WorkBlockDialog(props: WorkBlockDialogProps) {
  const [task, setTask] = useState(props.task);

  const saveTask = () => {
    if (task == props.task) {
      props.onClose();
      return;
    }
    props.onSave(task);
  };

  return (
    <dialog className="modal" open={props.open} onClose={saveTask}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => {
              e.preventDefault();
              props.onClose();
            }}>
            ✕
          </button>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              required
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.currentTarget.value })}
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              required
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.currentTarget.value })}
              className="textarea textarea-bordered"></textarea>
          </label>
          <label className="form-control w-full max-w-16">
            <div className="label">
              <span className="label-text">Days</span>
            </div>
            <input
              type="number"
              value={task.days}
              onChange={(e) => setTask({ ...task, days: +e.currentTarget.value })}
              required
              min={1}
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full max-w-16">
            <div className="label">
              <span className="label-text">Color</span>
            </div>
            <select
              className="select select-bordered w-52"
              value={task.color}
              onChange={(e) => setTask({ ...task, color: e.currentTarget.value as workBlockColor })}>
              <option className="text-red-500 text-opacity-80" value="red">
                Red
              </option>
              <option className="text-slate-500 text-opacity-80" value="slate">
                Slate
              </option>
              <option className="text-gray-500 text-opacity-80" value="gray">
                Gray
              </option>
              <option className="text-zinc-500 text-opacity-80" value="zinc">
                Zinc
              </option>
              <option className="text-stone-500 text-opacity-80" value="stone">
                Stone
              </option>
              <option className="text-orange-500 text-opacity-80" value="orange">
                Orange
              </option>
              <option className="text-amber-500 text-opacity-80" value="amber">
                Amber
              </option>
              <option className="text-yellow-500 text-opacity-80" value="yellow">
                Yellow
              </option>
              <option className="text-lime-500 text-opacity-80" value="lime">
                Lime
              </option>
              <option className="text-green-500 text-opacity-80" value="green">
                Green
              </option>
              <option className="text-emerald-500 text-opacity-80" value="emerald">
                Emerald
              </option>
              <option className="text-teal-500 text-opacity-80" value="teal">
                Teal
              </option>
              <option className="text-cyan-500 text-opacity-80" value="cyan">
                Cyan
              </option>
              <option className="text-sky-500 text-opacity-80" value="sky">
                Sky
              </option>
              <option className="text-blue-500 text-opacity-80" value="blue">
                Blue
              </option>
              <option className="text-indigo-500 text-opacity-80" value="indigo">
                Indigo
              </option>
              <option className="text-violet-500 text-opacity-80" value="violet">
                Violet
              </option>
              <option className="text-purple-500 text-opacity-80" value="purple">
                Purple
              </option>
              <option className="text-fuchsia-500 text-opacity-80" value="fuchsia">
                Fuchsia
              </option>
              <option className="text-pink-500 text-opacity-80" value="pink">
                Pink
              </option>
              <option className="text-rose-500 text-opacity-80" value="rose">
                Rose
              </option>
            </select>
          </label>
          <div className="flex flex-row mt-5">
            <button className="btn">Save</button>
            <div className="flex-grow"></div>
            {props.onDelete && (
              <button className="btn btn-error opacity-60" onClick={() => props.onDelete && props.onDelete(props.task.id)}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default WorkBlockDialog;
