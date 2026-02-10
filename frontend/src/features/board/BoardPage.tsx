import { Alert, CircularProgress, Stack } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoard } from '../../api/boards';
import { createCard, deleteCard, listCards, reorderCards, updateCard } from '../../api/cards';
import BoardDnD from './dnd/BoardDnD';
import CardDialog from '../cards/CardDialog.tsx';
import type { Card, ColumnId } from '../../api/configurations/types.ts';
import BoardHeader from './BoardHeader.tsx';

type UiColumns = Record<ColumnId, Card[]>;

function cardsToColumns(cards: Card[]): UiColumns {
  const base: UiColumns = { todo: [], in_progress: [], done: [] };
  for (const c of cards) base[c.column].push(c);
  (Object.keys(base) as ColumnId[]).forEach((k) => base[k].sort((a, b) => a.order - b.order));
  return base;
}

type BoardPageProps = {
  boardId: string
  onBoardDeleted: () => void
}

export default function BoardPage({ boardId, onBoardDeleted }: BoardPageProps) {
  const qc = useQueryClient();

  const boardQ = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
    enabled: !!boardId,
  });

  const cardsQ = useQuery({
    queryKey: ['cards', boardId],
    queryFn: () => listCards(boardId),
    enabled: !!boardId && boardQ.isSuccess,
  });

  const serverColumns = useMemo(() => cardsToColumns(cardsQ.data ?? []), [cardsQ.data]);
  const [uiColumns, setUiColumns] = useState<UiColumns>(serverColumns);

  useEffect(() => {
    setUiColumns(serverColumns);
  }, [serverColumns, boardId]);

  const reorderMut = useMutation({
    mutationFn: (cols: Record<ColumnId, string[]>) => reorderCards(boardId, cols),
    onSettled: () => qc.invalidateQueries({ queryKey: ['cards', boardId] }),
  });

  const onReorder = (nextUi: UiColumns) => {
    setUiColumns(nextUi);
    reorderMut.mutate({
      todo: nextUi.todo.map((c) => c.id),
      in_progress: nextUi.in_progress.map((c) => c.id),
      done: nextUi.done.map((c) => c.id),
    });
  };

  // --- CRUD dialog state ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [dialogColumn, setDialogColumn] = useState<ColumnId>('todo');
  const [activeCard, setActiveCard] = useState<Card | undefined>(undefined);

  const openCreate = (col: ColumnId) => {
    setDialogMode('create');
    setDialogColumn(col);
    setActiveCard(undefined);
    setDialogOpen(true);
  };

  const openEdit = (card: Card) => {
    setDialogMode('edit');
    setActiveCard(card);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const createMut = useMutation({
    mutationFn: (v: { title: string; description: string }) =>
      createCard(boardId, { title: v.title, description: v.description, column: dialogColumn }),
    onSuccess: () => {
      closeDialog();
      qc.invalidateQueries({ queryKey: ['cards', boardId] });
    },
  });

  const updateMut = useMutation({
    mutationFn: (v: { title: string; description: string }) => {
      if (!activeCard) throw new Error('No active card');
      return updateCard(boardId, activeCard.id, { title: v.title, description: v.description });
    },
    onSuccess: () => {
      closeDialog();
      qc.invalidateQueries({ queryKey: ['cards', boardId] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => {
      if (!activeCard) throw new Error('No active card');
      return deleteCard(boardId, activeCard.id);
    },
    onSuccess: () => {
      closeDialog();
      qc.invalidateQueries({ queryKey: ['cards', boardId] });
    },
  });

  if (boardQ.isLoading) return <CircularProgress />;
  if (boardQ.isError) return <Alert severity="error">Board not found</Alert>;

  return (
    <Stack spacing={2}>
      <BoardHeader board={boardQ.data!} onDeleted={onBoardDeleted} />

      <BoardDnD
        columns={uiColumns}
        onReorder={onReorder}
        isLoading={cardsQ.isLoading}
        error={cardsQ.isError}
        onAddCard={openCreate}
        onEditCard={openEdit}
      />

      <CardDialog
        open={dialogOpen}
        mode={dialogMode}
        column={dialogColumn}
        card={activeCard}
        onClose={closeDialog}
        onSubmit={(v) => (dialogMode === 'create' ? createMut.mutate(v) : updateMut.mutate(v))}
        onDelete={dialogMode === 'edit' ? () => deleteMut.mutate() : undefined}
        isSaving={createMut.isPending || updateMut.isPending}
        isDeleting={deleteMut.isPending}
      />
    </Stack>
  );
}
