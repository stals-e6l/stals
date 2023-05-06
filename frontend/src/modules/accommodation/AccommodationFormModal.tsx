import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'
import useDialog from '../../hooks/useDialog'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationFormModal: React.FC<IProps> = ({ defaultValues }) => {
  // hooks
  const { open, toggleDialog } = useDialog()

  // events
  const handleSubmit = () => {
    // TODO: PM's job
  }

  return (
    <React.Fragment>
      <Button onClick={toggleDialog}>
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
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default AccommodationFormModal
