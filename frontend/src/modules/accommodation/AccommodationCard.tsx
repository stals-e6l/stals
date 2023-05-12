import { Button, Box, Grid, Typography, Rating, useTheme, Card, CardMedia, CardContent, CardActionArea } from '@mui/material'
import React from 'react'
// import { useNavigate } from 'react-router-dom'
import AccommodationFormModal from './AccommodationFormModal'
import DeleteAccommodationFormModal from './DeleteAccommodationFormModal'
import Image from "../../assets/Ellens.jpg"

interface IProps {
  children?: React.ReactNode
  accommodation: IAccommodation
}

// This functions converts a string to sentence case format (e.g. transient space to Transient Space)
function toSentenceCase( str: string ) {

  str = str.toLowerCase();
  let strSplit = str.split(' ');

  for (var i=0; i<strSplit.length; i++) {
    strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1);
  }

  return strSplit.join(' ');
}

const AccommodationCard: React.FC<IProps> = ({ accommodation }) => {
  const blue = '#154360'
  const green = '#60ce80'
  const darkGrey = '#f5f5f7'
  const quicksand = 'Quicksand'
  const sourceSansPro = 'Source Sans Pro'
  // const navigate = useNavigate()

  const theme = useTheme()

  // if (!accommodation) {
  //   return (
  //     <Box
  //       sx={{
  //         // desktop
  //         background: 'red',
  //         // tablet
  //         [theme.breakpoints.down('md')]: {
  //           background: 'green',
  //         },
  //         // mobile
  //         [theme.breakpoints.down('sm')]: {
  //           background: 'orange',
  //         },
  //       }}
  //     >
  //       hello
  //     </Box>
  //   )
  // }

  return (

    // Initialize card
    <Card sx={{
      backgroundColor: darkGrey,
      width: '300px',
      borderRadius: '20px',
      boxShadow: '0px 4px 4px #6e6e73',
      cursor: 'pointer',
      ':hover': {
        boxShadow: '0px 4px 15px #6e6e73',
      },
      transition: '0.3s all',
    }}>

      <CardActionArea>

        {/* Accommodation Image */}
        <CardMedia
          component="img"
          height="200px"
          image={Image}
        />

        <CardContent sx={{ wordSpacing: "10" }}>

          {/* Type of Accommodation */}
          <Typography
            sx={{
              fontFamily: quicksand,
              color: 'black',
            }}
          >
            {toSentenceCase( accommodation.type )}
          </Typography>

          {/* Name of Accommodation */}
          <Typography
            sx={{
              fontFamily: sourceSansPro,
              
              fontWeight: 'bold',
              fontSize: 'x-large',
              color: blue,
              whiteSpace: 'nowrap',
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {toSentenceCase( accommodation.name )}
          </Typography>

          <Box
            sx={{
              display: 'flex',
            }}
          >

            {/* Rating */}
            <Rating
              value={4.5}
              precision={0.5}
              readOnly
              sx={{
                color: green,
              }}
            />

            {/* Rating in Number */}
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

            {/* Number of Reviews */}
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

          <br />
          
          {/* Price */}
          <Typography
              sx={{
                fontFamily: sourceSansPro,
                color: blue,
                fontWeight: 'bold',
                fontSize: 'large',
              }}
            >
              {' '}
              {/* Formats the number to currency format */}
              Php {new Intl.NumberFormat().format(accommodation.price)}{' '}
            </Typography>

        </CardContent>
      </CardActionArea>
    </Card>

  )
}

export default AccommodationCard