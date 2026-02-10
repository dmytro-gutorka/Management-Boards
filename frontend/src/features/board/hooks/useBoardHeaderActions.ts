import type { Board } from '../../../api/configurations/types';
import { useDeleteBoardMutation } from './useDeleteBoardMutation.ts';
import { useRenameBoardMutation } from './useRenameBoardMutation.ts';
import { useSnack } from './useSnackbarQueue.ts';

type Args = {
  board: Board;
  onDeleted: () => void;
  onCloseConfirm: () => void;
  onStopEditing: () => void;
};

export function useBoardHeaderActions({ board, onDeleted, onCloseConfirm, onStopEditing }: Args) {
  const { snack, success, error, close } = useSnack();

  const renameMutation = useRenameBoardMutation(board.boardId);
  const deleteMutation = useDeleteBoardMutation(board.boardId, () => {
    onCloseConfirm();
    onDeleted();
  });

  const rename = (trimmedName: string) => {
    renameMutation.mutate(trimmedName, {
      onSuccess: () => {
        onStopEditing();
        success('Board renamed');
      },
      onError: () => error('Failed to rename board'),
    });
  };

  const remove = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => success('Board deleted'),
      onError: () => error('Failed to delete board'),
    });
  };

  return {
    snack,
    closeSnack: close,

    rename,
    remove,

    isRenaming: renameMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
