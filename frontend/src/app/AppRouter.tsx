import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ModulesViewer from '../modules'
import AuthPage from '../pages/AuthPage'
import { AuthGuard } from '../modules/auth/AuthProvider'
import ExplorePage from '../pages/ExplorePage'
import ResultPage from '../pages/ResultPage'
import IndexPage from '../pages'
import ProfilePage from '../pages/ProfilePage'

export const ROUTES = {
  auth: '/auth',
  explore: '/explore',
  result: '/result',
  profile: '/profile'
}

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
    element: (
      <AuthGuard>
        <IndexPage />
      </AuthGuard>
    ),
    children: [
      {
        path: ROUTES.auth,
        element: <AuthPage />,
      },
      {
        path: ROUTES.explore,
        element: <ExplorePage />,
      },
      {
        path: ROUTES.result,
        element: <ResultPage />,
      },
      {
        path: ROUTES.profile,
        element: <ProfilePage />,
      },
    ],
  },
])
