import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccommodationPage from './pages/Accommodation/AccommodationPage'
import AccommodationDetailPage from './pages/Accommodation/AccommodationDetailPage'
import SamplePage from './pages/Sample'
import CreateAccommodationPage from './pages/CreateAccommodation'
import AccomodationResultsPage from './pages/Accommodation/AccommodationResultsPage'
import SignUp from './pages/Auth/SignUp'
import SignIn from './pages/Auth/SignIn'
import Profile from './pages/Auth/Profile'

interface IProps {
  children?: React.ReactNode
}

const AppRouter: React.FC<IProps> = () => {
  return <RouterProvider router={router} />
}

export default AppRouter

const router = createBrowserRouter([
  {
    path: '/',
    element: <>root</>,
  },
  {
    path: '/sample',
    element: <SamplePage />,
  },
  {
    path: '/accommodations',
    element: <AccommodationPage />,
  },
  {
    path: '/accommodations/:id',
    element: <AccommodationDetailPage />,
  },
  {
    path: '/createaccommodation/',
    element: <CreateAccommodationPage />,
  },
  {
    path: '/accommodations/results',
    element: <AccomodationResultsPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])
