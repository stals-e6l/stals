import React from 'react'
import { useAccommodation } from '../../store/accommodation'
import accommodationsActions from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const { retrieveAllAccommodations, dispatch } = useAccommodation()

  const accommodations = retrieveAllAccommodations!()

  return (
    <div>
      {JSON.stringify(accommodations)}
      <button
        onClick={() => {
          dispatch({
            type: accommodationsActions.ACCOMMODATION_CREATE,
            payload: {},
          })
        }}
      >
        create
      </button>
    </div>
  )
}

export default AccommodationPage
