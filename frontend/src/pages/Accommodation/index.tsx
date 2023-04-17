import React from 'react'
import { useNavigate } from 'react-router-dom'
import { retrieveAccommodations } from '../../store/accommodation/actions'
import { Button, TextField, Box, Modal, Input, InputLabel, FormControl, InputAdornment, MenuItem } from '@mui/material';
import UpdateAccomodation from '../../components/UpdateAccomodation'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const accommodations = retrieveAccommodations()
  const navigate = useNavigate()

  return (
    <div>
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
            name={accommodation.name}
            address={accommodation.address}
            type={accommodation.type}
            price={accommodation.price}
            size_sqm={accommodation.size_sqm}
            meters_from_uplb={accommodation.meters_from_uplb}
            min_pax={accommodation.min_pax}
            max_pax={accommodation.max_pax}
            num_rooms={accommodation.num_rooms}
            num_beds={accommodation.num_beds}
          />
        ))}
        
      </ul>
    </div>
  )
}

export default AccommodationPage
