import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
  Avatar,
  Dialog,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// import { getUser } from '../../store/auth/action'
import { COLOR } from '../../theme/index'
import useMediaQuery from '@mui/material/useMediaQuery'
import EditProfile from './EditProfile'

interface IProps {
  children?: React.ReactNode
}

const EditProfileModal: React.FC<IProps> = () => {
  //   const user = getUser()

  //   if (!user) {
  //     return <div>no user</div>
  //   }
  const theme = useTheme()
  const [image, setImage] = React.useState<any>(null)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const user: IUser = {
    username: 'Pogi',
    email: 'test@up.edu.ph',
    role: 'admin',
    full_name: {
      first_name: 'Rodge Miguel',
      middle_name: 'Magpantay',
      last_name: 'De Luna',
    },
    gender: 'male',
    address: {
      home: 'Cainta, Rizal',
      current: 'Carrot Place',
    },
    birthday: '07/26/2001',
    phone: {
      landline: '212 7388',
      mobile: '09163342585',
    },
    organization: 'COSS',
    biography: 'You miss 100% shots you dont take.',
    _id: '',
    password: '',
    avatar: {
      url: '',
    },
  }

  const formattedRole = user.role[0].toUpperCase() + user.role.slice(1)
  const formattedGender = user.gender[0].toUpperCase() + user.gender.slice(1)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: COLOR.white,
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mt: theme.spacing(3),
          width: 'fit-content',
          '&:hover': {
            backgroundColor: COLOR.white,
          },
        }}
      >
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        sx={{
          width: '40%',
          margin: '0 auto',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        }}
      >
        <EditProfile user={user} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
              width: 'fit-content',
              mr: theme.spacing(1),
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
              width: 'fit-content',
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}

export default EditProfileModal
