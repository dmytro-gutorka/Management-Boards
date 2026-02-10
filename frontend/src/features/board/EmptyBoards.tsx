import { Card, CardContent, Typography } from '@mui/material';

export function EmptyBoards() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800}>
          No boards yet
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Create your first board to get started
        </Typography>
      </CardContent>
    </Card>
  );
}
