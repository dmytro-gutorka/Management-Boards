import { createTheme } from '@mui/material/styles';

export const baseTheme = createTheme({
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
    borderRadiusM: 10,

  }
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: baseTheme.shape.borderRadiusM,
          paddingBlock: baseTheme.spacing(1),
          paddingInline: baseTheme.spacing(2.5),

          '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
          },
        },

        contained: {
          fontWeight: 700,
          fontSize: baseTheme.spacing(2),
          backgroundImage: baseTheme.palette.blue.gradient,

          '&:hover': {
            filter: 'brightness(0.92)',
          },

          '&.Mui-disabled': {
            backgroundImage: 'none',
            backgroundColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.action.disabled,
            filter: 'none',
          },
        },

        outlined: {
          fontWeight: 400,
          fontSize: baseTheme.spacing(2),
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid rgb(203 213 225)',

          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
            borderColor: 'rgb(148 163 184)',
          },

          '&.Mui-disabled': {
            backgroundColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.action.disabled,
            borderColor: baseTheme.palette.action.disabledBackground,
          },
        },
      },
    },
  },
});