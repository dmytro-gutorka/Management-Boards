import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCard, deleteCard, updateCard } from '../../../api/cards';
import type { Card, ColumnId } from '../../../api/configurations/types';
import { useState } from 'react';

type CreatePayload = { title: string; description: string };

export function useCardCrudMutations(args: {
  boardId: string;
  dialogColumn: ColumnId;
  activeCard?: Card;
  onDone: () => void;
}) {
  const [delCard, setDeleteCard] = useState<Card | null>(null);

  const { boardId, dialogColumn, activeCard, onDone } = args;
  const qc = useQueryClient();

  const invalidate = () => qc.invalidateQueries({ queryKey: ['cards', boardId] });

  const createMut = useMutation({
    mutationFn: (v: CreatePayload) =>
      createCard(boardId, { title: v.title, description: v.description, column: dialogColumn }),
    onSuccess: () => {
      onDone();
      invalidate();
    },
  });

  const updateMut = useMutation({
    mutationFn: (v: CreatePayload) => {
      if (!activeCard) throw new Error('No active card');
      return updateCard(boardId, activeCard.id, { title: v.title, description: v.description });
    },
    onSuccess: () => {
      onDone();
      invalidate();
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => {
      if (!activeCard) throw new Error('No active card');
      return deleteCard(boardId, activeCard.id);
    },
    onSuccess: () => {
      onDone();
      invalidate();
    },
  });

  const deleteByIdMut = useMutation({
    mutationFn: (cardId: string) => deleteCard(boardId, cardId),
    onSuccess: () => {
      onDone();
      invalidate();
    },
  });

  const handleAskDelete = (card: Card) => setDeleteCard(card);
  const handleCloseDelete = () => setDeleteCard(null);

  const handleConfirmDelete = () => {
    if (!delCard) return;

    deleteByIdMut.mutate(delCard.id, {
      onSuccess: () => setDeleteCard(null),
      onError: () => setDeleteCard(null),
    });
  };

  return {
    createMut,
    updateMut,
    deleteMut,
    deleteByIdMut,
    handleAskDelete,
    handleCloseDelete,
    handleConfirmDelete,
    delCard,
  };
}
