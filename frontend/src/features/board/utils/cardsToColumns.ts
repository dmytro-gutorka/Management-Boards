import type { Card, ColumnId } from '../../../api/configurations/types';

export type UiColumns = Record<ColumnId, Card[]>;

export function cardsToColumns(cards: Card[]): UiColumns {
  const base: UiColumns = { todo: [], in_progress: [], done: [] };

  for (const c of cards) base[c.column].push(c);

  (Object.keys(base) as ColumnId[]).forEach((k) => {
    base[k].sort((a, b) => a.order - b.order);
  });

  return base;
}

export function columnsToIds(cols: UiColumns): Record<ColumnId, string[]> {
  return {
    todo: cols.todo.filter(Boolean).map((c) => c.id),
    in_progress: cols.in_progress.filter(Boolean).map((c) => c.id),
    done: cols.done.filter(Boolean).map((c) => c.id),
  };
}