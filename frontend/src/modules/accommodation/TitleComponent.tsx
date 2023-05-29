import { Grid, Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { COLOR } from '../../theme/index'

interface InputText {
  // eslint-disable-next-line @typescript-eslint/ban-types
  text: String
}

const Title: React.FC<InputText> = ({ text }) => {
  // hooks
  const theme = useTheme()

  return (
    <React.Fragment>
      {/* container */}
      <Grid container>
        {/* Vertical bar */}
        <Grid item>
          <Box
            sx={{
              backgroundColor: COLOR.green,
              height: theme.spacing(4),
              width: theme.spacing(0.5),
              [theme.breakpoints.down('md')]: {
                height: theme.spacing(3.5),
              },
              [theme.breakpoints.down('sm')]: {
                height: theme.spacing(3),
              },
            }}
          ></Box>
        </Grid>

        {/* Input text */}
        <Grid item>
          <Typography variant="h5" marginLeft={theme.spacing(1)} sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: theme.spacing(2.5),
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.spacing(2.25),
            },
          }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Title
