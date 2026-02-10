import { Button, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createBoard } from '../../api/boards';

export default function BoardPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [name, setName] = useState('My board');

  const createMut = useMutation({
    mutationFn: () => createBoard(name),
    onSuccess: (b) => onChange(b.boardId),
  });

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="stretch">
      <TextField
        label="Board ID"
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder="Enter boardId..."
        fullWidth
      />

      <TextField
        label="New board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ minWidth: 240 }}
      />

      <Button
        variant="contained"
        onClick={() => createMut.mutate()}
        disabled={createMut.isPending || !name.trim()}
      >
        Create
      </Button>
    </Stack>
  );
}
