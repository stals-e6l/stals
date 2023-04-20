import { Grid } from '@mui/material'
import React from 'react'
import AccommodationTile from '../../components/accommTile'
import { retrieveAccommodations } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const Accommodations: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()

  return (
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
  )
}

export default Accommodations
