import React from 'react'
import AppRouter from './AppRouter'
import SampleProvider from './store/sample'
import AccommodationProvider from './store/accommodation'
import AppTheme from './theme/AppTheme'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <SampleProvider>
      <AccommodationProvider>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </AccommodationProvider>
    </SampleProvider>
  )
}

export default App
