import { Grid, Typography } from '@mui/material'
import React from 'react'
import { retrieveAccommodations } from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
}

const AccommodationResults: React.FC<IProps> = () => {
  const location = useLocation()
  const accommodations = retrieveAccommodations()

  if (!accommodations) {
    return (
      <div>
        <br />
        <br />
        <Typography variant="body1">No accommodations to show.</Typography>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Grid
        container
        rowGap={3}
        columnGap={3}
        sx={{
          transition: '0.3s all',
        }}
      >
        {accommodations.map((accommodation, key: number) => (
          <Grid item key={key}>
            <AccommodationCard
              accommodation={accommodation}
              isPublicView={location.pathname === ROUTES.public}
            />
          </Grid>
        ))}
        
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
