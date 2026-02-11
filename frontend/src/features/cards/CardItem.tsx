import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card as MUICard,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Card } from '../../api/configurations/types.ts';
import type { CSSProperties } from 'react';

type CardItemProps = {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  onOpen?: (card: Card) => void;
};

export default function CardItem({ card, onEdit, onDelete }: CardItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <MUICard ref={setNodeRef} variant="outlined" style={style} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ py: 1.2, '&:last-child': { pb: 1.2 } }}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={1}>
            <Tooltip title="Drag" sx={{ placeSelf: "start" }}>
              <IconButton
                size="small"
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
              >
                <DragIndicatorIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Stack>
              <Typography fontWeight={700} variant="body1">
                {card.title}
              </Typography>
              {card.description && (
                <Typography fontWeight={400} variant="body2">
                  {card.description}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" ml={1} spacing={0.5} alignItems="center" sx={{ placeSelf: "start" }}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card);
                }}
              >
                <DeleteOutlineIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </MUICard>
  );
}
