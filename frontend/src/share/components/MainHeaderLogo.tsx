import { Stack, useTheme } from '@mui/material';

export function MainHeaderLogo() {
  const theme = useTheme();

  return (
    <Stack width="44px" height="44px"  alignItems="center" justifyContent="center" sx={{ backgroundImage: theme.palette.blue.gradient, borderRadius: 3 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    </Stack>
  )
}