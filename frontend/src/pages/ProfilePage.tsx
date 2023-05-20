import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Input,
  Button,
  Avatar,
  Dialog,
  TextField,
  Link,
  Card,
  CardActionArea,
  CardContent,
  FormLabel,
  Divider,
  Grid,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// import { getUser } from '../../store/auth/action'
import { COLOR } from '../theme/index'

interface IProps {
  children?: React.ReactNode
}

const EditProfile: React.FC<IProps> = () => {
  const theme = useTheme()
  const handleUploadImage = () => {
    // execute code to open file input
    const fileInput = document.querySelector(
      'input[type=file]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
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
          Edit Profile
        </Typography>

        <FormLabel>Upload Avatar</FormLabel>
        <Card
          sx={{
            minWidth: '100%',
            minHeight: '50%',
            border: 'solid 1px green',
            backgroundColor: COLOR.white,
          }}
          onClick={handleUploadImage}
        >
          <CardActionArea>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                paddingBottom: '20%',
                paddingTop: '20%',
              }}
            >
              <PhotoCamera />
            </CardContent>
          </CardActionArea>
          <input hidden accept="image/*" type="file" />
        </Card>

        <FormLabel>Username</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <FormLabel>Biography</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <Grid container spacing={1}>
          <Grid item xs={7}>
            <FormLabel>Gender</FormLabel>
            <Select
              label=""
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
              size="small"
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
            />
          </Grid>
        </Grid>

        <FormLabel>Email</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormLabel>Phone</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel>Landline</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
            />
          </Grid>
        </Grid>

        <FormLabel>Home Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <FormLabel>Current Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <FormLabel>Organization</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.primary.main,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

const ProfilePage: React.FC<IProps> = () => {
  //   const user = getUser()

  //   if (!user) {
  //     return <div>no user</div>
  //   }
  const theme = useTheme()
  const [image, setImage] = React.useState<any>(null)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const user = {
    username: 'Pogi',
    fname: 'Rodge Miguel',
    mname: 'Magpantay',
    lname: 'De Luna',
    email: 'test@up.edu.ph',
    role: 'Admin',
    bio: 'You miss 100% shots you dont take.',
    gender: 'Male',
    birthday: '07/26/2001',
    phone: '09163342585',
    landline: '212 7388',
    homeAddress: 'Cainta, Rizal',
    currAddress: 'Carrot Place',
    organization: 'COSS',
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          backgroundColor: COLOR.blue,
          width: '30%',
          padding: theme.spacing(5),
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <ArrowBackIcon sx={{ fontSize: '5vh', color: COLOR.white }} />
          </IconButton>
          <Avatar
            sx={{
              width: theme.spacing(6),
              height: theme.spacing(6),
            }}
            alt="profile"
            src={image}
          />
        </Box>
        <Typography variant="h3" sx={{ color: COLOR.white }}>
          Greetings,
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: COLOR.white, fontWeight: 'normal' }}
        >
          {user.username}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'light',
            color: COLOR.white,
            mt: theme.spacing(3),
          }}
        >
          {user.fname} {user.mname[0]}
          {'. '}
          {user.lname}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'light',
            color: COLOR.white,
            mt: theme.spacing(-1),
          }}
        >
          {user.role}{' '}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 'light',
            fontStyle: 'italic',
            color: COLOR.white,
          }}
        >
          {user.bio}{' '}
        </Typography>

        <Divider sx={{ background: COLOR.white }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Basic Info
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.gender}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.birthday}
        </Typography>

        <Divider sx={{ background: COLOR.white }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Contact Details
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.email}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.phone}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.landline}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.homeAddress}
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.currAddress}
        </Typography>

        <Divider sx={{ background: COLOR.white }} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          Organization
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontWeight: 'light', color: COLOR.white }}
        >
          {user.organization}
        </Typography>

        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: COLOR.white,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            //   position: 'absolute',
            //   right: '0',
            //   bottom: '0',
          }}
        >
          Edit Profile
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            width: '40%',
            margin: '0 auto',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }}
        >
          <EditProfile />
        </Dialog>
      </Box>
      {/* <Box sx={{backgroundColor:'red', width:'70%'}}></Box> */}
    </Box>
  )
}

export default ProfilePage
