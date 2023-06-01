import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  OutlinedInputProps,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  Grid,
  FormLabel,
  InputLabel,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COLOR } from '../../theme'
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
    IUserSignUp & { confirm: string; invalidBirthday: boolean }
  >({
    username: '',
    password: '',
    email: '',
    role: 'admin',
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
    invalidBirthday: true,
  })
  const [error, setError] = useState('')

  // events
  const handleSignUp = () => {
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
              ? undefined
              : form.address.current,
          home:
            !form.address || form.address.home === ''
              ? undefined
              : form.address.home,
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
        .catch(err => onShowError(String(err)))
    }
  }

  //constants

  const currentDate = new Date()

  React.useEffect(() => {
    return () =>
      setForm({
        username: '',
        password: '',
        email: '',
        role: 'admin',
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
        invalidBirthday: true,
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
      />
      <Select
        label="Role"
        fullWidth
        required
        size="small"
        input={<OutlinedInput />}
        value={form.role}
        onChange={e =>
          setForm(prev => ({ ...prev, role: e.target.value as TUserRole }))
        }
        variant="filled"
        style={{ marginTop: 20 }}
      >
        <MenuItem value={'tenant'}>Student</MenuItem>
        <MenuItem value={'owner'}>Accommodation Owner</MenuItem>
      </Select>

      <TextField
        size="small"
        fullWidth
        label="Organization"
        value={form.organization}
        onChange={e =>
          setForm(prev => ({ ...prev, organization: e.target.value }))
        }
        variant="filled"
        style={{ marginTop: 20 }}
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
            // value={form.birthday as string}
            slotProps={{ textField: { size: 'small', variant: 'filled' } }}
            sx={{ marginTop: 2 }}
            disableFuture
            label="Birthday"
            onChange={value => {
              const date = value as { $d: string }
              const inputYear = new Date(date.$d).getFullYear()
              if (currentDate.getFullYear() - inputYear >= 18) {
                setError('')
                const birthday = new Date(date.$d).toISOString().split('T')[0]
                setForm(prev => ({
                  ...prev,
                  birthday,
                  invalidBirthday: false,
                }))
              } else {
                setError('Age must be 18 or above.')
                setForm(prev => ({ ...prev, invalidBirthday: true }))
              }
            }}
          />
          {error && (
            <Typography
              color="error"
              sx={{
                fontSize: theme.spacing(1.5),
              }}
            >
              {error}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            label="Phone"
            value={(form.phone && form.phone.mobile) || ''}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                phone: {
                  ...prev.phone,
                  mobile: e.target.value,
                },
              }))
            }
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            label="Landline"
            value={(form.phone && form.phone.landline) || ''}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                phone: {
                  ...prev.phone,
                  landline: e.target.value,
                },
              }))
            }
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </Grid>
      </Grid>

      <TextField
        size="small"
        fullWidth
        required
        label="Current Address"
        value={(form.address && form.address.current) || ''}
        onChange={e =>
          setForm(prev => ({
            ...prev,
            address: {
              ...prev.address,
              current: e.target.value,
            },
          }))
        }
        variant="filled"
        style={{ marginTop: 20 }}
      />

      <TextField
        size="small"
        fullWidth
        required
        label="Home Address"
        value={(form.address && form.address.home) || ''}
        onChange={e =>
          setForm(prev => ({
            ...prev,
            address: {
              ...prev.address,
              home: e.target.value,
            },
          }))
        }
        variant="filled"
        style={{ marginTop: 20 }}
      />

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
            .
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
          form.password.length === 0 ||
          form.password !== form.confirm ||
          form.invalidBirthday
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
          marginTop: theme.spacing(2),
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
