import React from 'react'
import { Box, Input, Typography, Button, Grid, useTheme, Slider } from '@mui/material'
import { styled } from '@mui/material/styles'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from '@mui/material/Autocomplete'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import BannerPhoto from '../assets/Images/BannerFlipped2.jpg'

const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'


interface PopperComponentProps {
  anchorEl?: any
  disablePortal?: boolean
  open: boolean
}

export const SearchBar = (props: any) => {
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

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
  [theme.breakpoints.down(500)]: {
    width: 200,
  },
}))

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props
  return <StyledAutocompletePopper {...other} />
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
  [theme.breakpoints.down(500)]: {
    width: 200,
  },
}))

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}))

function valuetext(value: number) {
  return `₱ ${value}`
}

export const SearchBarFilters = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [value, setValue] = React.useState<LabelType[]>([labels[1], labels[11]])
  const [pendingValue, setPendingValue] = React.useState<LabelType[]>([])

  const [sliderValue, setSliderValue] = React.useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[])
  }
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setValue(pendingValue)
    if (anchorEl) {
      anchorEl.focus()
    }
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'github-label' : undefined

  return (
    <React.Fragment>
      <Button
        onClick={handleClick}
        sx={{
          height: '100%',
          textTransform: 'none',
          backgroundColor: grey,
          padding: '1% 3%',
        }}
      >
        <FilterListIcon
          sx={{
            color: green,
            fontSize: 'xx-large',
          }}
        />
        <Typography
          sx={{
            fontFamily: sourceSansPro,
            fontSize: '1rem',
            color: green,
            fontWeight: 'bold',
            [theme.breakpoints.down(800)]: {
              display: 'none',
            },
          }}
        >
          Filters
        </Typography>
      </Button>

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={{
                borderBottom: `1px solid ${
                  theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
                }`,
                padding: '8px 10px',
                fontWeight: 600,
              }}
            >
              <Typography
                sx={{
                  fontFamily: sourceSansPro,
                  fontSize: '1rem',
                  // color: green,
                  fontWeight: 'bold',
                }}
              >
                Select filters
              </Typography>
            </Box>

            <Box marginX={'15px'}>
              <Typography
                marginTop={'5px'}
                sx={{
                  fontFamily: sourceSansPro,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Price range: ₱ {sliderValue[0]} - ₱ {sliderValue[1]}
              </Typography>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={sliderValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Box>

            <Autocomplete
              open
              multiple
              onClose={(
                event: React.ChangeEvent<object>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === 'escape') {
                  handleClose()
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event as React.KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return
                }
                setPendingValue(newValue)
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      mt: '2px',
                    }}
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color:
                          theme.palette.mode === 'light'
                            ? '#586069'
                            : '#8b949e',
                      },
                    }}
                  >
                    {option.name}
                    <br />
                    <span>{option.description}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                </li>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a)
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai
                let bi = value.indexOf(b)
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi
                return ai - bi
              })}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  )
}

interface LabelType {
  name: string
  color: string
  description?: string
}

// From https://github.com/abdonrd/github-labels //TODO: CHANGE
const labels = [
  {
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers',
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  {
    name: 'priority: critical',
    color: '#b60205',
    description: '',
  },
  {
    name: 'priority: high',
    color: '#d93f0b',
    description: '',
  },
  {
    name: 'priority: low',
    color: '#0e8a16',
    description: '',
  },
  {
    name: 'priority: medium',
    color: '#fbca04',
    description: '',
  },
  {
    name: "status: can't reproduce",
    color: '#fec1c1',
    description: '',
  },
  {
    name: 'status: confirmed',
    color: '#215cea',
    description: '',
  },
  {
    name: 'status: duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'status: needs information',
    color: '#fef2c0',
    description: '',
  },
  {
    name: 'status: wont do/fix',
    color: '#eeeeee',
    description: 'This will not be worked on',
  },
  {
    name: 'type: bug',
    color: '#d73a4a',
    description: "Something isn't working",
  },
  {
    name: 'type: discussion',
    color: '#d4c5f9',
    description: '',
  },
  {
    name: 'type: documentation',
    color: '#006b75',
    description: '',
  },
  {
    name: 'type: enhancement',
    color: '#84b6eb',
    description: '',
  },
  {
    name: 'type: epic',
    color: '#3e4b9e',
    description: 'A theme of work that contain sub-tasks',
  },
  {
    name: 'type: feature request',
    color: '#fbca04',
    description: 'New feature or request',
  },
  {
    name: 'type: question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
]

export const SearchBarButton = (props: any) => {
  const name = props
  const theme = useTheme()

  const navigate = useNavigate()
  const handleSearch = () => {
    console.log(name)
    navigate(`/accommodations/results?name=${name}`)
  }

  return (
    <Button
      onClick={handleSearch}
      sx={{
        height: '100%',
        textTransform: 'none',
        backgroundColor: green,
        padding: '1% 3%',
        color: grey,
        ':hover': {
          color: green,
        },
      }}
    >
      <SearchIcon
        sx={{
          color: 'inherit',
          fontSize: 'xx-large',
        }}
      />
      <Typography
        sx={{
          fontFamily: sourceSansPro,
          fontSize: '1rem',
          color: 'inherit',
          fontWeight: 'bold',
          [theme.breakpoints.down(800)]: {
            display: 'none',
          },
        }}
      >
        Search
      </Typography>
    </Button>
  )
}
