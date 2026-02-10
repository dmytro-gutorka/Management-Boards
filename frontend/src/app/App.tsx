import { Container, Stack } from '@mui/material';
import { useState } from 'react';
import BoardPicker from '../features/board/components/BoardPicker.tsx';
import BoardPage from '../features/board/components/BoardPage.tsx';
import { MainPageHeader } from '../layout/MainPageHeader.tsx';
import { EmptyBoards } from '../features/board/components/EmptyBoards.tsx';

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

