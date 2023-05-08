import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { colors, fontFamily } from '../../theme'
import { retrieveAccommodations } from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'

interface IProps {
  children?: React.ReactNode
}

const AccommodationResults: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()

  if (!accommodations) {
    return <div>{/* TODO: handle null here */}</div>
  }
  // TODO: PM's job to integrate , for now refine the styling
  return (
    <Box id="Retrieve-All-BoxGrid">
      <Typography
        sx={{
          color: 'black',
          fontFamily: fontFamily,
          fontWeight: 'bold',
          fontSize: '25px',
          display: 'flex',
          marginTop: '2%',
          marginLeft: '10%',
        }}
      >
        {' '}
        <Typography
          sx={{
            color: colors.green,
            fontFamily: 'inherit',
            fontWeight: 'inherit',
            fontSize: 'inherit',
            marginRight: '0.25%',
          }}
        >
          |
        </Typography>{' '}
        Most Viewed
      </Typography>

      <Grid
        container
        id="Retrieve-All-Grid"
        rowGap={2}
        columnGap={2}
        sx={{
          alignContent: 'center',
          justifyContent: 'center',
          paddingTop: '20px',
          transition: '0.3s all',
        }}
      >
        {accommodations.map((accommodation, key: number) => (
          <Grid item lg={3} sx={{}} key={key}>
            <AccommodationCard accommodation={accommodation} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AccommodationResults
