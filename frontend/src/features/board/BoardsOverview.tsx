import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { listBoards } from '../../api/boards';
import type { Board } from '../../api/configurations/types.ts';


function EmptyBoards() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800}>
          Еще нет досок
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Создайте одну, чтобы начать планировать задачи.
        </Typography>
      </CardContent>
    </Card>
  );
}

function BoardTile({ board, onOpen }: { board: Board; onOpen: (id: string) => void }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardActionArea onClick={() => onOpen(board.boardId)}>
        <CardContent>
          <Typography fontWeight={800}>{board.name}</Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="monospace" sx={{ mt: 0.5 }}>
            {board.boardId}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function BoardsOverview({ onOpenBoard }: { onOpenBoard: (id: string) => void }) {
  const q = useQuery({
    queryKey: ['boards'],
    queryFn: listBoards,
  });

  if (q.isLoading) return <CircularProgress />;
  if (q.isError) return <Alert severity="error">Could not load the boards</Alert>;

  const boards = q.data ?? [];

  return (
    <Stack spacing={2}>
      {boards.length === 0 ? (
        <EmptyBoards />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {boards.map((b) => (
            <BoardTile key={b.boardId} board={b} onOpen={onOpenBoard} />
          ))}
        </Box>
      )}
    </Stack>
  );
}
