import React from 'react'
import { Box, Typography } from '@mui/material'
import Banner from '../../components/bannerElement'
import Header from '../../components/header'
import { colors, fontFamily } from '../../theme'
import Accommodations from './Accommodations'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
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

        <Accommodations />
      </Box>
    </div>
  )
}

export default AccommodationPage
