import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme } from '@mui/material'

const SearchBar = (props: any) => {

  const theme = useTheme()
  
  const [name, setName] = React.useState<string>('')
  return (
    <Input
      placeholder="Search Accommodation"
      onChange={e => setName(e.target.value.trim())}
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
