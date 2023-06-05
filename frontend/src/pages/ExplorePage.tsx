import { Grid, useTheme } from '@mui/material'
import React from 'react'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import Title from '../modules/accommodation/TitleComponent'
import AccommodationFormModal from '../modules/accommodation/AccommodationFormModal'

interface IProps {
  children?: React.ReactNode
}

const ExplorePage: React.FC<IProps> = () => {
  const theme = useTheme()

  return (
    <>
      <AccommodationFormModal />
      <Banner />
      <br />
      <Grid
        container
        rowGap={2}
        alignItems="center"
        sx={{
          width: '100%',
          paddingLeft: '10%',
          paddingRight: '10%',

          [theme.breakpoints.down('md')]: {
            padding: '0% 4%',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0% 2%',
            paddingTop: '5%',
          },
        }}
      >
        <Grid item xs={12}>
          <Title text="Most Viewed" />
        </Grid>
        <Grid item xs={12}>
          <AccommodationResults
            isPublicView={false}
            endpoint="accommodation?limit=4&sort_by=num_views&sort_order=descending"
          />
        </Grid>
        <Grid item xs={12}>
          <Title text="New Accommodations" />
        </Grid>
        <Grid item>
          <AccommodationResults
            isPublicView={false}
            endpoint="accommodation?limit=20"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ExplorePage
