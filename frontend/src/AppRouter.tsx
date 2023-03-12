import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
])
