import { Alert, CircularProgress, Stack, Box } from '@mui/material';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { COLUMNS } from '../configs/columns.ts';
import Column from './Column';
import type { Card, ColumnId } from '../../../api/configurations/types.ts';

type UiColumns = Record<ColumnId, Card[]>;

function findColumnByCardId(cols: UiColumns, cardId: string): ColumnId | null {
  const keys = Object.keys(cols) as ColumnId[];
  for (const k of keys) if (cols[k].some((c) => c.id === cardId)) return k;
  return null;
}

export default function BoardDnD(props: {
  columns: UiColumns;
  onReorder: (next: UiColumns) => void;
  isLoading: boolean;
  error: boolean;
  onAddCard: (columnId: ColumnId) => void;
  onEditCard: (card: Card) => void;
}) {
  const { columns, onReorder, isLoading, error, onAddCard, onEditCard } = props;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (e: DragEndEvent) => {
    const activeId = String(e.active.id);
    const overId = e.over?.id ? String(e.over.id) : null;
    if (!overId) return;

    const fromCol = findColumnByCardId(columns, activeId);
    if (!fromCol) return;

    const toCol: ColumnId =
      (['todo', 'in_progress', 'done'] as string[]).includes(overId)
        ? (overId as ColumnId)
        : (findColumnByCardId(columns, overId) ?? fromCol);

    const next: UiColumns = {
      todo: [...columns.todo],
      in_progress: [...columns.in_progress],
      done: [...columns.done],
    };

    const fromIdx = next[fromCol].findIndex((c) => c.id === activeId);
    if (fromIdx < 0) return;

    const [moved] = next[fromCol].splice(fromIdx, 1);

    if (toCol === fromCol) {
      const toIdx = next[toCol].findIndex((c) => c.id === overId);
      const targetIdx = toIdx >= 0 ? toIdx : next[toCol].length;
      next[toCol] = arrayMove(next[toCol], fromIdx, targetIdx);
      onReorder(next);
      return;
    }

    const toIdx = next[toCol].findIndex((c) => c.id === overId);
    const insertIdx = toIdx >= 0 ? toIdx : next[toCol].length;
    next[toCol].splice(insertIdx, 0, { ...moved, column: toCol });

    onReorder(next);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load cards</Alert>;

  const total = columns.todo.length + columns.in_progress.length + columns.done.length;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Stack spacing={2}>
        {total === 0 ? (
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
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </DndContext>
  );

}
