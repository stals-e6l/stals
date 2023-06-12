import { Box } from '@mui/material'
import React from 'react'
import AccommodationDetail from '../modules/accommodation/AccommodationDetail'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  return (
    <Box>
      <AccommodationDetail />
    </Box>
  )
}

export default AccommodationDetailPage
