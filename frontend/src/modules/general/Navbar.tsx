import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import assets from '../../assets'
import { MenuRounded } from '@mui/icons-material'
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { onClose, onOpen, anchorEl } = useMenu()
  const { onClose: onClose2, onOpen: onOpen2, anchorEl: anchorlEl2 } = useMenu()
  const navigate = useNavigate()
  const me = getMe()
  const onSignOut = signOut()

  // events
  const toAuth = () => navigate(ROUTES.auth)

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
          <IconButton onClick={onOpen2}>
            <Avatar alt={me._id}>{me.full_name.first_name[0]}</Avatar>
          </IconButton>
          <Menu
            open={Boolean(anchorlEl2)}
            anchorEl={anchorlEl2}
            onClose={onClose2}
          >
            <MenuItem
              onClick={() => {
                navigate(ROUTES.profile)
              }}
            >
              My profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (onSignOut) onSignOut().then(toAuth)
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Grid>
      )}
      {!me && isMobile && (
        <Grid item xs={6} container justifyContent="end">
          <IconButton onClick={onOpen}>
            <MenuRounded
              sx={{
                color: theme.palette.common.white,
              }}
            />
          </IconButton>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
            <MenuItem onClick={toAuth}>Create account</MenuItem>
            <MenuItem onClick={toAuth}>Log in</MenuItem>
          </Menu>
        </Grid>
      )}
      {!me && !isMobile && (
        <Grid item container xs={6} justifyContent="end" gap={2}>
          <Button
            onClick={toAuth}
            sx={{
              color: theme.palette.common.white,
            }}
          >
            Create account
          </Button>
          <Button
            onClick={toAuth}
            variant="contained"
            sx={{
              background: theme.palette.common.white,
              color: theme.palette.primary.main,
            }}
          >
            Log in
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Navbar
