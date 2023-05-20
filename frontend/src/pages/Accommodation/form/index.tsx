import {
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Hidden,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React from 'react'
import image from '../../../assets/Ellens.jpg'

interface IProps {
  children?: React.ReactNode
  values: IAccommodation
  setFieldValue: (key: string, val: string | number | string[]) => void
}

const boxImage= {
  maxWidth: '50%',
  maxHeight: '100%',
  paddingRight: '20px'
}

const imageStyle= {
  width: '100%',
  height: '100%'
}

const mainBox= {
  maxWidth: '100%',
  maxHeight: '80%',
  display: 'flex',
  overflow: 'hidden'
}

const mainGrid= {
  overflowY: 'scroll',
  paddingTop: '20px'
}

const AccommodationForm: React.FC<IProps> = ({ values, setFieldValue }) => {
  return (
    <Box  sx={mainBox}>
      <Box sx={boxImage}>
        <Box
          component="img"
          alt="Ellens"
          src={image}
          className='image'
          style={imageStyle}
        />
      </Box>
      <Grid container sx={mainGrid}>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <TextField
              value={values.name}
              onChange={e => setFieldValue('name', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <TextField
              value={values.description}
              onChange={e => setFieldValue('description', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Address</FormLabel>
            <TextField
              value={values.address}
              onChange={e => setFieldValue('address', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Type</FormLabel>
            <Select
              value={values.type}
              onChange={e => setFieldValue('type', e.target.value)}
            >
              <MenuItem value="hotel">hotel</MenuItem>
              <MenuItem value="apartment">apartment</MenuItem>
              <MenuItem value="bedspace">bedspace</MenuItem>
              <MenuItem value="dormitory">dormitory</MenuItem>
              <MenuItem value="transient">transient</MenuItem>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel>Price</FormLabel>
            <TextField
              type="number"
              value={values.price}
              onChange={e => setFieldValue('price', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Size sqm</FormLabel>
            <TextField
              type="number"
              value={values.size_sqm}
              onChange={e => setFieldValue('size_sqm', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Meters from UPLB</FormLabel>
            <TextField
              type="number"
              value={values.meters_from_uplb}
              onChange={e =>
                setFieldValue('meters_from_uplb', Number(e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Min pax</FormLabel>
            <TextField
              type="number"
              value={values.min_pax}
              onChange={e => setFieldValue('min_pax', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Max pax</FormLabel>
            <TextField
              type="number"
              value={values.max_pax}
              onChange={e => setFieldValue('max_pax', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Num rooms</FormLabel>
            <TextField
              type="number"
              value={values.num_rooms}
              onChange={e => setFieldValue('num_rooms', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Num beds</FormLabel>
            <TextField
              type="number"
              value={values.num_beds}
              onChange={e => setFieldValue('num_beds', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Num views</FormLabel>
            <TextField
              type="number"
              value={values.num_views}
              onChange={e => setFieldValue('num_views', Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Furnishing</FormLabel>
            <Select
              value={values.furnishing}
              onChange={e => setFieldValue('furnishing', e.target.value)}
            >
              <MenuItem value="unfurnished">unfurnished</MenuItem>
              <MenuItem value="semifurnished">semifurnished</MenuItem>
              <MenuItem value="fully_furnished">fully_furnished</MenuItem>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel>Landmarks</FormLabel>
            <TextField
              value={values.landmarks[0]}
              onChange={e => setFieldValue('landmarks', [e.target.value])}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Cooking rules</FormLabel>
            <TextField
              value={values.cooking_rules[0]}
              onChange={e => setFieldValue('cooking_rules', [e.target.value])}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Pet rules</FormLabel>
            <TextField
              value={values.pet_rules[0]}
              onChange={e => setFieldValue('pet_rules', [e.target.value])}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Other rules</FormLabel>
            <TextField
              value={values.other_rules[0]}
              onChange={e => setFieldValue('other_rules', [e.target.value])}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Safety and security</FormLabel>
            <TextField
              value={values.safety_and_security[0]}
              onChange={e =>
                setFieldValue('safety_and_security', [e.target.value])
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Appliances</FormLabel>
            <TextField
              value={values.appliances[0]}
              onChange={e => setFieldValue('appliances', [e.target.value])}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Amenities</FormLabel>
            <TextField
              value={values.amenities[0]}
              onChange={e => setFieldValue('amenities', [e.target.value])}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccommodationForm
