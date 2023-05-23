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
  Grid,
  FormLabel,
  InputLabel,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { COLOR } from '../../theme'
import { signUp } from './AuthProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { showErrorSnackbar } from '../general/ErrorHandler'

interface IProps {
  children?: React.ReactNode
  onClose: () => void
}

const SignUpForm: React.FC<IProps> = ({ onClose }) => {
  // hooks
  const theme = useTheme()
  const onSignUp = signUp()
  const onShowError = showErrorSnackbar()

  // state
  const [form, setForm] = React.useState<IUserSignUp & { confirm: string }>({
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
  })

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
        .then(() => onClose())
        .catch(err => onShowError(String(err)))
    }
  }

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
      })
  }, [])

  return (
    <Box
      sx={{
        backdropFilter: 'blur(5px)',
        backgroundColor: COLOR.gray2,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      <Box
        sx={{
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

        <FormLabel required>Username</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
          value={form.username}
          onChange={e =>
            setForm(prev => ({ ...prev, username: e.target.value }))
          }
        />

        <FormLabel required>Email</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
        />
        <FormLabel required>Role</FormLabel>
        <Select
          label=""
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
          size="small"
          value={form.role}
          onChange={e =>
            setForm(prev => ({ ...prev, role: e.target.value as TUserRole }))
          }
        >
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'tenant'}>Student</MenuItem>
          <MenuItem value={'owner'}>Accommodation Owner</MenuItem>
        </Select>

        <FormLabel>Organization</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          value={form.organization}
          onChange={e =>
            setForm(prev => ({ ...prev, organization: e.target.value }))
          }
        />

        <Grid
          container
          spacing={1}
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Grid item xs={12} lg={4}>
            <FormLabel required>First Name</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              required
              sx={{ backgroundColor: COLOR.white }}
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
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormLabel required>Last Name</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              required
              sx={{ backgroundColor: COLOR.white }}
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
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormLabel>Middle Name</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
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
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={7}>
            <FormLabel required>Gender</FormLabel>
            <Select
              label=""
              fullWidth
              required
              sx={{ backgroundColor: COLOR.white }}
              size="small"
              value={form.gender}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  gender: e.target.value as TUserGender,
                }))
              }
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'non_binary'}>Non-Binary</MenuItem>
              <MenuItem value={'prefer_not_to_say'}>Prefer not to say</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={5}>
            <InputLabel>Birthday</InputLabel>
            <DatePicker
              // value={form.birthday as string}
              slotProps={{ textField: { size: 'small' } }}
              onChange={value => {
                const date = value as { $d: string }
                const birthday = new Date(date.$d).toISOString().split('T')[0]
                setForm(prev => ({
                  ...prev,
                  birthday,
                }))
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormLabel>Phone</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
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
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel>Landline</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
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
            />
          </Grid>
        </Grid>

        <FormLabel required>Current Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
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
        />

        <FormLabel required>Home Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
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
        />

        <FormLabel required>Password</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          required
          sx={{ backgroundColor: COLOR.white }}
          value={form.password}
          onChange={e =>
            setForm(prev => ({ ...prev, password: e.target.value }))
          }
        />
        <FormLabel required>Confirm Password</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          required
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
            form.password.length === 0 || form.password !== form.confirm
          }
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <Button
          variant="outlined"
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
    </Box>
  )
}

export default SignUpForm
