import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.ts';
import type { Board } from '../../../api/configurations/types.ts';
import type { JSX } from 'react';
import { useSnack } from '../hooks/useSnackbarQueue.ts';

type BoardCardProps = {
  board: Board;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  isDisabled: boolean;
  setConfirmOpen: (isOpen: boolean) => void;
};

export function BoardCard({
  board,
  isEditing,
  setIsEditing,
  setConfirmOpen,
  isDisabled,
}: BoardCardProps): JSX.Element {
  const { success, error } = useSnack();

  const copy = useCopyToClipboard(
    () => success('Board ID copied'),
    () => error('Could not copy'),
  );

  return (
    <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
      <Box>
        <Typography variant="overline" color="text.secondary">
          Board ID
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontFamily="monospace">{board.boardId}</Typography>
          <Tooltip title="Copy board ID">
            <IconButton size="small" onClick={() => copy(board.boardId)}>
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
          <IconButton color="error" onClick={() => setConfirmOpen(true)} disabled={isDisabled}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
