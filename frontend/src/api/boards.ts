import { http } from './configurations/http.ts';
import type { ApiResponse, Board } from './configurations/types.ts';
import { unwrap } from './configurations/unwrap.ts';


export async function createBoard(name: string) {
  const createdBoard = await http.post<ApiResponse<Board>>('/boards', { name });

  return unwrap(createdBoard);
}

export async function getBoard(boardId: string) {
  const board = await http.get<ApiResponse<Board>>(`/boards/${boardId}`);

  return unwrap(board);
}

export async function updateBoard(boardId: string, name: string) {
  const updatedBoard = await http.patch<ApiResponse<Board>>(`/boards/${boardId}`, { name });

  return unwrap(updatedBoard);
}

export async function deleteBoard(boardId: string) {
  const deletedBoard = await http.delete<ApiResponse<{ deleted: true }>>(`/boards/${boardId}`);

  return unwrap(deletedBoard);
}
