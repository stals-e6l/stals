import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createTheme,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'
import useDialog from '../../hooks/useDialog'
import { COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationFormModal: React.FC<IProps> = ({ defaultValues }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: COLOR.blue,
      },
      secondary: {
        main: COLOR.green,
      },
    },
  })

  // hooks
  const { open, toggleDialog } = useDialog()

  // events
  const handleSubmit = () => {
    // TODO: PM's job
  }

  const cancelBtnSx = {
    root: {
      backgroundColor: '#B00020', // Customize the background color
      color: 'white', // Customize the text color
      borderRadius: '4px', // Customize the border radius
      padding: '10px 20px', // Customize the padding
      // Add more custom styling properties as needed
      '&:hover': {
        backgroundColor: '#cc1d33',
      },
    },
  }

  const submitBtnSx = {
    root: {
      backgroundColor: '#60CE80', // Customize the background color
      color: '#1E4028', // Customize the text color
      borderRadius: '4px', // Customize the border radius
      padding: '10px 20px', // Customize the padding
      // Add more custom styling properties as needed
      '&:hover': {
        backgroundColor: '#93dba4',
      },
    },
  }
  return (
    <React.Fragment>
      <Button onClick={toggleDialog} sx={submitBtnSx.root}>
        {defaultValues ? 'Update accommodation' : 'Create accommodation'}
      </Button>
      {open && (
        <Dialog open={open} onClose={toggleDialog}>
          <DialogTitle>
            {defaultValues ? 'Update accommodation' : 'Create accommodation'}
          </DialogTitle>

          <DialogContent>
            <AccommodationForm defaultValues={defaultValues} />
          </DialogContent>

          <DialogActions>
            <Button onClick={toggleDialog} sx={cancelBtnSx.root}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} sx={submitBtnSx.root}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default AccommodationFormModal
