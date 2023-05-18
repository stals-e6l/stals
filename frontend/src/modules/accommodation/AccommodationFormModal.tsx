import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'
import useDialog from '../../hooks/useDialog'
import { COLOR } from '../../theme'
import PublishIcon from '@mui/icons-material/Publish'

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
      borderRadius: theme.spacing(0.5),
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#93dba4',
      },
    },
  }
  return (
    <React.Fragment>
      <Fab
        onClick={toggleDialog}
        sx={{ ...submitBtnSx.root, borderRadius: '50%' }}
      >
        <PublishIcon />
      </Fab>
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
