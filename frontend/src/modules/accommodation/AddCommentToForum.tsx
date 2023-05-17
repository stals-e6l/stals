import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'
import { Box, Button, TextField, Dialog, Typography } from '@mui/material'
import { addCommentToForum } from '../../store/forum/actions'
import { FormGroup } from '@mui/material'

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

  return (
    <ThemeProvider theme={theme}>
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
