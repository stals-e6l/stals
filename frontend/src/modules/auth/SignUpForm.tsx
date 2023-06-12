import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  Grid,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, signUp } from './AuthProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { showErrorSnackbar } from '../general/ErrorHandler'
import { ROUTES } from '../../app/AppRouter'

interface IProps {
  children?: React.ReactNode
  onClose: () => void
}

const SignUpForm: React.FC<IProps> = ({ onClose }) => {
  // hooks
  const theme = useTheme()
  const onSignUp = signUp()
  const onSignIn = signIn()
  const onShowError = showErrorSnackbar()
  const navigate = useNavigate()

  // state
  const [form, setForm] = React.useState<
    IUserSignUp & { confirm: string; read: boolean; agreed: boolean }
  >({
    username: '',
    password: '',
    email: '',
    role: 'tenant',
    full_name: {
      first_name: '',
      middle_name: '',
      last_name: '',
    },
    gender: 'male',
    address: {
      home: '',
      current: '',
    },
    phone: {
      landline: '',
      mobile: '',
    },
    birthday: String(new Date()),
    organization: '',
    confirm: '',
    read: false,
    agreed: false,
  })
  const [error, setError] = useState<any | null>(null)

  // events
  const handleSignUp = () => {
    setError(null)
    if (onSignUp && onShowError) {
      onSignUp({
        ...form,
        phone: {
          mobile:
            !form.phone || form.phone.mobile === ''
              ? undefined
              : form.phone.mobile,
          landline:
            !form.phone || form.phone.landline === ''
              ? undefined
              : form.phone.landline,
        },
        organization: form.organization === '' ? undefined : form.organization,
        address: {
          current:
            !form.address || form.address.current === ''
              ? ''
              : form.address.current,
          home:
            !form.address || form.address.home === '' ? '' : form.address.home,
        },
      })
        .then(() => {
          if (onSignIn) {
            onSignIn({
              password: form.password,
              username: form.username,
            })
              .then(() => {
                onClose()
                navigate(ROUTES.appExplore)
              })
              .catch(err => onShowError(String(err)))
          }
        })
        .catch(err => {
          const newError: IMap<string> = {}
          String(err)
            .replace('Error: ValidationError: ', '')
            .split(',')
            .forEach(lines => {
              const [key, message] = lines.split(':')
              newError[key.trim()] = message.trim()
            })
          setError(newError)
        })
    }
  }

  //constants

  React.useEffect(() => {
    return () =>
      setForm({
        username: '',
        password: '',
        email: '',
        role: 'tenant',
        full_name: {
          first_name: '',
          middle_name: '',
          last_name: '',
        },
        gender: 'male',
        address: {
          home: '',
          current: '',
        },
        phone: {
          landline: '',
          mobile: '',
        },
        birthday: String(new Date()),
        confirm: '',
        organization: '',
        read: false,
        agreed: false,
      })
  }, [])

  return (
    <Box>
      <TextField
        size="small"
        fullWidth
        required
        label="Username"
        value={form.username}
        onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
        variant="filled"
        error={error && error.username}
        helperText={error && error.username}
      />

      <TextField
        size="small"
        fullWidth
        required
        label="Email"
        value={form.email}
        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        variant="filled"
        style={{ marginTop: 20 }}
        error={error && error.email}
        helperText={error && error.email}
      />

      <Grid
        container
        spacing={1}
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Grid item xs={12} lg={4}>
          <TextField
            size="small"
            fullWidth
            required
            label="First name"
            value={form.full_name.first_name}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                full_name: {
                  ...prev.full_name,
                  first_name: e.target.value,
                },
              }))
            }
            variant="filled"
            style={{ marginTop: 20 }}
            error={error && error['full_name.first_name']}
            helperText={error && error['full_name.first_name']}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            size="small"
            fullWidth
            label="Middle name"
            value={form.full_name.middle_name}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                full_name: {
                  ...prev.full_name,
                  middle_name: e.target.value,
                },
              }))
            }
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <TextField
            size="small"
            fullWidth
            required
            label="Last name"
            value={form.full_name.last_name}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                full_name: {
                  ...prev.full_name,
                  last_name: e.target.value,
                },
              }))
            }
            variant="filled"
            style={{ marginTop: 20 }}
            error={error && error['full_name.last_name']}
            helperText={error && error['full_name.last_name']}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Select
            fullWidth
            required
            input={<OutlinedInput />}
            size="small"
            value={form.gender}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                gender: e.target.value as TUserGender,
              }))
            }
            variant="filled"
            style={{ marginTop: 17 }}
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            <MenuItem value={'non_binary'}>Non-Binary</MenuItem>
            <MenuItem value={'prefer_not_to_say'}>Prefer not to say</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={5}>
          <DatePicker
            slotProps={{ textField: { size: 'small', variant: 'filled' } }}
            sx={{ marginTop: 2 }}
            disableFuture
            label="Birthday"
            onChange={value => {
              const date = value as { $d: string }
              const birthday = new Date(date.$d).toISOString().split('T')[0]
              setForm(prev => ({
                ...prev,
                birthday,
              }))
            }}
          />
          {error && error.birthday && (
            <Typography
              color="error"
              sx={{
                fontSize: theme.spacing(1.5),
              }}
            >
              {error.birthday}
            </Typography>
          )}
        </Grid>
      </Grid>

      <TextField
        size="small"
        type="password"
        fullWidth
        required
        label="Password"
        value={form.password}
        onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
        variant="filled"
        style={{ marginTop: 20 }}
        error={error && error.password}
        helperText={error && error.password}
      />
      <TextField
        size="small"
        type="password"
        fullWidth
        required
        label="Confirm Password"
        value={form.confirm}
        onChange={e => setForm(prev => ({ ...prev, confirm: e.target.value }))}
        variant="filled"
        style={{ marginTop: 20 }}
      />

      <FormControlLabel
        required
        control={
          <Checkbox
            value={form.read}
            onChange={(_, checked) =>
              setForm(prev => ({ ...prev, read: checked }))
            }
          />
        }
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
            .
          </Typography>
        }
      />
      <FormControlLabel
        required
        control={
          <Checkbox
            value={form.agreed}
            onChange={(_, checked) =>
              setForm(prev => ({ ...prev, agreed: checked }))
            }
          />
        }
        label={
          <Typography>
            I have read and agree to{' '}
            <Link
              to="https://www.airvnv.info/terms-and-conditions.html"
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
              to="https://www.airvnv.info/terms-and-conditions.html"
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
          form.password.length === 0 ||
          form.password !== form.confirm ||
          !form.read ||
          !form.agreed
        }
        onClick={handleSignUp}
      >
        Sign up
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginBottom: theme.spacing(1),
        }}
        onClick={onClose}
      >
        Cancel
      </Button>
    </Box>
  )
}

export default SignUpForm
