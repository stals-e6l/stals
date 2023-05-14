import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import Banner from '../modules/general/Banner'

interface IProps {
  children?: React.ReactNode
}

const ExplorePage: React.FC<IProps> = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Navbar />
      <Banner />
    </Box>
  )
}

export default ExplorePage
