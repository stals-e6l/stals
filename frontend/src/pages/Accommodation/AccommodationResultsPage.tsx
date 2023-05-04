import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import { Button, Grid, TextField, Typography } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import { useSearchParams } from 'react-router-dom'
import PreviewAccommodations from './PreviewAccommodations'
import FilterAccommodation from '../../components/FilterAccommodations'

interface IProps {
  children?: React.ReactNode
}

const AccomodationResultsPage: React.FC<IProps> = () => {
  const accommodationResults = retrieveAccommodationResults()
  const searchParams = useSearchParams()  
  const [showPreview, setShowPreview] = React.useState<boolean>(false)

  return (
    <Grid container>
      {/* filters */}
      <Grid
        item
        xs={3}
        sx={{
          padding: '25px',
        }}
      >
        <FilterAccommodation />
        
      </Grid>

      {/* results */}
      <Grid item xs={9}>
        {accommodationResults.map(accommodation => (
          <AccommodationTile
            key={accommodation._id}
            accommodation={accommodation}
          />
        ))}
      </Grid>

      {showPreview && (
        <PreviewAccommodations
          show={showPreview}
          onClose={() => setShowPreview(false)}
          accommodations={accommodationResults}
        />
      )}
    </Grid>
  )
}

export default AccomodationResultsPage
