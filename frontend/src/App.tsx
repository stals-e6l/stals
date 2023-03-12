import React from 'react'
import AppRouter from './AppRouter'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return <AppRouter />
}

export default App
