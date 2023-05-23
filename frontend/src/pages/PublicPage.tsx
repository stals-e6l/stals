import React from 'react'
import { Box } from '@mui/material'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'

interface IProps {
  children?: React.ReactNode
}

const PublicPage: React.FC<IProps> = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Banner />
      <AccommodationResults />
    </Box>
  )
}

export default PublicPage
