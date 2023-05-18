import { Grid, Typography, TextField, Button } from '@mui/material'
import React from 'react'

interface IProps {
    children?: React.ReactNode
}

const AddReviewForm: React.FC<IProps> = () => {
    return (
    <>
        
    <Grid container sx={{
        flexDirection: 'column',
        flexGrow: 1,

    }}>
        <Grid item xs>
            <TextField placeholder="Type your review..." multiline>
            </TextField>
        </Grid>
        <Grid item xs>
            <Button variant="contained">
                Add Review
            </Button>
        </Grid>
    </Grid>

    </>
           )
}

export default AddReviewForm
