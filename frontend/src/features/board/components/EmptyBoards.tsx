import { Stack, Typography, useTheme } from '@mui/material';
import { LogoIcon } from '../../../share/components/LogoIcon.tsx';

export function EmptyBoards() {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      py={16}
      sx={{
        backgroundColor: 'white',
        borderRadius: theme.shape.borderRadiusXS,
        outline: '2px dashed rgb(203 213 225)',
      }}
    >
      <Stack
        mb={2}
        p={2}
        border="1px solid rgb(203 213 225)"
        borderRadius={theme.shape.borderRadiusXS}
        sx={{ backgroundColor: 'rgb(241 245 249)' }}
      >
        <LogoIcon color="grey" />
      </Stack>

      <Typography variant="h6" fontWeight={800}>
        No boards yet
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
        Load a board to get started.
      </Typography>
    </Stack>
  );
}
