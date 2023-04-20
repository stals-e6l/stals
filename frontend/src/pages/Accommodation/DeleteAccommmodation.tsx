import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteAccommodation } from '../../store/accommodation/actions'
import { Box, Button, TextField, Dialog, Typography, Grid } from '@mui/material'

interface IProps {
  children?: React.ReactNode
  accommodation: IAccommodation
}

const DeleteAccommodation: React.FC<IProps> = ({ accommodation }) => {
  const [open, setState] = React.useState(false)

  const navigate = useNavigate()
  const deleteAccommodationHandler = deleteAccommodation()

  const handleDelete = () => {
    deleteAccommodationHandler(accommodation._id as string).then(() =>
      handleClose()
    )
  }

  const handleClose = () => {
    setState(false)
  }

  const handleOpen = () => {
    setState(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          setState(true)
        }}
      >
        Open
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
          <Grid
            item
            xs
            sx={{
              backgroundColor: '#696969',
            }}
          >
            <Box sx={{}} />
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

            <Button
              id="cancel-button"
              onClick={() => {
                setState(false)
              }}
              sx={{
                border: 2,
                borderColor: '#154360',
                borderRadius: 2,
                backgroundColor: '#fff',
                color: '#154360',
                m: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              id="delete-button"
              onClick={handleDelete}
              sx={{
                border: 2,
                borderColor: '#154360',
                borderRadius: 2,
                backgroundColor: '#154360',
                color: '#fff',
                m: 1,
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default DeleteAccommodation
