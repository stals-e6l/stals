import React from 'react'
import Header from '../../components/header'
import { Box, Typography, TextField, Button, Link, Dialog } from '@mui/material'
import logo from '../../assets/Images/Logo_Green.png'
import SignUp from './SignUp'

interface IProps {
  children?: React.ReactNode
}

const SignIn: React.FC<IProps> = () => {
  // states
  const [form, setForm] = React.useState<IUserSignIn>({
    userName: '',
    passwordHash: '',
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSignIn = () => {
    // TODO: handle sign in (PM's job)
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
      <Header />
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
            src={logo}
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
              width: '60%',
              marginRight: '50px',
              padding: '30px',
              borderRadius: '5px',
              boxShadow: '0px 3px 5px #888888',
            }}
          >
            <Typography>Email</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: '#ffffff' }}
            />
            <Typography>Password</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: '#ffffff' }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#154360',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              Log in
            </Button>
            <Typography align="center">
              <Link
                href="#"
                underline="none"
                sx={{ textAlign: 'center', color: '#000000' }}
              >
                Forgot Password?
              </Link>
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
              onClick={handleOpen}
            >
              Create new account
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{width:'30%', margin:'0 auto'}}>
              <SignUp />
            </Dialog>
          </Box>
        </Box>
      </Box>

      {/* <div>
        <label>Username</label>
        <input
          value={form.userName}
          type="text"
          placeholder="username"
          onChange={e =>
            setForm(prev => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={form.passwordHash}
          type="password"
          placeholder="password"
          onChange={e =>
            setForm(prev => ({ ...prev, passwordHash: e.target.value }))
          }
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button> */}
    </React.Fragment>
  )
}

export default SignIn
