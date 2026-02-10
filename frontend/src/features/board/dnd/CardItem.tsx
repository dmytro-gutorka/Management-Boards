import { Card as MUICard, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Card } from '../../../api/configurations/types.ts';
import type { CSSProperties } from 'react';

export default function CardItem({ card, onClick }: { card: Card; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  };

  return (
    <MUICard
      ref={setNodeRef}
      variant="outlined"
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <CardContent sx={{ py: 1.2, '&:last-child': { pb: 1.2 } }}>
        <Typography fontWeight={700}>{card.title}</Typography>
        {card.description ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {card.description}
          </Typography>
        ) : null}
      </CardContent>
    </MUICard>
  );
}
