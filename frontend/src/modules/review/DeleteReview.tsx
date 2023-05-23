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
          <Grid sx={{ flexGrow: 1 }} container spacing={0}></Grid>
        </DialogTitle>
        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
          <Grid item xs sx={{}}>
            <Typography sx={{ p: 1, textAlign: 'center' }}>
              Are you sure you want to delete your review?
            </Typography>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancel</Button>
          <Button
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
