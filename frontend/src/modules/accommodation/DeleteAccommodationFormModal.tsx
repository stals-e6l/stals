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
import DeleteAccommodationForm from './DeleteAccommodationForm'
import useDialog from '../../hooks/useDialog'

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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // events
  const handleSubmit = () => {
    // TODO: PM's job
    if (isSoftDelete) {
      console.log({ accommodationId })
    } else {
      console.log({ accommodationId })
    }
  }

  return (
    <React.Fragment>
      <Button onClick={toggleDialog}>Delete</Button>
      {open && (
        <Dialog open={open} onClose={toggleDialog} fullScreen={fullScreen} maxWidth={'sm'} fullWidth={true}>
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
