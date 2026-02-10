import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { MainHeaderLogo } from '../share/components/MainHeaderLogo.tsx';


export function MainPageHeader() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: 'white', borderBottom: '2px solid #e5e7eb', mb: 6 }}>
      <Container maxWidth="lg">
        <Stack
          py={2}
          flexDirection="row"
          gap={2}
          alignItems="center"
        >
          <MainHeaderLogo />
          <Stack>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                backgroundImage: theme.palette.blue.gradient,
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
            >
              TaskFlow
            </Typography>
            <Typography variant="body2">
              Organize your work beautifully
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
