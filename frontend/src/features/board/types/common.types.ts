import { type DragEndEvent, useSensors } from '@dnd-kit/core';
import type { Card, ColumnId } from '../../../api/configurations/types.ts';

export type ColumnProp = { id: string }

export type UiColumns = Record<ColumnId, Card[]>;

export type UseBoardDnDArgs = {
  columns: UiColumns;
  onReorder: (next: UiColumns) => void;
};

export type UseBoardDnDResult = {
  sensors: ReturnType<typeof useSensors>;
  onDragEnd: (e: DragEndEvent) => void;
  columnIds: ColumnId[];
  totalCards: number;
  isEmpty: boolean;
};