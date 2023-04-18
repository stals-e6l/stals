import { Input, InputLabel, FormControl } from '@mui/material'
// import '../../update.css'
import React from 'react'

interface Elements {
  fieldTitle: string
  placeholder: string
  numRows: number
  onChange: (val: string) => void
  value: string
}

const inputLabel = {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#6E6E73',
}

const input = {
  fontSize: 18,
  color: '#6E6E73',
  marginBottom: 3,
}

const InputField = (props: Elements) => {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel shrink sx={inputLabel}>
        {props.fieldTitle}
      </InputLabel>
      <Input
        value={props.value}
        onChange={(e: any) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        sx={input}
        multiline
        rows={props.numRows}
      ></Input>
    </FormControl>
  )
}

export default InputField
