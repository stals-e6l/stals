import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import DeleteAccommodationForm from './DeleteAccommodationForm'
import useDialog from '../../hooks/useDialog'
import { archiveAccommodation } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
  accommodationId: string
  isSoftDelete: boolean
}

const DeleteAccommodationFormModal: React.FC<IProps> = ({
  accommodationId,
  isSoftDelete,
}) => {
  // hooks
  const { open, toggleDialog } = useDialog()
  const onArchiveAccommodation = archiveAccommodation()

  // events
  const handleSubmit = () => {
    if (isSoftDelete) {
      onArchiveAccommodation({
        _id: '64629aa5150cc28f3cf80810',
        is_soft_deleted: true,
      })
    } else {
      console.log({ accommodationId })
    }
  }

  return (
    <React.Fragment>
      <Button onClick={toggleDialog}>Delete</Button>
      {open && (
        <Dialog open={open} onClose={toggleDialog}>
          <DialogTitle>Hello</DialogTitle>

          <DialogContent>
            <DeleteAccommodationForm />
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

export default DeleteAccommodationFormModal
