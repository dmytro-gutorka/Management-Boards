import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoard } from '../../../api/boards';

export function useCreateBoardMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createBoard(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['boards'] });
    },
  });
}
