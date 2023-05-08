import { Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
// import SignUp from '../../pages/Auth/SignUp'
// import { signIn } from '../../store/auth/action'

interface IProps {
  children?: React.ReactNode
}

const SignInForm: React.FC<IProps> = () => {
  // hooks
  // const signInHandler = signIn()
  // const navigate = useNavigate()
  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    username: '',
    password: '',
  })
  // const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  const handleSignIn = () => {
    // TODO: PM's job, refine the styling for now
    // signInHandler(form).then(() => {
    //   navigate('/accommodations')
    // })
  }
  const boxStyle = {
    height: '90vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Box sx={boxStyle}>
          <Box
            component="img"
            sx={{
              display: 'block',
              marginLeft: '50px',
              width: '50%',
            }}
            alt="green logo"
            // src={logo}
          />
          <Box
            sx={{
              display: 'block',
              marginLeft: '50px',
              width: '40%',
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', marginTop: '-30px' }}
            >
              Find your perfect place according to your preference
            </Typography>
          </Box>
        </Box>
        <Box sx={boxStyle}>
          <Box
            sx={{
              backgroundColor: '#f0f0f0',
              width: '45%',
              marginRight: '50px',
              padding: '30px',
              borderRadius: '5px',
              boxShadow: '0px 3px 5px #888888',
            }}
          >
            <Typography>Username</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: '#ffffff' }}
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
              sx={{ backgroundColor: '#ffffff' }}
              value={form.password}
              onChange={e =>
                setForm(prev => ({ ...prev, password: e.target.value }))
              }
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#154360',
                marginTop: '20px',
                marginBottom: '10px',
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
                height: '2px',
                backgroundColor: '#60ce80',
                marginTop: '20px',
              }}
            ></Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#154360', marginTop: '20px' }}
              // onClick={handleOpen}
            >
              Create new account
            </Button>
            {/* <Dialog
              open={open}
              onClose={handleClose}
              sx={{ width: '30%', margin: '0 auto' }}
            >
              <SignUp onClose={handleClose} />
            </Dialog> */}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default SignInForm
