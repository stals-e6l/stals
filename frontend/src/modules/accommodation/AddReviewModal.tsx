import { Dialog, DialogContent, DialogActions, DialogTitle, Grid, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import AddReviewForm from './AddReviewForm'
import useDialog from '../../hooks/useDialog'
import { addCommentToForum } from '../../store/forum/actions'

interface IProps {
    children?: React.ReactNode
}

const AddReviewModal: React.FC<IProps> = () => {
    const { open, toggleDialog } = useDialog()
    const [inputField, setField] = useState<string>('')

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <React.Fragment>
            <Button variant="contained" onClick={toggleDialog}>Add Review</Button>

            <Dialog open={open} onClose={toggleDialog} fullScreen={fullScreen} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle>
                    <Grid container sx={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid item>
                            <Typography sx={{ fontSize: '1em' }}>
                                <b>Add Review</b>
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
                    <AddReviewForm input={inputField} setField={setField}/>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={toggleDialog}
                        sx={{
                            width: '100%',
                            minWidth: '60%',
                            maxWidth: '100%',
                           ':hover': {
                                backgroundColor: theme.palette.secondary.main,
                           }
                        }}
                        disabled={!inputField}
                    >
                        Add Review
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
           )
}

export default AddReviewModal
