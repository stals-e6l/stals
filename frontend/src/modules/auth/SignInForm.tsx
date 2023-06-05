import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  alpha,
} from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Images/Logo_Green.png'

import SignUpForm from './SignUpForm'
import { COLOR } from '../../theme'
import { signIn } from './AuthProvider'
import useDialog from '../../hooks/useDialog'
import { ROUTES } from '../../app/AppRouter'
import { showErrorSnackbar } from '../general/ErrorHandler'

interface IProps {
  children?: React.ReactNode
}

const SignInForm: React.FC<IProps> = () => {
  // hooks
  const theme = useTheme()
  const onSignIn = signIn()
  const { open, toggleDialog } = useDialog()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const onShowError = showErrorSnackbar()

  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    username: '',
    password: '',
  })
  const [errorMessage, setError] = React.useState<any | null>(null)

  // events
  const handleOpen = () => toggleDialog()
  const handleClose = () => toggleDialog()
  const handleSignIn = () => {
    if (onSignIn && onShowError) {
      onSignIn(form)
        .then(() => {
          navigate(ROUTES.appExplore)
        })
        .catch(err => {
          console.log(err)
          const newError = String(err).replace('Error: Error: ', '')
          setError({ error: newError })
        })
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            height: '90vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
          }}
        >
          <Box
            component="img"
            sx={{
              display: 'block',
              marginLeft: theme.spacing(6),
              width: '300px',
            }}
            alt="green logo"
            src={logo}
          />
          <Box
            sx={{
              display: 'block',
              marginLeft: theme.spacing(6),
              width: '250px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', marginTop: theme.spacing(-5) }}
            >
              Find your perfect place according to your preference
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: '90vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: COLOR.gray1,
              width: '300px',
              marginRight: theme.spacing(6),
              padding: theme.spacing(3),
              borderRadius: '8px',
              boxShadow: `${alpha(COLOR.black, 0.5)} 0 2px 5px 2px`,
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: '100%',
                margin: 'auto auto',
                borderRadius: theme.spacing(0),
              },
            }}
          >
            <TextField
              size="small"
              fullWidth
              label="Username"
              onChange={e =>
                setForm(prev => ({ ...prev, username: e.target.value }))
              }
              value={form.username}
              variant="filled"
              style={{ marginTop: 20 }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSignIn()
                }
              }}
            />
            <TextField
              size="small"
              fullWidth
              label="Password"
              type="password"
              value={form.password}
              onChange={e =>
                setForm(prev => ({ ...prev, password: e.target.value }))
              }
              variant="filled"
              style={{ marginTop: 20 }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSignIn()
                }
              }}
            />

            {errorMessage && errorMessage.error && (
              <Typography fontWeight='medium' align='justify' color='error'
                sx={{
                  paddingTop: theme.spacing(1),
                }}
              >
                {errorMessage.error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
              }}
              onClick={handleSignIn}
            >
              Log in
            </Button>
            <Typography align="center">
              <Link to="#">Forgot Password?</Link>
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: theme.spacing(0.25),
                backgroundColor: theme.palette.secondary.main,
                marginTop: theme.spacing(3),
              }}
            ></Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                marginTop: theme.spacing(2),
              }}
              onClick={handleOpen}
            >
              Create new account
            </Button>
            {open && (
              <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={isMobile}
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
                      paddingBottom: theme.spacing(1),
                    }}
                  >
                    Create an Account
                  </Typography>
                </DialogTitle>
                <DialogContent sx={{}}>
                  <SignUpForm onClose={handleClose} />
                </DialogContent>
                <DialogActions sx={{}}></DialogActions>
              </Dialog>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default SignInForm
