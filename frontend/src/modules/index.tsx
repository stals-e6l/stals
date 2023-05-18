import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AccommodationsProvider from './accommodation/AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
}

const ModulesViewer: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const modules = [
    '/AccommodationCard',
    '/AccommodationForm',
    '/AccommodationFormModal',
    '/AccommodationResults',
    '/DeleteAccommodationForm',
    '/DeleteAccommodationFormModal',
    '/DownloadAccommodations',
    '/FilterAccommodations',
    '/SearchAccommodations',
    '/SignInForm',
    '/SignUpForm',
    '/AddReviewForm',
    '/AddReviewModal',
  ]
  return (
    <AccommodationsProvider>
      <div>
        <ul
          style={{
            marginBottom: '20px',
          }}
        >
          {modules &&
            modules.map(module => (
              <li
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                key={module}
                onClick={() => navigate(module)}
              >
                {module}
              </li>
            ))}
        </ul>
        <hr style={{ marginBottom: '20px' }} />
        <Outlet />
      </div>
    </AccommodationsProvider>
  )
}

export default ModulesViewer
