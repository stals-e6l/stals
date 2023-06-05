import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  alpha,
  useTheme,
} from '@mui/material'
import React from 'react'
import assets from '../../assets'
import useMenu from '../../hooks/useMenu'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'
import { getMe, signOut } from '../auth/AuthProvider'
import { COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const Navbar: React.FC<IProps> = () => {
  // hook
  const menus = [
    'Hotel',
    'Apartment',
    'Dormitory',
    'Transient Space',
    'Bed Space',
  ]
  const theme = useTheme()
  const { onClose, onOpen, anchorEl } = useMenu()
  const navigate = useNavigate()
  const me = getMe()
  const onSignOut = signOut()
  const location = useLocation()

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

  const toExplore = () => {
    navigate(ROUTES.appExplore)
  }

  return (
    <AppBar
      sx={{
        boxShadow: `${alpha(COLOR.black, 0.3)} 0 1px 30px 3px`,
      }}
    >
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
        position="sticky"
      >
        <Grid item xs={0.25}>
          <Box
            onClick={toExplore}
            sx={{
              height: theme.spacing(60 / 8),
              cursor: 'pointer',
              transition: '0.3s all',
              '&:hover': {
                height: theme.spacing(62 / 8),
              },
            }}
            component="img"
            src={assets.logoWhite}
            alt={assets.logoWhite}
          />
        </Grid>
        {location.pathname === ROUTES.appResult && (
          <Grid item xs={6}>
            <Tabs>
              {menus.map(tab => (
                <MenuItem key={tab} onClick={() => navigate('/')}>
                  {tab}
                </MenuItem>
              ))}
            </Tabs>
          </Grid>
        )}
        {me && (
          <Grid item xs={4} container justifyContent="end">
            <IconButton onClick={onOpen}>
              <Avatar alt={me._id}>
                {me.full_name.first_name[0] + me.full_name.last_name[0]}
              </Avatar>
            </IconButton>
          </Grid>
        )}
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
          <MenuItem onClick={toProfile}>My profile</MenuItem>
          <MenuItem
            onClick={() => {
              window.open('https://www.airvnv.info/faq.html', '_blank')
            }}
          >
            Need help?
          </MenuItem>
          <MenuItem onClick={toSignOut}>Log out</MenuItem>
        </Menu>
      </Grid>
    </AppBar>
  )
}

export default Navbar
