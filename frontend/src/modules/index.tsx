import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

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
    '/AccommodationDetail',
  ]
  return (
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
  )
}

export default ModulesViewer
