import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reorderCards } from '../../../api/cards';
import type { ColumnId } from '../../../api/configurations/types';

export function useReorderCardsMutation(boardId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (cols: Record<ColumnId, string[]>) => reorderCards(boardId, cols),
    onSettled: () => qc.invalidateQueries({ queryKey: ['cards', boardId] }),
  });
}
