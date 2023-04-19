import React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton/IconButton'
import { PhotoCamera } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import { useNavigate } from 'react-router-dom'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import clsx from 'clsx'
import '../../store/createAccommodation/styles.css'
// import { BasicInputFields } from '../../store/createAccommodation/components'

interface IProps {
  children?: React.ReactNode
}


const theme = createTheme({
  components:{

  },
  typography: {
    fontFamily: 'Source Sans Pro, Quicksand, Roboto, Arial',
  },
  palette:{
    primary: {
      main: '#60CE80'
    }
  }
})

function BasicInputFields(props: any) {
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="listingName"
        label="Listing name"
        name="listingName"
        autoComplete="listingName"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="unitSz"
        label="Unit size"
        name="unitSz"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="numBedRm"
        label="Number of bedrooms"
        name="numberOfBedrooms"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="numBed"
        label="Number of Beds"
        name="numBed"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="minCap"
        label="Minimum capacity"
        name="minCap"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="maxCap"
        label="Maximum capacity"
        name="maxCap"
      />
      {/*Furnishing*/}
      <Autocomplete
        multiple
        id="furnishing"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Furnishing"
            placeholder="Add furnishing"
          />
        )}
      />
      {/*Furnishing*/}
      <TextField
        margin="normal"
        required
        fullWidth
        id="listingPrice"
        label="Listing price"
        name="listingPrice"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        id="desc"
        label="Description"
        name="desc"
      />
    </div>
  )
}

function AdvancedInputFields(props: any) {
  const {cookingRule, handleCookingRules, safetyAndSecurity, handleSafetyAndSecurity, isPetFriendly, handleIsPetFriendly} = props
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="distFromUPLB"
        label="Distance from UPLB"
        name="distFromUPLB"
      />

      <Autocomplete
        multiple
        id="landmarks"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Landmarks"
            placeholder="Add landmark"
          />
        )}
      />

      <Autocomplete
        multiple
        id="amenities"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Amenities"
            placeholder="Add amenity"
          />
        )}
      />

      <Autocomplete
        multiple
        id="appliances"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Appliances"
            placeholder="Add appliance"
          />
        )}
      />
      <Box
        sx={{
          height: 20,
        }}
      />

      <FormControl sx={{ minWidth: '100%' }}>
        <InputLabel id="cookingRules">Cooking rules</InputLabel>
        <Select
          labelId="cookingRules"
          id="cookingRules"
          value={cookingRule}
          onChange={handleCookingRules}
          label="Cooking rules"
        >
          <MenuItem value={0}>Cooking is not allowed</MenuItem>
          <MenuItem value={1}>Kitchen area only</MenuItem>
          <MenuItem value={2}>Cooking is allowed</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          height: 30,
        }}
      />

      <FormControl sx={{ minWidth: '100%' }}>
        <InputLabel id="safetyAndSecurity">Safety and security</InputLabel>
        <Select
          labelId="safetyAndSecurity"
          id="safetyAndSecurity"
          value={safetyAndSecurity}
          onChange={handleSafetyAndSecurity}
          label="Safety and security"
        >
          <MenuItem value={0}>Safe</MenuItem>
          <MenuItem value={1}>High crime rate</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          height: 10,
        }}
      />

      <Autocomplete
        multiple
        id="otherRules"
        limitTags={2}
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            margin="normal"
            required
            variant="outlined"
            label="Other rules"
            placeholder="Add rule"
          />
        )}
      />

      <FormControlLabel
        value="petFriendly"
        control={<Switch color="primary" onChange={handleIsPetFriendly} />}
        labelPlacement="start"
        label="Pet-friendly"
        checked={isPetFriendly}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
          mt: 1,
          ml: 0.75,
        }}
      />
    </div>
  )
}
// // STYLES
//   TextField{

//   }
// // STYLES

const CreateAccommodationPage: React.FC<IProps> = () => {
  // const accommodations = retrieveAccommodations()
  // const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  // Implement upload
  const handleUploadImage = () => {
    // execute code to open file input
    const fileInput = document.querySelector(
      'input[type=file]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  // const [cookingRule, setCookingRule] = React.useState('')
  // const [safetyAndSecurity, setSafetyAndSecurity] = React.useState('')

  // const handleCookingRules = (event: SelectChangeEvent) => {
  //   setCookingRule(event.target.value as string)
  // }

  // const handleSafetyAndSecurity = (event: SelectChangeEvent) => {
  //   setSafetyAndSecurity(event.target.value as string)
  // }

  // const [isPetFriendly, setIsPetFriendly] = React.useState(false)

  // const handleIsPetFriendly = (event: SelectChangeEvent) => {
  //   setIsPetFriendly(event.target.value as unknown as boolean)
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid // LEFT COLUMN START
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{ maxHeight: '100vh', overflow: 'auto'}}
        >
          <Box // BOX WRAPPER
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid // HEADER START
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
            >

              <IconButton onClick={() => window.history.back()}>
                <ArrowBackIcon />
              </IconButton>

              <Box // SPACER
                sx={{
                  width: 10,
                }}
              />

              <Typography component="h1" variant="h4" fontWeight="bold">
                New listing
              </Typography>

            </Grid> {/* HEADER END */}

            <Box
              sx={{
                height: 10,
              }}
            />

            <Card // UPLOAD MEDIA
              sx={{
                minWidth: '100%',
                minHeight: '50%',
                border: 'solid 1px green',
                backgroundColor: '#eeeeee',
              }}
              onClick={handleUploadImage}
            >
              <CardActionArea>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100%',
                    paddingBottom: '20%',
                    paddingTop: '20%',
                  }}
                >
                  <PhotoCamera />
                </CardContent>
              </CardActionArea>
              <input hidden accept="image/*" type="file" />
            </Card>

            <Box // FORM START
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >

              <BasicInputFields /> {/*Basic input*/}

              <Box // Spacer
                sx={{
                  height: 30,
                }}
              />

              <Typography component="h1" variant="h5" fontWeight="bold">
                Advanced details
              </Typography>

              <AdvancedInputFields /> {/*Advanced input*/}

              <Button // SUBMIT BUTTON
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box> {/* FORM END */}
          </Box> {/* BOX WRAPPER END */}
        </Grid> {/* LEFT COLUMN END */}
        <Grid // RIGHT COLUMN
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  )
}

export default CreateAccommodationPage
