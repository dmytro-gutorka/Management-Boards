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

type CardItemProps = {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  onOpen?: (card: Card) => void;
  isOverlay?: boolean;
};

export default function CardItem({ card, onEdit, onDelete, isOverlay }: CardItemProps) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: card.id,
  });

  const sortable = useSortable({ id: card.id });

  const style = isOverlay
    ? {
        opacity: 0.85,
        transform: 'rotate(1deg) scale(1.02)',
        boxShadow: '0 14px 40px rgba(0,0,0,0.18)',
        cursor: 'grabbing',
      }
    : {
        transform: CSS.Transform.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.35 : 1,
        cursor: sortable.isDragging ? 'grabbing' : 'grab',
      };

  const dndProps = isOverlay
    ? {}
    : {
        ref: sortable.setNodeRef,
        ...sortable.attributes,
        ...sortable.listeners,
      };

  return (
    <div {...dndProps} style={style}>
      <MUICard ref={setNodeRef} variant="outlined" style={style} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ py: 1.2, '&:last-child': { pb: 1.2 } }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" gap={1}>
              <Tooltip title="Drag" sx={{ placeSelf: 'start' }}>
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

            <Stack
              direction="row"
              ml={1}
              spacing={0.5}
              alignItems="center"
              sx={{ placeSelf: 'start' }}
            >
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
    </div>
  );
}
