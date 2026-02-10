import { Alert, Snackbar } from '@mui/material';
import type { Snack } from '../hooks/useSnackbarQueue';

type Props = {
  snack: Snack;
  onClose: () => void;
};

export function SnackRenderer({ snack, onClose }: Props) {
  return (
    <>
      <Snackbar
        open={!!snack && snack.kind === 'success'}
        autoHideDuration={2000}
        onClose={onClose}
        message={snack?.kind === 'success' ? snack.message : ''}
      />
      <Snackbar open={!!snack && snack.kind === 'error'} autoHideDuration={2500} onClose={onClose}>
        <Alert severity="error" onClose={onClose}>
          {snack?.kind === 'error' ? snack.message : ''}
        </Alert>
      </Snackbar>
    </>
  );
}
