import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import AccommodationPage from './pages/Accommodation/AccommodationPage'
// import AccommodationDetailPage from './pages/Accommodation/AccommodationDetailPage'
// import SamplePage from './pages/Sample'
// import CreateAccommodationPage from './pages/CreateAccommodation'
// import AccomodationResultsPage from './pages/Accommodation/AccommodationResultsPage'
// import SignUp from './pages/Auth/SignUp'
// import SignIn from './pages/Auth/SignIn'
// import Profile from './pages/Auth/Profile'
// import AuthWrapper from './pages/Auth'
import AccommodationCard from './modules/accommodation/AccommodationCard'
import AccommodationForm from './modules/accommodation/AccommodationForm'
import AccommodationFormModal from './modules/accommodation/AccommodationFormModal'
import AccommodationResults from './modules/accommodation/AccommodationResults'
import DeleteAccommodationForm from './modules/accommodation/DeleteAccommodationForm'
import DeleteAccommodationFormModal from './modules/accommodation/DeleteAccommodationFormModal'
import DownloadAccommodations from './modules/accommodation/DownloadAccommodations'
import FilterAccommodations from './modules/accommodation/FilterAccommodations'
import SearchAccommodations from './modules/accommodation/SearchAccommodations'
import SignInForm from './modules/accommodation/SignInForm'
import SignUpForm from './modules/accommodation/SignUpForm'
import ModulesViewer from './modules'

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
        path: '/AccommodationCard',
        element: <AccommodationCard />,
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
        element: <DeleteAccommodationFormModal />,
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
  // {
  //   path: '/',
  //   element: <AuthWrapper />,
  //   children: [
  //     {
  //       path: '/accommodations',
  //       element: <AccommodationPage />,
  //     },
  //     {
  //       path: '/accommodations/:id',
  //       element: <AccommodationDetailPage />,
  //     },
  //     {
  //       path: '/createaccommodation/',
  //       element: <CreateAccommodationPage />,
  //     },
  //     {
  //       path: '/accommodations/results',
  //       element: <AccomodationResultsPage />,
  //     },
  //     {
  //       path: '/sign-in',
  //       element: <SignIn />,
  //     },
  //     {
  //       path: '/profile',
  //       element: <Profile />,
  //     },
  //   ],
  // },
  // {
  //   path: '/sample',
  //   element: <SamplePage />,
  // },
])
