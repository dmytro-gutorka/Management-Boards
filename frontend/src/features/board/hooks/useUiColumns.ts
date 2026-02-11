import { useMemo, useState, useCallback } from 'react';
import type { Card } from '../../../api/configurations/types';
import { cardsToColumns, columnsToIds, type UiColumns } from '../utils/cardsToColumns';
import { useReorderCardsMutation } from './useReorderCardsMutation';

type LocalState = {
  boardId: string;
  uiColumns: UiColumns;
};

export function useUiColumns(boardId: string, cards: Card[] | undefined) {
  const serverColumns = useMemo(() => cardsToColumns(cards ?? []), [cards]);

  const [local, setLocal] = useState<LocalState>(() => ({
    boardId,
    uiColumns: serverColumns,
  }));

  if (local.boardId !== boardId) {
    setLocal({ boardId, uiColumns: serverColumns });
  }

  const reorderMutation = useReorderCardsMutation(boardId);

  const onReorder = useCallback(
    (next: UiColumns) => {
      setLocal((prev) => ({ ...prev, uiColumns: next }));
      reorderMutation.mutate(columnsToIds(next));
    },
    [reorderMutation],
  );

  return {
    serverColumns,
    uiColumns: local.uiColumns,
    setUiColumns: (next: UiColumns) => setLocal((prev) => ({ ...prev, uiColumns: next })),
    onReorder,
    isReordering: reorderMutation.isPending,
  };
}
