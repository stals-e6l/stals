import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import location from '../../assets/Images/Ellens.jpg'
// import check from '../../assets/ImgaCheck Green.png'
// import pin from '../../assets/Map pin - Green.png'
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
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PinDropIcon from '@mui/icons-material/PinDrop'
import toPhp from '../../helpers/toPhp'
import { COLOR } from '../../theme/index'
import Navbar from '../general/Navbar'
import Title from './TitleComponent'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  // 
  const theme = useTheme()

  // Static data
  const accommodation = {
    name: 'Ellens Chicken',
    max_price: 2000,
    type: 'Apartment',
    amenities: ['Fire exit', 'CCTV', 'Internet', 'Study Area'],
    address: 'Demarces (in front of Bonitos), Brgy. Batong Malake, Los Banos, Laguna',
    appliances: ['Aircon'],
    safety_and_security: ['Safe', 'Low Crime Rate'],
    meters_from_uplb: 100,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    size_sqm: 100,
    min_pax: 2,
    max_pax: 4,
    num_rooms: 30,
    num_beds: 2,
    landmarks: ['Near Los Banos Doctors Hospital and Medical Center'],
    cooking_rules: ['Allowed', 'Kitchen Area Only',],
    pet_rules: ['Allowed'],
    other_rules: ['Allowed'],

    ratings: 4.8,
    number_of_reviews: 20,
    commentor: 'Rodge Del Luna',
    comment: 'It is a nice place. We enjoyed out stay.'
  }

  // TODO: add ui/logic to handle non-existent accommodation
  if (!accommodation) {
    return <div>accommodation does not exits!</div>
  }

  return (
    <React.Fragment>
      <Navbar />
      <Box
        component="img"
        sx={{
          width: '100%',
          height: theme.spacing(60),
          objectFit: 'cover',
        }}
        alt="Location image"
        src={location}
      />

      <br /><br />
      <Grid container direction='column' rowGap={3} sx={{
        width: '70%',
        marginLeft: '15%',
      }}>

        <Grid item>

          <Grid container direction='row' justifyContent='space-between'>

            {/* Accommodation Name */}
            <Grid item >
              <Typography variant='h4' sx={{
                color: COLOR.blue,
              }}
              >{accommodation.name}</Typography>
            </Grid>

            {/* Price */}
            <Grid item>
              <Typography variant='h4' sx={{
                color: COLOR.blue,
              }}
              >Php {toPhp(accommodation.max_price)}</Typography>
            </Grid>

          </Grid>

          {/* Type */}
          <Grid item>
            <Typography variant='body1'>
              {accommodation.type}
            </Typography>
          </Grid>

        </Grid>

        <Grid item>
          <Grid container direction='row' columnGap={0.5}>

            <Grid item xs={3.75}>
              {/* Ratings Card */}
              <Card sx={{
                backgroundColor: COLOR.gray1,
                width: theme.spacing(41),
                height: theme.spacing(20),
                borderRadius: theme.spacing(2),
                boxShadow: '0px 4px 4px #6e6e73',
                padding: theme.spacing(2),
              }}>

                <Grid container>
                  <Grid item>
                    <Grid container direction='row' alignItems={'center'}>
                      <Grid item>
                        {/* Ratings */}
                        <Typography variant='h4' sx={{ color: COLOR.green }}>{accommodation.ratings}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='h5' sx={{ color: COLOR.textBlack }}>/5</Typography>
                      </Grid>
                      <Grid item>
                        {/* Rating */}
                        <Rating
                          value={4.5}
                          precision={0.5}
                          readOnly
                          sx={{
                            color: COLOR.green,
                            paddingTop: theme.spacing(1),
                            [theme.breakpoints.down('md')]: {
                              fontSize: theme.spacing(2.25),
                            },
                            [theme.breakpoints.down('sm')]: {
                              display: 'none',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item>
                        {/* Number of reviews */}
                        <Typography variant='body1' sx={{ color: COLOR.textBlack }}>({accommodation.number_of_reviews} ratings)</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row' alignContent='center'>
                      {/* Account Circle Icon */}
                      <Grid item>
                        <AccountCircleIcon sx={{ width: '45px', height: '45px', color: COLOR.textGray }} />
                      </Grid>
                      {/* Comments */}
                      <Grid item>
                        <Grid container direction='column'>
                          <Grid item>
                            <Typography variant='h6'>{accommodation.commentor}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='body2'>{accommodation.comment}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Ratings label */}
                  <Grid item>
                    <Typography variant='h6' sx={{ color: COLOR.blue }}>Reviews</Typography>
                  </Grid>
                </Grid>
              </Card> {/* End of Ratings Card */}
            </Grid>

            <Grid item xs={3.75}>
              {/* Facilities and Services Card */}
              <Card sx={{
                backgroundColor: COLOR.gray1,
                width: theme.spacing(41),
                height: theme.spacing(20),
                borderRadius: theme.spacing(2),
                boxShadow: '0px 4px 4px #6e6e73',
                padding: theme.spacing(2),
              }}>

                <Grid container>
                  <Grid item xs={12}>
                    <List dense={true}>
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant='body1'>{accommodation.amenities[0]}</Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant='body1'>{accommodation.amenities[1]}</Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  {/* Facilities and Services label */}
                  <Grid item>
                    <Typography variant='h6' paddingTop={2} sx={{ color: COLOR.blue }}>Facilities and Services</Typography>
                  </Grid>
                </Grid>
              </Card> {/* End of Facilities and Services Card */}
            </Grid>

            <Grid item xs={3.75}>
              {/* Facilities and Services Card */}
              <Card sx={{
                backgroundColor: COLOR.gray1,
                width: theme.spacing(41),
                height: theme.spacing(20),
                borderRadius: theme.spacing(2),
                boxShadow: '0px 4px 4px #6e6e73',
                padding: theme.spacing(2),
              }}>

                <Grid container alignContent='center'>
                  {/* Pin Drop Icon */}
                  <Grid item xs={2}>
                    <PinDropIcon sx={{ width: theme.spacing(6), height: theme.spacing(6), color: COLOR.green }} />
                  </Grid>
                  {/* Address */}
                  <Grid item xs={9}>
                    <Typography variant='body2'>
                      {accommodation.address}
                    </Typography>
                  </Grid>
                  {/* Distance from UPLB Gate */}
                  <Grid item xs={12}>
                    <Typography variant='body2' noWrap sx={{ fontWeight: 'bold', display:'flex' }}>
                      about 
                      <Typography variant='body2' sx={{ 
                        fontWeight: 'bold', 
                        color: COLOR.green, 
                        paddingLeft: theme.spacing(0.5),
                        paddingRight: theme.spacing(0.5),
                      }}>
                        {accommodation.meters_from_uplb} meters
                      </Typography>away from UPLB Gate
                    </Typography>
                  </Grid>
                  {/* Facilities and Services label */}
                  <Grid item>
                    <Typography variant='h6' paddingTop={2} sx={{ color: COLOR.blue }}>Address</Typography>
                  </Grid>
                </Grid>
              </Card> {/* End of Facilities and Services Card */}
            </Grid>

          </Grid>
        </Grid>

        {/* | Description */}
        <Grid item sx={{paddingTop: theme.spacing(2)}}>
          <Title text={'Description'} />
        </Grid>

        {/* Description */}
        <Grid item sx={{
          padding: theme.spacing(2),
        }}>
          <Typography variant='body1'>
            {accommodation.description}
          </Typography>
        </Grid>

        {/* | Apartment and Room Details */}
        <Grid item>
          <Title text={'Apartment and Room Details'} />
        </Grid>

        {/* Apartment and Room Details */}
        <Grid item sx={{
          backgroundColor: COLOR.gray1,
          padding: theme.spacing(2)
        }}>

          <Grid container rowGap={1}>
            {/* Room Size */}
            <Grid item xs={4}>
              <Typography variant='body1'>Room Size</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>{accommodation.size_sqm} square meters</Typography>
            </Grid>

            {/* Minimum Capacity */}
            <Grid item xs={4}>
              <Typography variant='body1'>Minimum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>{accommodation.min_pax}</Typography>
            </Grid>

            {/* Maximum Capacity */}
            <Grid item xs={4}>
              <Typography variant='body1'>Maximum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>{accommodation.max_pax}</Typography>
            </Grid>

            {/* Number of Rooms */}
            <Grid item xs={4}>
              <Typography variant='body1'>Number of Rooms</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>{accommodation.num_rooms} rooms</Typography>
            </Grid>

            {/* Number of Beds */}
            <Grid item xs={4}>
              <Typography variant='body1'>Number of Beds</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1'>{accommodation.num_beds} beds</Typography>
            </Grid>
          </Grid>

        </Grid> {/* End of apartment and room details */}

        {/* | Facilities and Services */}
        <Grid item>
          <Title text={'Facilities and Services'} />
        </Grid>

        {/* Facilities and Services Details */}
        <Grid item sx={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}>
          <Grid container>

            {/* Amenities */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Amenities</Typography>
            </Grid>
            {/* Amenities Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.amenities.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Appliances</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.appliances.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green, }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Safety and Security</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.safety_and_security.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green, }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
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
        <Grid item sx={{
          backgroundColor: COLOR.gray1,
        }}>

          <Grid container rowGap={1} sx={{ padding: theme.spacing(2) }}>
            {/* Distance from UPLB Gate */}
            <Grid item xs={12}>
              <Typography variant='body1'>About {accommodation.meters_from_uplb} meters from UPLB Gate</Typography>
            </Grid>
            {/* Other Landmark */}
            {accommodation.landmarks.map((value, index) => {
              return (
                <Grid item xs={12}>
                  <Typography variant='body1'>{value}</Typography>
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
        <Grid item sx={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}>
          <Grid container>

            {/* Cooking Rules */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Cooking Rules</Typography>
            </Grid>
            {/* Cooking Rules Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.cooking_rules.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Pet Rules */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Pet Rules</Typography>
            </Grid>
            {/* Pet Rules Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.pet_rules.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green, }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>

            {/* Applience */}
            <Grid item xs={4} paddingTop={'1.5%'}>
              <Typography variant='body1'>Other Rules</Typography>
            </Grid>
            {/* Appliances Details */}
            <Grid item xs={8}>
              <List dense={true}>
                {accommodation.other_rules.map((value, index) => {
                  return (
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: COLOR.green, }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant='body1'>{value}</Typography>
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Title text='Reviews' />
        </Grid>
        
      </Grid>
    </React.Fragment>
  )
}

export default AccommodationDetailPage
