import React from 'react'
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  FormLabel,
  OutlinedInput,
  OutlinedInputProps,
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
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
      }}
    >
      <FormLabel>Upload Avatar</FormLabel>
      <Card
        sx={{
          width: '100%',
          height: '50%',
          border: 'solid 1px green',
          backgroundColor: COLOR.white,
          boxShadow: 'none'
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
        <input hidden accept="image/png, image/jpeg" type="file" />
      </Card>

      <TextField
        size="small"
        fullWidth
        multiline
        label="Biography"
        // rows={3}
        name="biography"
        defaultValue={user.biography}
        variant="filled"
        style={{ marginTop: 20 }}
      />

      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Select
            label="Gender"
            fullWidth
            input={<OutlinedInput />}
            size="small"
            name="gender"
            defaultValue={user.gender}
            variant="filled"
            style={{ marginTop: 17 }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non_binary">Non-Binary</MenuItem>
            <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={5}>
          <DatePicker
            // value={form.birthday as string}w}
            slotProps={{ textField: { size: 'small', variant: 'filled' } }}
            sx={{ marginTop: 2 }}
            disableFuture
            label="Birthday"
            
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            label="Phone"
            name="mobile"
            defaultValue={user.phone === undefined ? '' : user.phone.mobile}
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            label="Landline"
            name="landline"
            defaultValue={user.phone === undefined ? '' : user.phone.landline}
            variant="filled"
            style={{ marginTop: 20 }}
          />
        </Grid>
      </Grid>

      <TextField
        size="small"
        fullWidth
        label="Home address"
        name="home"
        defaultValue={user.address === undefined ? '' : user.address.home}
        variant="filled"
        style={{ marginTop: 20 }}
      />

      <TextField
        size="small"
        fullWidth
        label="Current address"
        name="current"
        defaultValue={user.address === undefined ? '' : user.address.current}
        variant="filled"
        style={{ marginTop: 20 }}
      />

      <TextField
        size="small"
        fullWidth
        label="Organization"
        name="organization"
        defaultValue={user.organization}
        variant="filled"
        style={{ marginTop: 20 }}
      />
    </Box>
  )
}

export default EditProfile
