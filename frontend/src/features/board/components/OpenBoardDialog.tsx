import { TextField } from '@mui/material';
import FormDialog from '../../../share/components/FormDialog';

type Props = {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  disableConfirm: boolean;
};

export function OpenBoardDialog({
  open,
  value,
  onChange,
  onClose,
  onConfirm,
  disableConfirm,
}: Props) {
  return (
    <FormDialog
      open={open}
      title="Open board"
      confirmText="Open"
      onClose={onClose}
      onConfirm={onConfirm}
      disableConfirm={disableConfirm}
    >
      <TextField
        label="Board ID"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Xh13Czv6O3"
        autoFocus
        fullWidth
      />
    </FormDialog>
  );
}
