import React from 'react'
import AppRouter from './app/AppRouter'
import AppProvider from './app/AppProvider'
import AppTheme from './app/AppTheme'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <AppProvider>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </AppProvider>
  )
}

export default App
