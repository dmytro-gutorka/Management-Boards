import type { DragCancelEvent, DragStartEvent, useSensors } from '@dnd-kit/core';
import { type DragEndEvent } from '@dnd-kit/core';
import type { Card, ColumnId } from '../../../api/configurations/types.ts';

export type ColumnProp = { id: string };

export type UiColumns = Record<ColumnId, Card[]>;

export type UseBoardDnDArgs = {
  columns: UiColumns;
  onReorder: (next: UiColumns) => void;
};

export type UseBoardDnDResult = {
  onDragStart: (e: DragStartEvent) => void;
  onDragCancel: (e: DragCancelEvent) => void;
  sensors: ReturnType<typeof useSensors>;
  onDragEnd: (e: DragEndEvent) => void;
  columnIds: ColumnId[];
  totalCards: number;
  isEmpty: boolean;
  activeCard: ColumnProp | null;
};
