import React from 'react'
import { Input, InputLabel, FormControl } from '@mui/material';
import '../update.css'

interface Elements{
    fieldTitle: string
    placeholder: string
    numRows: number
}

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

const InputFieldSmall = (props:Elements) => {
    return(
        <FormControl fullWidth sx={formControl} variant='standard'>
            <InputLabel shrink sx={inputLabel}>{props.fieldTitle}</InputLabel>
            <Input 
                placeholder={props.placeholder} 
                sx={input} 
                multiline rows={props.numRows}
            ></Input>
        </FormControl>
    )
       
}

export default InputFieldSmall