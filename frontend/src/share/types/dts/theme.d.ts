import '@mui/material/styles';
import type { ThemePaletteColorMap } from '@/shared/types/mui-theme.configs.ts';

export type ThemePaletteColorMap = {
  gradient: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    blue: ThemePaletteColorMap;
  }
  interface PaletteOptions {
    blue?: ThemePaletteColorMap;
  }
}

declare module '@mui/system/' {
  interface Shape {
    borderRadiusXSS: number;
    borderRadiusXS: number;
    borderRadiusM: number;
  }
}
