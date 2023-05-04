import React from 'react'
import {
  Box,
  Input,
  Typography,
  Button,
  Grid,
  useTheme,
  Paper,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import BannerPhoto from '../assets/Images/BannerFlipped2.jpg'
import { useNavigate } from 'react-router-dom'
import SearchBar from './searchBar'
import SearchBarFilters from './searchBarFilters'
import SearchBarButton from './searchBarButton'
import GitHubLabel from './filterComponent'

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

const Banner = (props: any) => {
  const theme = useTheme()

  const navigate = useNavigate()
  // const [name, setName] = React.useState<string>('askdjasj')

  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleSearchTermChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    navigate(`/accommodations/results?name=${searchTerm}`)
  }

  return (
    <Grid
      container
      xs={false}
      flexDirection={'column'}
      direction={'row'}
      // minHeight={'400px'}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${BannerPhoto})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: t =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        [theme.breakpoints.up('md')]: {
          minHeight: '400px',
        },
        [theme.breakpoints.down('md')]: {
          minHeight: '300px',
        },
        [theme.breakpoints.down('sm')]: {
          minHeight: '200px',
        },
      }}
    >
      <Grid container paddingX={'10%'} flexDirection={'column'}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: sourceSansPro,
              fontWeight: 'bold',
              color: grey,
              fontSize: '32px',
              [theme.breakpoints.down('md')]: {
                fontSize: '28px',
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: '24px',
              },
              [theme.breakpoints.between(0, 400)]: {
                fontSize: '18px',
              },
              transition: '0.3s all',
            }}
          >
            Accommodation for everyone
          </Typography>
        </Grid>

        <Grid item>
          <Box
            sx={{
              display: 'flex',
              width: '900px',
              backgroundColor: grey,
              borderRadius: '5px',
              [theme.breakpoints.down(1000)]: {
                width: '700px',
              },
              [theme.breakpoints.down(800)]: {
                width: '500px',
              },
              [theme.breakpoints.down('sm')]: {
                width: '300px',
              },
              transition: '0.3s all',
            }}
          >
            <SearchBar onSearchTermChange={handleSearchTermChange} />

            <SearchBarFilters />

            <SearchBarButton name={searchTerm} onSearch={handleSearch} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Banner
