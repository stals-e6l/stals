import { Box } from '@mui/material'
import React from 'react'
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
        height: 'calc(100vh - 60px)',
        width: '100%',
        position: 'relative',
      }}
    >
      <AccommodationFormModal />
      <Banner />
      <AccommodationResults />
    </Box>
  )
}

export default ExplorePage
