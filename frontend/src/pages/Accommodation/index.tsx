import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createAccommodation,
  retrieveAccommodations,
} from '../../store/accommodation/actions'
import { Button } from '@mui/material'
import UpdateAccomodation from './update/UpdateAccomodation'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()
  const navigate = useNavigate()
  const createAccommodationHandler = createAccommodation()

  return (
    <div>
      <button
        onClick={() => {
          createAccommodationHandler({
            name: 'test name',
            description: 'listing description',
            address: 'listing address',
            type: 'apartment',
            price: 0,
            size_sqm: 0,
            meters_from_uplb: 0,
            landmarks: [],
            min_pax: 0,
            max_pax: 0,
            num_rooms: 0,
            num_beds: 0,
            num_views: 0,
            furnishing: 'semifurnished',
            cooking_rules: [],
            pet_rules: [],
            other_rules: [],
            safety_and_security: [],
            appliances: [],
            amenities: [],
            created_at: 'date',
            updated_at: 'date',
            is_soft_deleted: false,
          })
        }}
      >
        create
      </button>
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
