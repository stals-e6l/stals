import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import { Button } from '@mui/material'
import UpdateAccomodation from './UpdateAccomodation'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)
  const [update, setUpdate] = React.useState<boolean>(false)

  const toggleUpdate = () => setUpdate(prev => !prev)

  if (!accommodation) {
    return <div>no accommodation found!</div>
  }

  return (
    <div>
      {/* details */}
      {JSON.stringify(accommodation)}

      {/* update */}
      {update && (
        <UpdateAccomodation
          accommodation={accommodation}
          open={update}
          handleClose={toggleUpdate}
        />
      )}
      <Button variant="contained" onClick={toggleUpdate}>
        Edit Accommodation
      </Button>
    </div>
  )
}

export default AccommodationDetailPage
