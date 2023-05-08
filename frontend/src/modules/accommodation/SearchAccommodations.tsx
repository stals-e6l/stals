import { Input, Button, Typography, useTheme, Box, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { filterAccommodations } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
}

const SearchAccommodations: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const filterHandler = filterAccommodations()

  // state
  const [name, setName] = React.useState<string>('')

  // events
  const handleInputChange = (event: IEvent) => {
    setName(event.target.value)
  }
  const handleSearch = () => {
    if (!filterHandler) return
    filterHandler({ name })
      .then(() => {
        // TODO: PM's job (maybe a callback)
      })
      .catch(err => {
        // TODO: PM's job (track error)
        console.error(err)
      })
  }

  return (
    <React.Fragment>
      <Box sx={searchBoxStyles(theme)}>
        <Input
          value={name}
          placeholder="Search Accommodation"
          onChange={handleInputChange}
          disableUnderline
          fullWidth
          sx={inputStyles}
        />
        <Button onClick={handleSearch} sx={searchBtnStyles}>
          <SearchIcon sx={searchIconStyles} />
          <Typography sx={searchTextStyles(theme)}>Search</Typography>
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default SearchAccommodations

// TODO: theming
const green = '#60ce80'
const grey = '#f0f0f0'
const sourceSansPro = 'Source Sans Pro'

const searchBoxStyles = (theme: Theme) => ({
  display: 'flex',
  width: '900px',
  backgroundColor: grey,
  borderRadius: '5px',
  [theme.breakpoints.down(1000)]: {
    width: '700px',
  },
  [theme.breakpoints.down(800)]: {
    width: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  transition: '0.3s all',
})

const inputStyles = {
  '& .MuiInputBase-input': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  padding: '4px',
  paddingX: '10px',
}

const searchBtnStyles = {
  height: '100%',
  textTransform: 'none',
  backgroundColor: green,
  padding: '1% 3%',
  color: grey,
  ':hover': {
    color: green,
  },
}

const searchIconStyles = {
  color: 'inherit',
  fontSize: 'xx-large',
}

const searchTextStyles = (theme: Theme) => ({
  fontFamily: sourceSansPro,
  fontSize: '1rem',
  color: 'inherit',
  fontWeight: 'bold',
  [theme.breakpoints.down(800)]: {
    display: 'none',
  },
})
