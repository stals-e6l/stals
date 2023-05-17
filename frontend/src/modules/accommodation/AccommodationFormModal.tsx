import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // hooks
  const { open, toggleDialog } = useDialog()

  // events
  const handleSubmit = () => {
    // TODO: PM's job
  }

  const cancelBtnSx = {
    root: {
      backgroundColor: COLOR.negativeRed,
      color: COLOR.white,
      borderRadius: '4px',
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#cc1d33',
      },
    },
  }

  const submitBtnSx = {
    root: {
      backgroundColor: COLOR.green,
      color: COLOR.darkGreen,
      borderRadius: '4px',
      padding: '10px 20px',
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
        <Dialog fullScreen={isMobile} open={open} onClose={toggleDialog}>
          <DialogTitle sx={{ backgroundColor: '#0c2c44', color: COLOR.white }}>
            {' '}
            {/*TEMP COLOR*/}
            {defaultValues ? 'Update accommodation' : 'Create accommodation'}
          </DialogTitle>

          <DialogContent sx={{ backgroundColor: '#0c2c44' }}>
            {' '}
            {/*TEMP COLOR*/}
            <AccommodationForm defaultValues={defaultValues} />
          </DialogContent>

          <DialogActions sx={{ backgroundColor: '#0c2c44' }}>
            {' '}
            {/*TEMP COLOR*/}
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
