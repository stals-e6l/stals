import {
  Input,
  Button,
  Typography,
  useTheme,
  Box,
  Theme,
  Autocomplete,
  Stack,
  TextField,
  Grid,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { filterAccommodations } from './AccommodationsProvider'
import Banner from '../../components/bannerElementBak'
import { FONT, COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const SearchAccommodations: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const filterHandler = filterAccommodations()

  // static data
  const data = [
    { name: 'Ellens' },
    { name: 'Joanalisa' },
    { name: 'Sacay' },
    { name: 'Catalan' },
  ]

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
      {/* container */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: COLOR.gray1,
          borderRadius: theme.spacing(1),
          boxShadow: '0px 2px 4px #6e6e73',
          transition: '0.3s all',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            width: theme.spacing(350 / 8),
          },
        }}
      >
        {/* Textfield with autocomplete */}
        <Autocomplete
          freeSolo
          options={data.map(option => option.name)}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Search accommodation"
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                ['& fieldset']: {
                  borderRadius: theme.spacing(1),
                },
              }}
            />
          )}
          fullWidth
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          sx={{
            textTransform: 'none',
            backgroundColor: COLOR.green,
            borderRadius: theme.spacing(1),
            padding: '1% 3%',
            color: COLOR.gray1,
            ':hover': {
              color: COLOR.green,
            },
            height: theme.spacing(7),
            [theme.breakpoints.down('sm')]: {
              padding: '1%',
            },
          }}
        >
          {/* Search icon */}
          <SearchIcon
            sx={{
              color: 'inherit',
              fontSize: theme.spacing(4),
            }}
          />

          {/* Search text */}
          <Typography
            variant="h6"
            sx={{
              fontSize: theme.spacing(2),
              color: 'inherit',
              [theme.breakpoints.down('sm')]: {
                display: 'none',
              },
            }}
          >
            Search
          </Typography>
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default SearchAccommodations
