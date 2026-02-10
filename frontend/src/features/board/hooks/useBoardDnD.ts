import { useCallback, useMemo } from 'react';
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { ColumnId } from '../../../api/configurations/types';
import { getColumnIds } from '../utils/getColumnIds.ts';
import { cloneColumns } from '../utils/cloneColumns.ts';
import type { ColumnProp, UseBoardDnDArgs, UseBoardDnDResult } from '../types/common.types.ts';

export function useBoardDnD({ columns, onReorder }: UseBoardDnDArgs): UseBoardDnDResult {
  const columnIds = useMemo(() => getColumnIds(), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const cardToColumn = useMemo(() => {
    const map = new Map<string, ColumnId>();
    for (const colId of columnIds) {
      for (const card of columns[colId]) map.set(card.id, colId);
    }
    return map;
  }, [columns, columnIds]);

  const isColumnId = useCallback(
    (id: string): id is ColumnId => (columnIds as string[]).includes(id),
    [columnIds]
  );

  const resolveTargetColumn = useCallback(
    (overId: string, fallback: ColumnId): ColumnId => {
      if (isColumnId(overId)) return overId;

      return cardToColumn.get(overId) ?? fallback;
    },
    [cardToColumn, isColumnId]
  );

  const totalCards = useMemo(() => {
    return columnIds.reduce((sum, id) => sum + columns[id].length, 0);
  }, [columns, columnIds]);

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const activeId = String(e.active.id);
      const overId = e.over?.id ? String(e.over.id) : null;
      if (!overId) return;

      const fromCol = cardToColumn.get(activeId);
      if (!fromCol) return;

      const toCol = resolveTargetColumn(overId, fromCol);

      const next = cloneColumns(columns, columnIds);

      const fromIdx = next[fromCol].findIndex((c: ColumnProp) => c.id === activeId);
      if (fromIdx < 0) return;

      const [moved] = next[fromCol].splice(fromIdx, 1);

      if (toCol === fromCol) {
        const toIdx = next[toCol].findIndex((c: ColumnProp) => c.id === overId);
        const targetIdx = toIdx >= 0 ? toIdx : next[toCol].length;
        next[toCol] = arrayMove(next[toCol], fromIdx, targetIdx);

        onReorder(next);
        return;
      }

      const toIdx = next[toCol].findIndex((c: ColumnProp) => c.id === overId);
      const insertIdx = toIdx >= 0 ? toIdx : next[toCol].length;

      next[toCol].splice(insertIdx, 0, { ...moved, column: toCol });

      onReorder(next);
    },
    [cardToColumn, resolveTargetColumn, columns, columnIds, onReorder]
  );

  return {
    sensors,
    onDragEnd,
    columnIds,
    totalCards,
    isEmpty: totalCards === 0,
  };
}
