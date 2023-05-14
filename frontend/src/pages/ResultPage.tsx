import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../modules/general/Navbar'

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
    </Box>
  )
}

export default ResultPage
