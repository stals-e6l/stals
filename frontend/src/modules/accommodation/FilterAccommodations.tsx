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
} from '@mui/material'

interface IProps {
  children?: React.ReactNode
}

const FilterAccommodations: React.FC<IProps> = () => {
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
          <Typography
            sx={{
              color: 'black',
              fontFamily: sourceSansPro,
              fontWeight: 'bold',
              fontSize: '22px',
              display: 'flex',
              marginTop: '5%',
            }}
          >
            <Typography
              sx={{
                color: green,
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                fontSize: 'inherit',
                marginRight: '10px',
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
            paddingLeft={'15px'}
            paddingRight={'15px'}
          >
            {/* Type */}
            <Grid item>
              <FormControl>
                <FormLabel id="type">
                  <Typography sx={CustomLabelStyle}>Type</Typography>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="hotel"
                  defaultValue={undefined}
                  // value={filter.type}
                  // onChange={handleType}
                  name="type-group"
                >
                  <FormControlLabel
                    value="hotel"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>Hotel</Typography>
                    }
                  />
                  <FormControlLabel
                    value="apartment"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Apartment
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="bedspace"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Bed Space
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="dormitory"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Dormitory
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="transient"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Transient Space
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/*  Ratings */}
            <Grid item xs={12}>
              <Typography sx={CustomLabelStyle}>Ratings</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={5} readOnly sx={CustomRatingStyle} />}
                />
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={4} readOnly sx={CustomRatingStyle} />}
                />
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={3} readOnly sx={CustomRatingStyle} />}
                />
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={2} readOnly sx={CustomRatingStyle} />}
                />
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={1} readOnly sx={CustomRatingStyle} />}
                />
                <FormControlLabel
                  control={<Checkbox sx={CustomChecboxStyle} />}
                  label={<Rating value={0} readOnly sx={CustomRatingStyle} />}
                />
              </FormGroup>
            </Grid>

            {/* Price */}
            <Grid item xs={12}>
              <Typography sx={CustomLabelStyle}>Price Range</Typography>
              <Slider
                sx={CustomSliderStyles}
                max={1000}
                // value={filter.price}
                // onChange={handlePrice}
                disableSwap
              />
              <Typography sx={CustomCaptionStyle}>
                Php 123123 - Php {1000}
              </Typography>
            </Grid>

            {/* Room size */}
            <Grid item xs={12}>
              <Typography sx={CustomLabelStyle}>Room Size</Typography>
              <Slider
                sx={CustomSliderStyles}
                max={10}
                // value={filter.size_sqm}
                // onChange={handleRoomSize}
              />
              <Typography sx={CustomCaptionStyle}>14 square meters</Typography>
            </Grid>

            {/*Meters from UPLB */}
            <Grid item>
              <Typography sx={CustomLabelStyle}>Meters from UPLB</Typography>
              <Slider
                max={1000}
                // value={filter.meters_from_uplb}
                // onChange={handleMeters}
                sx={CustomSliderStyles}
              />
              <Typography sx={CustomCaptionStyle}>600 meters</Typography>
            </Grid>

            {/* Number of Occupants */}
            <Grid item>
              <Typography sx={CustomLabelStyle}>Number of Occupants</Typography>
              <Slider
                sx={CustomSliderStyles}
                min={0}
                max={1000}
                // value={pax}
                defaultValue={0}
                // onChange={handlePax}
                disableSwap
              />
              <Typography sx={CustomCaptionStyle}>4 persons</Typography>
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
            <Grid item xs={12}>
              <Typography sx={CustomLabelStyle}>Number of Rooms</Typography>
              <Slider
                max={10}
                min={0}
                defaultValue={0}
                // value={filter.num_rooms}
                // onChange={handleNumRooms}
                sx={CustomSliderStyles}
              />
              <Typography sx={CustomCaptionStyle}>1 room</Typography>
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
            <Grid item xs={12}>
              <Typography sx={CustomLabelStyle}>Number of Beds</Typography>
              <Slider
                sx={CustomSliderStyles}
                min={0}
                // max={maxBed}
                defaultValue={0}
                // value={num_beds}
                // onChange={handleBed}
                disableSwap
              />
              <Typography sx={CustomCaptionStyle}>2 beds</Typography>
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
                  <Typography sx={CustomLabelStyle}>Furnishing</Typography>
                </FormLabel>

                <RadioGroup
                  aria-labelledby="furnishing"
                  defaultValue={'unfurnished'}
                  // value={filter.furnishing}
                  // onChange={handleFurnishing}
                  name="furnishing-group"
                >
                  <FormControlLabel
                    value="unfurnished"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Unfurnished
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="semifurnished"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Semifurnished
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="fully_furnished"
                    control={<Radio sx={CustomRadioStyle} />}
                    label={
                      <Typography sx={CustomRadioLabelStyle}>
                        Fully-furnished
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            // onClick={onFilter}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: green,
              fontFamily: sourceSansPro,
              fontWeight: 'bold',
              borderRadius: '10px',
              ':hover': {
                backgroundColor: grey,
                border: '2px solid',
                borderColor: green,
                color: 'black',
              },
            }}
          >
            Filter Search
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FilterAccommodations

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

// Setting custom styles
const CustomLabelStyle = {
  color: 'black',
  fontFamily: sourceSansPro,
  fontSize: '20px',
  marginTop: '7px',
}

const CustomCaptionStyle = {
  color: 'black',
  fontFamily: quicksand,
  fontSize: '15px',
}

const CustomSliderStyles = {
  '& .MuiSlider-thumb': {
    color: green,
  },
  '& .MuiSlider-track': {
    color: blue,
  },
  '& .MuiSlider-rail': {
    color: grey,
    border: '2px solid',
    borderColor: 'black',
  },
  '& .MuiSlider-active': {
    color: darkGrey,
  },
}

const CustomRadioLabelStyle = {
  fontFamily: quicksand,
  color: 'black',
}

const CustomRadioStyle = {
  '&.Mui-checked': {
    color: green,
  },
}

const CustomChecboxStyle = {
  '&.Mui-checked': {
    color: green,
  },
}

const CustomRatingStyle = {
  color: blue,
}
