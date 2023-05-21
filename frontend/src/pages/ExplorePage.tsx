import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import AccommodationFormModal from '../modules/accommodation/AccommodationFormModal'
import Title from '../modules/accommodation/TitleComponent'
import { COLOR } from '../theme/index'

interface IProps {
  children?: React.ReactNode
  isPublic?: boolean
}

const ExplorePage: React.FC<IProps> = ({ isPublic }) => {
  const theme = useTheme()

  return (
    <>
      <AccommodationFormModal />

      <Banner />
      <br />
      <Grid
        container
        rowGap={2}
        sx={{
          paddingLeft: '10%',
          paddingRight: '10%',
          [theme.breakpoints.down('md')]: {
            padding: '0% 4%',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0% 2%',
            paddingTop: '5%'
          },
        }}
      >
        <Grid item>
          <Title text="Most Viewed" />
        </Grid>
        <Grid item>
          <AccommodationResults isPublicView={false} />
        </Grid>
      </Grid>
    </>
  )
}

export default ExplorePage
