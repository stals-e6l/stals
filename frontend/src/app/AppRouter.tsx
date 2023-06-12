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
import LandingPage from '../modules/landing/LandingPage'

export const ROUTES = {
  public: '/public',
  appAuth: '/auth',
  appExplore: '/app/explore',
  appResult: '/app/result',
  appAccommodationDetail: '/app/accommodations/:id',
  profile: '/app/profile',
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
    path: '/app',
    element: (
      <AuthGuard>
        <IndexPage />
      </AuthGuard>
    ),
    children: [
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
  {
    path: '/',
    element: <LandingPage />,
  },
])
