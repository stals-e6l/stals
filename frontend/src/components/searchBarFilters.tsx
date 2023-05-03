import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchBar from './searchBar'
import { useNavigate } from 'react-router-dom'

const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

const SearchBarFilters = (props: any) => {
  const theme = useTheme()
  

  return (
    <Button
      sx={{
        height: '100%',
        textTransform: 'none',
        backgroundColor: grey,
        padding: '1% 3%',
      }}
    >
      <FilterListIcon
        sx={{
          color: green,
          fontSize: 'xx-large',
        }}
      />
      <Typography
        sx={{
          fontFamily: sourceSansPro,
          fontSize: '1rem',
          color: green,
          fontWeight: 'bold',
          [theme.breakpoints.down(800)]: {
            display: 'none',
          },
        }}
      >
        Filters
      </Typography>
    </Button>
  )
}

export default SearchBarFilters
