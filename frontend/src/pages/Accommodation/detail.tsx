import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteAccommodation,
  retrieveAccommodationById,
  updateAccommodation,
} from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const accommodation = retrieveAccommodationById(params.id as string)
  const updateAccommodationHandler = updateAccommodation()
  const deleteAccommodationHandler = deleteAccommodation()

  if (!accommodation) {
    return <div>no accommodation found!</div>
  }

  return (
    <div>
      {JSON.stringify(accommodation)}
      <button
        onClick={() => {
          if (accommodation) {
            updateAccommodationHandler({ ...accommodation, name: 'STUFF' })
          }
        }}
      >
        click to update its name to STUFF
      </button>
      <button
        onClick={async () => {
          try {
            if (accommodation._id) {
              await deleteAccommodationHandler(accommodation._id)
              navigate('/accommodations')
            }
          } catch (err) {
            alert('error deleting accommodation!')
          }
        }}
      >
        click to delete accommodation with id {accommodation?._id}
      </button>
    </div>
  )
}

export default AccommodationDetailPage
