import React from 'react'
import { useParams } from 'react-router-dom'
import { deleteAccommodation, retrieveAccommodationById } from '../../store/accommodation/actions'
import { Box, Button, TextField, Dialog } from '@mui/material'

interface AccomDetails extends IAcommodation {
    open: boolean;
    handleClose: () => void;
}

const DeleteAccomodation = (props: AccomDetails) => {
    return <>
        <Dialog 
        open={props.open}
        handleClose={props.handleClose}
        >
        </Dialog>
    </>
}

export default DeleteAccomodation 
