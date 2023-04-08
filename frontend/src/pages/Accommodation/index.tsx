import React from 'react'
import { useNavigate } from 'react-router-dom'
import { retrieveAccommodations } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()
  const navigate = useNavigate()

  return (
    <div>
      <ul>
        {accommodations.map((accommodation, key: number) => (
          <li
            style={{ cursor: 'pointer' }}
            key={key}
            onClick={() => navigate(`/accommodations/${accommodation._id}`)}
          >
            {accommodation.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccommodationPage
