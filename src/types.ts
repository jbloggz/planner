export type workBlockColor =
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

export interface Task {
  id: number;
  title: string;
  description: string;
  days: number;
  startDate: string;
  color: workBlockColor;
}

export interface Person {
  id: number
  name: string;
  avatar: string;
  role: string;
  tasks: Task[];
}
