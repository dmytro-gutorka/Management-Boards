import { useMemo, useState } from 'react';
import type { Card } from '../../../api/configurations/types';
import { cardsToColumns, columnsToIds, type UiColumns } from '../utils/cardsToColumns';
import { useReorderCardsMutation } from './useReorderCardsMutation';

const isCard = (v: Card | undefined | null): v is Card => !!v;

function sanitizeColumns(cols: UiColumns): UiColumns {
  return {
    todo: cols.todo.filter(isCard),
    in_progress: cols.in_progress.filter(isCard),
    done: cols.done.filter(isCard),
  };
}

export function useUiColumns(boardId: string, cards: Card[] | undefined) {
  const serverColumns = useMemo(() => cardsToColumns(cards ?? []), [cards]);

  const [localState, setLocalState] = useState<{ boardId: string; cols: UiColumns } | null>(null);

  const uiColumns = localState && localState.boardId === boardId ? localState.cols : serverColumns;
  const reorderMutation = useReorderCardsMutation(boardId);

  const onReorder = (next: UiColumns) => {
    const safe = sanitizeColumns(next);

    setLocalState({ boardId, cols: safe });

    reorderMutation.mutate(columnsToIds(safe), {
      onSuccess: () => {
        setLocalState(null);
      },
      onError: () => {
        setLocalState(null);
      },
    });
  };

  return {
    serverColumns,
    uiColumns,
    onReorder,
    isReordering: reorderMutation.isPending,
  };
}
