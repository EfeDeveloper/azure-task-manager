import { createTheme } from '@mui/material/styles';

const colorPalette = {
  50: '#edfefe',
  100: '#d1fafc',
  200: '#a8f4f9',
  300: '#6ce8f4',
  400: '#19cbdf',
  500: '#0db7cd',
  600: '#0e92ac',
  700: '#12758c',
  800: '#185f72',
  900: '#194f60',
  950: '#0a3442',
};

// Module augmentation to add the new colors
declare module '@mui/material/styles' {
  interface Palette {
    primaryWhite: Palette['primary'];
  }
  interface PaletteOptions {
    primaryWhite?: PaletteOptions['primary'];
  }
  interface PaletteColor {
    // Example if we later want custom tones
  }
}
// Module augmentation to allow custom color in specific components
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primaryWhite: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    primaryWhite: true;
  }
}
declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    primaryWhite: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    primaryWhite: true;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    primaryWhite: true;
  }
}

const BORDER_RADIUS = 8;

const theme = createTheme({
  palette: {
    primary: {
      main: colorPalette[500],
      light: colorPalette[300],
      dark: colorPalette[700],
      contrastText: '#fff',
    },
    secondary: {
      main: colorPalette[400],
      light: colorPalette[100],
      dark: colorPalette[950],
      contrastText: '#fff',
    },
    primaryWhite: {
      main: colorPalette[50],
      light: colorPalette[100],
      dark: colorPalette[200],
      contrastText: colorPalette[950],
    },
    background: {
      default: colorPalette[50],
      paper: colorPalette[100],
    },
    text: {
      primary: colorPalette[950],
      secondary: colorPalette[700],
    },
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
        notchedOutline: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
        },
      },
    },
  },
});

export default theme;
