import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import AccommodationTile from '../../components/accommTile'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PreviewAccommodations from './PreviewAccommodations'
import Banner from '../../components/bannerElement'
import Header from '../../components/header'
import SearchBar from '../../components/searchBar'
import SearchBarButton from '../../components/searchBarButton'
import { useAccommodationForm } from './form/hooks'

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

interface IProps {
  children?: React.ReactNode
}

function Filters({ setFilter, filter }: any) {
  return (
    <div>
      <TextField
        type="number"
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        fullWidth
        value={filter.price}
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.unitSz}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="unitSz"
        label="Unit size"
        name="unitSz"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.meters_from_uplb}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="metersFromUPLB"
        label="Meters from UPLB"
        name="metersFromUPLB"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.num_rooms}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="numBedRm"
        label="Number of bedrooms"
        name="numberOfBedrooms"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.num_beds}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="numBeds"
        label="Number of Beds"
        name="numBeds"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.min_pax}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="minPax"
        label="Minimum capacity"
        name="minPax"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <TextField
        value={filter.max_pax}
        onChange={e => {
          setFilter((prev: any) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }}
        margin="normal"
        fullWidth
        id="maxPax"
        label="Maximum capacity"
        name="maxPax"
        type="number"
        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      />
      <Autocomplete
        multiple
        id="furnishing"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            variant="outlined"
            label="Furnishing"
            placeholder="Add furnishing"
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
          />
        )}
      />
    </div>
  )
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

  const theme = useTheme()

  const navigate = useNavigate()
  // const [name, setName] = React.useState<string>('askdjasj')

  const [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleSearchTermChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    navigate(`/accommodations/results?name=${searchTerm}`)
  }

  return (
    <div id="search-results">
      <Header />
      <Grid container flexDirection={'row'}>
        {/* filters */}
        <Grid
          item
          xs={3}
          sx={{
            background: blue,
          }}
        >
          <Grid
            container
            flexDirection={'column'}
            alignItems={'center'}
            height={'1000px'}
          >
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              sx={{ color: 'white', paddingTop: '20px', paddingBottom: '10px' }}
            >
              Filters
            </Typography>
            <Grid container paddingX={'7.5%'}>
              <Filters setFilter={setFilter} filter={filter} />
            </Grid>
            <Button onClick={handleFilter}>Filter it yow</Button>
            <Button onClick={() => setShowPreview(true)}>Download</Button>
          </Grid>
        </Grid>
        <Grid container xs={9}>
          {/* results */}
          <Grid
            container
            justifyContent="center"
            alignItems={'center'}
            marginX={'10%'}
            height={'150px'}
          >
            <Box
              sx={{
                display: 'flex',
                width: '900px',
                backgroundColor: grey,
                borderRadius: '5px',
                [theme.breakpoints.down(1000)]: {
                  width: '700px',
                },
                [theme.breakpoints.down(800)]: {
                  width: '500px',
                },
                [theme.breakpoints.down('sm')]: {
                  width: '300px',
                },
                transition: '0.3s all',
              }}
            >
              <SearchBar onSearchTermChange={handleSearchTermChange} />

              <SearchBarButton name={searchTerm} onSearch={handleSearch} />
            </Box>
          </Grid>
          <Grid item>
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
    </div>
  )
}

export default AccomodationResultsPage
