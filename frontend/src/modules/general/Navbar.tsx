import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material'
import React from 'react'
import assets from '../../assets'
import useMenu from '../../hooks/useMenu'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import { getMe, signOut } from '../auth/AuthProvider'

interface IProps {
  children?: React.ReactNode
}

const Navbar: React.FC<IProps> = () => {
  // hook
  const theme = useTheme()
  const { onClose, onOpen, anchorEl } = useMenu()
  const navigate = useNavigate()
  const me = getMe()
  const onSignOut = signOut()

  // events
  const toSignOut = () => {
    if (onSignOut) {
      onClose()
      onSignOut().then(() => navigate(ROUTES.appAuth))
    }
  }
  const toProfile = () => {
    navigate(ROUTES.profile)
    onClose()
  }

  return (
    <Grid
      container
      sx={{
        height: theme.spacing(60 / 8),
        width: '100%',
        background: theme.palette.primary.main,
        padding: `0 ${theme.spacing(2)}`,
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={6}>
        <Box
          sx={{
            height: theme.spacing(60 / 8),
          }}
          component="img"
          src={assets.logoWhite}
          alt={assets.logoWhite}
        />
      </Grid>
      {me && (
        <Grid item xs={6} container justifyContent="end">
          <IconButton onClick={onOpen}>
            <Avatar alt={me._id}>{me.full_name.first_name[0]}</Avatar>
          </IconButton>
        </Grid>
      )}
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
        <MenuItem onClick={toProfile}>My profile</MenuItem>
        <MenuItem onClick={toSignOut}>Log out</MenuItem>
      </Menu>
    </Grid>
  )
}

export default Navbar
