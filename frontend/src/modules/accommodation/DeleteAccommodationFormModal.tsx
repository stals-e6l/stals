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

  const theme = useTheme()
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
          <DialogTitle>{isSoftDelete ? "Archive Accommodation" : "Delete Accommodation"}</DialogTitle>

          <DialogContent>
            <DeleteAccommodationForm setField={setField} input={inputField} isSoftDelete={isSoftDelete}/>
          </DialogContent>

          <DialogActions>
          <Button onClick={toggleDialog} sx={{
                border: 2,
                borderColor: theme.palette.primary.main,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
          }}>Cancel</Button>
            <Button disabled={inputField != "Confirm"} onClick={handleSubmit} sx={{ 
                border: 2,
                borderColor: theme.palette.primary.main,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
                ":disabled": {
                    backgroundColor: '#fff',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                },
                ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                    borderColor: theme.palette.secondary.main
                }
            }}>Delete</Button>
          </DialogActions>
          
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default DeleteAccommodationFormModal
