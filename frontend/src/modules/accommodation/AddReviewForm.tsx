import { Grid, Typography, Rating, TextField, useTheme } from '@mui/material'
import React from 'react'

interface IProps {
  children?: React.ReactNode
  review: IReview
  setReview: React.Dispatch<React.SetStateAction<IReview>>
}

const AddReviewForm: React.FC<IProps> = ({ review, setReview }) => {
  const theme = useTheme()

  React.useEffect(() => {
    return () => {
      setReview(prev => ({ ...prev, comment: '', rating: 2.5 }))
    }
  }, [])

  return (
    <>
      <Grid container>
        <Grid item sx={{ pr: 1 }}>
          <Typography>Rating:</Typography>
        </Grid>
        <Grid item>
          <Rating
            value={review.rating}
            onChange={(_, val) =>
              setReview(prev => ({ ...prev, rating: val as number }))
            }
            precision={0.5}
            sx={{
              '& .MuiRating-iconFilled': {
                color: theme.palette.secondary.main,
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Grid item xs sx={{ width: '100%' }}>
          <TextField
            placeholder="Share your thoughts..."
            multiline
            rows={5}
            value={review.comment}
            onChange={e =>
              setReview(prev => ({ ...prev, comment: e.target.value }))
            }
            sx={{
              width: '100%',
              boxShadow: 1,
            }}
          ></TextField>
        </Grid>
        <Grid item xs sx={{ width: '100%' }}></Grid>
      </Grid>
    </>
  )
}

export default AddReviewForm
