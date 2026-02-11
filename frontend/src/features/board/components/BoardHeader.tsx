import type { Board } from '../../../api/configurations/types';
import ConfirmDialog from './ConfirmDialog';
import { Stack } from '@mui/material';
import { BoardCard } from './BoardCard';
import { useEditableName } from '../hooks/useEditableName';
import { useConfirmState } from '../hooks/useConfirmState';
import { useBoardHeaderActions } from '../hooks/useBoardHeaderActions';
import { BoardNameEditor } from './BoardNameEditor';
import { SnackRenderer } from './SnackRenderer';


type Props = { board: Board; onDeleted: () => void };

export default function BoardHeader({ board, onDeleted }: Props) {
  const confirm = useConfirmState();
  const editable = useEditableName({ externalValue: board.name });

  const actions = useBoardHeaderActions({
    board,
    onDeleted,
    onCloseConfirm: confirm.closeDialog,
    onStopEditing: () => editable.setIsEditing(false),
  });

  const onSave = () => {
    if (!editable.trimmed) return;
    actions.rename(editable.trimmed);
  };

  return (
    <Stack spacing={1} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'white' }}>
      <BoardCard
        board={board}
        isEditing={editable.isEditing}
        setIsEditing={editable.setIsEditing}
        isDisabled={actions.isDeleting}
        setConfirmOpen={confirm.setOpen}
      />

      <BoardNameEditor
        isEditing={editable.isEditing}
        name={editable.value}
        onChange={editable.setValue}
        onSave={onSave}
        onCancel={editable.cancel}
        canSave={editable.canSave}
        isSaving={actions.isRenaming}
        title={board.name}
      />

      <SnackRenderer snack={actions.snack} onClose={actions.closeSnack} />

      <ConfirmDialog
        open={confirm.open}
        title="Delete board?"
        text="This will delete the board and all cards. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        isLoading={actions.isDeleting}
        onClose={confirm.closeDialog}
        onConfirm={actions.remove}
      />
    </Stack>
  );
}
