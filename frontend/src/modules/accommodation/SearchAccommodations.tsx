import {
  Button,
  Typography,
  useTheme,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { COLOR } from '../../theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildQueryString } from '../../utils/queryString'
import { retrieveAccommodations } from './AccommodationsProvider'
import { ROUTES } from '../../app/AppRouter'

interface IProps {
  children?: React.ReactNode
}

const SearchAccommodations: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const navigate = useNavigate()
  const accommodations = retrieveAccommodations()
  const location = useLocation()

  // state
  const [name, setName] = React.useState<string>('')

  // events
  const handleInputChange = (event: IEvent) => {
    setName(event.target.value)
  }
  const handleSearch = () => {
    if (location.pathname === ROUTES.public) {
      navigate(ROUTES.appAuth)
    } else {
      navigate(`${ROUTES.appResult}?${buildQueryString({ search: name })}`, {
        replace: true,
      })
    }
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
          height: '54px',
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            width: theme.spacing(350 / 8),
          },
        }}
      >
        {/* Textfield with autocomplete */}
        <Autocomplete
          freeSolo
          fullWidth
          options={(accommodations && accommodations.map(p => p.name)) || []}
          renderInput={params => (
            <TextField
              {...params}
              value={name}
              onChange={handleInputChange}
              placeholder="Search accommodation"
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                ['& fieldset']: {
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                },
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
          )}
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={name.length === 0}
          sx={{
            textTransform: 'none',
            backgroundColor: COLOR.green,
            borderRadius: theme.spacing(1),
            padding: '1% 3%',
            color: COLOR.gray1,
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',

            ':hover': {
              color: COLOR.green,
            },
            height: '54px',
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
