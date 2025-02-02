import { Task } from '../types';
import { getCellWidth } from '../util';

export interface WorkBlockProps {
  task: Task;
  zoom?: number;
}

function WorkBlock(props: WorkBlockProps) {
  const width = getCellWidth(props.zoom) * props.task.days - 9;
  return (
    <div
      id={props.task.id.toString()}
      style={{ width: width, height: '60px' }}
      className={`card cursor-pointer whitespace-nowrap text-xs font-semibold bg-opacity-50 bg-${props.task.color}-500 rounded-md flex flex-col gap-1 p-2`}>
      <div className="overflow-hidden text-ellipsis">{props.task.title}</div>
      <div className="overflow-hidden text-ellipsis">{props.task.days} days</div>
    </div>
  );
}

export default WorkBlock;
