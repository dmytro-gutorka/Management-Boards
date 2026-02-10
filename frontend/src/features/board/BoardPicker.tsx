import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createBoard } from '../../api/boards';
import OpenBoardDialog from './OpenBoardDialog.tsx';
import CreateBoardDialog from './CreateBoardDialog.tsx';

export default function BoardPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [openOpen, setOpenOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const qc = useQueryClient();

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

      <OpenBoardDialog
        open={openOpen}
        initialValue={value}
        onClose={() => setOpenOpen(false)}
        onSubmit={(boardId) => {
          setOpenOpen(false);
          onChange(boardId);
        }}
      />

      <CreateBoardDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        isSubmitting={createMut.isPending}
        onSubmit={(name) => createMut.mutate(name)}
      />
    </>
  );
}
