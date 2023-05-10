import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {}

export const COLOR: IColor = {
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

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR.blue,
    },
    secondary: {
      main: COLOR.green,
    },
  },
})

export default theme
