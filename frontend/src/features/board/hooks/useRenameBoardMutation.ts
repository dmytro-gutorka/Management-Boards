import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBoard } from '../../../api/boards';

export function useRenameBoardMutation(boardId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) => updateBoard(boardId, newName),
    onSuccess: (updated) => {
      qc.setQueryData(['board', boardId], updated);
      qc.invalidateQueries({ queryKey: ['boards'] });
    },
  });
}
