import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import type { ReactNode } from 'react';

export default function FormDialog(props: {
  open: boolean;
  title: string;
  subtitle?: string;
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
    subtitle,
    confirmText = 'OK',
    cancelText = 'Cancel',
    isSubmitting,
    disableConfirm,
    maxWidth = 'xs',
    onClose,
    onConfirm,
  } = props;

  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{
        paper: {
          sx: {
            borderRadius: theme.shape.borderRadiusXS,
          },
        },
      }}
    >
      <DialogTitle>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}
        </Stack>{' '}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {children}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
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
