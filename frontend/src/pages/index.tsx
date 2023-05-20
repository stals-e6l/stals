import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const IndexPage: React.FC<IProps> = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      <Outlet />
    </Box>
  )
}

export default IndexPage
