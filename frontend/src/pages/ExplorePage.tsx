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
        sx={{
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
