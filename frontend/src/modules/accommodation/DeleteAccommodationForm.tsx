import { Button, Grid, Box, Typography, TextField, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import theme from '../../theme/AppTheme'
// import { useNavigate } from 'react-router-dom'
// import accommodation from '../../store/accommodation'
// import { deleteAccommodation } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const DeleteAccommodationForm: React.FC<IProps> = () => {
  // TODO: PM's job to integrate state, for now refine the styling

  // const navigate = useNavigate()
  // const deleteAccommodationHandler = deleteAccommodation()

  const handleDelete = () => {
    // deleteAccommodationHandler(accommodation._id as string).then(() =>
    //   handleClose()
    // )
  }

  const smallerScreen = useTheme().breakpoints.down('sm')

  // const handleClose = () => {
  //   setState(false)
  // }

  // const handleOpen = () => {
  //   setState(false)
  // }

  return (
    <>
      <Grid sx={{ flexGrow: 1 }} container spacing={0}>
        <Grid
          item
          xs
          sx={{
            backgroundColor: '#696969',
            [smallerScreen]: {
                display: 'none',
            }
          }}
        >
          <Box sx={{width: 'auto'}} />
        </Grid>
        <Grid
          item
          xs
          sx={{
            padding: 5,
          }}
        >
        <Typography
        id="delete-text"
        variant="body1"
        sx={{
            p: 1,
        }}
        >
            Are you sure that you want to delete accommodation?
            </Typography>
            <TextField
            id="confirmation-field"
            required
            placeholder="Confirm"
            sx={{
               boxShadow: 2,
               m: 1,
            }}
        ></TextField>
            <Typography variant="body1">
            Type Confirm to delete the listing.
            </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default DeleteAccommodationForm
