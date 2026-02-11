import { useEffect, useMemo, useState } from 'react';
import type { Card } from '../../../api/configurations/types';
import { cardsToColumns, columnsToIds, type UiColumns } from '../utils/cardsToColumns';
import { useReorderCardsMutation } from './useReorderCardsMutation';

export function useUiColumns(boardId: string, cards: Card[] | undefined) {
  const serverColumns = useMemo(() => cardsToColumns(cards ?? []), [cards]);
  const [uiColumns, setUiColumns] = useState<UiColumns>(serverColumns);

  useEffect(() => {
    setUiColumns(serverColumns);
  }, [serverColumns, boardId]);

  const reorderMutation = useReorderCardsMutation(boardId);

  const onReorder = (next: UiColumns) => {
    setUiColumns(next);
    reorderMutation.mutate(columnsToIds(next));
  };

  return {
    serverColumns,
    uiColumns,
    setUiColumns,
    onReorder,
    isReordering: reorderMutation.isPending,
  };
}
