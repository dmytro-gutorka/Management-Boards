import {
  Alert,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { listBoards } from '../../api/boards';
import { EmptyBoards } from './EmptyBoards.tsx';
import { BoardPreviewCard } from './BoardPreviewCard.tsx';


export default function BoardsOverview({ onOpenBoard }: { onOpenBoard: (id: string) => void }) {
  const query = useQuery({
    queryKey: ['boards'],
    queryFn: listBoards,
  });

  if (query.isLoading) return <CircularProgress />;
  if (query.isError) return <Alert severity="error">Could not load the boards</Alert>;

  const boards = query.data ?? [];

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
            <BoardPreviewCard key={b.boardId} board={b} onOpen={onOpenBoard} />
          ))}
        </Box>
      )}
    </Stack>
  );
}
