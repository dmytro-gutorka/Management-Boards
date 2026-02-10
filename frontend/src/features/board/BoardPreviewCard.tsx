import type { Board } from '../../api/configurations/types.ts';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export function BoardPreviewCard({ board, onOpen }: { board: Board; onOpen: (id: string) => void }) {
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