import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationFormModal: React.FC<IProps> = ({ defaultValues }) => {
  // state
  const [open, setOpen] = React.useState<boolean>(false)

  // events
  const toggleDialog = () => setOpen(prev => !prev)
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
