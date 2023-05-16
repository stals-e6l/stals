import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '.'
import { AdapterDayjs } from '@mui/lab'
import { LocalizationProvider } from '@mui/lab'

interface IProps {
  children?: React.ReactNode
}

function App({ children }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    )
  }

const AppTheme: React.FC<IProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppTheme
