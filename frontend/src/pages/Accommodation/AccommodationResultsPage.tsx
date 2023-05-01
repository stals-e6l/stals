import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import { Button, Grid, TextField, Typography } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import { useSearchParams } from 'react-router-dom'
import PreviewAccommodations from './PreviewAccommodations'
import FilterAccommodation from '../../components/filterAccommodation'

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
  const [showPreview, setShowPreview] = React.useState<boolean>(false)

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
          padding: '25px',
          // backgroundColor: 'orange',
        }}
      >
        <FilterAccommodation />
        {/* <Typography>Filters</Typography>
        <TextField
          type="number"
          onChange={e => {
            setFilter(prev => ({ ...prev, price: Number(e.target.value) }))
          }}
          value={filter.price}
        />
        <Button onClick={handleFilter}>Filter it yow</Button>
        <Button onClick={() => setShowPreview(true)}>Download</Button> */}
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

      {showPreview && (
        <PreviewAccommodations
          show={showPreview}
          onClose={() => setShowPreview(false)}
          accommodations={accommodationResults}
        />
      )}
    </Grid>
  )
}

export default AccomodationResultsPage
