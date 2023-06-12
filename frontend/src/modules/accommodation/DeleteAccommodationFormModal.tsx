/* eslint-disable indent */
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
import {
  archiveAccommodation,
  deleteAccommodation,
} from './AccommodationsProvider'
import { ALLOWABLE_FEATURES, getMe } from '../auth/AuthProvider'

interface IProps {
  children?: React.ReactNode
  accommodationId: string
  userId: string
  isSoftDelete: boolean
  onClose?: () => void
}

const DeleteAccommodationFormModal: React.FC<IProps> = ({
  accommodationId,
  userId,
  isSoftDelete,
  onClose,
}) => {
  // hooks
  const { open, toggleDialog } = useDialog()
  const onArchiveAccommodation = archiveAccommodation()
  const onDeleteAccommodation = deleteAccommodation()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const me = getMe()

  // state
  const [inputField, setField] = useState<string>('')

  // events
  const handleSubmit = () => {
    if (onDeleteAccommodation && onArchiveAccommodation && onClose) {
      if (isSoftDelete) {
        onArchiveAccommodation({
          _id: accommodationId,
          is_soft_deleted: true,
        }).then(status => {
          if (status) toggleDialog()
        })
      } else {
        onDeleteAccommodation(accommodationId).then(status => {
          if (status) toggleDialog()
        })
      }
      onClose()
    }
  }

  return (
    <React.Fragment>
      {me &&
        ALLOWABLE_FEATURES.delete.accommodation.includes(me.role) &&
        me._id === userId && (
          <Button 
            variant="contained" 
            onClick={toggleDialog} 
            sx={{
                borderTop: '1px #fff solid',
                fontWeight: 'bold'
                }}>
            {isSoftDelete ? 'Archive' : 'Delete'}
          </Button>
        )}
      {open && (
        <Dialog
          open={open}
          onClose={toggleDialog}
          fullScreen={fullScreen}
          maxWidth={'sm'}
          fullWidth={true}
        >
          <DialogTitle>
            {isSoftDelete ? 'Archive Accommodation' : 'Delete Accommodation'}
          </DialogTitle>

          <DialogContent>
            <DeleteAccommodationForm
              setField={setField}
              input={inputField}
              isSoftDelete={isSoftDelete}
              onSubmit={handleSubmit}
              onClose={toggleDialog}
            />
          </DialogContent>

          <DialogActions>
            
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default DeleteAccommodationFormModal
