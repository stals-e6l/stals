import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import { Button, Grid, TextField, Typography } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const AccomodationResultsPage: React.FC<IProps> = () => {
  const accommodationResults = retrieveAccommodationResults()
  const searchParams = useSearchParams()
  const filterAccommodationsHandler = filterAccommodations()
  const [filter, setFilter] = React.useState<IAccommodationFilter>({
    name: searchParams[0].get('name') as string,
    type: undefined,
    price: undefined,
    size_sqm: undefined,
    meters_from_uplb: undefined,
    min_pax: undefined,
    max_pax: undefined,
    num_rooms: undefined,
    num_beds: undefined,
    furnishing: undefined,
  })

  // console.log(filter)
  const handleFilter = () => {
    filterAccommodationsHandler(filter)
  }

  React.useEffect(() => {
    handleFilter()
  }, [])

  return (
    <Grid container>
      {/* filters */}
      <Grid
        item
        xs={3}
        sx={{
          background: 'orange',
        }}
      >
        <Typography>Filters</Typography>
        <TextField
          type="number"
          onChange={e => {
            setFilter(prev => ({ ...prev, price: Number(e.target.value) }))
          }}
          value={filter.price}
        />
        <Button onClick={handleFilter}>Filter it yow</Button>
      </Grid>

      {/* results */}
      <Grid item xs={9}>
        {accommodationResults.map(accommodation => (
          <AccommodationTile
            key={accommodation._id}
            accommodation={accommodation}
          />
        ))}
      </Grid>
    </Grid>
  )
}

export default AccomodationResultsPage
