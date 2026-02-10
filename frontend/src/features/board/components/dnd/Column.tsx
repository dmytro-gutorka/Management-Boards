import { Card as MUICard, CardContent, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import CardItem from '../../../cards/CardItem.tsx';
import type { Card, ColumnId } from '../../../../api/configurations/types.ts';

export default function Column(props: {
  columnId: ColumnId;
  title: string;
  cards: Card[];
  onAdd: (columnId: ColumnId) => void;
  onCardClick: (card: Card) => void;
}) {
  const { columnId, title, cards, onAdd, onCardClick } = props;

  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <MUICard
      variant="outlined"
      sx={{
        borderRadius: 3,
        outline: isOver ? '2px solid rgba(25,118,210,0.6)' : 'none',
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <IconButton size="small" onClick={() => onAdd(columnId)} aria-label="add card">
            <AddIcon />
          </IconButton>
        </Stack>

        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <Stack ref={setNodeRef} spacing={1} sx={{ minHeight: 60 }}>
            {cards.map((c) => (
              <CardItem key={c.id} card={c} onClick={() => onCardClick(c)} />
            ))}
          </Stack>
        </SortableContext>
      </CardContent>
    </MUICard>
  );
}
