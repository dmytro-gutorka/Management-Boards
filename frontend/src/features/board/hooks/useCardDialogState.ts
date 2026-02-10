import { useCallback, useState } from 'react';
import type { Card, ColumnId } from '../../../api/configurations/types';

export function useCardDialogState() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [column, setColumn] = useState<ColumnId>('todo');
  const [activeCard, setActiveCard] = useState<Card | undefined>(undefined);

  const openCreate = useCallback((col: ColumnId) => {
    setMode('create');
    setColumn(col);
    setActiveCard(undefined);
    setOpen(true);
  }, []);

  const openEdit = useCallback((card: Card) => {
    setMode('edit');
    setActiveCard(card);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return {
    open,
    mode,
    column,
    activeCard,
    openCreate,
    openEdit,
    close,
  };
}
