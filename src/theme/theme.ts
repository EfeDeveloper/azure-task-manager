import { createTheme } from '@mui/material/styles';

const scooter = {
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

const theme = createTheme({
  palette: {
    primary: {
      main: scooter[500],
      light: scooter[300],
      dark: scooter[700],
      contrastText: '#fff',
    },
    secondary: {
      main: scooter[400],
      light: scooter[100],
      dark: scooter[950],
      contrastText: '#fff',
    },
    background: {
      default: scooter[50],
      paper: scooter[100],
    },
    text: {
      primary: scooter[950],
      secondary: scooter[700],
    },
  },
});

export default theme;
