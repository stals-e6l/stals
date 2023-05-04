import React from 'react'
import { retrieveAccommodationResults } from '../../store/accommodation/actions'
import { Button, Grid } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import PreviewAccommodations from './PreviewAccommodations'
import FilterAccommodation from '../../components/FilterAccommodations'

interface IProps {
  children?: React.ReactNode
}

const AccomodationResultsPage: React.FC<IProps> = () => {
  const accommodationResults = retrieveAccommodationResults()
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
        <Button
          variant="contained"
          onClick={() => setShowPreview(prev => !prev)}
        >
          Download
        </Button>
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
