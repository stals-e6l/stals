import React from 'react'
import Header from '../../components/header'
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Input,
  Button,
  Avatar,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getUser } from '../../store/auth/action'
import { COLOR } from '../../theme'
import location from '../../assets/Images/Ellens.jpg'

interface IProps {
  children?: React.ReactNode
}

const Profile: React.FC<IProps> = () => {
  //   const user = getUser()

  //   if (!user) {
  //     return <div>no user</div>
  //   }
  const theme = useTheme()
  const [image, setImage] = React.useState<any>(null)

  const user = {
    username: 'Username',
    email: 'test@up.edu.ph',
    role: 'Admin',
    bio: 'Test bio',
  }

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: '30%',
            height: '100vh',
            padding: theme.spacing(5),
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <ArrowBackIcon sx={{ fontSize: '5vh', color: COLOR.white }} />
            </IconButton>
            <Avatar
              sx={{
                width: theme.spacing(6),
                height: theme.spacing(6),
              }}    
              alt="profile"
              src={image}
            />
          </Box>
          <Typography variant="h4" sx={{ color: COLOR.white }}>
            Greetings,
          </Typography>
          <Typography variant="h5" sx={{ color: COLOR.white }}>
            {user.username}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'light', color: COLOR.white }}
          >
            {user.email}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'light', color: COLOR.white }}
          >
            {user.role}{' '}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'light', color: COLOR.white }}
          >
            {user.bio}{' '}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Profile
