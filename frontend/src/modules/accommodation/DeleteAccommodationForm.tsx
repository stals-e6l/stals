import { Grid, Typography, TextField, } from '@mui/material'
import React from 'react'
// import { useNavigate } from 'react-router-dom'
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


  // const handleClose = () => {
  //   setState(false)
  // }

  // const handleOpen = () => {
  //   setState(false)
  // }
  
  return (
    <>
      <Grid sx={{ flexGrow: 1, height: '100%', width: '100%'}} container spacing={0} flexDirection="column" alignItems="center" justifyContent="center">
        <Grid item xs={'auto'} sx={{}}>
            <Typography id="delete-text" variant="body1" sx={{ p: 1, width: '100%', textAlign: 'center' }}>
                {isSoftDelete ? "Are you sure you want to archive accommodation?" : "Are you sure you want to delete accommodation?"}
            </Typography>
        </Grid>

        <Grid item xs={'auto'} sx={{}}>
            <TextField
            id="confirmation-field"
            placeholder="Confirm"
            value={input}
            onChange={e => setField(e.target.value)}
            sx={{
               boxShadow: 2,
               m: 1,
               width: '100%'
            }}
         />
         </Grid>

        <Grid item xs={'auto'} sx={{}}>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Type<b> Confirm </b> {isSoftDelete ? "to archive listing." : "to delete listing."}
            </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default DeleteAccommodationForm
