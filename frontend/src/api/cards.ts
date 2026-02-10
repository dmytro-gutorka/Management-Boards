import { http } from './http';
import type { ApiResponse, Card, ColumnId } from './types';


export async function listCards(boardId: string) {
  const res = await http.get<ApiResponse<Card[]>>(`/boards/${boardId}/cards`);

  return res.data.data;
}

export async function createCard(boardId: string, input: { title: string; description?: string; column?: ColumnId }) {
  const res = await http.post<ApiResponse<Card>>(`/boards/${boardId}/cards`, input);

  return res.data.data;
}

export async function updateCard(
  boardId: string,
  cardId: string,
  patch: Partial<{ title: string; description: string; column: ColumnId; order: number }>,
) {
  const res = await http.patch<ApiResponse<Card>>(`/boards/${boardId}/cards/${cardId}`, patch);

  return res.data.data;
}

export async function deleteCard(boardId: string, cardId: string) {
  const res = await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}/cards/${cardId}`);

  return res.data.data;
}

export async function reorderCards(boardId: string, columns: Record<ColumnId, string[]>) {
  const res = await http.put<ApiResponse<{ ok: true }>>(`/boards/${boardId}/cards/reorder`, { columns });

  return res.data.data;
}
