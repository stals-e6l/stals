import React from 'react'
import { TextField, MenuItem } from '@mui/material';
import '../update.css'

interface Elements{
    label: String
    defaultValue: String
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

const textDesign = {
    maxWidth: '31%'
}

const InputFieldSelect = (props:Elements) => {
    return(
        <TextField
            select
            label={props.label}
            defaultValue={props.defaultValue}
            fullWidth
            sx={textDesign}
        >
            {listingType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField>
    )
       
}

export default InputFieldSelect