import React from 'react'
import { useNavigate } from 'react-router-dom'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import Header from '../../components/header'
import Banner from '../../components/Banner/bannerElement'
import AccommodationTile from '../../components/accommTile'
import { CssBaseline, Box, Typography, Grid,  } from '@mui/material'
interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()
  const navigate = useNavigate()

  // Edit here
  return (
    <div id='retrieve-all' >

      <CssBaseline />
      <Header />

      <Banner />

      
      {
        
      
      <Box id='Retrieve-All-BoxGrid'>
        <Typography id="Retrieve-All-Most-Viewed"> <span id="Vertical-Line">|</span> Most Viewed</Typography>

        <Grid container
          id='Retrieve-All-Grid'
          columnGap={0}
          padding={3}
          columnSpacing={{ xs: 3, sm: 2, md: 3 }}
          rowGap={2}>

          {accommodations.map((accommodation, key: number) => (
            <Grid item id='Retrieve-All-GridItem'>
              <AccommodationTile type={accommodation.type}
                rating={4.5}
                name={accommodation.name}
                price={accommodation.price}
                review_num={20}
                link={`/accommodations/${accommodation._id}`} />
            </Grid>
          ))}
        </Grid>
          </Box>}
    </div>
  )
}

export default AccommodationPage
