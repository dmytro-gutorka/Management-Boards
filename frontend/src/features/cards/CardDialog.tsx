import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import type { Card, ColumnId } from '../../api/configurations/types.ts';

type Mode = 'create' | 'edit';

export default function CardDialog(props: {
  open: boolean;
  mode: Mode;
  column?: ColumnId;
  card?: Card;
  onClose: () => void;
  onSubmit: (v: { title: string; description: string }) => void;
  onDelete?: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
}) {
  const { open, mode, card, onClose, onSubmit, onDelete, isSaving, isDeleting } = props;

  const [title, setTitle] = useState(card?.title ?? '');
  const [description, setDescription] = useState(card?.description ?? '');

  const canSubmit = title.trim().length > 0;

  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: theme.shape.borderRadiusXS,
          },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight={700}>
          {mode === 'create' ? 'Add card' : 'Edit card'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {mode === 'edit' && onDelete ? (
          <Button
            color="error"
            onClick={onDelete}
            disabled={!!isDeleting || !!isSaving}
            sx={{ mr: 'auto' }}
          >
            Delete
          </Button>
        ) : (
          <span style={{ marginRight: 'auto' }} />
        )}

        <Button variant="outlined" onClick={onClose} disabled={!!isSaving || !!isDeleting}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSubmit({ title: title.trim(), description })}
          disabled={!canSubmit || !!isSaving || !!isDeleting}
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
