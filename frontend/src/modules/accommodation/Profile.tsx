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
  Dialog,
  TextField,
  Link,
  Card,
  CardActionArea,
  CardContent,
  FormLabel,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import { getUser } from '../../store/auth/action'
import { COLOR } from '../../theme'
import location from '../../assets/Images/Ellens.jpg'
import { Edit } from '@mui/icons-material'

interface IProps {
  children?: React.ReactNode
}

const EditProfile: React.FC<IProps> = () => {
  const theme = useTheme()
  const handleUploadImage = () => {
    // execute code to open file input
    const fileInput = document.querySelector(
      'input[type=file]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Box
        sx={{
          backgroundColor: COLOR.gray2,
          width: '100%',
          height: '100%',
          padding: theme.spacing(2),
          borderRadius: theme.spacing(1),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            paddingBottom: theme.spacing(1),
          }}
        >
          Edit Profile
        </Typography>

        
        <FormLabel>Upload Avatar</FormLabel>
        <Card
          sx={{
            minWidth: '100%',
            minHeight: '50%',
            border: 'solid 1px green',
            backgroundColor: COLOR.white,
          }}
          onClick={handleUploadImage}
        >
          <CardActionArea>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                paddingBottom: '20%',
                paddingTop: '20%',
              }}
            >
              <PhotoCamera />
            </CardContent>
          </CardActionArea>
          <input hidden accept="image/*" type="file" />
        </Card>
        
        <FormLabel>Biography</FormLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          //   value={form.email}
          //   onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
          }}
          //   disabled={
          //     form.password.length === 0 || form.password !== form.confirm
          //   }
          //   onClick={handleSignUp}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
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
