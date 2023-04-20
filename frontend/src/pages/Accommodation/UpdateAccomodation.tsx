import React from 'react'
import { Button, Dialog, Grid, SxProps } from '@mui/material'
import { updateAccommodation } from '../../store/accommodation/actions'
import AccommodationForm from './form'
import { useAccommodationForm } from './form/hooks'
import { Height } from '@mui/icons-material'

interface IProps {
  children?: React.ReactNode
  open: boolean
  handleClose: () => void
  accommodation: IAccommodation
}

const sampleStyle: SxProps = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    backdropFilter: "blur(1px)",
    // justifyContent: "center",
    // alignContent: "flex-start",
    // direction: 'column',
  }
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  //transform: 'translate(-50%, -50%)',
  overflowX: 'hidden',
  width: '80%',
  height: '80%',
  padding: 0,
  display: 'flex',
  //borderRadius: '20px',
  backdropFilter: 'blur(50px)'
};

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
    <Dialog maxWidth={'xl'} open={open} onClose={handleClose} sx={sampleStyle}
      PaperProps={{
          style:{
              margin: 'auto',
              width: '80%',
              maxHeight: '80%',
              display: 'flex',
              borderRadius: 15
          }
      }}
    >
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
