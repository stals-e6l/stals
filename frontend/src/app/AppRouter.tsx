import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import { AuthGuard } from '../modules/auth/AuthProvider'
import ExplorePage from '../pages/ExplorePage'
import ResultPage from '../pages/ResultPage'
import IndexPage from '../pages'
import AccommodationDetailPage from '../pages/AccommodationDetailPage'
import ProfilePage from '../pages/ProfilePage'
import PublicPage from '../pages/PublicPage'

export const ROUTES = {
  public: '/public',
  appAuth: '/auth',
  appExplore: '/explore',
  appResult: '/result',
  appAccommodationDetail: '/accommodations/:id',
  profile: '/profile',
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
    path: '/public',
    element: <PublicPage />,
  },
  {
    path: ROUTES.appAuth,
    element: <AuthPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <IndexPage />
      </AuthGuard>
    ),
    children: [
      // {
      //   path: ROUTES.appAuth,
      //   element: <AuthPage />,
      // },
      {
        path: ROUTES.appExplore,
        element: <ExplorePage />,
      },
      {
        path: ROUTES.appResult,
        element: <ResultPage />,
      },
      {
        path: ROUTES.appAccommodationDetail,
        element: <AccommodationDetailPage />,
      },
      {
        path: ROUTES.profile,
        element: <ProfilePage />,
      },
    ],
  },
])
