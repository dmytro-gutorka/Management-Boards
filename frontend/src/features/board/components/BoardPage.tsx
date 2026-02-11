import { Alert, CircularProgress, Stack } from '@mui/material';
import BoardDnD from './dnd/BoardDnD';
import CardDialog from '../../cards/CardDialog';
import BoardHeader from './BoardHeader';
import { useCardDialogState } from '../hooks/useCardDialogState.ts';
import { useBoardQuery } from '../hooks/useBoardData.ts';
import { useCardsQuery } from '../hooks/useCardsData.ts';
import { useUiColumns } from '../hooks/useUiColumns.ts';
import { useCardCrudMutations } from '../hooks/useCardCrudMutations.ts';
import type { Card } from '../../../api/configurations/types.ts';

type BoardPageProps = {
  boardId: string;
  onBoardDeleted: () => void;
};

export default function BoardPage({ boardId, onBoardDeleted }: BoardPageProps) {
  const boardQ = useBoardQuery(boardId);
  const cardsQ = useCardsQuery(boardId, boardQ.isSuccess);
  const cols = useUiColumns(boardId, cardsQ.data);
  const dialog = useCardDialogState();

  const { createMut, updateMut, deleteMut, deleteByIdMut } = useCardCrudMutations({
    boardId,
    dialogColumn: dialog.column,
    activeCard: dialog.activeCard,
    onDone: dialog.close,
  });

  const handleDeleteCard = (card: Card) => deleteByIdMut.mutate(card.id);

  if (boardQ.isLoading) return <CircularProgress />;
  if (boardQ.isError) return <Alert severity="error">Board not found</Alert>;

  return (
    <Stack spacing={2}>
      <BoardHeader board={boardQ.data!} onDeleted={onBoardDeleted} />

      <BoardDnD
        columns={cols.uiColumns}
        onReorder={cols.onReorder}
        isLoading={cardsQ.isLoading}
        error={cardsQ.isError}
        onAddCard={dialog.openCreate}
        onEditCard={dialog.openEdit}
        onDeleteCard={handleDeleteCard}
      />

      <CardDialog
        open={dialog.open}
        mode={dialog.mode}
        column={dialog.column}
        card={dialog.activeCard}
        onClose={dialog.close}
        onSubmit={(v) => (dialog.mode === 'create' ? createMut.mutate(v) : updateMut.mutate(v))}
        onDelete={dialog.mode === 'edit' ? () => deleteMut.mutate() : undefined}
        isSaving={createMut.isPending || updateMut.isPending}
        isDeleting={deleteMut.isPending}
      />
    </Stack>
  );
}
