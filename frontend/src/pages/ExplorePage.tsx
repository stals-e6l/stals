import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'

interface IProps {
  children?: React.ReactNode
  isPublic?: boolean
}

const ExplorePage: React.FC<IProps> = ({ isPublic }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Navbar />
      <Banner />
      <AccommodationResults />
    </Box>
  )
}

export default ExplorePage
