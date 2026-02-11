import { Button, Stack, TextField, Typography } from '@mui/material';

type Props = {
  isEditing: boolean;
  name: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  canSave: boolean;
  isSaving: boolean;
  title: string;
};

export function BoardNameEditor({
  isEditing,
  name,
  onChange,
  onSave,
  onCancel,
  canSave,
  isSaving,
  title,
}: Props) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
      {isEditing ? (
        <>
          <TextField
            label="Board name"
            value={name}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            onClick={onSave}
            disabled={!canSave || isSaving}
            sx={{ minWidth: 120 }}
          >
            Save
          </Button>
          <Button onClick={onCancel} disabled={isSaving} sx={{ minWidth: 120 }}>
            Cancel
          </Button>
        </>
      ) : (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Typography variant="body1" fontWeight={700}>
            Board Name:
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Stack>
      )}
    </Stack>
  );
}
