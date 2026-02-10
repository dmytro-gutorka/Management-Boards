import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { Card, ColumnId } from '../../../api/configurations/types.ts';

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

  const initial = useMemo(
    () => ({
      title: card?.title ?? '',
      description: card?.description ?? '',
    }),
    [card],
  );

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);

  useEffect(() => {
    setTitle(initial.title);
    setDescription(initial.description);
  }, [initial]);

  const canSubmit = title.trim().length > 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'create' ? 'Add card' : 'Edit card'}</DialogTitle>

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

        <Button onClick={onClose} disabled={!!isSaving || !!isDeleting}>
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
