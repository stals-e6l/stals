import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '.'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface IProps {
  children?: React.ReactNode
}

const AppTheme: React.FC<IProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default AppTheme
