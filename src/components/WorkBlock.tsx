import { getCellWidth } from "../util";

type workBlockColor =
  | 'red'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'stone'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

interface WorkBlockProps {
  id: number;
  color: workBlockColor;
  title: string;
  days: number;
  zoom?: number;
}

function WorkBlock(props: WorkBlockProps) {
  const width = getCellWidth(props.zoom) * props.days;
  return (
    <div id={props.id.toString()} style={{width: width, height: '60px'}} className={`cursor-pointer whitespace-nowrap text-xs font-semibold bg-opacity-50 bg-${props.color}-500 rounded-md flex flex-col gap-1 p-2`}>
      <div className="overflow-hidden text-ellipsis">{props.title}</div>
      <div className="overflow-hidden text-ellipsis">{props.days} days</div>
    </div>
  );
}

export default WorkBlock;
