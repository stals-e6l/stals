import { colors, createTheme } from '@mui/material'

declare module '@mui/material/styles' {}

export const COLOR: IColor = {
  white: '#ffffff',
  gray1: '#f5f5f7',
  gray2: '#f0f0f0',
  black: '#1d1d15',
  blue: '#154360',
  green: '#60ce80',
  textBlack: '#1d1d1f',
  textGray: '#6e6e73',
}

export const FONT: IFont = {
  sourceSansPro: 'Source Sans Pro',
  quicksand: 'Quicksand',
}

export const SPACING = 8

const theme = createTheme({
  spacing: SPACING,
  palette: {
    primary: {
      main: COLOR.blue,
    },
    secondary: {
      main: COLOR.green,
    },
  },
  typography: {
    fontFamily: [FONT.sourceSansPro, FONT.quicksand].join(', '),
    h1: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: FONT.quicksand,
      fontWeight: 'normal',
    },
    body2: {
      fontFamily: FONT.quicksand,
      fontWeight: 'normal',
    },
    button: {
      fontFamily: FONT.sourceSansPro,
      fontWeight: 'normal',
    },
  },
  // TODO: components customization
  components: {
    // sample on button
    MuiButton: {
      styleOverrides: {
        root: {
          color: COLOR.gray2
        }
      },
    },
    MuiRadio: {
      styleOverrides: {
        checked: {
          color: COLOR.green,
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        checked: {
          color: COLOR.green,
        }
      }
    },

    MuiSlider: {
      styleOverrides: {
        root: {
        },
        thumb: {
          color: COLOR.green,
        },
        track: {
          color: COLOR.blue,
        },
        rail: {
          color: COLOR.gray2,
          border: '2px solid',
          borderColor: COLOR.black,
        },
        active: {
          color: COLOR.gray1,
        }
      }
    }
  },
})

export default theme
