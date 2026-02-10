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
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontWeight: 700,
            textTransform: "capitalize",
            fontSize: baseTheme.spacing(2),
            borderRadius: baseTheme.shape.borderRadiusM,
            paddingBlock: baseTheme.spacing(1),
            paddingInline: baseTheme.spacing(2.5),
            backgroundImage: baseTheme.palette.blue.gradient
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontWeight: 400,
            textTransform: "capitalize",
            fontSize: baseTheme.spacing(2),
            borderRadius: baseTheme.shape.borderRadiusM,
            paddingBlock: baseTheme.spacing(1),
            paddingInline: baseTheme.spacing(2.5),
            backgroundColor: "white",
            color:"black",
            border: "2px solid rgb(203 213 225)",
          },
        },
      ],
    },
  },
});