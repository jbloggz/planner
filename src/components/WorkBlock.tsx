import { workBlockColor } from '../types';
import { getCellWidth } from '../util';
import WorkBlockDialog from './WorkBlockDialog';

interface WorkBlockProps {
  id: number;
  color: workBlockColor;
  title: string;
  days: number;
  zoom?: number;
  open?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

function WorkBlock(props: WorkBlockProps) {
  const width = getCellWidth(props.zoom) * props.days;
  return (
    <div
      onClick={props.onClick}
      id={props.id.toString()}
      style={{ width: width, height: '60px' }}
      className={`cursor-pointer whitespace-nowrap text-xs font-semibold bg-opacity-50 bg-${props.color}-500 rounded-md flex flex-col gap-1 p-2`}>
      <div className="overflow-hidden text-ellipsis">{props.title}</div>
      <div className="overflow-hidden text-ellipsis">{props.days} days</div>
      <WorkBlockDialog id={props.id} open={props.open} onClose={props.onClose} />
    </div>
  );
}

export default WorkBlock;
