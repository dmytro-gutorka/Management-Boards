import { Alert, CircularProgress, Stack, Box } from '@mui/material';
import { DndContext } from '@dnd-kit/core';
import Column from './Column';
import { useBoardDnD } from '../../hooks/useBoardDnD.ts';
import type { Card, ColumnId } from '../../../../api/configurations/types.ts';
import { COLUMNS } from '../../configs/columns.ts';
import type { UiColumns } from '../../types/common.types.ts';

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
  const { sensors, onDragEnd, isEmpty } = useBoardDnD({ columns, onReorder });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load cards</Alert>;

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
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
    </DndContext>
  );
}
