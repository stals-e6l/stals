import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme } from '@mui/material'

const SearchBar = (props: any) => {
  const theme = useTheme()

  const { onSearchInputChange } = props

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    onSearchInputChange(event.target.value)
  }
  const [name, setName] = React.useState<string>('')
  return (
    <Input
      placeholder="Search Accommodation"
      onChange={handleInputChange}
      // onChange={e => setName(e.target.value.trim())}
      disableUnderline
      fullWidth
      sx={{
        '& .MuiInputBase-input': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        padding: '4px',
        paddingX: '10px',
      }}
    />
  )
}
export default SearchBar
