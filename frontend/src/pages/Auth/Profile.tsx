import React from 'react'
import Header from '../../components/header'
import { Box, Typography, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface IProps {
  children?: React.ReactNode
}

const Profile: React.FC<IProps> = () => {
  const sampleUser: IUser = {
    userName: 'vonzz',
    email: 'vfdivino@up.edu.ph',
    passwordHash: 'asdfsadfasdfasdfsadfasdfasdf', // this should not be displayed
    role: 'admin',
  }
  const role = sampleUser.role
  const role2 = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            backgroundColor: '#89CFF0',
            width: '30%',
            height: '100vh',
            padding: '40px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <ArrowBackIcon sx={{ fontSize: '5vh' }}/>
            </IconButton>
            <AccountCircleIcon sx={{ fontSize: '10vh' }} />
          </Box>
          <Typography variant="h3">Greetings,</Typography>
          <Typography variant="h3">{sampleUser.userName}</Typography>
          <Typography variant="h5">{sampleUser.email}</Typography>
          <Typography variant="h5">{role2}</Typography>
        </Box>

      </Box>
    </React.Fragment>
  )
}

export default Profile
