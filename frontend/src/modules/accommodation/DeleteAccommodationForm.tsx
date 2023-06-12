import {
  Grid,
  Typography,
  TextField,
  OutlinedInputProps,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import { COLOR } from '../../theme/'
import { useTheme } from '@mui/material'

interface IProps {
  children?: React.ReactNode
  input: string
  setField: React.Dispatch<React.SetStateAction<string>>
  isSoftDelete: boolean
  onSubmit: () => void
  onClose: () => void
}

const DeleteAccommodationForm: React.FC<IProps> = ({
  input,
  setField,
  isSoftDelete,
  onSubmit,
  onClose,
}) => {
  const theme = useTheme()
  // TODO: PM's job to integrate state, for now refine the styling

  // const navigate = useNavigate()
  // const deleteAccommodationHandler = deleteAccommodation()

  const handleDelete = () => {
    // deleteAccommodationHandler(accommodation._id as string).then(() =>
    //   handleClose()
    // )
  }

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const confirmationSx = {
    root: {
      '& .MuiInputLabel-root': {
        color: 'gray',
      },
    },
  }

  return (
    <>
      <Grid
        sx={{ flexGrow: 1, height: '100%', width: '100%' }}
        container
        spacing={0}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={'auto'} sx={{ width: '80%' }}>
          <Typography id="delete-text" variant="body1" sx={{ width: '100%' }}>
            {isSoftDelete
              ? 'Are you sure you want to archive accommodation?'
              : 'Are you sure you want to delete accommodation?'}
          </Typography>
        </Grid>

        <Grid item xs={'auto'} sx={{ width: '80%' }}>
          <TextField
            id="confirmation-field"
            placeholder="Confirm"
            label="Confirm"
            autoComplete="off"
            value={input}
            variant="filled"
            fullWidth
            InputProps={
              { disableUnderline: true } as Partial<OutlinedInputProps>
            }
            onChange={e => setField(e.target.value)}
            style={{ marginTop: 20, color: COLOR.gray1 }}
            sx={confirmationSx.root}
          />
        </Grid>

        <Grid item xs={'auto'} sx={{}}>
          <Typography variant="body1" sx={{}}>
            Type<b> Confirm </b>{' '}
            {isSoftDelete ? 'to archive listing.' : 'to delete listing.'}
          </Typography>
        </Grid>
        <Grid item xs={'auto'} sx={{}}>
          <Button
            variant="contained"
            fullWidth
            disabled={
              input.length === 0 ||
              input !== 'Confirm'
            }
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
            }}
            onClick={onSubmit}
          >
            {isSoftDelete ? 'Archive' : 'Delete'}
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginBottom: theme.spacing(1),
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default DeleteAccommodationForm
