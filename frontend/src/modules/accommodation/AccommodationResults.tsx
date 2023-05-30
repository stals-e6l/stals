import { Grid, Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import { retrieveAccommodations } from './AccommodationsProvider'
import AccommodationCard from './AccommodationCard'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface IProps {
  children?: React.ReactNode
  isPublicView?: boolean
}

const AccommodationResults: React.FC<IProps> = () => {
  const location = useLocation()
  const accommodations = retrieveAccommodations()
  const theme = useTheme()

  console.log(accommodations)
  if (!accommodations || accommodations.length === 0) {
    return (
      <Box
        sx={{
          mt: theme.spacing(30),
          textAlign: 'center',
          opacity: '75%'
        }}
      >
        <SearchOffIcon sx={{ color: theme.palette.secondary.main, fontSize: theme.spacing(15)}} />
        <Typography variant="h6">
          No Results found
        </Typography>
      </Box>
    )
  }

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
              isPublicView={location.pathname === ROUTES.public}
            />
          </Grid>
        ))}

        {/* Fillers */}
        {}
        <Grid item lg={3} visibility={'hidden'}>
          <AccommodationCard
            accommodation={accommodations[0]}
            isPublicView={location.pathname === ROUTES.public}
          />
        </Grid>
        <Grid item lg={3} visibility={'hidden'}>
          <AccommodationCard
            accommodation={accommodations[0]}
            isPublicView={location.pathname === ROUTES.public}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationResults
