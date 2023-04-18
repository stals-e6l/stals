import { TextField, MenuItem } from '@mui/material'
// import '../../update.css'
import React from 'react'

interface Elements {
  label: string
  defaultValue: string
}

const listingType = [
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'dorm',
    label: 'Dorm',
  },
  {
    value: 'motel',
    label: 'Motel',
  },
  {
    value: 'hotel',
    label: 'Hotel',
  },
]

const textDesign = {
  maxWidth: '31%',
}

const InputFieldSelect = (props: Elements) => {
  return (
    <TextField
      select
      label={props.label}
      defaultValue={props.defaultValue}
      fullWidth
      sx={textDesign}
    >
      {listingType.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default InputFieldSelect
