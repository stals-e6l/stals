import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Avatar,
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
import { COLOR } from '../theme/index'
import { getMe } from '../modules/auth/AuthProvider'
import EditProfileModal from '../modules/auth/EditProfileModal'

interface IProps {
  children?: React.ReactNode
}

const ProfilePage: React.FC<IProps> = () => {
  const user = getMe()
  const theme = useTheme()
  const [image, setImage] = React.useState<any>(null)

  if (!user) return <></>

  const formattedRole = user.role[0].toUpperCase() + user.role.slice(1)
  const formattedGender = user.gender[0].toUpperCase() + user.gender.slice(1)

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

        {user.full_name.middle_name === undefined || user.full_name.middle_name === ''? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'light',
              color: COLOR.white,
              mt: theme.spacing(3),
            }}
          >
            {user.full_name.first_name} {user.full_name.last_name}
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

        {user.phone && user.phone.mobile && (
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

        {user.phone && user.phone.landline && (
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

        {user.address && user.address.home && (
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

        {user.address && user.address.current && (
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
        <EditProfileModal />
      </Box>
    </Box>
  )
}

export default ProfilePage
