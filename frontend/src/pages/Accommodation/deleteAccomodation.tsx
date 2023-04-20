import React from 'react'
import { useParams } from 'react-router-dom'
import { deleteAccommodation, retrieveAccommodationById } from '../../store/accommodation/actions'
import { Box, Button, TextField, Dialog, Typography, DialogTitle, DialogContent, DialogContentText, Grid, DialogActions } from '@mui/material'

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
            <Grid sx={{ flexGrow: 1 }} container spacing={0}>
                <Grid item xs sx={{
                    backgroundColor: '#696969'
                }}>
                    <Box sx={{
                    }} />
                </Grid>
                <Grid item xs sx={{
                    padding: 5
                }}>
                
                        <Typography variant="body1">Are you sure that you want to delete accommodation?</Typography>
                        <TextField required placeholder="Confirm" ></TextField>
                        <Typography variant="body1">Type Confirm to delete the listing.</Typography>

                        <Button onClick={ () => { setState(false) } }>Cancel</Button>
                        <Button onClick={ () => { setState(false) } }>Delete</Button>

                </Grid>
            </Grid>
        </Dialog>
    </>
           )

}

export default DeleteAccom
