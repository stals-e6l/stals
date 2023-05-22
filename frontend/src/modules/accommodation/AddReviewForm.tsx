import { Grid, Typography, Rating, TextField, Button, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

interface IProps {
    children?: React.ReactNode
    input: string
    setField: React.Dispatch<React.SetStateAction<string>>
}

const AddReviewForm: React.FC<IProps> = ({ input, setField }) => {

    const theme = useTheme()

    return (
    <>
        
    <Grid container>
        <Grid item sx={{ pr: 1, }}>
            <Typography>
                Rating: 
            </Typography>
        </Grid>
        <Grid item>
        <Rating precision={0.5} sx={{
            '& .MuiRating-iconFilled': {
                color: theme.palette.secondary.main
            },
        }}/>
        </Grid>
    </Grid>
    <Grid container sx={{
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        gap: 1,
    }}>
        <Grid item xs sx={{ width: '100%' }}>
            <TextField 
                placeholder="Share your thoughts..." 
                multiline 
                rows={5} 
                value={input} 
                onChange={e => setField(e.target.value)}
                sx={{
                    width: '100%',
                    boxShadow: 1,
                }} 
                >
            </TextField>
        </Grid>
        <Grid item xs sx={{ width: '100%' }}>
        </Grid>
    </Grid>

    </>
           )
}

export default AddReviewForm
