import { useQuery } from '@tanstack/react-query';
import { listCards } from '../../../api/cards';

export function useCardsQuery(boardId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['cards', boardId],
    queryFn: () => listCards(boardId),
    enabled: !!boardId && enabled,
  });
}
