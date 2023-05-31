import { Box, ZIndex } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/general/Footer'

interface IProps {
  children?: React.ReactNode
}

const IndexPage: React.FC<IProps> = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <br/><br/>
      <Outlet />
      <br/><br/>
      <Footer />
    </Box>
  )
}

export default IndexPage
