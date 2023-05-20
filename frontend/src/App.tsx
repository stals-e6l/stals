import React from 'react'
import AppRouter from './AppRouter'
import SampleProvider from './store/sample'
import AccommodationProvider from './store/accommodation'
import AppTheme from './theme/AppTheme'
import ForumProvider from './store/forum'
import AuthProvider from './store/auth'

interface IProps {
  children?: React.ReactNode
}

const App: React.FC<IProps> = () => {
  return (
    <SampleProvider>
      <AuthProvider>
        <AccommodationProvider>
          <ForumProvider>
            <AppTheme>
              <AppRouter />
            </AppTheme>
          </ForumProvider>
        </AccommodationProvider>
      </AuthProvider>
    </SampleProvider>
  )
}

export default App
