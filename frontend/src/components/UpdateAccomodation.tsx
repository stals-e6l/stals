import React from 'react'
import { Button, TextField, Box, Modal, Input, InputLabel, FormControl, InputAdornment, MenuItem, Dialog, DialogContent } from '@mui/material';
import image from '../assets/Ellens.jpg'
import '../update.css'

interface AccomDetails{
    open: boolean
    handleClose: () => void
    name: string
    address: string
    type: string
    price: number
    size_sqm: number
    meters_from_uplb: number
    min_pax: number
    max_pax: number
    num_rooms: number
    num_beds: string
}

const listingType = [
    {
        value: 'apartment',
        label: 'Apartment',
    },
    {
        value: 'dorm',
        label: 'Dorm',
    },
    {
        value: 'motel',
        label: 'Motel',
    },
    {
        value: 'hotel',
        label: 'Hotel',
    },
];
  
const style = {
    position: 'absolute' as 'absolute',
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

const formControl = {
    maxWidth: '31%'
}

const UpdateAccomodation = (props: AccomDetails) => {

    var listingPrice = String(props.price)
    var listingDistance = String(props.meters_from_uplb)
    var listingSize = String(props.size_sqm)

    return(
        <Dialog 
            open={props.open} 
            onClose={props.handleClose} 
            fullWidth
            maxWidth='lg'
            PaperProps={{
                style:{
                    height: '80%',
                    display: 'flex',
                    borderRadius: 15
                }
            }}
            sx={{style}}
        >
            <div className='main'>
                <Box
                    component="img"
                    alt="Ellens"
                    src={image}
                    className='image'
                />
                <Box sx={{
                    overflowY: 'scroll',
                    paddingRight: 1,
                    width: '100%',
                    height: '100%'
                }}>
                    <h2 className='title'>Edit Listing Details</h2>

                    <FormControl fullWidth variant='standard'>
                        <InputLabel shrink sx={inputLabel}>Description</InputLabel>
                        <Input placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac arcu sit amet nisi convallis maximus. Praesent vel dolor hendrerit, semper lectus vitae, feugiat justo. Fusce nec ante at neque lacinia bibendum eget a lectus. Quisque non elit pulvinar, ornare mauris sit amet, ultricies tortor. Sed tempus sed risus ut accumsan. Maecenas a urna quis est tempor sodales vel ut nisi. Donec euismod at tellus et sagittis. Etiam rhoncus sed purus ut convallis. Suspendisse eu nisi a nunc molestie consectetur nec vitae mi.' sx={input} multiline rows={4}></Input>
                    </FormControl>

                    <FormControl fullWidth variant='standard'>
                        <InputLabel shrink sx={inputLabel}>Listing Name</InputLabel>
                        <Input placeholder={props.name} sx={input}></Input>
                    </FormControl>

                    <FormControl fullWidth variant='standard'>
                        <InputLabel shrink sx={inputLabel}>Listing Address</InputLabel>
                        <Input placeholder={props.address} sx={input}></Input>
                    </FormControl>

                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                        }}
                    >
                        <FormControl variant="standard" sx={formControl}>
                            <InputLabel shrink sx={inputLabel}>Price</InputLabel>
                            <Input
                            startAdornment={<InputAdornment position="start">₱</InputAdornment>}
                            placeholder={listingPrice}
                            />
                        </FormControl>

                        <FormControl variant="standard" style={formControl}>
                            <InputLabel shrink sx={inputLabel}>Distance from UPLB</InputLabel>
                            <Input
                            endAdornment={<InputAdornment position="end">m</InputAdornment>}
                            placeholder={listingDistance}
                            />
                        </FormControl>

                        <FormControl variant="standard" style={formControl}>
                            <InputLabel shrink sx={inputLabel}>Listing Size</InputLabel>
                            <Input
                            endAdornment={<InputAdornment position="end">sqm</InputAdornment>}
                            placeholder={listingSize}
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
                            defaultValue={props.type}
                            fullWidth
                            sx={formControl}
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
                            defaultValue="hotel"
                            fullWidth
                            sx={formControl}
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
                            defaultValue={props.type}
                            fullWidth
                            sx={formControl}
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
                        <Button variant='outlined' size='medium' onClick={props.handleClose}
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
                        <Button variant='contained' size='medium' onClick={props.handleClose}
                            sx={{
                            fontFamily: 'Source Sans Pro',
                            backgroundColor: '#154360',
                            "&:hover": { backgroundColor: "#154360" }
                            }}
                        >Confirm</Button>
                    </Box>
                </Box>
            </div>
        </Dialog>
    )
}

export default UpdateAccomodation