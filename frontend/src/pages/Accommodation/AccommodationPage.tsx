import React from 'react'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import { Box, Typography, Grid } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import Banner from '../../components/bannerElement'
import Header from '../../components/header'
import { colors, fontFamily } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()

  return (
    <div id="retrieve-all">
      <Header />
      <Banner />
      <Box id="Retrieve-All-BoxGrid">
        <Typography
          sx={{
            color: 'black',
            fontFamily: fontFamily,
            fontWeight: 'bold',
            fontSize: '25px',
            display: 'flex',
            marginTop: '2%',
            marginLeft: '10%',
          }}
        >
          {' '}
          <Typography
            sx={{
              color: colors.green,
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              fontSize: 'inherit',
              marginRight: '0.25%',
            }}
          >
            |
          </Typography>{' '}
          Most Viewed
        </Typography>

        <Grid
          container
          id="Retrieve-All-Grid"
          rowGap={2}
          columnGap={2}
          sx={{
            alignContent: 'center',
            justifyContent: 'center',
            paddingTop: '20px',
            transition: '0.3s all',
          }}
        >
          {accommodations.map((accommodation, key: number) => (
            <Grid item lg={3} sx={{}} key={key}>
              <AccommodationTile
                type={accommodation.type}
                rating={4.5}
                name={accommodation.name}
                price={accommodation.price}
                review_num={20}
                link={`/accommodations/${accommodation._id}`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default AccommodationPage
