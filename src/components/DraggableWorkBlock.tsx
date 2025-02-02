import { useRef } from 'react';
import Draggable from 'react-draggable';
import { getCellHeight, getCellWidth } from '../util';
import WorkBlock, { WorkBlockProps } from './WorkBlock';

interface DraggableWorkBlockProps {
  nrows: number;
  ncols: number;
  row: number;
  col: number;
  onTaskMove: (id: number, row: number, col: number) => void;
}

function DraggableWorkBlock(props: WorkBlockProps & DraggableWorkBlockProps) {
  const cellHeight = getCellHeight();
  const cellWidth = getCellWidth(props.zoom);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      key={props.task.id}
      nodeRef={ref}
      grid={[cellWidth, cellHeight]}
      onStop={(_, data) => props.onTaskMove(props.task.id, props.row + data.y / cellHeight, props.col + data.x / cellWidth)}
      bounds={{
        left: -cellWidth * props.col,
        right: cellWidth * (props.ncols - props.col - 1),
        top: -props.row * cellHeight,
        bottom: (props.nrows - 1 - props.row) * cellHeight,
      }}>
      <div ref={ref}>
        <WorkBlock {...props} />
      </div>
    </Draggable>
  );
}

export default DraggableWorkBlock;
