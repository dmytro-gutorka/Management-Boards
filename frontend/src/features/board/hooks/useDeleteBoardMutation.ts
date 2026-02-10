import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard } from '../../../api/boards';

export function useDeleteBoardMutation(boardId: string, onDeleted: () => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBoard(boardId),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['board', boardId] });
      qc.removeQueries({ queryKey: ['cards', boardId] });
      qc.invalidateQueries({ queryKey: ['boards'] });
      onDeleted();
    },
  });
}
