/* eslint-disable indent */
import React from 'react'
import {
  Typography,
  Grid,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Rating,
  FormGroup,
  useTheme,
  Button,
} from '@mui/material'
import { COLOR } from '../../theme'
import { buildQueryString, extractQueryString } from '../../utils/queryString'
import { filterAccommodations } from './AccommodationsProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import Title from './TitleComponent'

interface IProps {
  children?: React.ReactNode
}

const FilterAccommodations: React.FC<IProps> = () => {
  //hook
  const theme = useTheme()
  const navigate = useNavigate()
  const onFilterAccommodations = filterAccommodations()
  const location = useLocation()

  // state
  const [filter, setFilter] = React.useState<IAccommodationsFilter>({
    search: extractQueryString(location.search).search || '',
    type: '',
    min_price: 0,
    max_price: 10000,
    size_sqm: 0,
    meters_from_uplb: 0,
    min_pax: 0,
    max_pax: 10000,
    num_rooms: 0,
    num_beds: 0,
    furnishing: '',
  })

  // events
  const onChange = (
    key: keyof IAccommodationsFilter,
    val: undefined | string | number
  ) => {
    setFilter(prev => ({ ...prev, [key]: val }))
  }

  const onFilter = (filter: IAccommodationsFilter) => {
    const queryString = buildQueryString({
      // name: filter.name === '' ? undefined : filter.name,
      search: filter.search === '' ? undefined : filter.search,
      type: filter.type === '' ? undefined : filter.type,
      min_price: filter.min_price === 0 ? undefined : filter.min_price,
      max_price: filter.max_price === 10000 ? undefined : filter.max_price,
      size_sqm: filter.size_sqm === 0 ? undefined : filter.size_sqm,
      meters_from_uplb:
        filter.meters_from_uplb === 0 ? undefined : filter.meters_from_uplb,
      min_pax: filter.min_pax === 0 ? undefined : filter.min_pax,
      max_pax: filter.max_pax === 10000 ? undefined : filter.max_pax,
      num_rooms: filter.num_rooms === 0 ? undefined : filter.num_rooms,
      num_beds: filter.num_beds === 0 ? undefined : filter.num_beds,
      furnishing: filter.furnishing === '' ? undefined : filter.furnishing,
    })

    if (onFilterAccommodations) {
      onFilterAccommodations(queryString)
    }

    navigate(`${ROUTES.appResult}?${queryString}`) // ux
  }

  React.useEffect(() => {
    onFilter(filter)
  }, [filter.search])

  React.useEffect(() => {
    const qs = extractQueryString(location.search)
    if (qs.search) {
      setFilter(prev => ({ ...prev, search: qs.search }))
    }
  }, [location.search])

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* | Filters */}
          <Title text="Filters" />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            paddingLeft={theme.spacing(2)}
            paddingRight={theme.spacing(2)}
          >
            {/* Type */}
            <Grid item>
              <FormControl>
                <FormLabel id="type">
                  <Typography variant="h6" color={COLOR.black}>
                    Type
                  </Typography>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="hotel"
                  value={filter.type}
                  onChange={(e, val) => {
                    onChange('type', val)
                  }}
                >
                  {ACCOMMODATION_TYPES.map(type => (
                    <FormControlLabel
                      key={type.label}
                      value={type.value}
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="body1">{type.label}</Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/*  Ratings */}
            <Grid item xs={12}>
              <Typography variant="h6">Ratings</Typography>
              <FormGroup>
                {ACCOMMODATION_RATINGS.map(rating => (
                  <FormControlLabel
                    disabled
                    key={rating}
                    control={<Checkbox size="small" />}
                    label={
                      <Rating
                        value={rating}
                        readOnly
                        sx={{
                          color: COLOR.blue,
                          [theme.breakpoints.down('md')]: {
                            fontSize: theme.spacing(2.25),
                          },
                        }}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </Grid>

            {/* Price */}
            <Grid item xs={12}>
              <Typography variant="h6">Price Range</Typography>
              <Slider
                min={0}
                max={10000}
                disableSwap
                value={[filter.min_price as number, filter.max_price as number]}
                onChange={(e, val) => {
                  const range = [...(val as number[])]
                  onChange('min_price', range[0])
                  onChange('max_price', range[1])
                }}
              />
              <Typography variant="body2">
                Php {filter.min_price} - Php {filter.max_price}
              </Typography>
            </Grid>

            {/* Room size */}
            <Grid item>
              <Typography variant="h6">Room Size</Typography>
              <Slider
                max={10}
                value={filter.size_sqm}
                onChange={(e, val) => onChange('size_sqm', val as number)}
              />
              <Typography variant="body2">{filter.size_sqm} sqm.</Typography>
            </Grid>

            {/*Meters from UPLB */}
            <Grid item>
              <Typography variant="h6">Meters from UPLB</Typography>
              <Slider
                max={10000}
                value={filter.meters_from_uplb}
                onChange={(e, val) =>
                  onChange('meters_from_uplb', val as number)
                }
              />
              <Typography variant="body2">
                {filter.meters_from_uplb} meters
              </Typography>
            </Grid>

            {/* Number of Occupants */}
            <Grid item>
              <Typography variant="h6">Number of occupants</Typography>
              <Slider
                min={0}
                max={10000}
                value={[filter.min_pax as number, filter.max_pax as number]}
                onChange={(e, val) => {
                  const range = [...(val as number[])]
                  onChange('min_pax', range[0])
                  onChange('max_pax', range[1])
                }}
                disableSwap
              />
              <Typography variant="body2">
                {filter.min_pax} - {filter.max_pax} persons
              </Typography>
            </Grid>

            {/*  Number of Room */}
            <Grid item>
              <Typography variant="h6">Number of rooms</Typography>
              <Slider
                min={0}
                max={10}
                value={filter.num_rooms}
                onChange={(e, val) => {
                  onChange('num_rooms', val as number)
                }}
              />
              <Typography variant="body2">{filter.num_rooms} room</Typography>
            </Grid>
            {/*Number of Beds */}
            <Grid item>
              <Typography variant="h6">Number of beds</Typography>
              <Slider
                min={0}
                value={filter.num_beds}
                onChange={(e, val) => {
                  onChange('num_beds', val as number)
                }}
                disableSwap
              />
              <Typography variant="body2">{filter.num_beds} beds</Typography>
            </Grid>

            {/* Furnishing */}
            <Grid item>
              <FormControl>
                <FormLabel>
                  <Typography variant="h6">Furnishing</Typography>
                </FormLabel>

                <RadioGroup
                  value={filter.furnishing}
                  onChange={(e, val) => onChange('furnishing', val)}
                >
                  {ACCOMMODATION_FURNISHING.map(furnishing => (
                    <FormControlLabel
                      key={furnishing.value}
                      value={furnishing.value}
                      control={<Radio size="small" />}
                      label={
                        <Typography variant="body1">
                          {furnishing.label}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={() => onFilter(filter)}>
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default FilterAccommodations

const ACCOMMODATION_TYPES = [
  { label: 'Hotel', value: 'hotel' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Bed Space', value: 'bedspace' },
  { label: 'Dormitory', value: 'dormitory' },
  { label: 'Transient Space', value: 'transient' },
  { label: 'Any type', value: '' },
]

const ACCOMMODATION_RATINGS = [0, 1, 2, 3, 4, 5]

const ACCOMMODATION_FURNISHING = [
  { label: 'Unfurnished', value: 'unfurnished' },
  { label: 'Semifurnished', value: 'semifurnished' },
  { label: 'Fully-furnished', value: 'fully_furnished' },
  { label: 'Any type', value: '' },
]
