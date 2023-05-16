import { Box, Grid } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import FilterAccommodations from '../modules/accommodation/FilterAccommodations'
import SearchAccommodations from '../modules/accommodation/SearchAccommodations'
import AccommodationResults from '../modules/accommodation/AccommodationResults'

interface IProps {
  children?: React.ReactNode
}

const ResultPage: React.FC<IProps> = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Navbar />
      <Grid container>
        <Grid item xs={3}>
          <SearchAccommodations />
          <FilterAccommodations />
        </Grid>
        <Grid item xs={9}>
          <AccommodationResults />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResultPage
