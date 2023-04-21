import React from 'react'
import AppRouter from './AppRouter'
import SampleProvider from './store/sample'
import AccommodationProvider from './store/accommodation'
import AppTheme from './theme/AppTheme'
import ForumProvider from './store/forum'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <SampleProvider>
      <AccommodationProvider>
        <ForumProvider>
          <AppTheme>
            <AppRouter />
          </AppTheme>
        </ForumProvider>
      </AccommodationProvider>
    </SampleProvider>
  )
}

export default App
