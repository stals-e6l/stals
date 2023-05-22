import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import { AuthGuard } from '../modules/auth/AuthProvider'
import ExplorePage from '../pages/ExplorePage'
import ResultPage from '../pages/ResultPage'
import IndexPage from '../pages'
import ProfilePage from '../pages/ProfilePage'
import PublicPage from '../pages/PublicPage'

export const ROUTES = {
  public: '/public',
  appAuth: '/app/auth',
  appExplore: '/app/explore',
  appResult: '/app/result',
  profile: '/app/profile'
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
    element: <PublicPage />,
  },
  {
    path: '/app',
    element: (
      <AuthGuard>
        <IndexPage />
      </AuthGuard>
    ),
    children: [
      {
        path: ROUTES.appAuth,
        element: <AuthPage />,
      },
      {
        path: ROUTES.appExplore,
        element: <ExplorePage />,
      },
      {
        path: ROUTES.appResult,
        element: <ResultPage />,
      },
      {
        path: ROUTES.profile,
        element: <ProfilePage />,
      },
    ],
  },
])
