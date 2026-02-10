import { Button, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createBoard } from '../../api/boards';
import FormDialog from '../../share/components/FormDialog.tsx';

export default function BoardPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const qc = useQueryClient();

  const [openOpen, setOpenOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [boardIdInput, setBoardIdInput] = useState(value);
  const [boardNameInput, setBoardNameInput] = useState('My board');

  useEffect(() => {
    setBoardIdInput(value);
  }, [value]);

  const createMut = useMutation({
    mutationFn: (name: string) => createBoard(name),
    onSuccess: (b) => {
      qc.invalidateQueries({ queryKey: ['boards'] });
      setOpenCreate(false);
      onChange(b.boardId);
    },
  });

  return (
    <>
      <Stack>
        <Stack flexDirection="row" spacing={1} justifyContent="space-between">
          <Stack flexDirection="column">
            <Typography variant="h4" fontSize="30px" fontWeight="800">
              Your Boards
            </Typography>
            <Typography>Create a new board or join an existing one</Typography>
          </Stack>

          <Stack flexDirection="row" gap={2} alignItems="center">
            <Button variant="outlined" onClick={() => setOpenOpen(true)}>
              Open board
            </Button>

            <Button variant="contained" onClick={() => setOpenCreate(true)}>
              Create board
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <FormDialog
        open={openOpen}
        title="Open board"
        confirmText="Open"
        onClose={() => setOpenOpen(false)}
        onConfirm={() => {
          const id = boardIdInput.trim();
          if (!id) return;
          setOpenOpen(false);
          onChange(id);
        }}
        disableConfirm={!boardIdInput.trim()}
      >
        <TextField
          label="Board ID"
          value={boardIdInput}
          onChange={(e) => setBoardIdInput(e.target.value)}
          placeholder="e.g. Xh13Czv6O3"
          autoFocus
          fullWidth
        />
      </FormDialog>

      <FormDialog
        open={openCreate}
        title="Create board"
        confirmText="Create"
        isSubmitting={createMut.isPending}
        disableConfirm={!boardNameInput.trim()}
        onClose={() => setOpenCreate(false)}
        onConfirm={() => createMut.mutate(boardNameInput.trim())}
      >
        <TextField
          label="Board name"
          value={boardNameInput}
          onChange={(e) => setBoardNameInput(e.target.value)}
          autoFocus
          fullWidth
        />
      </FormDialog>
    </>
  );
}
