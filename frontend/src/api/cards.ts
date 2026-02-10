import { http } from './configurations/http.ts';
import type { ApiResponse, Card, ColumnId } from './configurations/types.ts';
import { unwrap } from './configurations/unwrap.ts';


export async function listCards(boardId: string) {
  const cards = await http.get<ApiResponse<Card[]>>(`/boards/${boardId}/cards`);

  return unwrap(cards)
}

export async function createCard(boardId: string, input: { title: string; description?: string; column?: ColumnId }) {
  const createdCard = await http.post<ApiResponse<Card>>(`/boards/${boardId}/cards`, input);

  return unwrap(createdCard)
}

export async function updateCard(
  boardId: string,
  cardId: string,
  patch: Partial<{ title: string; description: string; column: ColumnId; order: number }>,
) {
  const updateCard = await http.patch<ApiResponse<Card>>(`/boards/${boardId}/cards/${cardId}`, patch);

  return unwrap(updateCard)
}

export async function deleteCard(boardId: string, cardId: string) {
  const deletedCard = await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}/cards/${cardId}`);

  return unwrap(deletedCard)
}

export async function reorderCards(boardId: string, columns: Record<ColumnId, string[]>) {
  const reorderedCards = await http.put<ApiResponse<{ ok: true }>>(`/boards/${boardId}/cards/reorder`, { columns });

  return unwrap(reorderedCards)
}
