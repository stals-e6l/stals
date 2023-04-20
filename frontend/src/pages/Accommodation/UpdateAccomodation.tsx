import React from 'react'
import { Button, Dialog, Grid } from '@mui/material'
import { updateAccommodation } from '../../store/accommodation/actions'
import AccommodationForm from './form'
import { useAccommodationForm } from './form/hooks'

interface IProps {
  children?: React.ReactNode
  open: boolean
  handleClose: () => void
  accommodation: IAccommodation
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflowX: 'hidden',
  width: '80%',
  height: '80%',
  padding: 0,
  display: 'flex',
}

const UpdateAccommodation: React.FC<IProps> = ({
  open,
  handleClose,
  accommodation,
}) => {
  const updateAccommodationHandler = updateAccommodation()
  const { values, setFieldValue, submitForm } = useAccommodationForm(
    val => updateAccommodationHandler(val),
    accommodation
  )

  const handleSubmit = () => {
    submitForm().then(() => {
      handleClose()
    })
  }

  return (
    <Dialog maxWidth={'xl'} open={open} onClose={handleClose} sx={{ style }}>
      <AccommodationForm values={values} setFieldValue={setFieldValue} />

      <Grid container>
        <Grid item>
          <Button onClick={handleClose}>Cancel</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default UpdateAccommodation
