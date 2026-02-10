import type { ColumnId } from '../../api/configurations/types.ts';


export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'ToDo' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];
