import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans",
  },
  palette: {
    blue: {
      gradient: "linear-gradient(to bottom right, #3b82f6, #06b6d4)"
    }
  },
  shape: {
    borderRadiusXSS: 1,
    borderRadiusXS: 3,
  }
});