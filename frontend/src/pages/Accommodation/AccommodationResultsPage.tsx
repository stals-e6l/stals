import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import { Button, Grid, Input, Typography, Slider, InputAdornment } from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import { useSearchParams } from 'react-router-dom'
import PreviewAccommodations from './PreviewAccommodations'
import Header from '../../components/header'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()
  const [name, setName] = React.useState<string>('')
  const handleSearch = () => {
    navigate(`/accommodations/results?name=${name}`)
  }

  // console.log(filter)
  const handleFilter = () => {
    filterAccommodationsHandler(filter)
  }

  React.useEffect(() => {
    handleFilter()
  }, [])

/*
      <TextField
          type="number"
          onChange={e => {
            setFilter(prev => ({ ...prev, price: Number(e.target.value) }))
          }}
          value={filter.price}
        />
*/

  return (
    <Grid container sx={{ flexDirection: 'column' }}>
    <Grid item>
        <Header />
    </Grid>
    <Grid item xs={3}>
        <Input
            placeholder="Search Accommodation"
            onChange={e => setName(e.target.value.trim())}
            startAdornment={
               <InputAdornment position="start" onClick={handleSearch}>
                <SearchIcon />
               </InputAdornment> 
            }
            disableUnderline
            fullWidth
            sx={{
                p: 1,
                m: 1,
                border: '1px solid black',
                borderRadius: '10px'
            }}
        ></Input>
    </Grid>
    <Grid item>
    <Grid container sx={{ 
        p: 1,
        m: 'auto',
        maxWidth: '1350px',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }}>
          {/* filters */}
          <Grid
            item
            xs={3}
            sx={{
              background: '#F0F0F0',
              p: '15px',
              borderRadius: '10px',
              border: '1px grey solid',
              height: '100%',
              m: 'auto'
            }}
          >
            <Typography>Filters</Typography>
            <Button onClick={handleFilter}>Filter it yow</Button>
            <Button onClick={() => setShowPreview(true)}>Download</Button>
          </Grid>

          {/* results */}
          <Grid item xs={9} sx={{
                p: 2,
                m: 'auto',
            }}>
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
    </Grid>
</Grid>

  )
}

export default AccomodationResultsPage
