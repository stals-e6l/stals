import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { retrieveAccommodations } from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'
import { COLOR } from '../../theme/index'

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
}

const AccommodationResults: React.FC<IProps> = (isPublicView) => {
  const accommodations = retrieveAccommodations()
  const numOfAccomm = accommodations?.length
  const theme = useTheme()

  if (!accommodations) {
    return <div>
      <br /><br />
      <Typography variant='body1'>
        No accommodations to show.
      </Typography>
    </div>
  }
  // TODO: PM's job to integrate , for now refine the styling
  return (
    <React.Fragment>
      <Grid
        container
        rowGap={3}
        columnGap={3}
        sx={{
          justifyContent: 'center',
          transition: '0.3s all',
        }}
      >
        {accommodations.map((accommodation, key: number) => (
          <Grid item key={key} lg={3}>
            <AccommodationCard
              accommodation={accommodation}
              isPublicView={true}
            />
          </Grid>
        ))}

        {/* Fillers */}
        {}
        <Grid item lg={3} visibility={'hidden'}>
          <AccommodationCard
            accommodation={accommodations[0]} 
            isPublicView={true}
          />
        </Grid>
        <Grid item lg={3} visibility={'hidden'}>
          <AccommodationCard
            accommodation={accommodations[0]} 
            isPublicView={true}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
