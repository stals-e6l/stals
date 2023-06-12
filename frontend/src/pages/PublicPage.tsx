import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import Footer from '../modules/general/Footer'
import Navbar from '../modules/general/Navbar'

interface IProps {
  children?: React.ReactNode
}

const PublicPage: React.FC<IProps> = () => {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <Banner />
      <Grid
        container
        rowGap={2}
        alignItems="center"
        sx={{
          width: '100%',
          padding: '5% 10%',

          [theme.breakpoints.down('md')]: {
            padding: '0% 4%',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0% 2%',
            paddingTop: '5%',
          },
        }}
      >
        <AccommodationResults
          isPublicView
          endpoint="public_accommodation?limit=20"
        />
      </Grid>
      <Footer />
    </Box>
  )
}

export default PublicPage
