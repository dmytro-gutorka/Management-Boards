import { TextField } from '@mui/material';
import FormDialog from '../../../share/components/FormDialog';

type Props = {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  disableConfirm: boolean;
  isSubmitting: boolean;
};

export function CreateBoardDialog({
  open,
  value,
  onChange,
  onClose,
  onConfirm,
  disableConfirm,
  isSubmitting,
}: Props) {
  return (
    <FormDialog
      open={open}
      title="Create board"
      confirmText="Create"
      isSubmitting={isSubmitting}
      disableConfirm={disableConfirm}
      onClose={onClose}
      onConfirm={onConfirm}
      subtitle="Give your board a name to get started"
    >
      <TextField
        label="Board name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        fullWidth
      />
    </FormDialog>
  );
}
