import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'
import AccommodationForm from './AccommodationForm'
import useDialog from '../../hooks/useDialog'
import { createAccommodation } from './AccommodationsProvider'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationFormModal: React.FC<IProps> = ({ defaultValues }) => {
  // hooks
  const { open, toggleDialog } = useDialog()
  const onCreateAccommodation = createAccommodation()

  // events
  const handleSubmit = () => {
    onCreateAccommodation({
      name: 'Yooooooowww',
      image: {
        url: '',
      },
      address: 'Some address',
      type: 'hotel',
      furnishing: 'unfurnished',
      min_price: 1000,
      max_price: 3000,
      size_sqm: 20,
      meters_from_uplb: 400,
      min_pax: 1,
      max_pax: 4,
      num_rooms: 1,
      num_beds: 1,
      num_views: 1,
      landmarks: [],
      cooking_rules: [],
      pet_rules: [],
      other_rules: [],
      safety_and_security: [],
      appliances: [],
      amenities: [],
      is_soft_deleted: false,
    })
  }

  return (
    <React.Fragment>
      <Button onClick={toggleDialog}>
        {defaultValues ? 'Update accommodation' : 'Create accommodation'}
      </Button>
      {open && (
        <Dialog open={open} onClose={toggleDialog}>
          <DialogTitle>
            {defaultValues ? 'Update accommodation' : 'Create accommodation'}
          </DialogTitle>

          <DialogContent>
            <AccommodationForm defaultValues={defaultValues} />
          </DialogContent>

          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  )
}

export default AccommodationFormModal
