import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import AddReviewForm from './AddReviewForm'
import useDialog from '../../hooks/useDialog'
import { getMe } from '../auth/AuthProvider'
import { createReview } from '../review/ReviewsProvider'

interface IProps {
  children?: React.ReactNode
  accommodationId: string
}

const AddReviewModal: React.FC<IProps> = ({ accommodationId }) => {
  // hooks
  const { open, toggleDialog } = useDialog()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const user = getMe()
  const onAddReview = createReview()

  // states
  const [review, setReview] = useState<IReview>({
    comment: '',
    rating: 2.5,
    accommodation_id: accommodationId,
    user_id: user?._id as string,
  })

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={toggleDialog}
        sx={{ maxWidth: '200px', fontWeight: 'bold' }}
      >
        Add Review
      </Button>

      <Dialog
        open={open}
        onClose={toggleDialog}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>
          <Grid
            container
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Typography sx={{ fontSize: '1em' }}>
                <b>Add Review</b>
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={toggleDialog}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <AddReviewForm review={review} setReview={setReview} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              if (onAddReview) {
                onAddReview(review).then(toggleDialog)
              }
            }}
            sx={{
              width: '100%',
              minWidth: '60%',
              maxWidth: '100%',
              ':hover': {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AddReviewModal
