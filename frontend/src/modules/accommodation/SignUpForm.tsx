import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  colors,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { COLOR } from '../../theme'

interface IProps {
  children?: React.ReactNode
}

const SignUpForm: React.FC<IProps> = () => {
  // const signUpHandler = signUp()
  // state
  const [form, setForm] = React.useState<IUserSignUp & { confirm: string }>({
    username: '',
    password: '',
    email: '',
    role: 'admin',
    confirm: '',
  })

  const handleSignUp = () => {
    // TODO: PM's job, for now refine the styling
    // signUpHandler({
    //   username: form.username,
    //   password: form.password,
    //   email: form.email,
    //   role: form.role,
    // }).then(() => {
    //   onClose()
    // })
  }

  const theme = useTheme()

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
          backgroundColor: COLOR.gray2,
          width: '100%',
          height: '100%',
          padding: theme.spacing(2),
          borderRadius: theme.spacing(1),
        }}
      >
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

        <Typography>Email</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        />
        <Typography>Role</Typography>
        <Select
          label=""
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
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
          sx={{ backgroundColor: COLOR.white }}
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
          sx={{ backgroundColor: COLOR.white }}
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
          sx={{ backgroundColor: COLOR.white }}
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
              <Link
                to="https://www.privacy.gov.ph/data-privacy-act/"
                target="_blank"
                style={{
                  display: 'inline',
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                }}
              >
                {' '}
                Data Privacy Act of 2012
              </Link>
            </Typography>
          }
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          label={
            <Typography>
              I have read and agree to{' '}
              <Link
                to="#"
                target="_blank"
                style={{
                  display: 'inline',
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                }}
              >
                {' '}
                AirVnV&apos;s Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="#"
                target="_blank"
                style={{
                  display: 'inline',
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                }}
              >
                {' '}
                Privacy Policy
              </Link>
              .
            </Typography>
          }
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
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

export default SignUpForm
