import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import assets from '../../assets'
import SearchAccommodations from '../accommodation/SearchAccommodations'

interface IProps {
  children?: React.ReactNode
}

const Banner: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${assets.banner})`,
        backgroundSize: 'cover',
        height: theme.spacing(315 / 8),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          height: theme.spacing(100 / 8),
        },
      }}
    >
      <Grid
        item
        sx={{
          height: theme.spacing(68 / 8),
          [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(5),
          },
        }}
      >
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          sx={{
            display: 'inline-block',
            color: theme.palette.common.white,
          }}
        >
          Accommodation for everyone
        </Typography>
        <SearchAccommodations />
      </Grid>
    </Grid>
  )
}

export default Banner
