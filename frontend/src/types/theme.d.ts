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
