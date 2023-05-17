import React from 'react'
import {
  Autocomplete,
  Box,
  FormLabel,
  MenuItem,
  OutlinedInput,
  OutlinedInputProps,
  Select,
  TextField,
} from '@mui/material'
import { useTheme } from '@mui/material'
import { COLOR } from '../../theme/'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationForm: React.FC<IProps> = ({ defaultValues }) => {
  // hooks
  const theme = useTheme()

  // state
  const [form, setForm] = React.useState<IAccommodation>({
    name: (defaultValues && defaultValues.name) || '',
    address: (defaultValues && defaultValues.address) || '',
    type: (defaultValues && defaultValues.type) || 'hotel',
    price: (defaultValues && defaultValues.price) || 0,
    size_sqm: (defaultValues && defaultValues.size_sqm) || 0,
    meters_from_uplb: (defaultValues && defaultValues.meters_from_uplb) || 0,
    min_pax: (defaultValues && defaultValues.min_pax) || 0,
    max_pax: (defaultValues && defaultValues.max_pax) || 0,
    num_rooms: (defaultValues && defaultValues.num_rooms) || 0,
    num_beds: (defaultValues && defaultValues.num_beds) || 0,
    num_views: (defaultValues && defaultValues.num_views) || 0,
    furnishing:
      (defaultValues && defaultValues.furnishing) || 'fully_furnished',
    landmarks: (defaultValues && defaultValues.landmarks) || [],
    cooking_rules: (defaultValues && defaultValues.cooking_rules) || [],
    pet_rules: (defaultValues && defaultValues.pet_rules) || [],
    other_rules: (defaultValues && defaultValues.other_rules) || [],
    safety_and_security:
      (defaultValues && defaultValues.safety_and_security) || [],
    appliances: (defaultValues && defaultValues.appliances) || [],
    amenities: (defaultValues && defaultValues.amenities) || [],
    is_soft_deleted: (defaultValues && defaultValues.is_soft_deleted) || false,
  })

  // events
  const setFieldValue = (
    key: keyof IAccommodation,
    val: string | number | string[]
  ) => {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  // immediate
  const values = React.useMemo(() => form, [form])

  const numFieldSx = {
    root: {
      '& input[type=number]': {
        '-moz-appearance': 'textfield',
      },
      '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  }

  return (
    <Box sx={{}}>
      <TextField
        value={values.name}
        onChange={e => setFieldValue('name', e.target.value)}
        required
        fullWidth
        label="Name"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
      />
      <TextField
        value={values.description}
        onChange={e => setFieldValue('description', e.target.value)}
        required
        fullWidth
        multiline
        label="Description"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
      />
      <TextField
        value={values.address}
        onChange={e => setFieldValue('address', e.target.value)}
        required
        fullWidth
        label="Address"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
      />
      <Select
        label="Type"
        fullWidth
        input={<OutlinedInput />}
        value={values.type}
        onChange={e => setFieldValue('type', e.target.value)}
        required
        variant="filled"
        style={{ marginTop: 20 }}
      >
        <MenuItem value="hotel">Hotel</MenuItem>
        <MenuItem value="apartment">Apartment</MenuItem>
        <MenuItem value="bedspace">Bed space</MenuItem>
        <MenuItem value="dormitory">Dormitory</MenuItem>
        <MenuItem value="transient">Transient</MenuItem>
      </Select>
      <TextField
        value={Number(values.price) == 0 ? '' : Number(values.price)}
        onChange={e => setFieldValue('price', e.target.value)}
        required
        fullWidth
        label="Price"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        color="secondary"
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={Number(values.size_sqm) == 0 ? '' : Number(values.size_sqm)}
        onChange={e => setFieldValue('size_sqm', Number(e.target.value))}
        required
        fullWidth
        label="Size sqm"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={
          Number(values.meters_from_uplb) == 0
            ? ''
            : Number(values.meters_from_uplb)
        }
        onChange={e =>
          setFieldValue('meters_from_uplb', Number(e.target.value))
        }
        required
        fullWidth
        label="Meters from UPLB"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={Number(values.min_pax) == 0 ? '' : Number(values.min_pax)}
        onChange={e => setFieldValue('min_pax', Number(e.target.value))}
        required
        fullWidth
        label="Minimum capacity"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={Number(values.max_pax) == 0 ? '' : Number(values.max_pax)}
        onChange={e => setFieldValue('max_pax', Number(e.target.value))}
        required
        fullWidth
        label="Maximum capacity"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={Number(values.num_rooms) == 0 ? '' : Number(values.num_rooms)}
        onChange={e => setFieldValue('num_rooms', Number(e.target.value))}
        required
        fullWidth
        label="Number of rooms"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        value={Number(values.num_beds) == 0 ? '' : Number(values.num_beds)}
        onChange={e => setFieldValue('num_beds', Number(e.target.value))}
        required
        fullWidth
        label="Number of beds"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <Select
        label="Furnishing"
        fullWidth
        input={<OutlinedInput />}
        value={values.furnishing}
        onChange={e => setFieldValue('furnishing', e.target.value)}
        required
        variant="filled"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <MenuItem value="unfurnished">Unfurnished</MenuItem>
        <MenuItem value="semifurnished">Semi-furnished</MenuItem>
        <MenuItem value="fully_furnished">Fully furnished</MenuItem>
      </Select>

      <FormLabel sx={{ color: COLOR.white }}>Landmarks</FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.landmarks}
        onChange={(e, value) => {
          setFieldValue('landmarks', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white }}>Cooking rules</FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.cooking_rules}
        onChange={(e, value) => {
          setFieldValue('cooking_rules', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white, marginTop: 20 }}>
        Pet rules
      </FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.pet_rules}
        onChange={(e, value) => {
          setFieldValue('pet_rules', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white, marginTop: 20 }}>
        Safety and security
      </FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.safety_and_security}
        onChange={(e, value) => {
          setFieldValue('safety_and_security', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white, marginTop: 20 }}>
        Appliances
      </FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.appliances}
        onChange={(e, value) => {
          setFieldValue('appliances', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white, marginTop: 20 }}>
        Amenities
      </FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.amenities}
        onChange={(e, value) => {
          setFieldValue('amenities', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />

      <FormLabel sx={{ color: COLOR.white, marginTop: 20 }}>
        Other rules
      </FormLabel>
      <Autocomplete
        options={[]}
        freeSolo
        multiple
        value={values.other_rules}
        onChange={(e, value) => {
          setFieldValue('other_rules', value)
        }}
        renderInput={params => <TextField variant="filled" {...params} />}
        style={{ marginTop: 5, marginBottom: 20 }}
      />
    </Box>
  )
}

export default AccommodationForm
