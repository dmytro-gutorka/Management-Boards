import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function CreateBoardDialog(props: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isSubmitting?: boolean;
}) {
  const { open, onClose, onSubmit, isSubmitting } = props;
  const [name, setName] = useState('My board');

  useEffect(() => {
    if (open) setName('My board');
  }, [open]);

  const value = name.trim();
  const canSubmit = value.length > 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create board</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!canSubmit || !!isSubmitting}
          onClick={() => onSubmit(value)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
