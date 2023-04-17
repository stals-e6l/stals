import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createAccommodation, retrieveAccommodations } from '../../store/accommodation/actions'
import { Button, TextField, Box, Modal, Input, InputLabel, FormControl, InputAdornment, MenuItem } from '@mui/material';
import UpdateAccomodation from '../../components/updateAccomodation/UpdateAccomodation'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const accommodations = retrieveAccommodations()
  const navigate = useNavigate()
  const createAccommodationHandler = createAccommodation()

  //console.log({ accommodations})

  return (
    <div>
      <button onClick={() => {
        createAccommodationHandler({
          name: 'test name',
          description: "listing description",
          address: "listing address",
          type: "apartment",
          price: 0,
          size_sqm: 0,
          meters_from_uplb: 0,
          landmarks: [],
          min_pax: 0,
          max_pax: 0,
          num_rooms: 0,
          num_beds: 0,
          num_views: 0,
          furnishing: "semifurnished",
          cooking_rules: [],
          pet_rules: [],
          other_rules: [],
          safety_and_security: [],
          appliances: [],
          amenities: [],
          created_at: "date",
          updated_at: "date",
          is_soft_deleted: false
        })
      }}>create</button>
      <ul>
        {accommodations.map((accommodation, key: number) => (
          <li
            style={{ cursor: 'pointer' }}
            key={key}
            onClick={() => navigate(`/accommodations/${accommodation._id}`)}
          >
            {accommodation.name}
          </li>
        ))}
        <Button variant='outlined' onClick={handleOpen}>update</Button>
        {accommodations.map((accommodation, key: number) => (
          <UpdateAccomodation 
            open={open} 
            handleClose={handleClose}
            accommodation={accommodation}
          />
        ))}
        
      </ul>
    </div>
  )
}

export default AccommodationPage
