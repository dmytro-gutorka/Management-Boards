import { Container, Stack } from '@mui/material';
import { useState } from 'react';
import BoardPicker from '../features/board/BoardPicker';
import BoardPage from '../features/board/BoardPage';
import { MainPageHeader } from '../layout/MainPageHeader.tsx';
import { EmptyBoards } from '../features/board/EmptyBoards.tsx';

export default function App() {
  const [boardId, setBoardId] = useState<string>('');

  return (
    <>
      <MainPageHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <BoardPicker value={boardId} onChange={setBoardId} />
          {boardId ? (
            <BoardPage boardId={boardId} onBoardDeleted={() => setBoardId('')} />
          ) : (
            <EmptyBoards />
          )}
        </Stack>
      </Container>
    </>
  );
}

