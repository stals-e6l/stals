import { Button, TextField, Dialog, DialogTitle, Typography, Grid, Box, useTheme } from '@mui/material'
import React from 'react'
import useDialog from '../../hooks/useDialog'
import { updateReview } from './ReviewsProvider'

interface IProps {
  children?: React.ReactNode
  review: IReview
}

const UpdateCommentFromForum: React.FC<IProps> = ({ review }) => {
  // hooks
  const { open, toggleDialog } = useDialog()
  const onEditReview = updateReview()
  const theme = useTheme()
  // state
  const [comment, setComment] = React.useState<string>(review.comment || '')

  return (
    <Box>
      <Button
        variant="contained"
        onClick={toggleDialog}
        sx={{ 
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 'bold',
            boxShadow: 0,
            borderRadius: '0px 0px 10px 10px',
            borderTop: '1px solid black',
            ':hover':{
                color: '#fff'
            }
            }}
      >
        Update
      </Button>

      <Dialog fullWidth maxWidth="sm" open={open} sx={mainDialog}>
        <DialogTitle>
            <Typography variant="h6">Edit Comment</Typography>
        </DialogTitle>

        <TextField
          value={comment}
          fullWidth
          multiline
          minRows={4}
          maxRows={4}
          onChange={e => setComment(e.target.value)}
          placeholder="Enter comment..."
          sx={textFieldStyle}
        />

        <Grid
          container
          spacing={1}
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          sx={mainGrid}
        >
          <Grid item xs={2} textAlign={'center'}>
            <Button variant="contained" onClick={toggleDialog} sx={buttonStyle}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={2} textAlign={'center'}>
            <Button
              variant="contained"
              onClick={() => {
                if (onEditReview) {
                  onEditReview({ ...review, comment }).then(toggleDialog)
                }
              }}
              sx={buttonStyle}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  )
}

export default UpdateCommentFromForum

const mainDialog = {
  '& .MuiPaper-root': {
    borderRadius: '15px',
  },
  backdropFilter: 'blur(5px)',
}

const textFieldStyle = {
  paddingRight: '25px',
  paddingLeft: '25px',
  height: '80%',
  justifyContent: 'center',
}

const mainGrid = {
  minWidth: '100%',
  maxWidth: '100%',
  margin: 'auto',
  paddingRight: '25px',
  paddingLeft: '25px',
  paddingTop: '10px',
  paddingBottom: '15px',
}

const buttonStyle = {
  width: '100%',
  maxWidth: '100%',
  fontWeight: 'bold',
}
