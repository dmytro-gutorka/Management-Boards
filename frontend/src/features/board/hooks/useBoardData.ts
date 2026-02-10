import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../../../api/boards';

export function useBoardQuery(boardId: string) {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
    enabled: !!boardId,
  });
}
