import {
  Box,
  Typography,
  Rating,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import React from 'react'
import AccommodationFormModal from './AccommodationFormModal'
import DeleteAccommodationFormModal from './DeleteAccommodationFormModal'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import AccommodationImages from './accommodationImages'
import toSentenceCase from "../../helpers/toSentenceCase"
import { COLOR, FONT } from '../../theme/index'

interface IProps {
  children?: React.ReactNode
  accommodation: IAccommodation
  isPublicView: boolean
}

const AccommodationCard: React.FC<IProps> = ({ accommodation, isPublicView }) => {

  const actions = [
    { name: 'Edit' },
    { name: 'Archive' },
    { name: 'Delete' }
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (

    // Initialize card
    <Card sx={{
      backgroundColor: COLOR.gray1,
      width: '280px',
      borderRadius: '20px',
      boxShadow: '0px 4px 4px #6e6e73',
      cursor: 'pointer',
      ':hover': {
        boxShadow: '0px 4px 15px #6e6e73',
      },
      transition: '0.3s all',
    }}>

      <CardActionArea>

        {/* Accommodation Image */}
        <CardMedia
          component="img"
          height="180px"
          image={AccommodationImages.ellens}
        />

        <CardContent sx={{ wordSpacing: "10" }}>

          {/* Type of Accommodation */}
          <Typography variant='body1'
          >
            {toSentenceCase(accommodation.type)}
          </Typography>

          {/* Name of Accommodation */}
          <Typography variant='h5'
            sx={{
              color: COLOR.blue,
              whiteSpace: 'nowrap',
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {toSentenceCase(accommodation.name)}
          </Typography>

          {isPublicView
            ?
            <>
              <Box
                sx={{
                  display: 'flex',
                }}
              >

                {/* Rating */}
                <Rating
                  value={4.5}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: COLOR.green,
                  }}
                />

                {/* Rating in Number */}
                <Typography variant='body1'
                  sx={{
                    fontWeight: 'bold',
                    color: COLOR.green,
                  }}
                >
                  {4.5}
                </Typography>

                {/* Number of Reviews */}
                <Typography variant='body1'
                  sx={{
                    marginLeft: '1%',
                  }}
                >
                  ({10} reviews)
                </Typography>
              </Box>

              <br />

              {/* Price */}
              <Typography variant='h6'
                sx={{
                  color: COLOR.blue,
                }}
              >
                {/* Formats the number to currency format */}
                Php {new Intl.NumberFormat().format(accommodation.price)}{' '}
              </Typography>
            </>
            : // If not for public view, display only the address
            <>
              {/* Address */}
              <Typography variant='body1' sx={{
                whiteSpace: 'nowrap',
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {accommodation.address}
              </Typography>
            </>
          }
        </CardContent>

        {
          isPublicView
            ?
            <></>
            :
            <>
              {/* If not public view */}
              <CardActions>

                {/* Menu Btn */}
                <IconButton
                  id="menu-btn"
                  aria-controls={open ? 'menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ marginLeft: "auto"}}>
                  <MoreHorizSharpIcon sx={{
                    color: COLOR.green,
                  }} />
                </IconButton>

                {/* Menu Items */}
                <Menu
                  id="menu"
                  aria-labelledby="menu-btn"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose}><Typography variant="body2">Edit</Typography></MenuItem>
                  <MenuItem onClick={handleClose}><Typography variant="body2">Archive</Typography></MenuItem>
                  <MenuItem onClick={handleClose}><Typography variant="body2">Delete</Typography></MenuItem>
                </Menu>

              </CardActions>
            </>
        }
      </CardActionArea>
    </Card>

  )
}

export default AccommodationCard