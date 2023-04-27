import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
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
import CloseIcon from '@mui/icons-material/Close'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import { Box, Button, TextField, Dialog, Typography, Grid } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { addCommentToForum } from '../../store/forum/actions'
import { FormGroup, FormLabel } from '@mui/material'

interface IProps {
  children?: React.ReactNode
  forumId: string
}

const theme = createTheme({
  components: {},
  typography: {
    fontFamily: 'Source Sans Pro, Quicksand, Roboto, Arial',
  },
  palette: {
    primary: {
      main: '#60CE80',
    },
  },
})

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#60CE80',
  },
  // '& .MuiRating-iconHover': {
  //   color: '#ff3d47',
  // },
})

const AddCommentToForum: React.FC<IProps> = ({ forumId }) => {
  // hooks
  const addCommentToForumHandler = addCommentToForum()

  // state
  const [comment, setComment] = React.useState<string>('')

  const [value, setValue] = React.useState<number | null>(2)

  const [open, setState] = React.useState(false)

  const handleClose = () => {
    setState(false)
  }

  const handleOpen = () => {
    setState(false)
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Paper
        component="main"
        sx={{
          height: '600px',
          width: '500px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      > */}
      <Button
        sx={{
          position: 'absolute',
          right: '25px',
          backgroundColor: '#154360',
          color: 'white',
          fontWeight: 'bold',
        }}
        onClick={() => {
          setState(true)
        }}
      >
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <CssBaseline />
        <FormGroup sx={{}}>
          {/* // <FormLabel>Add comment</FormLabel> */}
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box flexGrow={1} sx={{ paddingRight: '20px' }}>
              <IconButton disabled sx={{ visibility: 'hidden' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <Typography component="h1" variant="h5" fontWeight="bold">
                Add a review
              </Typography>
            </Box>
            <Box sx={{ paddingRight: '20px' }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledRating
              name="simple-controlled"
              defaultValue={2}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
              sx={{ color: '60CE80' }}
            />
          </Box>
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            margin="normal"
            required
            // fullWidth
            multiline
            placeholder="Share your thoughts..."
            rows={12}
            sx={{ marginX: '20px' }}
          />

          <Button
            variant="contained"
            onClick={() => {
              // use this function add comment in the forum
              addCommentToForumHandler(forumId, comment)
              setComment('')
              handleClose()
            }}
            sx={{ marginX: '20px', marginBottom: '20px' }}
          >
            Add
          </Button>
        </FormGroup>
      </Dialog>
      {/* </Paper> */}
    </ThemeProvider>
  )
}

export default AddCommentToForum
