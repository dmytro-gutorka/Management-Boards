import { Button, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onOpenBoard: () => void;
  onCreateBoard: () => void;
};

export function BoardPickerHeader({ onOpenBoard, onCreateBoard }: Props) {
  return (
    <Stack>
      <Stack flexDirection="row" spacing={1} justifyContent="space-between">
        <Stack flexDirection="column">
          <Typography variant="h4" fontSize="30px" fontWeight="800">
            Your Boards
          </Typography>
          <Typography>Create a new board or join an existing one</Typography>
        </Stack>

        <Stack flexDirection="row" gap={2} alignItems="center">
          <Button variant="outlined" onClick={onOpenBoard} startIcon={<SearchIcon />}>
            Join board
          </Button>

          <Button variant="contained" onClick={onCreateBoard}>
            + Create board
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
