import React from 'react'
import AppRouter from './AppRouter'
import SampleProvider from './store/sample'
import AccommodationProvider from './store/accommodation'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <SampleProvider>
      <AccommodationProvider>
        <AppRouter />
      </AccommodationProvider>
    </SampleProvider>
  )
}

export default App
