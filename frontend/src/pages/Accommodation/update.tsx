//To do: Modularize fields, change length of price and listing size, look for better design

import * as React from 'react';
import { useParams } from 'react-router-dom'
import { Button, TextField, Box, Modal, Input, InputLabel, FormControl, InputAdornment, MenuItem } from '@mui/material';
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import image from '../../assets/Ellens.jpg'
import '../../update.css'

const listingType = [
  {
    value: 'APARTMENT',
    label: 'Apartment',
  },
  {
    value: 'DORM',
    label: 'Dorm',
  },
  {
    value: 'MOTEL',
    label: 'Motel',
  },
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  overflowX: 'hidden',
  width: '80%',
  height: '80%',
  padding: 0,
};

const inputLabel = {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#6E6E73',
}

const input = {
  fontSize: 18,
  color: '#6E6E73',
  marginBottom: 3,
}

interface IProps {
  children?: React.ReactNode
}

const UpdateAccomodation: React.FC<IProps> = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const params = useParams()
    const accommodation = retrieveAccommodationById(params.id as string)
  
    return (
      <div>
        <Button variant='outlined' onClick={handleOpen}>
          update
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style = {{ 
            backdropFilter: 'blur(5px)',
          }}
        >
          <Box sx={style}>
            <div className='main'>
              <Box
                component="img"
                alt="Ellens"
                src={image}
                className='image'
              />
              <Box
                style={{
                  overflowY: 'scroll',
                  paddingRight: 20,
                  width: '100%',
                  height: '100%'
                }}
              >
                <h2 className='title'>Edit Listing Details</h2>

                <FormControl fullWidth variant='standard'>
                  <InputLabel shrink sx={inputLabel}>Description</InputLabel>
                  <Input placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac arcu sit amet nisi convallis maximus. Praesent vel dolor hendrerit, semper lectus vitae, feugiat justo. Fusce nec ante at neque lacinia bibendum eget a lectus. Quisque non elit pulvinar, ornare mauris sit amet, ultricies tortor. Sed tempus sed risus ut accumsan. Maecenas a urna quis est tempor sodales vel ut nisi. Donec euismod at tellus et sagittis. Etiam rhoncus sed purus ut convallis. Suspendisse eu nisi a nunc molestie consectetur nec vitae mi.' sx={input} multiline rows={4}></Input>
                </FormControl>

                <FormControl fullWidth variant='standard'>
                  <InputLabel shrink sx={inputLabel}>Listing Name</InputLabel>
                  <Input placeholder="{accommodation.name}" sx={input}></Input>
                </FormControl>

                <FormControl fullWidth variant='standard'>
                  <InputLabel shrink sx={inputLabel}>Listing Address</InputLabel>
                  <Input placeholder='Lorem Ipsum' sx={input}></Input>
                </FormControl>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControl variant="standard">
                    <InputLabel shrink sx={inputLabel}>Price</InputLabel>
                    <Input
                      startAdornment={<InputAdornment position="start">₱</InputAdornment>}
                      placeholder='5000'
                    />
                  </FormControl>

                  <FormControl variant="standard">
                    <InputLabel shrink sx={inputLabel}>Listing Size</InputLabel>
                    <Input
                      endAdornment={<InputAdornment position="end">sqm</InputAdornment>}
                      placeholder='85000'
                    />
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 3
                  }}
                >
                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 3
                  }}
                >
                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 3
                  }}
                >
                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Listing Type"
                    defaultValue="APARTMENT"
                  >
                    {listingType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 3,
                    marginBottom: 3
                  }}
                >
                  <Button variant='outlined' size='medium' onClick={handleClose}
                    sx={{
                      fontFamily: 'Source Sans Pro',
                      color: '#154360',
                      borderColor: '#154360',
                      borderBlockColor: '#154360',
                      borderWidth: 3,
                      "&:hover": { 
                        borderColor: '#154360',
                        borderBlockColor: '#154360',
                        borderWidth: 3,
                       }
                    }}
                  >Cancel</Button>
                  <Button variant='contained' size='medium' onClick={handleClose}
                    sx={{
                      fontFamily: 'Source Sans Pro',
                      backgroundColor: '#154360',
                      "&:hover": { backgroundColor: "#154360" }
                    }}
                  >Confirm</Button>
                </Box>
              </Box>
            </div>
          </Box>
        </Modal>
      </div>
    );
}

export default UpdateAccomodation