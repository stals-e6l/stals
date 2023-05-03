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

interface IProps {
  children?: React.ReactNode
}

const SignUp: React.FC<IProps> = () => {
  // state
  const [form, setForm] = React.useState<IUserSignUp>({
    userName: '',
    passwordHash: '',
    email: '',
    role: 'admin',
  })

  const handleSignUp = () => {
    // TODO: pm's job lol
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        width: '100%',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          width: '100%',
          height: '100%',
        //   marginRight: '50px',
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
        />
        <Typography>Role</Typography>
        <Select
          label=""
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
          size="small"
        >
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'Student'}>Student</MenuItem>
          <MenuItem value={'Accommodation Owner'}>Accommodation Owner</MenuItem>
        </Select>

        <Typography>Username</Typography>
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
          type="password"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
        />
        <Typography>Confirm Password</Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          sx={{ backgroundColor: '#ffffff' }}
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
                AirVnV's Terms of Service
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
        >
          Sign up
        </Button>
      </Box>
    </Box>

    // <div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       value={form.email}
    //       type="email"
    //       placeholder="email"
    //       onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
    //     />
    //   </div>
    //   <div>
    //     <label>Role</label>
    //     <select
    //       value={form.role}
    //       onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
    //     >
    //       <option value="admin">Admin</option>
    //       <option value="owner">Owner</option>
    //       <option value="tenant">Tenant</option>
    //     </select>
    //     {/* <input
    //       value={form.passwordHash}
    //       type="email"
    //       placeholder="email"
    //       onChange={e =>
    //         setForm(prev => ({ ...prev, email: e.target.value }))
    //       }
    //     /> */}
    //   </div>
    //   <div>
    //     <label>Username</label>
    //     <input
    //       value={form.userName}
    //       type="text"
    //       placeholder="username"
    //       onChange={e =>
    //         setForm(prev => ({ ...prev, username: e.target.value }))
    //       }
    //     />
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       value={form.passwordHash}
    //       type="password"
    //       placeholder="password"
    //       onChange={e =>
    //         setForm(prev => ({ ...prev, passwordHash: e.target.value }))
    //       }
    //     />
    //   </div>
    //   <button onClick={handleSignUp}>Sign Up</button>
    // </div>
  )
}

export default SignUp
