import React from 'react'
import {
  filterAccommodations,
  retrieveAccommodationResults,
} from '../../store/accommodation/actions'
import {
  Button,
  Grid,
  Input,
  Typography,
  Slider,
  InputAdornment,
  TextField,
  Autocomplete,
  Chip,
  useTheme,
} from '@mui/material'
import Header from '../../components/header'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import FilterAccommodations from '../../components/FilterAccommodations'
import AccommodationTile from '../../components/accommTile'
import PreviewAccommodations from './PreviewAccommodations'
import Banner from '../../components/bannerElement'
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
  const [showPreview, setShowPreview] = React.useState<boolean>(false)

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
    <Grid container sx={{ flexDirection: 'column' }}>
      <Grid item>
        <Header />
      </Grid>

      <Grid item>
        <Grid
          container
          sx={{
            p: 1,
            m: 'auto',
            maxWidth: '1350px',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
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
              m: 'auto',
            }}
          >
            <Typography>Filters</Typography>
            <FilterAccommodations />
            <Button onClick={() => setShowPreview(true)}>Download</Button>
          </Grid>

          {/* results */}
          <Grid
            item
            xs={9}
            sx={{
              p: 2,
              m: 'auto',
            }}
          >
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
