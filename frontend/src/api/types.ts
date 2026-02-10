export type ColumnId = 'todo' | 'in_progress' | 'done';

export type Board = {
  boardId: string;
  name: string;
};

export type Card = {
  id: string;
  boardId: string;
  column: ColumnId;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = { data: T };
