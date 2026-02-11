import { useCallback, useMemo, useState } from 'react';
import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { ColumnId } from '../../../api/configurations/types';
import { getColumnIds } from '../utils/getColumnIds.ts';
import { cloneColumns } from '../utils/cloneColumns.ts';
import type { ColumnProp, UseBoardDnDArgs, UseBoardDnDResult } from '../types/common.types.ts';

export function useBoardDnD({ columns, onReorder }: UseBoardDnDArgs): UseBoardDnDResult {
  const columnIds = useMemo(() => getColumnIds(), []);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const cardToColumn = useMemo(() => {
    const map = new Map<string, ColumnId>();
    for (const colId of columnIds) {
      for (const card of columns[colId]) {
        if (!card) continue;
        map.set(card.id, colId);
      }
    }
    return map;
  }, [columns, columnIds]);

  const isColumnId = useCallback(
    (id: string): id is ColumnId => (columnIds as string[]).includes(id),
    [columnIds],
  );

  const resolveTargetColumn = useCallback(
    (overId: string, fallback: ColumnId): ColumnId => {
      if (isColumnId(overId)) return overId;
      return cardToColumn.get(overId) ?? fallback;
    },
    [cardToColumn, isColumnId],
  );

  const totalCards = useMemo(() => {
    return columnIds.reduce((sum, id) => sum + columns[id].length, 0);
  }, [columns, columnIds]);

  const activeCard = useMemo(() => {
    if (!activeId) return null;
    for (const colId of columnIds) {
      const found = columns[colId].find((c) => c?.id === activeId);
      if (found) return found as ColumnProp;
    }
    return null;
  }, [activeId, columns, columnIds]);

  const onDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  }, []);

  const onDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const currentActiveId = String(e.active.id);
      const overId = e.over?.id ? String(e.over.id) : null;

      setActiveId(null);

      if (!overId || currentActiveId === overId) return;

      const fromCol = cardToColumn.get(currentActiveId);
      if (!fromCol) return;

      const toCol = resolveTargetColumn(overId, fromCol);

      const next = cloneColumns(columns, columnIds);

      const fromIdx = next[fromCol].findIndex((c: ColumnProp) => c?.id === currentActiveId);
      if (fromIdx < 0) return;

      if (toCol === fromCol) {
        const toIdx = next[toCol].findIndex((c: ColumnProp) => c?.id === overId);
        if (toIdx < 0) return;

        next[toCol] = arrayMove(next[toCol], fromIdx, toIdx);
        onReorder(next);
        return;
      }

      const [moved] = next[fromCol].splice(fromIdx, 1);
      if (!moved) return;

      const toIdx = next[toCol].findIndex((c: ColumnProp) => c?.id === overId);
      const insertIdx = toIdx >= 0 ? toIdx : next[toCol].length;

      next[toCol].splice(insertIdx, 0, { ...moved, column: toCol });

      onReorder(next);
    },
    [cardToColumn, resolveTargetColumn, columns, columnIds, onReorder],
  );

  return {
    sensors,
    onDragStart,
    onDragCancel,
    onDragEnd,
    columnIds,
    totalCards,
    isEmpty: totalCards === 0,
    activeCard,
  };
}
