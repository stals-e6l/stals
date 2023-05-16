import { Grid, Typography, TextField, } from '@mui/material'
import React from 'react'
// import accommodation from '../../store/accommodation'
// import { deleteAccommodation } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
  input: string
  setField: React.Dispatch<React.SetStateAction<string>>
  isSoftDelete: boolean
}

const DeleteAccommodationForm: React.FC<IProps> = ({input, setField, isSoftDelete}) => {
  // TODO: PM's job to integrate state, for now refine the styling

  // const navigate = useNavigate()
  // const deleteAccommodationHandler = deleteAccommodation()

  const handleDelete = () => {
    // deleteAccommodationHandler(accommodation._id as string).then(() =>
    //   handleClose()
    // )
  }

  return (
    <>
      <Grid sx={{ flexGrow: 1, height: '100%', width: '100%'}} container spacing={0} flexDirection="column" alignItems="center" justifyContent="center" alignContent="center">
        <Grid item xs={'auto'} sx={{ width: '80%' }}>
            <Typography id="delete-text" variant="body1" sx={{ width: '100%', }}>
                {isSoftDelete ? "Are you sure you want to archive accommodation?" : "Are you sure you want to delete accommodation?"}
            </Typography>
        </Grid>

        <Grid item xs={'auto'} sx={{ width: '80%' }}>
            <TextField
            id="confirmation-field"
            placeholder="Confirm"
            autoComplete="off"
            value={input}
            onChange={e => setField(e.target.value)}
            sx={{
               boxShadow: 2,
               mt: 1,
               mb: 1,
               width: '100%'
            }}
         />
         </Grid>

        <Grid item xs={'auto'} sx={{}}>
            <Typography variant="body1" sx={{  }}>
            Type<b> Confirm </b> {isSoftDelete ? "to archive listing." : "to delete listing."}
            </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default DeleteAccommodationForm
