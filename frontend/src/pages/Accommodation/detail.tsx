import React from 'react'
import { useParams } from 'react-router-dom'
import {
  retrieveAccommodationById,
  updateAccommodation,
} from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)
  const updateAccommodationHandler = updateAccommodation()

  return (
    <div>
      {JSON.stringify(accommodation)}
      <button
        onClick={() => {
          if (accommodation) {
            updateAccommodationHandler(accommodation)
          }
        }}
      >
        click to update its name to STUFF
      </button>
    </div>
  )
}

export default AccommodationDetailPage
