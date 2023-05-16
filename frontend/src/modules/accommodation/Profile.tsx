import React from 'react'
import Header from '../../components/header'
import { Box, Typography, IconButton, useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getUser } from '../../store/auth/action'

interface IProps {
  children?: React.ReactNode
}

const Profile: React.FC<IProps> = () => {
//   const user = getUser()

//   if (!user) {
//     return <div>no user</div>
//   }
const theme = useTheme()

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            backgroundColor: '#89CFF0',
            width: '30%',
            height: '100vh',
            padding: theme.spacing(5),
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <ArrowBackIcon sx={{ fontSize: '5vh' }} />
            </IconButton>
            <AccountCircleIcon sx={{ fontSize: '10vh' }} />
          </Box>
          <Typography variant="h3">Greetings,</Typography>
          <Typography variant="h3">Pogi</Typography>
          <Typography variant="h5">test</Typography>
          <Typography variant="h5">test </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Profile
