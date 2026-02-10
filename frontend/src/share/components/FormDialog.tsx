import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import type { ReactNode } from 'react';

export default function FormDialog(props: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  disableConfirm?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md';
  onClose: () => void;
  onConfirm: () => void;
}) {
  const {
    open,
    title,
    children,
    confirmText = 'OK',
    cancelText = 'Cancel',
    isSubmitting,
    disableConfirm,
    maxWidth = 'xs',
    onClose,
    onConfirm,
  } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {children}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          {cancelText}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={!!disableConfirm || !!isSubmitting}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
