import React from 'react'
import {
  Box,
  useTheme,
  Button,
  Dialog,
} from '@mui/material'

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
