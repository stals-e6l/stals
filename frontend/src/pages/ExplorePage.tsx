import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import AccommodationFormModal from '../modules/accommodation/AccommodationFormModal'

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
        position: 'relative',
      }}
    >
      <AccommodationFormModal />
      <Navbar />
      <Banner />
      <AccommodationResults />
    </Box>
  )
}

export default ExplorePage
