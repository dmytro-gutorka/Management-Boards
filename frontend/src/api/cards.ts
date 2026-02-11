import type { ApiResponse, Card, ColumnId } from './configurations/types.ts';
import { http } from './configurations/http.ts';
import { unwrap } from './configurations/unwrap.ts';

export async function listCards(boardId: string) {
  return unwrap(await http.get<ApiResponse<Card[]>>(`/boards/${boardId}/cards`));
}

export async function createCard(
  boardId: string,
  input: { title: string; description?: string; column?: ColumnId },
) {
  return unwrap(await http.post<ApiResponse<Card>>(`/boards/${boardId}/cards`, input));
}

export async function updateCard(
  boardId: string,
  cardId: string,
  patch: Partial<{ title: string; description: string; column: ColumnId; order: number }>,
) {
  return unwrap(await http.patch<ApiResponse<Card>>(`/boards/${boardId}/cards/${cardId}`, patch));
}

export async function deleteCard(boardId: string, cardId: string) {
  return unwrap(
    await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}/cards/${cardId}`),
  );
}

export async function reorderCards(boardId: string, columns: Record<ColumnId, string[]>) {
  return unwrap(
    await http.put<ApiResponse<{ ok: true }>>(`/boards/${boardId}/cards/reorder`, { columns }),
  );
}
