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
import EditProfile from '../auth/EditProfile'

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
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          backgroundColor: COLOR.blue,
          width: '30%',
          padding: theme.spacing(5),
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
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
        <Typography variant="h3" sx={{ color: COLOR.white }}>
          Greetings,
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: COLOR.white, fontWeight: 'normal' }}
        >
          {user.username}
        </Typography>

        {user.full_name.middle_name === undefined ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'light',
              color: COLOR.white,
              mt: theme.spacing(3),
            }}
          >
            {user.full_name.first_name}
            {user.full_name.last_name}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'light',
              color: COLOR.white,
              mt: theme.spacing(3),
            }}
          >
            {user.full_name.first_name} {user.full_name.middle_name[0]}
            {'. '}
            {user.full_name.last_name}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{
            fontWeight: 'light',
            color: COLOR.white,
            mt: theme.spacing(-1),
          }}
        >
          {formattedRole}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'light',
            fontStyle: 'italic',
            color: COLOR.white,
          }}
        >
          {user.biography}
        </Typography>
        <Divider sx={{ background: COLOR.white }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Basic Info
        </Typography>
        <Box
          sx={{
            display: 'flex',
            color: COLOR.white,
            alignItems: 'center',
            pb: theme.spacing(1),
          }}
        >
          <PersonOutlineOutlinedIcon />
          <Typography variant="body2" sx={{ fontWeight: 'light' }}>
            {formattedGender}
          </Typography>
        </Box>
        {user.birthday === '' ? (
          <></>
        ) : (
          <Box
            sx={{
              display: 'flex',
              color: COLOR.white,
              alignItems: 'center',
              pb: theme.spacing(1),
            }}
          >
            <CakeOutlinedIcon />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'light', color: COLOR.white }}
            >
              {user.birthday}
            </Typography>
          </Box>
        )}

        <Divider sx={{ background: COLOR.white }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Contact Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            color: COLOR.white,
            alignItems: 'center',
            pb: theme.spacing(1),
          }}
        >
          <MailOutlineOutlinedIcon />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'light', color: COLOR.white }}
          >
            {user.email}
          </Typography>
        </Box>

        {user.phone.mobile === '' ? (
          <></>
        ) : (
          <Box
            sx={{
              display: 'flex',
              color: COLOR.white,
              alignItems: 'center',
              pb: theme.spacing(1),
            }}
          >
            <PhoneAndroidOutlinedIcon />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'light', color: COLOR.white }}
            >
              {user.phone.mobile}
            </Typography>
          </Box>
        )}

        {user.phone.landline === '' ? (
          <></>
        ) : (
          <Box
            sx={{
              display: 'flex',
              color: COLOR.white,
              alignItems: 'center',
              pb: theme.spacing(1),
            }}
          >
            <LocalPhoneOutlinedIcon />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'light', color: COLOR.white }}
            >
              {user.phone.landline}
            </Typography>
          </Box>
        )}

        {user.address.home === '' ? (
          <></>
        ) : (
          <Box
            sx={{
              display: 'flex',
              color: COLOR.white,
              alignItems: 'center',
              pb: theme.spacing(1),
            }}
          >
            <HomeOutlinedIcon />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'light', color: COLOR.white }}
            >
              {user.address.home}
            </Typography>
          </Box>
        )}

        {user.address.current === '' ? (
          <></>
        ) : (
          <Box
            sx={{
              display: 'flex',
              color: COLOR.white,
              alignItems: 'center',
              pb: theme.spacing(1),
            }}
          >
            <PlaceOutlinedIcon />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'light', color: COLOR.white }}
            >
              {user.address.current}
            </Typography>
          </Box>
        )}

        <Divider sx={{ background: COLOR.white }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Organization
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.organization}
        </Typography>
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: COLOR.white,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mt: theme.spacing(3),
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
        </Dialog>
      </Box>
    </Box>
  )
}

export default EditProfileModal
