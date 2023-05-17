import React from 'react'
import AuthProvider from '../modules/auth/AuthProvider'
import AccommodationsProvider from '../modules/accommodation/AccommodationsProvider'
import ReviewsProvider from '../modules/review/ReviewsProvider'
import ReportsProvider from '../modules/report/ReportsProvider'
import ErrorHandler from '../modules/general/ErrorHandler'

interface IProps {
  children?: React.ReactNode
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <ErrorHandler>
      <AuthProvider>
        <AccommodationsProvider>
          <ReviewsProvider>
            <ReportsProvider>{children}</ReportsProvider>
          </ReviewsProvider>
        </AccommodationsProvider>
      </AuthProvider>
    </ErrorHandler>
  )
}

export default AppProvider
