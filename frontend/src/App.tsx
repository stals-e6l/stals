import React from 'react'
import AppRouter from './AppRouter'
import SampleProvider from './store/sample'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <SampleProvider>
      <AppRouter />
    </SampleProvider>
  )
}

export default App
