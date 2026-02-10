import { http } from './configurations/http.ts';
import type { ApiResponse, Board } from './configurations/types.ts';
import { unwrap } from './configurations/unwrap.ts';


export async function listBoards() {
  return unwrap(await http.get<ApiResponse<Board[]>>('/boards'));
}

export async function createBoard(name: string) {
  return unwrap(await http.post<ApiResponse<Board>>('/boards', { name }));
}

export async function getBoard(boardId: string) {
  return unwrap(await http.get<ApiResponse<Board>>(`/boards/${boardId}`));
}

export async function updateBoard(boardId: string, name: string) {
  return unwrap(await http.patch<ApiResponse<Board>>(`/boards/${boardId}`, { name }));
}

export async function deleteBoard(boardId: string) {
  return unwrap(await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}`));
}
