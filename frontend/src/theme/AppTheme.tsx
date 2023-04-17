import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '.'

interface IProps {
  children?: React.ReactNode
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
