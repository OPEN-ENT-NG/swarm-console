// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    red: Palette['primary'];
  }
  interface PaletteOptions {
    red?: PaletteOptions['primary'];
  }
}