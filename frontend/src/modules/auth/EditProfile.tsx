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
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { COLOR } from '../../theme'

interface IProps {

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
          
          <FormLabel>Biography</FormLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ backgroundColor: COLOR.white }}
            //   value={form.email}
            //   onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          />
  
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(1),
            }}
            //   disabled={
            //     form.password.length === 0 || form.password !== form.confirm
            //   }
            //   onClick={handleSignUp}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    )
  }

  export default EditProfile