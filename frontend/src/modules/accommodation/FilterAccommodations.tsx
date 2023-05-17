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
  Button,
  Checkbox,
  Rating,
  FormGroup,
  useTheme,
} from '@mui/material'
import { COLOR, FONT } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const FilterAccommodations: React.FC<IProps> = () => {

  const theme = useTheme()

  const types = [
    { type: "Hotel", value: "hotel" },
    { type: "Apartment", value: "apartment" },
    { type: "Bed Space", value: "bedspace" },
    { type: "Dormitory", value: "dormitory" },
    { type: "Transient Space", value: "transient" },
  ]

  const ratings = []
  for (var i = 0; i <= 5; i++) ratings.push(i)

  const furnishing = [
    { option: "Unfurnished", value: "unfurnished" },
    { option: "Semifurnished", value: "semifurnished" },
    { option: "Fully-furnished", value: "fully_furnished" },
  ]

  const h6_breakpoint = {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.85)
    },
  }

  const body1_breakpoint = {
    marginTop: theme.spacing(-0.5),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.7)
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.5)
    },
  }

  const body2_breakpoint = {
    marginTop: theme.spacing(-1.5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.75),
      marginTop: theme.spacing(-1.75),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.5),
      marginTop: theme.spacing(-2),
    },
  }

  const icon_breakpoints = {
    marginTop: theme.spacing(-0.5),

    "&.Mui-checked": {
      color: COLOR.green
    }
  }

  const slider_space = {
    marginTop: theme.spacing(-0.5),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(-1),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(-1.75),
    },
  }

  // TODO: all comments here are PM's job to integrate, for now refine the styling
  // hooks
  // const filterHandler = filterAccommodations()

  // state
  // const [filter, setFilter] = React.useState<IAccommodationsFilter>({})

  // events
  // const handleChange = (key: keyof IAccommodationsFilter, e: IEvent) => {
  //   const _filter = { ...filter }
  //   _filter[key] = e.target.value
  //   setFilter(_filter)
  // }
  // const handleType = (e: IEvent) => handleChange('type', e)
  // const handlePrice = (e: IEvent) => handleChange('price', e)
  // const handleRoomSize = (e: IEvent) => handleChange('size_sqm', e)
  // const handleMeters = (e: IEvent) => handleChange('meters_from_uplb', e)
  // const handlePax = (e: IEvent) => handleChange('min_pax', e)
  // const handleNumRooms = (e: IEvent) => handleChange('num_rooms', e)
  // const handleFurnishing = (e: IEvent) => handleChange('furnishing', e)
  // const onFilter = () => {}

  // immediates
  // const pax = [filter.min_pax as number, filter.max_pax as number]



  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* | Filters */}
          <Typography variant='h5'
            sx={{
              color: COLOR.black,
              display: 'flex',
              [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(2.5)
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.spacing(2)
              },
            }}
          >
            <Typography variant='h5'
              sx={{
                color: COLOR.green,
                marginRight: theme.spacing(1),
                fontSize: "inherit"
              }}
            >
              |
            </Typography>{' '}
            Filters
          </Typography>
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
                  <Typography variant='h6' color={COLOR.black} sx={h6_breakpoint}
                  >Type</Typography>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="hotel"
                  defaultValue={undefined}
                  // value={filter.type}
                  // onChange={handleType}
                  name="type-group"
                >
                  {
                    types.map((type) =>
                      <FormControlLabel
                        value={type.value}
                        control={<Radio size="small" sx={icon_breakpoints} />}
                        label={
                          <Typography variant='body1' sx={body1_breakpoint}>{type.type}</Typography>
                        }
                      />
                    )
                  }

                </RadioGroup>
              </FormControl>
            </Grid>

            {/*  Ratings */}
            <Grid item xs={12}>
              <Typography variant='h6' sx={h6_breakpoint}>Ratings</Typography>
              <FormGroup>
                {
                  ratings.map((rating) => <FormControlLabel
                    control={<Checkbox size="small" sx={icon_breakpoints}/>}
                    label={<Rating value={rating} readOnly sx={{
                      color: COLOR.blue,
                      [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(2.25)
                      },
                    }} />}
                  />)
                }
              </FormGroup>
            </Grid>

            {/* Price */}
            <Grid item xs={12}>
              <Typography variant='h6' sx={h6_breakpoint}>Price Range</Typography>
              <Slider
                max={1000}
                // value={filter.price}
                // onChange={handlePrice}
                sx={slider_space}
                disableSwap
              />
              <Typography variant='body2' sx={body2_breakpoint}>
                Php 123123 - Php {1000}
              </Typography>
            </Grid>

            {/* Room size */}
            <Grid item>
              <Typography variant='h6' sx={h6_breakpoint}>Room Size</Typography>
              <Slider
                max={10}
                sx={slider_space}
              // value={filter.size_sqm}
              // onChange={handleRoomSize}
              />
              <Typography variant='body2' sx={body2_breakpoint}>14 square meters</Typography>
            </Grid>

            {/*Meters from UPLB */}
            <Grid item>
              <Typography variant='h6' sx={h6_breakpoint}>Meters from UPLB</Typography>
              <Slider
                max={1000}
                sx={slider_space}
              // value={filter.meters_from_uplb}
              // onChange={handleMeters}
              />
              <Typography variant='body2' sx={body2_breakpoint}>600 meters</Typography>
            </Grid>

            {/* Number of Occupants */}
            <Grid item>
              <Typography variant='h6' sx={h6_breakpoint}>Number of Occupants</Typography>
              <Slider
                min={0}
                max={1000}
                sx={slider_space}
                // value={pax}
                defaultValue={0}
                // onChange={handlePax}
                disableSwap
              />
              <Typography variant='body2' sx={body2_breakpoint}>4 persons</Typography>
              {/* {
                // if both minimum and maximum are equal
                pax[0] === pax[1] && pax[0] != 1 ? (
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {pax[0]} persons
                    </Typography>
                  </>
                ) : // if both min and max pax are equal and both 1
                pax[0] === pax[1] && pax[0] == 1 ? (
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {pax[0]} person
                    </Typography>
                  </>
                ) : (
                  // by default
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {pax[0]} - {pax[1]} persons
                    </Typography>
                  </>
                )
              } */}
            </Grid>

            {/*  Number of Room */}
            <Grid item>
              <Typography variant='h6' sx={h6_breakpoint}>Number of Rooms</Typography>
              <Slider
                max={10}
                min={0}
                sx={slider_space}
                defaultValue={0}
              // value={filter.num_rooms}
              // onChange={handleNumRooms}
              />
              <Typography variant='body2' sx={body2_breakpoint}>1 room</Typography>
              {/* {filter.num_rooms == 1 ? (
                <>
                  <Typography sx={CustomCaptionStyle}>
                    {filter.num_rooms} room
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={CustomCaptionStyle}>
                    {filter.num_rooms} rooms
                  </Typography>
                </>
              )} */}
            </Grid>

            {/* TODO: in model, num_beds is not range. change it to number */}
            {/*Number of Beds */}
            <Grid item>
              <Typography variant='h6' sx={h6_breakpoint}>Number of Beds</Typography>
              <Slider
                min={0}
                sx={slider_space}
                // max={maxBed}
                defaultValue={0}
                // value={num_beds}
                // onChange={handleBed}
                disableSwap
              />
              <Typography variant='body2' sx={body2_breakpoint}>2 beds</Typography>
              {/* {
                // if both minimum and maximum are equal
                num_beds[0] == pax[1] && num_beds[0] != 1 ? (
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {num_beds[0]} beds
                    </Typography>
                  </>
                ) : // if both min and max bed are equal and both 1
                num_beds[0] == num_beds[1] && num_beds[0] == 1 ? (
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {num_beds[0]} bed
                    </Typography>
                  </>
                ) : (
                  // by default
                  <>
                    <Typography sx={CustomCaptionStyle}>
                      {num_beds[0]} - {num_beds[1]} beds
                    </Typography>
                  </>
                )
              } */}
            </Grid>

            {/* Furnishing */}
            <Grid item>
              <FormControl>
                <FormLabel id="furnishing">
                  <Typography variant='h6' sx={h6_breakpoint}>Furnishing</Typography>
                </FormLabel>

                <RadioGroup
                  aria-labelledby="furnishing"
                  defaultValue={'unfurnished'}
                  // value={filter.furnishing}
                  // onChange={handleFurnishing}
                  name="furnishing-group"
                >
                  {
                    furnishing.map((option) =>
                      <FormControlLabel
                        value={option.value}
                        control={<Radio size="small" sx={icon_breakpoints} />}
                        label={
                          <Typography variant='body1' sx={body1_breakpoint}>
                            {option.option}
                          </Typography>
                        }
                      />
                    )
                  }

                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Filter Search btn */}
        <Grid item xs={12}>
          <br />
          <Button
            // onClick={onFilter}
            variant="contained"
            fullWidth
            sx={{
              textTransform: 'none',
              backgroundColor: COLOR.green,
              borderRadius: theme.spacing(1),
              boxShadow: '1px 2px 4px #6e6e73',
              ':hover': {
                color: COLOR.green,
                backgroundColor: COLOR.gray1
              },
            }}
          >
            <Typography variant='h6' sx={{
              fontSize: theme.spacing(2.15),
              [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(2)
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.spacing(1.85)
              },
            }}>
              Filter Search
            </Typography>

          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FilterAccommodations
