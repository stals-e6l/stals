import {
  Box,
  Typography,
  Rating,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  alpha,
} from '@mui/material'
import React from 'react'
import DeleteAccommodationFormModal from './DeleteAccommodationFormModal'
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'
import AccommodationImages from './accommodationImages'
import toSentenceCase from '../../utils/toSentenceCase'
import toPhp from '../../utils/toPhp'
import { COLOR } from '../../theme/index'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../app/AppRouter'

interface IProps {
  children?: React.ReactNode
  accommodation: IAccommodation
  isPublicView: boolean
}

const AccommodationCard: React.FC<IProps> = ({
  accommodation,
  isPublicView,
}) => {
  // hooks
  const theme = useTheme()
  const navigate = useNavigate()

  // state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // events
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const toDetailPage = () => {
    navigate(
      `${ROUTES.appAccommodationDetail.replace(':id', accommodation._id || '')}`
    )
  }

  if (!accommodation) return <></>

  // immediate
  const open = Boolean(anchorEl)

  return (
    // Initialize card
    <Card
      onClick={toDetailPage}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        ':hover': {
          top: '-3px',
          boxShadow: `${alpha(COLOR.black, 0.3)} 0 1px 30px 3px`,
        },
      }}
    >
      {/* Accommodation Image */}
      <CardMedia
        component="img"
        height={'180px'}
        image={AccommodationImages.ellens}
      />

      <CardContent sx={{ wordSpacing: '10' }}>
        {/* Type of Accommodation */}
        <Typography variant="body1">
          {toSentenceCase(accommodation.type)}
        </Typography>

        {/* Name of Accommodation */}
        <Typography
          variant="h5"
          sx={{
            color: COLOR.blue,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {toSentenceCase(accommodation.name)}
        </Typography>

        {isPublicView ? (
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
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }}
              />

              <StarPurple500SharpIcon
                sx={{
                  display: 'none',
                  [theme.breakpoints.down('sm')]: {
                    display: 'inherit',
                    color: COLOR.green,
                  },
                }}
              />

              {/* Rating in Number */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: COLOR.green,
                }}
              >
                {4.5}
              </Typography>

              {/* Number of Reviews */}
              <Typography
                variant="body1"
                sx={{
                  marginLeft: '3%',
                }}
              >
                ({10} reviews)
              </Typography>
            </Box>

            <br />

            {/* Price */}
            <Typography
              variant="h6"
              sx={{
                color: COLOR.blue,
              }}
            >
              {/* Formats the number to currency format */}
              Php {toPhp(accommodation.min_price)}{' '}
            </Typography>
          </>
        ) : (
          // If not for public view, display only the address
          <>
            {/* Address */}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {accommodation.address}
            </Typography>
          </>
        )}
      </CardContent>

      {!isPublicView && (
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
              sx={{ marginLeft: 'auto' }}
            >
              <MoreHorizSharpIcon
                sx={{
                  color: COLOR.green,
                }}
              />
            </IconButton>

            {/* Menu Items */}
            {accommodation && (
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
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2">Edit</Typography>
                </MenuItem>
                <MenuItem>
                  <DeleteAccommodationFormModal
                    accommodationId={accommodation._id as string}
                    isSoftDelete={true}
                  />
                </MenuItem>
                <MenuItem>
                  <DeleteAccommodationFormModal
                    accommodationId={accommodation._id as string}
                    isSoftDelete={false}
                  />
                </MenuItem>
              </Menu>
            )}
          </CardActions>
        </>
      )}
    </Card>
  )
}

export default AccommodationCard
