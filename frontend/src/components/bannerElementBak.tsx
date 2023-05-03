import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import BannerPhoto from '../assets/Images/BannerFlipped2.jpg'
import { useNavigate } from 'react-router-dom'

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

const Banner = (props: any) => {
  const theme = useTheme()

  const navigate = useNavigate()
  const [name, setName] = React.useState<string>('')
  const handleSearch = () => {
    navigate(`/accommodations/results?name=${name}`)
  }

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${BannerPhoto})`,
        backgroundSize: '100%, auto',
        backgroundRepeat: 'no-repeat',
        paddingLeft: '200px',
        height: '400px',
        [theme.breakpoints.down('lg')]: {
          height: '325px',
          paddingLeft: '150px',
        },
        [theme.breakpoints.down('md')]: {
          height: '250px',
          paddingLeft: '100px',
        },
        [theme.breakpoints.down('sm')]: {
          height: '175px',
          paddingLeft: '50px',
        },
        [theme.breakpoints.down('xs')]: {
          height: '100px',
          paddingLeft: '25px',
        },
        [theme.breakpoints.between(0, 450)]: {
          height: '90px',
          paddingLeft: '10px',
        },
        transition: '0.3s all',
      }}
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
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
            outline: 'solid',
            outlineColor: 'red',
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
          <Input
            placeholder="Search Accommodation"
            onChange={e => setName(e.target.value.trim())}
            disableUnderline
            fullWidth
            sx={{
              backgroundColor: grey,
              padding: '1% 2%',
              fontFamily: quicksand,
              color: 'black',
              borderRadius: '5px',
              fontSize: '16px',
              [theme.breakpoints.down(800)]: {
                color: '14px',
              },
              [theme.breakpoints.down('sm')]: {
                color: '12px',
              },
              [theme.breakpoints.down('xs')]: {
                color: '10px',
              },
            }}
          />

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
        </Box>
      </Grid>
    </Grid>
  )
}

export default Banner
