import { Box } from '@mui/material'
import React from 'react'

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
    ></Box>
  )
}

export default ExplorePage
