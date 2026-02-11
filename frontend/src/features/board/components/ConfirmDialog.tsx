import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';

export default function ConfirmDialog(props: {
  open: boolean;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const {
    open,
    title,
    text,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    danger,
    isLoading,
    onConfirm,
    onClose,
  } = props;

  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: theme.shape.borderRadiusXS,
          },
        },
      }}
    >
      <DialogTitle component="div">
        <Typography variant="h6" component="div" fontWeight={700}>
          {title}
        </Typography>
      </DialogTitle>{' '}
      <DialogContent>
        <Typography variant="body2" component="div" color="text.secondary">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={danger ? 'error' : 'primary'}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
