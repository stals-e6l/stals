import React, { useState } from 'react'
import {
  Button,
  Box,
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
  Dialog,
} from '@mui/material'
// import image from '../../assets/Ellens.jpg'
// import '../../update.css'
import BoxImage from './Box_Image'
import InputField from './Input_Fields'
import InputFieldSelect from './Input_Field_Select'
import { updateAccommodation } from '../../../store/accommodation/actions'

interface AccomDetails {
  open: boolean
  handleClose: () => void
  accommodation: IAccommodation
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflowX: 'hidden',
  width: '80%',
  height: '80%',
  padding: 0,
  display: 'flex',
}

const inputLabel = {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#6E6E73',
}

const formControl = {
  maxWidth: '31%',
}

const UpdateAccomodation = ({
  open,
  handleClose,
  accommodation,
}: AccomDetails) => {
  const listingPrice = String(accommodation.price)
  const listingDistance = String(accommodation.meters_from_uplb)
  const listingSize = String(accommodation.size_sqm)
  const [accommodationState, setAccommodation] = useState<IAccommodation>({
    name: '',
    description: '',
    address: '',
    type: 'apartment',
    price: 0,
    size_sqm: 0,
    meters_from_uplb: 0,
    landmarks: [],
    min_pax: 0,
    max_pax: 0,
    num_rooms: 0,
    num_beds: 0,
    num_views: 0,
    furnishing: 'semifurnished',
    cooking_rules: [],
    pet_rules: [],
    other_rules: [],
    safety_and_security: [],
    appliances: [],
    amenities: [],
    created_at: '',
    updated_at: '',
    is_soft_deleted: false,
  })
  const updateAccommodationHandler = updateAccommodation()

  console.log({ accommodation, open, handleClose })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      sx={{ style }}
      fullWidth
      // Paperaccommodation={{
      //   style: {
      //     height: '80%',
      //     display: 'flex',
      //     borderRadius: 15,
      //   },
      // }}
    >
      <div className="main">
        <BoxImage alt="Ellens" image={''} className="image" />
        <Box
          sx={{
            overflowY: 'scroll',
            paddingRight: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <h2 className="title">Edit Listing Details</h2>

          <InputField
            fieldTitle="Description"
            placeholder={accommodation.description as string}
            numRows={4}
            onChange={(val: string) =>
              setAccommodation(prev => ({ ...prev, description: val }))
            }
            value={accommodation.description as string}
          />
          <InputField
            fieldTitle="Listing Name"
            placeholder={accommodation.name}
            numRows={1}
            onChange={(val: string) =>
              setAccommodation(prev => ({ ...prev, name: val }))
            }
            value={accommodation.name}
          />
          <InputField
            fieldTitle="Listing Address"
            placeholder={accommodation.address}
            numRows={1}
            onChange={(val: string) =>
              setAccommodation(prev => ({ ...prev, address: val }))
            }
            value={accommodation.address}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <FormControl variant="standard" sx={formControl}>
              <InputLabel shrink sx={inputLabel}>
                Price
              </InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">₱</InputAdornment>
                }
                endAdornment={false}
                placeholder={listingPrice}
              />
            </FormControl>

            <FormControl variant="standard" style={formControl}>
              <InputLabel shrink sx={inputLabel}>
                Distance from UPLB
              </InputLabel>
              <Input
                endAdornment={<InputAdornment position="end">m</InputAdornment>}
                placeholder={listingDistance}
              />
            </FormControl>

            <FormControl variant="standard" style={formControl}>
              <InputLabel shrink sx={inputLabel}>
                Listing Size
              </InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">sqm</InputAdornment>
                }
                placeholder={listingSize}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 3,
            }}
          >
            <InputFieldSelect
              label="Listing Type"
              defaultValue={accommodation.type}
            />
            <InputFieldSelect
              label="Listing Type"
              defaultValue={accommodation.type}
            />
            <InputFieldSelect
              label="Listing Type"
              defaultValue={accommodation.type}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              onClick={handleClose}
              sx={{
                fontFamily: 'Source Sans Pro',
                color: '#154360',
                borderColor: '#154360',
                borderBlockColor: '#154360',
                borderWidth: 3,
                '&:hover': {
                  borderColor: '#154360',
                  borderBlockColor: '#154360',
                  borderWidth: 3,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                updateAccommodationHandler(accommodation)
                handleClose()
              }}
              sx={{
                fontFamily: 'Source Sans Pro',
                backgroundColor: '#154360',
                '&:hover': { backgroundColor: '#154360' },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </div>
    </Dialog>
  )
}

export default UpdateAccomodation
