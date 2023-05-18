import { Dialog, DialogContent, DialogTitle, Grid, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import React from 'react'
import AddReviewForm from './AddReviewForm'
import useDialog from '../../hooks/useDialog'

interface IProps {
    children?: React.ReactNode
}

const AddReviewModal: React.FC<IProps> = () => {
    const { open, toggleDialog } = useDialog()

    const theme = useTheme()

    return (
        <React.Fragment>
            <Button variant="contained" onClick={toggleDialog}>Add Review</Button>

            <Dialog open={open} onClose={toggleDialog} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>
                    <Grid container sx={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid item>
                            <Typography>
                                Add Review
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={toggleDialog}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <AddReviewForm />
                </DialogContent>
            </Dialog>
        </React.Fragment>
           )
}

export default AddReviewModal
