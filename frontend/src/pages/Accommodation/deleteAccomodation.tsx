import React from 'react'
import { useParams } from 'react-router-dom'
import { deleteAccommodation, retrieveAccommodationById } from '../../store/accommodation/actions'
import { Box, Button, TextField, Dialog, Typography, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

const DeleteAccom = () => {
    const [open, setState] = React.useState(false)

    const handleClose = () => {
        setState(false)
    }

    const handleOpen = () => {
        setState(false)
    }

    return (
    <>
        <Button onClick={ () => { setState(true) } }>Open</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Accomodation</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete accomodation?</DialogContentText>
                <Box sx={{
                    width: 300,
                    height: 300,
                    backgroundColor: '#000'
                    }} />
            </DialogContent>
        </Dialog>
    </>
           )

}

export default DeleteAccom
