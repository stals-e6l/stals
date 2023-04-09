import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createAccommodation,
  retrieveAccommodations,
} from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()
  const createAccommodationHandler = createAccommodation()
  const navigate = useNavigate()

  const handleSampleCreate = () => {
    createAccommodationHandler({
      name: 'asdfasdfsadf',
      address: 'sdfsdfs',
      type: 'hotel',
      price: 0,
      size_sqm: 0,
      meters_from_uplb: 0,
      landmarks: [],
      min_pax: 0,
      max_pax: 0,
      num_rooms: 0,
      num_beds: 5,
      num_views: 0,
      furnishing: 'unfurnished',
      cooking_rules: [],
      pet_rules: [],
      other_rules: [],
      safety_and_security: [],
      appliances: [],
      amenities: [],
      is_soft_deleted: false,
    })
  }

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
      <button onClick={() => handleSampleCreate()}>
        sample create accommodation
      </button>
    </div>
  )
}

export default AccommodationPage
