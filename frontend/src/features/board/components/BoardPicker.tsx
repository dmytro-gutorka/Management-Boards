import { useBoardPickerState } from '../hooks/useBoardPickerState.ts';
import { useCreateBoardMutation } from '../hooks/useCreateBoardMutation.ts';
import { BoardPickerHeader } from './BoardPickerHeader.tsx';
import { OpenBoardDialog } from './OpenBoardDialog.tsx';
import { CreateBoardDialog } from './CreateBoardDialog.tsx';
import type { Board } from '../../../api/configurations/types.ts';

export default function BoardPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const vm = useBoardPickerState({ value, onChange });
  const createMutation = useCreateBoardMutation();

  const confirmCreate = () => {
    const name = vm.boardNameInput.trim();

    if (!name) return;

    createMutation.mutate(name, {
      onSuccess: (board: Board) => vm.afterCreate(board.boardId),
    });
  };

  return (
    <>
      <BoardPickerHeader onOpenBoard={vm.openJoinDialog} onCreateBoard={vm.openCreateDialog} />

      <OpenBoardDialog
        open={vm.openJoin}
        value={vm.boardIdInput}
        onChange={vm.setBoardIdInput}
        onClose={vm.closeJoinDialog}
        onConfirm={vm.confirmJoin}
        disableConfirm={!vm.canOpen}
      />

      <CreateBoardDialog
        open={vm.openCreate}
        value={vm.boardNameInput}
        onChange={vm.setBoardNameInput}
        onClose={vm.closeCreateDialog}
        onConfirm={confirmCreate}
        disableConfirm={!vm.canCreate}
        isSubmitting={createMutation.isPending}
      />
    </>
  );
}
