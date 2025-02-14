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
  person?: number;
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
}

export interface DateRange {
  startDate: string;
  endDate: string;
};

export interface Plan {
  range: DateRange;
  people: Person[];
  tasks: Task[];
}