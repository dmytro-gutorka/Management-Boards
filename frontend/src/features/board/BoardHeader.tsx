import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { deleteBoard, updateBoard } from '../../api/boards';
import type { Board } from '../../api/configurations/types.ts';
import ConfirmDialog from './dialogs/ConfirmDialog.tsx';

export default function BoardHeader({ board }: { board: Board }) {
  const qc = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(board.name);
  const [snack, setSnack] = useState<string | null>(null);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);

  const canSave = useMemo(() => name.trim().length > 0 && name.trim() !== board.name, [name, board]);

  const updateMut = useMutation({
    mutationFn: (newName: string) => updateBoard(board.boardId, newName),
    onSuccess: (updated) => {
      qc.setQueryData(['board', board.boardId], updated);
      setIsEditing(false);
      setSnack('Board renamed');
    },
    onError: () => setErrorSnack('Failed to rename board'),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteBoard(board.boardId),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['board', board.boardId] });
      qc.removeQueries({ queryKey: ['cards', board.boardId] });
      window.location.reload();

      setConfirmOpen(false)
    },
    onError: () => setErrorSnack('Failed to delete board'),
  });

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(board.boardId);
      setSnack('Board ID copied');
    } catch {
      setErrorSnack('Could not copy');
    }
  };

  return (
    <Stack spacing={1} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Board ID
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontFamily="monospace">{board.boardId}</Typography>
            <Tooltip title="Copy board ID">
              <IconButton size="small" onClick={copyId}>
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {!isEditing ? (
            <Tooltip title="Rename board">
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip title="Delete board">
            <IconButton color="error" onClick={() => setConfirmOpen(true)} disabled={deleteMut.isPending}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
        {isEditing ? (
          <>
            <TextField
              label="Board name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => updateMut.mutate(name.trim())}
              disabled={!canSave || updateMut.isPending}
              sx={{ minWidth: 120 }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setName(board.name);
              }}
              disabled={updateMut.isPending}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Typography variant="h6" fontWeight={800}>
            {board.name}
          </Typography>
        )}
      </Stack>

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack(null)}
        message={snack ?? ''}
      />
      <Snackbar
        open={!!errorSnack}
        autoHideDuration={2500}
        onClose={() => setErrorSnack(null)}
      >
        <Alert severity="error" onClose={() => setErrorSnack(null)}>
          {errorSnack}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete board?"
        text="This will delete the board and all cards. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        isLoading={deleteMut.isPending}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteMut.mutate()}
      />

    </Stack>

  );
}
