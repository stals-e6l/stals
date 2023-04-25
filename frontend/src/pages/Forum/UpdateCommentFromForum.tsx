import { Button, TextField, Dialog, Typography, Grid, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { updateCommentFromForum } from '../../store/forum/actions'
import { Height } from '@mui/icons-material'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
  commentIndex: number
}

const UpdateCommentFromForum: React.FC<IProps> = ({
  forumId,
  comment: initComment,
  commentIndex,
}) => {
  // hooks
  const updateCommentFromForumHandler = updateCommentFromForum()
  // state
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [editable, setEditable] = React.useState<boolean>(false)
  const [comment, setComment] = React.useState<string>(initComment)

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* {editable && (
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Enter comment..."
          />
        )} */}
        <Button
          variant="contained"
          onClick={/*</div>*() => {
            // first it sets the UI to editable mode
            if (!editable) setEditable(true)
            // then when the user 'Saves'...
            else {
              // use this function update comment in the forum
              updateCommentFromForumHandler(forumId, comment, commentIndex)
              setEditable(false)
            }
          }*/
          handleClickOpen
        }
        >
          Update
        </Button>

        <Dialog fullWidth maxWidth='sm' open={open} sx={mainDialog}>

          <Typography variant='h5'>Edit Comment</Typography>

          <TextField value={comment} fullWidth multiline minRows={4} maxRows={4}
            onChange={e => setComment(e.target.value)}
            placeholder="Enter comment..."
            sx={textFieldStyle}
          />

          <Grid container spacing={1} direction={'row'} justifyContent={'flex-end'} alignItems={'center'} sx={mainGrid}>
            <Grid item xs={2} textAlign={'center'}>
              <Button variant="contained" onClick={handleClose} sx={buttonStyle}>Cancel</Button>
            </Grid>
            <Grid item xs={2} textAlign={'center'}>
              <Button variant="contained" onClick={handleClose} sx={buttonStyle}>Confirm</Button>
            </Grid>
          </Grid>

        </Dialog>
      </div>
    </ThemeProvider>
  )
}

export default UpdateCommentFromForum

const theme = createTheme({
  components:{

  },
  typography: {
    fontFamily: 'Source Sans Pro, Quicksand, Roboto, Arial',
    h5 : {
      flexGrow: '1',
      textAlign: 'center',
      paddingRight: '25px',
      paddingLeft: '25px',
      paddingTop: '15px',
      paddingBottom: '10px',
      fontSize: '1.5rem',
    }
  },
  palette:{
    primary: {
      main: '#60CE80'
    }
  }
})

const mainDialog = {
  "& .MuiPaper-root": {
    borderRadius: '15px',
  },
  backdropFilter: 'blur(5px)'
}

const textFieldStyle = {
  paddingRight: '25px',
  paddingLeft: '25px',
  height: '80%',
  justifyContent: 'center'
}

const mainGrid = {
  minWidth:'100%', 
  maxWidth:'100%', 
  margin:'auto',
  paddingRight: '25px',
  paddingLeft: '25px',
  paddingTop: '10px',
  paddingBottom: '15px',
}

const buttonStyle = {
  width:'100%', 
  maxWidth:'100%'
}