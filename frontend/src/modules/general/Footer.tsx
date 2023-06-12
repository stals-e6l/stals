import {
    AppBar,
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Tabs,
    Typography,
    alpha,
    useTheme,
  } from '@mui/material'
  import React from 'react'
  import assets from '../../assets'
  import useMenu from '../../hooks/useMenu'
  import { useNavigate } from 'react-router-dom'
  import { ROUTES } from '../../app/AppRouter'
  import { getMe, signOut } from '../auth/AuthProvider'
  import {COLOR} from '../../theme'
  
  interface IProps {
    children?: React.ReactNode
  }
  
  const Navbar: React.FC<IProps> = () => {
    // hook
    const theme = useTheme()
    const navigate = useNavigate()
  
    const toExplore = () => {
      navigate(ROUTES.appExplore)
    }
  
    return (
        <Grid
          container
          sx={{
            height: theme.spacing(60 / 7),
            width: '100%',
            background: COLOR.gray1,
            padding: `0 ${theme.spacing(2)}`,
          }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={8}>
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
              src={assets.logoGreen}
              alt={assets.logoGreen}
            />
          </Grid>
          <Grid item>
            <Button variant='text'>
              <Typography variant='h6' sx={{color: COLOR.blue}}>
                Terms and Conditions
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant='text'>
              <Typography variant='h6' sx={{color: COLOR.blue}}>
                Privacy Policy
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant='text'>
              <Typography variant='h6' sx={{color: COLOR.blue}}>
                Contact Number
              </Typography>
            </Button>
          </Grid>
        </Grid>
    )
  }
  
  export default Navbar
  