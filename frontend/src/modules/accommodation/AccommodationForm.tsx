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
import { COLOR } from '../../theme/'

interface IProps {
  children?: React.ReactNode
  form: IAccommodation
  setFieldValue: (
    key: keyof IAccommodation,
    val: string | number | string[]
  ) => void
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  error: string | null;
}

const AccommodationForm: React.FC<IProps> = ({
  form,
  setFieldValue,
  setFile,
  error
}) => {
  // state

  const [fieldValues, setFieldValues] = React.useState({
    name: '',
    address: '',
    min_price: '',
    max_price: '',
    size_sqm: '',
    meters_from_uplb: '',
    min_pax: '',
    max_pax: '',
    num_rooms: '',
    num_beds: '',
  });

  const [fieldTouched, setFieldTouched] = React.useState({
    name: false,
    address: false,
    min_price: false,
    max_price: false,
    size_sqm: false,
    meters_from_uplb: false,
    min_pax: false,
    max_pax: false,
    num_rooms: false,
    num_beds: false,
  });

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
    <Box>
      <TextField
        type="file"
        onChange={(e: any) => {
          if (e.target.files) {
            setFile(e.target.files[0])
          }
        }}
      />

      <TextField
        defaultValue={values.name}
        onBlur={e => {
          setFieldValue('name', e.target.value); 
          setFieldValues((prevValues) => ({
            ...prevValues,
            'name': e.target.value,
          }));
          setFieldTouched((prevTouched) => ({
            ...prevTouched,
            'name': true,
          }));
        }}
        required
        fullWidth
        label="Name"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
        error={fieldTouched.name && fieldValues.name === ''}
        helperText={fieldTouched.name && fieldValues.name === '' ? 'Name is required' : ''}
      />
      <TextField
        defaultValue={values.description}
        onBlur={e => setFieldValue('description', e.target.value)}
        fullWidth
        multiline
        label="Description"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        variant="filled"
        style={{ marginTop: 20 }}
      />
      <TextField
        defaultValue={values.address}
        onBlur={e => setFieldValue('address', e.target.value)}
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
        defaultValue={
          Number(values.min_price) == 0 ? '' : Number(values.min_price)
        }
        onBlur={e => setFieldValue('min_price', e.target.value)}
        required
        fullWidth
        label="Minimum price"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        color="secondary"
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        defaultValue={
          Number(values.max_price) == 0 ? '' : Number(values.max_price)
        }
        onBlur={e => setFieldValue('max_price', e.target.value)}
        required
        fullWidth
        label="Maximum price"
        type="number"
        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
        color="secondary"
        variant="filled"
        style={{ marginTop: 20 }}
        sx={numFieldSx.root}
      />
      <TextField
        defaultValue={
          Number(values.size_sqm) == 0 ? '' : Number(values.size_sqm)
        }
        onBlur={e => setFieldValue('size_sqm', Number(e.target.value))}
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
        defaultValue={
          Number(values.meters_from_uplb) == 0
            ? ''
            : Number(values.meters_from_uplb)
        }
        onBlur={e => setFieldValue('meters_from_uplb', Number(e.target.value))}
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
        defaultValue={Number(values.min_pax) == 0 ? '' : Number(values.min_pax)}
        onBlur={e => setFieldValue('min_pax', Number(e.target.value))}
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
        defaultValue={Number(values.max_pax) == 0 ? '' : Number(values.max_pax)}
        onBlur={e => setFieldValue('max_pax', Number(e.target.value))}
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
        defaultValue={
          Number(values.num_rooms) == 0 ? '' : Number(values.num_rooms)
        }
        onBlur={e => setFieldValue('num_rooms', Number(e.target.value))}
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
        defaultValue={
          Number(values.num_beds) == 0 ? '' : Number(values.num_beds)
        }
        onBlur={e => setFieldValue('num_beds', Number(e.target.value))}
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

      <FormLabel sx={{ color: COLOR.blue }}>Landmarks</FormLabel>
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

      <FormLabel sx={{ color: COLOR.blue }}>Cooking rules</FormLabel>
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

      <FormLabel sx={{ color: COLOR.blue, marginTop: 20 }}>Pet rules</FormLabel>
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

      <FormLabel sx={{ color: COLOR.blue, marginTop: 20 }}>
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

      <FormLabel sx={{ color: COLOR.blue, marginTop: 20 }}>
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

      <FormLabel sx={{ color: COLOR.blue, marginTop: 20 }}>Amenities</FormLabel>
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

      <FormLabel sx={{ color: COLOR.blue, marginTop: 20 }}>
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
