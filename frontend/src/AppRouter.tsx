import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccommodationPage from './pages/Accommodation/AccommodationPage'
import AccommodationDetailPage from './pages/Accommodation/AccommodationDetailPage'
import SamplePage from './pages/Sample'
import CreateAccommodationPage from './pages/CreateAccommodation'

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
])
