import React from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { signUp } from '../../store/auth/action'

interface IProps {
  children?: React.ReactNode
  onClose: () => void
}

const SignUp: React.FC<IProps> = ({ onClose }) => {
  const signUpHandler = signUp()
  // state
  const [form, setForm] = React.useState<IUserSignUp & { confirm: string }>({
    username: '',
    password: '',
    email: '',
    role: 'admin',
    confirm: '',
  })

  const handleSignUp = () => {
    signUpHandler({
      username: form.username,
      password: form.password,
      email: form.email,
      role: form.role,
    }).then(() => {
      onClose()
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          width: '100%',
          height: '100%',
          padding: '30px',
          borderRadius: '5px',
          boxShadow: '0px 3px 5px #888888',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#154360',
            paddingBottom: '10px',
          }}
        >
          Create an Account
        </Typography>

        <Typography>Email</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        />
        <Typography>Role</Typography>
        <Select
          label=""
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          size="small"
          value={form.role}
          onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
        >
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'tenant'}>Student</MenuItem>
          <MenuItem value={'owner'}>Accommodation Owner</MenuItem>
        </Select>

        <Typography>Username</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          value={form.username}
          onChange={e =>
            setForm(prev => ({ ...prev, username: e.target.value }))
          }
        />
        <Typography>Password</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          value={form.password}
          onChange={e =>
            setForm(prev => ({ ...prev, password: e.target.value }))
          }
        />
        <Typography>Confirm Password</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          value={form.confirm}
          onChange={e =>
            setForm(prev => ({ ...prev, confirm: e.target.value }))
          }
        />

        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <Typography>
              I have read the{' '}
              <Typography sx={{ display: 'inline', color: '#60ce80' }}>
                Data Privacy Act of 2012
              </Typography>
            </Typography>
          }
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <Typography>
              I have read and agree to{' '}
              <Typography sx={{ display: 'inline', color: '#60ce80' }}>
                AirVnV&apos;s Terms of Service
              </Typography>{' '}
              and{' '}
              <Typography sx={{ display: 'inline', color: '#60ce80' }}>
                Privacy Policy
              </Typography>
              .
            </Typography>
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
          disabled={
            form.password.length === 0 || form.password !== form.confirm
          }
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  )
}

export default SignUp
