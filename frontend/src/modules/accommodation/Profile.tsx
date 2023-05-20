import React from 'react'
import Header from '../../components/header'
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
  Avatar,
  Dialog,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { COLOR } from '../../theme'
import EditProfile from '../auth/EditProfileModal'

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

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <Typography variant="h3" sx={{ color: COLOR.white}}>
            Greetings,
          </Typography>
          <Typography variant="h4" sx={{ color: COLOR.white , fontWeight:'light'}}>
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
          <Button onClick={handleOpen}>Edit Profile</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              width: '30%',
              margin: '0 auto',
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            }}
          >
            <EditProfile />
          </Dialog>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Profile
