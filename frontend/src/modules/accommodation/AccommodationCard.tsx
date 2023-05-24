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
import AccommodationFormModal from './AccommodationFormModal'
import { getMe } from '../auth/AuthProvider'

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
  const me = getMe()

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
      sx={{
        backgroundColor: COLOR.gray1,
        width: theme.spacing(35),
        borderRadius: theme.spacing(2),
        boxShadow: '0px 4px 4px #6e6e73',
        cursor: 'pointer',
        ':hover': {
          boxShadow: '0px 4px 15px #6e6e73',
        },
        transition: '0.3s all',
        [theme.breakpoints.down('md')]: {
          width: theme.spacing(28),
        },
        [theme.breakpoints.down('sm')]: {
          width: theme.spacing(19),
        },
      }}
    >
      {/* Accommodation Image */}
      <CardMedia
        onClick={toDetailPage}
        component="img"
        height={theme.spacing(23)}
        image={AccommodationImages.ellens}
        sx={{
          [theme.breakpoints.down('md')]: {
            height: theme.spacing(20),
          },
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(13),
          },
        }}
      />

      <CardContent sx={{ wordSpacing: '10' }}>
        {/* Type of Accommodation */}
        <Typography
          variant="body1"
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: theme.spacing(1.75),
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.spacing(1.5),
            },
          }}
        >
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
            [theme.breakpoints.down('md')]: {
              fontSize: theme.spacing(2.5),
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.spacing(2),
            },
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
                  [theme.breakpoints.down('md')]: {
                    fontSize: theme.spacing(2.25),
                  },
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
                    fontSize: theme.spacing(2),
                  },
                }}
              />

              {/* Rating in Number */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  color: COLOR.green,
                  [theme.breakpoints.down('md')]: {
                    fontSize: theme.spacing(1.75),
                  },
                  [theme.breakpoints.down('sm')]: {
                    fontSize: theme.spacing(1.65),
                  },
                }}
              >
                {4.5}
              </Typography>

              {/* Number of Reviews */}
              <Typography
                variant="body1"
                sx={{
                  marginLeft: '1%',
                  [theme.breakpoints.down('md')]: {
                    fontSize: theme.spacing(1.75),
                  },
                  [theme.breakpoints.down('sm')]: {
                    fontSize: theme.spacing(1.65),
                  },
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
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(2),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(1.75),
                },
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
            {accommodation && me?._id === accommodation.user_id && (
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
                <MenuItem>
                  <AccommodationFormModal defaultValues={accommodation} />
                </MenuItem>
                <MenuItem>
                  <DeleteAccommodationFormModal
                    userId={accommodation.user_id as string}
                    accommodationId={accommodation._id as string}
                    isSoftDelete={true}
                  />
                </MenuItem>
                <MenuItem>
                  <DeleteAccommodationFormModal
                    userId={accommodation.user_id as string}
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
