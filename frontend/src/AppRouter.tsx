import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccommodationPage from './pages/Accommodation'
import AccommodationDetailPage from './pages/Accommodation/detail'
import SamplePage from './pages/Sample'

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
])
