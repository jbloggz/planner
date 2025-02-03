import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { getCellHeight, getCellWidth } from '../util';
import WorkBlock, { WorkBlockProps } from './WorkBlock';
import WorkBlockDialog from './WorkBlockDialog';
import { Task } from '../types';

interface DraggableWorkBlockProps {
  nrows: number;
  ncols: number;
  row: number;
  col: number;
  onTaskMove: (id: number, row: number, col: number) => void;
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (id: number) => void;
}

function DraggableWorkBlock(props: WorkBlockProps & DraggableWorkBlockProps) {
  const cellHeight = getCellHeight();
  const cellWidth = getCellWidth(props.zoom);
  const ref = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(props.task.title === '');

  return (
    <>
      <Draggable
        key={props.task.id}
        nodeRef={ref}
        grid={[cellWidth, cellHeight]}
        onStop={(_, data) => {
          if (data.x === 0 && data.y === 0) {
            setDialogOpen(true);
          } else {
            props.onTaskMove(props.task.id, props.row + data.y / cellHeight, props.col + data.x / cellWidth);
          }
        }}
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
      <WorkBlockDialog
        task={props.task}
        open={dialogOpen}
        onClose={(task) => {
          setDialogOpen(false);
          props.onTaskUpdate(task);
        }}
        onDelete={props.onTaskDelete}
      />
    </>
  );
}

export default DraggableWorkBlock;
