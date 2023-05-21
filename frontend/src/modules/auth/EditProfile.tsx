import React from 'react'
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { COLOR } from '../../theme/index'

interface IProps {
  children?: React.ReactNode
  user: IUser
}

const EditProfile: React.FC<IProps> = ({ user }) => {
  const theme = useTheme()
  const handleUploadImage = () => {
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
        pb: theme.spacing(1),
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
                pb: theme.spacing(1),
                alignItems: 'center',
                maxWidth: '100%',
                paddingBottom: '20%',
                paddingTop: '20%',
              }}
            >
              <PhotoCamera />
            </CardContent>
          </CardActionArea>
          <input hidden accept="image/png, image/jpeg" type="file" />
        </Card>

        <FormLabel>Biography</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          multiline
          rows={3}
          name="biography"
          defaultValue={user.biography}
        />

        <Grid container spacing={1}>
          <Grid item xs={7}>
            <FormLabel>Gender</FormLabel>
            <Select
              label=""
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
              size="small"
              name="gender"
              defaultValue={user.gender}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='non_binary'>Non-Binary</MenuItem>
              <MenuItem value='prefer_not_to_say'>Prefer not to say</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={5}>
            <InputLabel>Birthday</InputLabel>
            <DatePicker
              // value={form.birthday as string}w}
              slotProps={{ textField: { size: 'small' } }}
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
              name="mobile"
              defaultValue={user.phone === undefined ? (""):(user.phone.mobile)}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel>Landline</FormLabel>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: COLOR.white }}
              name="landline"
              defaultValue={user.phone === undefined ? (""):(user.phone.landline)}
            />
          </Grid>
        </Grid>

        <FormLabel>Home Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          name="home"
          defaultValue={user.address === undefined ? (""):(user.address.home)}
        />

        <FormLabel>Current Address</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          name="current"
          defaultValue={user.address === undefined ? (""):(user.address.current)}
        />

        <FormLabel>Organization</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: COLOR.white }}
          name="organization"
          defaultValue={user.organization}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
              width: 'fit-content',
              mr: theme.spacing(1),
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
              width: 'fit-content',
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EditProfile
