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
    <Dialog maxWidth={'xl'} open={open} onClose={handleClose}>
      <AccommodationForm values={values} setFieldValue={setFieldValue} />

      {/* <Grid container>
        <Grid item>
          <Button onClick={handleClose}>Cancel</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        </Grid>
      </Grid> */}
    </Dialog>
  )
}

export default UpdateAccommodation
