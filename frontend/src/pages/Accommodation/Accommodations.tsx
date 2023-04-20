import { Box, Grid, Typography, colors } from '@mui/material'
import React from 'react'
import AccommodationTile from '../../components/accommTile'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import { fontFamily } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const Accommodations: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()

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
            <AccommodationTile accommodation={accommodation} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Accommodations
