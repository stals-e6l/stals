import React from 'react'
import {
  Box,
  useTheme,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'

import { COLOR } from '../../theme/index'
import EditProfile from './EditProfile'
import EditIcon from '@mui/icons-material/Edit'
import { getMe } from './AuthProvider'

interface IProps {
  children?: React.ReactNode
}

const EditProfileModal: React.FC<IProps> = () => {
  const user = getMe()

  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (!user) {
    return <div>no user</div>
  }

  return (
    <React.Fragment>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: COLOR.white,
          //   fontWeight: 'bold',
          mt: theme.spacing(3),
          textTransform: 'none',
          width: 'fit-content',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EditIcon
            sx={{ fontSize: theme.spacing(2), mb: theme.spacing(0.3) }}
          />
          Edit Profile
        </Box>
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          <DialogTitle sx={{ color: COLOR.blue }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
              }}
            >
              Edit profile
            </Typography>
          </DialogTitle>
          <DialogContent sx={{}}>
            <EditProfile user={user} />
          </DialogContent>
          <DialogActions sx={{}}>
            {' '}
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 'fit-content',
                mr: theme.spacing(1),
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 'fit-content',
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box>
        {/* <EditProfile user={user} /> */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: theme.spacing(1),
          }}
        ></Box>
      </Box>
    </React.Fragment>
  )
}

export default EditProfileModal
