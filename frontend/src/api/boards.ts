import { http } from './http';
import type { ApiResponse, Board } from './types';


export async function createBoard(name: string) {
  const res = await http.post<ApiResponse<Board>>('/boards', { name });

  return res.data.data;
}

export async function getBoard(boardId: string) {
  const res = await http.get<ApiResponse<Board>>(`/boards/${boardId}`);

  return res.data.data;
}

export async function updateBoard(boardId: string, name: string) {
  const res = await http.patch<ApiResponse<Board>>(`/boards/${boardId}`, { name });

  return res.data.data;
}

export async function deleteBoard(boardId: string) {
  const res = await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}`);

  return res.data.data;
}
