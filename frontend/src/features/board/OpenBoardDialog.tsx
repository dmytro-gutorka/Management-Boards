import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function OpenBoardDialog(props: {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onSubmit: (boardId: string) => void;
}) {
  const { open, initialValue, onClose, onSubmit } = props;
  const [boardId, setBoardId] = useState(initialValue ?? '');

  useEffect(() => {
    setBoardId(initialValue ?? '');
  }, [initialValue, open]);

  const value = boardId.trim();
  const canSubmit = value.length > 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Open board</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Board ID"
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            placeholder="e.g. Xh13Czv6O3"
            autoFocus
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!canSubmit} onClick={() => onSubmit(value)}>
          Open
        </Button>
      </DialogActions>
    </Dialog>
  );
}
