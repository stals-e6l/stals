import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccommodationCard from '../modules/accommodation/AccommodationCard'
import AccommodationForm from '../modules/accommodation/AccommodationForm'
import AccommodationFormModal from '../modules/accommodation/AccommodationFormModal'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import DeleteAccommodationForm from '../modules/accommodation/DeleteAccommodationForm'
import DeleteAccommodationFormModal from '../modules/accommodation/DeleteAccommodationFormModal'
import DownloadAccommodations from '../modules/accommodation/DownloadAccommodations'
import FilterAccommodations from '../modules/accommodation/FilterAccommodations'
import SearchAccommodations from '../modules/accommodation/SearchAccommodations'
import SignInForm from '../modules/accommodation/SignInForm'
import SignUpForm from '../modules/accommodation/SignUpForm'
import ModulesViewer from '../modules'
import AuthPage from '../pages/AuthPage'

const ROUTES = {
  auth: '/auth',
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
    element: <ModulesViewer />,
    children: [
      {
        path: ROUTES.auth,
        element: <AuthPage />,
      },
      {
        path: '/AccommodationCard',
        element: <AccommodationCard accommodation={{} as any} />,
      },
      {
        path: '/AccommodationForm',
        element: <AccommodationForm />,
      },
      {
        path: '/AccommodationFormModal',
        element: <AccommodationFormModal />,
      },
      {
        path: '/AccommodationResults',
        element: <AccommodationResults />,
      },
      {
        path: '/DeleteAccommodationForm',
        element: <DeleteAccommodationForm />,
      },
      {
        path: '/DeleteAccommodationFormModal',
        element: (
          <DeleteAccommodationFormModal
            accommodationId={''}
            isSoftDelete={false}
          />
        ),
      },
      {
        path: '/DownloadAccommodations',
        element: <DownloadAccommodations />,
      },
      {
        path: '/FilterAccommodations',
        element: <FilterAccommodations />,
      },
      {
        path: '/SearchAccommodations',
        element: <SearchAccommodations />,
      },
      {
        path: '/SignInForm',
        element: <SignInForm />,
      },
      {
        path: '/SignUpForm',
        element: <SignUpForm />,
      },
    ],
  },
])
