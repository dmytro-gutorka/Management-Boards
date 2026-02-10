import { Stack, useTheme } from '@mui/material';
import { LogoIcon } from './LogoIcon.tsx';

export function MainHeaderLogo() {
  const theme = useTheme();

  return (
    <Stack
      width="44px"
      height="44px"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundImage: theme.palette.blue.gradient, borderRadius: 3 }}
    >
      <LogoIcon/>
    </Stack>
  );
}
