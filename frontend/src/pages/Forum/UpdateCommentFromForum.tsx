import { Button, TextField, Dialog, Typography, Grid } from '@mui/material'
import React from 'react'
import { updateCommentFromForum } from '../../store/forum/actions'
import { Height } from '@mui/icons-material'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
  commentIndex: number
}

const textFieldStyle = {
  paddingRight: '10px',
  paddingLeft: '10px',
  height: '80%',
  justifyContent: 'center'
}

const typographyStyle = {
  padding: '10px',
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

      <Dialog fullWidth maxWidth='sm' open={open}
        PaperProps={{
          sx: {
            //height: '40%',
            borderRadius: '10px',
          }
        }}
        sx={{
          backdropFilter: 'blur(3px)',
        }}
      >
        <Typography sx={typographyStyle}>Edit Comment</Typography>
        <TextField
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Enter comment..."
          fullWidth
          multiline
          minRows={4}
          maxRows={4}
          sx={textFieldStyle}
        />

        <Grid container spacing={1} direction={'row'} justifyContent={'flex-end'} alignItems={'center'} sx={{minWidth:'100%', maxWidth:'100%', padding:'10px', margin:'auto',}}>
          <Grid item xs={2} textAlign={'center'}>
            <Button variant="contained" onClick={handleClose} sx={{width:'100%', maxWidth:'100%'}}>Cancel</Button>
          </Grid>
          <Grid item xs={2} textAlign={'center'}>
            <Button variant="contained" onClick={handleClose} sx={{width:'100%', maxWidth:'100%'}}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}

export default UpdateCommentFromForum
