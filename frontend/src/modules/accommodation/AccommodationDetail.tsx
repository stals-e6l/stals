/* eslint-disable indent */
import React from 'react'
import {
  Box,
  Typography,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Rating,
  alpha,
  Button,
  IconButton,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PinDropIcon from '@mui/icons-material/PinDrop'
import toPhp from '../../utils/toPhp'
import toSentenceCase from '../../utils/toSentenceCase'
import { COLOR } from '../../theme/index'
import Title from './TitleComponent'
import Reviews from '../review/Reviews'
import { retrieveOneAccommodation } from './AccommodationsProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { averageReviewRating } from '../review/ReviewsProvider'
import { retrieveReviews } from '../review/ReviewsProvider'
import {
  createReport,
  fetchReports,
  getReports,
} from '../report/ReportsProvider'
import { getMe } from '../auth/AuthProvider'
import { ROUTES } from '../../app/AppRouter'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetail: React.FC<IProps> = () => {
  //
  const theme = useTheme()
  const params = useParams()
  const accommodation = retrieveOneAccommodation(params.id as string)
  const rating = averageReviewRating()
  const reviews = retrieveReviews()
  const onFetchReports = fetchReports()
  const reports = getReports()
  const user = getMe()
  const onCreateReport = createReport()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (accommodation && onFetchReports) {
      onFetchReports(accommodation._id as string)
    }
  }, [accommodation])

  React.useEffect(() => {
    if (!accommodation) {
      navigate(ROUTES.appExplore)
    }
  }, [accommodation])

  if (!accommodation) {
    return <div>accommodation does not exits!</div>
  }

  if (!user) {
    return <div>handle no user</div>
  }

  const detailCardSx = {
    width: '96%',
    height: theme.spacing(22),
    boxShadow: `${alpha(COLOR.black, 0.5)} 0 4px 10px 1px`,
    padding: theme.spacing(2),
    position: 'relative',
    pb: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }

  const detailCardMobileSx = {
    width: '96%',
    height: theme.spacing(22),
    boxShadow: `${alpha(COLOR.black, 0.5)} 0 4px 10px 1px`,
    padding: theme.spacing(2),
    position: 'relative',
    pb: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      height: 'fit-content',
      padding: theme.spacing(1),
      pb: theme.spacing(3),
      mb: theme.spacing(1),
    },
  }

  const detailCardLabelsx = {
    position: 'absolute',
    bottom: '0',
    pb: theme.spacing(1),
    color: theme.palette.primary.main,
  }

  return (
    <React.Fragment>
      <Box
        component="img"
        sx={{
          width: '100%',
          height: theme.spacing(60),
          objectFit: 'cover',
        }}
        alt="Location image"
        src={accommodation.image.url}
      />
      <Grid
        container
        direction="column"
        rowGap={3}
        sx={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          rowGap: theme.spacing(),
          [theme.breakpoints.down('sm')]: {
            width: '90%',
          },
        }}
      >
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction="row" justifyContent="space-between">
            {/* Accommodation Name */}
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  color: COLOR.blue,
                }}
              >
                {accommodation.name}
              </Typography>
            </Grid>

            {/* Price */}
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  color: COLOR.blue,
                }}
              >
                Php {toPhp(accommodation.min_price)} - Php{' '}
                {toPhp(accommodation.max_price)}
              </Typography>
            </Grid>
          </Grid>

          {/* Type */}
          <Grid item>
            <Typography variant="body1">
              {toSentenceCase(accommodation.type)}
            </Typography>
          </Grid>

          {/* Address */}
          <Grid
            item
            sx={{
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
            }}
          >
            <Typography variant="body2">{accommodation.address}</Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container direction="row">
            <Grid item xs={12} md={4} lg={4}>
              {/* Ratings Card */}
              <Card sx={detailCardMobileSx}>
                <Grid container>
                  <Grid item>
                    {/* Ratings */}
                    {rating === null || Number.isNaN(rating) ? (
                      <Grid item>
                        <Typography variant="h4" sx={{ color: COLOR.green }}>
                          {'No ratings yet.'}
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        direction="row"
                        sx={{
                          alignItems: 'flex-end',
                        }}
                      >
                        {' '}
                        <Typography
                          sx={{
                            typography: {
                              lg: 'h3',
                              xs: 'h4',
                            },
                            color: COLOR.green,
                          }}
                        >
                          {rating}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: COLOR.textBlack }}
                        >
                          /5
                        </Typography>
                        <Box sx={{ ml: theme.spacing(1) }}>
                          <Rating
                            value={rating}
                            precision={0.5}
                            readOnly
                            sx={{
                              color: COLOR.green,
                              paddingTop: theme.spacing(1),
                              [theme.breakpoints.down('md')]: {
                                fontSize: theme.spacing(2.25),
                              },
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: COLOR.textBlack,
                              mt: theme.spacing(-1),
                            }}
                          >
                            {reviews?.length} rating/s /{' '}
                            {reports && Object.values(reports).length} Reports
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {reports && Object.keys(reports).length > 0 && (
                      <Grid item container alignItems="center">
                        <FlagRoundedIcon color="error" />
                        <Typography>
                          Reported by {reports && Object.keys(reports).length}{' '}
                          {reports && Object.keys(reports).length === 1
                            ? 'tenant'
                            : 'tenants'}
                        </Typography>
                      </Grid>
                    )}

                    {reports &&
                      !reports[user._id as string] &&
                      user.role === 'tenant' && (
                        <Grid item>
                          <IconButton
                            sx={{ display: 'inline' }}
                            onClick={() => {
                              if (onCreateReport) {
                                onCreateReport({
                                  user_id: user._id as string,
                                  accommodation_id: accommodation._id as string,
                                })
                              }
                            }}
                          >
                            <FlagRoundedIcon color="error" />
                          </IconButton>
                          <Typography sx={{ display: 'inline-block' }}>
                            Report this accommodation
                          </Typography>
                        </Grid>

                        // <Button
                        //   variant="outlined"
                        //   onClick={() => {
                        //     if (onCreateReport) {
                        //       onCreateReport({
                        //         user_id: user._id as string,
                        //         accommodation_id: accommodation._id as string,
                        //       })
                        //     }
                        //   }}
                        // >
                        //   Report this place
                        // </Button>
                      )}
                  </Grid>
                  {reviews && reviews?.length > 0 && (
                    <Grid item>
                      <Grid
                        xs={12}
                        container
                        direction="row"
                        alignContent="center"
                      >
                        {/* Account Circle Icon */}
                        <Grid item>
                          <AccountCircleIcon
                            sx={{
                              width: '45px',
                              height: '45px',
                              color: COLOR.textGray,
                            }}
                          />
                        </Grid>
                        {/* Comments */}
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="h6">
                                {reviews &&
                                  reviews?.length > 0 &&
                                  reviews[0].user_id}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body2"
                                sx={{ mt: theme.spacing(-1) }}
                              >
                                {reviews &&
                                  reviews?.length > 0 &&
                                  reviews[0].comment}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {/* Ratings label */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={detailCardLabelsx}>
                      Reviews
                    </Typography>
                  </Grid>
                </Grid>
              </Card>{' '}
              {/* End of Ratings Card */}
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              {/* Facilities and Services Card */}
              <Card sx={detailCardMobileSx}>
                <Grid container>
                  <Grid item xs={12}>
                    <List dense={true}>
                      {accommodation.amenities[0] && (
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <CheckCircleOutlineIcon
                              sx={{ color: COLOR.green }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="body1">
                              {accommodation.amenities[0]}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      )}

                      {accommodation.appliances[0] && (
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <CheckCircleOutlineIcon
                              sx={{ color: COLOR.green }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="body1">
                              {accommodation.appliances[0]}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      )}

                      {accommodation.safety_and_security[0] && (
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <CheckCircleOutlineIcon
                              sx={{ color: COLOR.green }}
                            />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography variant="body1">
                              {accommodation.safety_and_security[0]}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                  {/* Facilities and Services label */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      paddingTop={2}
                      sx={detailCardLabelsx}
                    >
                      Facilities and Services
                    </Typography>
                  </Grid>
                </Grid>
              </Card>{' '}
              {/* End of Facilities and Services Card */}
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              {/* Facilities and Services Card */}
              <Card sx={detailCardSx}>
                <Grid container alignItems="center">
                  {/* Pin Drop Icon */}
                  <Grid item xs={2}>
                    <PinDropIcon
                      sx={{
                        width: theme.spacing(6),
                        height: theme.spacing(6),
                        color: COLOR.green,
                      }}
                    />
                  </Grid>
                  {/* Address */}
                  <Grid item xs={9}>
                    <Typography variant="body1">
                      {accommodation.address}
                    </Typography>
                  </Grid>
                  {/* Distance from UPLB Gate */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      noWrap
                      sx={{ fontWeight: 'bold', display: 'flex' }}
                    >
                      about
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 'bold',
                          color: COLOR.green,
                          paddingLeft: theme.spacing(0.5),
                          paddingRight: theme.spacing(0.5),
                        }}
                      >
                        {toPhp(accommodation.meters_from_uplb)} meters
                      </Typography>
                      away from UPLB Gate
                    </Typography>
                  </Grid>
                  {/* Facilities and Services label */}
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      paddingTop={2}
                      sx={detailCardLabelsx}
                    >
                      Address
                    </Typography>
                  </Grid>
                </Grid>
              </Card>{' '}
              {/* End of Facilities and Services Card */}
            </Grid>
          </Grid>
        </Grid>
        {/* | Description */}
        <Grid item sx={{ paddingTop: theme.spacing(2), width: '100%' }}>
          <Title text={'Description'} />
        </Grid>
        {/* Description */}
        <Grid
          item
          sx={{
            padding: theme.spacing(2),
            width: '100%',
          }}
        >
          <Typography variant="body1">{accommodation.description}</Typography>
        </Grid>
        {/* | Apartment and Room Details */}
        <Grid item>
          <Title text={'Apartment and Room Details'} />
        </Grid>
        {/* Apartment and Room Details */}
        <Grid
          item
          sx={{
            backgroundColor: COLOR.gray1,
            padding: theme.spacing(2),
            width: '100%',
          }}
        >
          <Grid container rowGap={1}>
            {/* Room Size */}
            <Grid item xs={4}>
              <Typography variant="body1">Room Size</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {accommodation.size_sqm} square meters
              </Typography>
            </Grid>

            {/* Minimum Capacity */}
            <Grid item xs={4}>
              <Typography variant="body1">Minimum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {accommodation.min_pax} pax
              </Typography>
            </Grid>

            {/* Maximum Capacity */}
            <Grid item xs={4}>
              <Typography variant="body1">Maximum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {accommodation.max_pax} pax
              </Typography>
            </Grid>

            {/* Number of Rooms */}
            <Grid item xs={4}>
              <Typography variant="body1">Number of Rooms</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {accommodation.num_rooms} rooms
              </Typography>
            </Grid>

            {/* Number of Beds */}
            <Grid item xs={4}>
              <Typography variant="body1">Number of Beds</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">
                {accommodation.num_beds} beds
              </Typography>
            </Grid>
          </Grid>
        </Grid>{' '}
        {/* End of apartment and room details */}
        {/* | Facilities and Services */}
        <Grid item>
          <Title text={'Facilities and Services'} />
        </Grid>
        {/* Facilities and Services Details */}
        <Grid
          item
          sx={{
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            width: '100%',
          }}
        >
          <Grid container>
            {/* Amenities */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Amenities</Typography>
            </Grid>
            {/* Amenities Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.amenities.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Appliances</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.appliances.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Safety and Security</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.safety_and_security.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
        {/* | Landmark */}
        <Grid item>
          <Title text={'Landmark'} />
        </Grid>
        {/* Landmark Details */}
        <Grid
          item
          sx={{
            backgroundColor: COLOR.gray1,
            width: '100%',
          }}
        >
          <Grid container rowGap={1} sx={{ padding: theme.spacing(2) }}>
            {/* Distance from UPLB Gate */}
            <Grid item xs={12}>
              <Typography variant="body1">
                About {toPhp(accommodation.meters_from_uplb)} meters from UPLB
                Gate
              </Typography>
            </Grid>
            {/* Other Landmark */}
            {accommodation.landmarks.map((value, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <Typography variant="body1">{value}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        {/* | Policies */}
        <Grid item>
          <Title text={'Policies'} />
        </Grid>
        {/* Policy Details */}
        <Grid
          item
          sx={{
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            width: '100%',
          }}
        >
          <Grid container>
            {/* Cooking Rules */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Cooking Rules</Typography>
            </Grid>
            {/* Cooking Rules Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.cooking_rules.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Pet Rules */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Pet Rules</Typography>
            </Grid>
            {/* Pet Rules Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.pet_rules.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant="body1">Other Rules</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.other_rules.map((value, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body1">{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Title text="Reviews" />
          <Reviews />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationDetail
