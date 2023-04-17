import React, { useState } from 'react'
import { Button, Box, Input, InputLabel, FormControl, InputAdornment, Dialog } from '@mui/material';
import image from '../assets/Ellens.jpg'
import '../update.css'
import BoxImage from './Box_Image'
import InputField from './Input_Fields';
import InputFieldSelect from './Input_Field_Select';
import { updateAccommodation } from '../store/accommodation/actions';

interface AccomDetails extends IAccommodation{
    open: boolean
    handleClose: () => void
    // name: string
    // address: string
    // type: string
    // price: number
    // size_sqm: number
    // meters_from_uplb: number
    // min_pax: number
    // max_pax: number
    // num_rooms: number
    // num_beds: string
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

const formControl = {
    maxWidth: '31%'
}

const UpdateAccomodation = (props: AccomDetails) => {

    var listingPrice = String(props.price)
    var listingDistance = String(props.meters_from_uplb)
    var listingSize = String(props.size_sqm)
    const [accommodation, setAccommodation] = useState<IAccommodation>({
        name: '',
        description: "",
        address: "",
        type: "apartment",
        price: 0,
        size_sqm: 0,
        meters_from_uplb: 0,
        landmarks: [],
        min_pax: 0,
        max_pax: 0,
        num_rooms: 0,
        num_beds: "1",
        num_views: 0,
        furnishing: "semifurnished",
        cooking_rules: [],
        pet_rules: [],
        other_rules: [],
        safety_and_security: [],
        appliances: [],
        amenities: [],
        created_at: "",
        updated_at: "",
        is_soft_deleted: false
    })

    // const updateAccommodationHandler = updateAccommodation()

    console.log({accommodation})

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
                <BoxImage
                    alt='Ellens'
                    image={image}
                    className='image'
                />
                <Box sx={{
                    overflowY: 'scroll',
                    paddingRight: 1,
                    width: '100%',
                    height: '100%'
                }}>
                    <h2 className='title'>Edit Listing Details</h2>

                    <InputField
                    onChange={(val: string) => setAccommodation(prev => ({...prev, description: val}))}
                    value={accommodation.description as string}
                    fieldTitle='Description' placeholder='lorem ipsum' numRows={4}/>
                    {/* <InputField fieldTitle='Listing Name' placeholder={props.name} numRows={1}/>
                    <InputField fieldTitle='Listing Address' placeholder={props.address} numRows={1}/> */}

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
                            endAdornment={false}
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
                        <InputFieldSelect label='Listing Type' defaultValue={props.type}/>
                        <InputFieldSelect label='Listing Type' defaultValue={props.type}/>
                        <InputFieldSelect label='Listing Type' defaultValue={props.type}/>
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
                        <Button variant='contained' size='medium'
                         onClick={() => {

                        }}
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