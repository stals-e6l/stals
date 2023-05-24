import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Grid,
} from '@mui/material'
import useDialog from '../../hooks/useDialog'
import { deleteReview } from './ReviewsProvider'

interface IProps {
  children?: React.ReactNode
  reviewId: string
}

const DeleteReview: React.FC<IProps> = ({ reviewId }) => {
  // hook
  const { open, toggleDialog } = useDialog()
  const onDeleteReview = deleteReview()

  return (
    <>
      <Button
        variant="contained"
        onClick={toggleDialog}
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          fontWeight: 'bold',
          boxShadow: 0,
          borderRadius: '10px 10px 0px 0px',
          borderBottom: '1px solid black',
          ':hover': { color: '#fff' },
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={toggleDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>
            <Typography variant="h6">Delete Review</Typography>
        </DialogTitle>
        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
          <Grid item xs sx={{}}>
            <Typography sx={{ p: 1, textAlign: 'center' }}>
              Are you sure you want to delete your review?
            </Typography>
          </Grid>
        </Grid>
        <DialogActions>
          <Button 
            variant="contained" 
            onClick={toggleDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (onDeleteReview) onDeleteReview(reviewId).then(toggleDialog)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteReview
