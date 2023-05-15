import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
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
  const [ inputField, setField ] = useState<string>('')

  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'))

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
          <DialogTitle>{isSoftDelete ? "Archive Accommodation" : "Delete Accommodation"}</DialogTitle>

          <DialogContent>
            <DeleteAccommodationForm setField={setField} input={inputField} isSoftDelete={isSoftDelete}/>
          </DialogContent>

          <DialogActions>
          <Button onClick={toggleDialog} sx={{
                border: 2,
                borderColor: '#154360',
                borderRadius: 2,
                backgroundColor: '#fff',
                color: '#154360',
          }}>Cancel</Button>
            <Button disabled={inputField != "Confirm"} onClick={handleSubmit} sx={{ 
                border: 2,
                borderColor: '#154360',
                borderRadius: 2,
                backgroundColor: '#154360',
                color: '#fff',
                ":disabled": {
                    backgroundColor: '#fff',
                    color: '#154360'
                },
                ":hover": {
                    backgroundColor: '#60ce80',
                    borderColor: '#60ce80'
                }
            }}>Delete</Button>
          </DialogActions>
          
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default DeleteAccommodationFormModal
