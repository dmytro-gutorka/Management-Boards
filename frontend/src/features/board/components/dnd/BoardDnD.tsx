import { Alert, CircularProgress, Stack, Box } from '@mui/material';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import Column from './Column';
import { useBoardDnD } from '../../hooks/useBoardDnD';
import type { Card, ColumnId } from '../../../../api/configurations/types';
import { COLUMNS } from '../../configs/columns';
import type { UiColumns } from '../../types/common.types';
import CardItem from '../../../cards/CardItem';

type Props = {
  columns: UiColumns;
  onReorder: (next: UiColumns) => void;
  isLoading: boolean;
  error: boolean;
  onAddCard: (columnId: ColumnId) => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (card: Card) => void;
};

export default function BoardDnD(props: Props) {
  const { columns, onReorder, isLoading, error, onAddCard, onEditCard, onDeleteCard } = props;

  const { sensors, onDragStart, onDragCancel, onDragEnd, isEmpty, activeCard } = useBoardDnD({
    columns,
    onReorder,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load cards</Alert>;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
    >
      <Stack spacing={2}>
        {isEmpty ? (
          <Alert severity="info">
            No cards yet. Click <b>+</b> in any column to add your first card.
          </Alert>
        ) : null}

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
          {COLUMNS.map((col) => (
            <Box key={col.id} sx={{ flex: 1, minWidth: 280 }}>
              <Column
                columnId={col.id}
                title={col.title}
                cards={columns[col.id]}
                onAdd={onAddCard}
                onCardClick={onEditCard}
                onDeleteCard={onDeleteCard}
              />
            </Box>
          ))}
        </Stack>
      </Stack>

      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeCard ? (
            <CardItem card={activeCard as any} onEdit={() => {}} onDelete={() => {}} isOverlay />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
