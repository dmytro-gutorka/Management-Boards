import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
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
      <Stack flexDirection="row" gap={1} alignItems="center">
        <Typography variant="body1" fontWeight={700}>
          Board ID:
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="body2">{board.boardId}</Typography>
          <Tooltip title="Copy board ID">
            <IconButton sx={{ padding: 0 }} onClick={() => copy(board.boardId)}>
              <ContentCopyIcon
                sx={{ ml: 0.5, maxWidth: '14px', maxHeight: '14px' }}
                fontSize="inherit"
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        {!isEditing ? (
          <Tooltip title="Rename board">
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon htmlColor="rgb(68 100 239)" />
            </IconButton>
          </Tooltip>
        ) : null}

        <Tooltip title="Delete board">
          <IconButton onClick={() => setConfirmOpen(true)} disabled={isDisabled}>
            <DeleteOutlineIcon htmlColor="rgb(239 68 68)" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
