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
  title: string;
  description: string;
  days: number;
  startDate: string;
}

export interface Person {
  name: string;
  avatar: string;
  role: string;
  tasks: Task[];
}
