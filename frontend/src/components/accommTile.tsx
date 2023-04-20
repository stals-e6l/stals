import React from 'react'
import { Box, Typography, Button, Grid, Rating } from '@mui/material'
import Image from '../assets/Images/Ellens.jpg'
import { useNavigate } from 'react-router-dom'
import DeleteAccommodation from '../pages/Accommodation/DeleteAccommmodation'
import UpdateAccommodation from '../pages/Accommodation/UpdateAccomodation'

interface AccommDetails {
  accommodation: IAccommodation
}

function AccommodationTile({ accommodation }: AccommDetails) {
  const blue = '#154360'
  const green = '#60ce80'
  const grey = '#f0f0f0'
  const darkGrey = '#f5f5f7'
  const quicksand = 'Quicksand'
  const sourceSansPro = 'Source Sans Pro'
  const navigate = useNavigate()

  const accommType =
    accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1)
  const formattedPrice = 'Php ' + accommodation.price
  let formattedName = accommodation.name

  const [update, setUpdate] = React.useState<boolean>(false)

  // Name text display will adjust depending on the size of the string
  if (formattedName.length > 25)
    formattedName = formattedName.slice(0, 21) + '...'

  return (
    <Button
      sx={{
        textTransform: 'none',
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          backgroundColor: darkGrey,
          width: '300px',
          height: '350px',
          borderRadius: '20px',
          boxShadow: '0px 4px 4px #6e6e73',
          cursor: 'pointer',
          ':hover': {
            boxShadow: '0px 4px 15px #6e6e73',
          },
          transition: '0.3s all',
        }}
      >
        <Box
          onClick={() => navigate(`${accommodation._id as string}`)}
          component="img"
          src={Image}
          sx={{
            width: '100%',
            height: '200px',
            borderRadius: '20px 20px 5px 5px',
          }}
        />
        <Grid container direction="column" sx={{ paddingLeft: '15px' }}>
          <Grid item>
            <Typography
              sx={{
                fontFamily: quicksand,
                color: 'black',
              }}
            >
              {accommType}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontFamily: sourceSansPro,
                fontSize: 'x-large',
                fontWeight: 'bold',
                color: blue,
                whiteSpace: 'none',
              }}
            >
              {formattedName}
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Rating
                value={4.5}
                precision={0.5}
                readOnly
                sx={{
                  color: green,
                }}
              />
              <Typography
                sx={{
                  fontFamily: quicksand,
                  fontWeight: 'bold',
                  color: green,
                }}
              >
                {' '}
                {4.5}{' '}
              </Typography>
              <Typography
                sx={{
                  fontFamily: quicksand,
                  color: 'black',
                  marginLeft: '1%',
                }}
              >
                ({10} reviews)
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Typography
              sx={{
                fontFamily: sourceSansPro,
                color: blue,
                fontWeight: 'bold',
                fontSize: 'large',
              }}
            >
              {' '}
              {formattedPrice}{' '}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item>
              <Button variant="contained" onClick={() => setUpdate(true)}>
                Update
              </Button>
              <UpdateAccommodation
                open={update}
                handleClose={() => setUpdate(false)}
                accommodation={accommodation}
              />
            </Grid>
            <Grid item>
              <DeleteAccommodation accommodation={accommodation} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Button>
  )
}

export default AccommodationTile
