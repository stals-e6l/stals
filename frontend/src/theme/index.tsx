// types
type TColor =
  | 'gray1'
  | 'gray2'
  | 'black'
  | 'blue'
  | 'green'
  | 'textBlack'
  | 'textGray'

type IColor = {
  [key in TColor]: string
}

type TFont = 'sourceSansPro' | 'quicksand'
type IFont = {
  [key in TFont]: string
}

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

const theme = {}
export default theme
