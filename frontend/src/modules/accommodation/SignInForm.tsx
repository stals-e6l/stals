import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Dialog,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Images/Logo_Green.png'

import SignUpForm from './SignUpForm'
import { COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const SignInForm: React.FC<IProps> = () => {
  // hooks
  // const signInHandler = signIn()
  // const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    username: '',
    password: '',
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSignIn = () => {
    // TODO: PM's job, refine the styling for now
    // signInHandler(form).then(() => {
    //   navigate('/accommodations')
    // })
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
              width: '50%',
            }}
            alt="green logo"
            src={logo}
          />
          <Box
            sx={{
              display: 'block',
              marginLeft: theme.spacing(6),
              width: '40%',
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
              backgroundColor: COLOR.gray2,
              width: '45%',
              marginRight: theme.spacing(6),
              padding: theme.spacing(3),
              borderRadius: theme.spacing(1),
              boxShadow: '0px 3px 5px #888888',
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: '100%',
                margin: 'auto auto',
                borderRadius: theme.spacing(0),
              },
            }}
          >
            <Typography>Username</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
              onChange={e =>
                setForm(prev => ({ ...prev, username: e.target.value }))
              }
              value={form.username}
            />
            <Typography>Password</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              type="password"
              sx={{ backgroundColor: COLOR.white }}
              value={form.password}
              onChange={e =>
                setForm(prev => ({ ...prev, password: e.target.value }))
              }
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                marginTop: theme.spacing(3),
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
                <SignUpForm onClose={handleClose} />
              </Dialog>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default SignInForm
