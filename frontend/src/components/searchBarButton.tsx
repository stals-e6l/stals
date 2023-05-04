import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import BannerPhoto from '../assets/Images/BannerFlipped2.jpg'
import { useNavigate } from 'react-router-dom'
import SearchBar from './searchBar'

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

const SearchBarButton = (props: any) => {
  const name = props
  const theme = useTheme()

  const navigate = useNavigate()
  const handleSearch = () => {
    console.log(name)
    navigate(`/accommodations/results?name=${name}`)
  }

  return (
    <Button
      onClick={handleSearch}
      sx={{
        height: '100%',
        textTransform: 'none',
        backgroundColor: green,
        padding: '1% 3%',
        color: grey,
        ':hover': {
          color: green,
        },
      }}
    >
      <SearchIcon
        sx={{
          color: 'inherit',
          fontSize: 'xx-large',
        }}
      />
      <Typography
        sx={{
          fontFamily: sourceSansPro,
          fontSize: '1rem',
          color: 'inherit',
          fontWeight: 'bold',
          [theme.breakpoints.down(800)]: {
            display: 'none',
          },
        }}
      >
        Search
      </Typography>
    </Button>
  )
}

export default SearchBarButton
