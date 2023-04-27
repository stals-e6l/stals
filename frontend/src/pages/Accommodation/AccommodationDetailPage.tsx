import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import location from '../../assets/Images/Ellens.jpg'
// import check from '../../assets/ImgaCheck Green.png'
// import pin from '../../assets/Map pin - Green.png'
import { Button, Box, Container, Typography, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Forum from '../Forum/Forum'
import AddCommentToForum from '../Forum/AddCommentToForum'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'

interface IProps {
  children?: React.ReactNode
}

const boxStyle = {
  width: '33%',
  minReight: '50px',
  borderRadius: '5px',
  margin: '5px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0px 3px 5px #888888',
  padding: '0px 10px 20px 10px',
  position: 'relative',
  overflow: 'hidden',
}

const boxLabel = {
  fontFamily: 'Source Sans Pro',
  fontWeight: 'bold',
  color: '#154360',
  fontSize: 'large',
  position: 'absolute',
  bottom: '0',
  paddingBottom: '2px',
}

const greenLine = {
  width: '3px',
  height: '20px',
  margin: '5px',
  backgroundColor: '#60ce80',
}

const title = { display: 'flex', alignItems: 'center', paddingTop: '10px' }

const unshadedTable = {
  width: '100%',
  marginLeft: '15px',
  marginRight: '15px',
  paddingBottom: '5px',
}

const shadedTable = {
  width: '100%',
  borderRadius: '5px',
  marginLeft: '10px',
  marginRight: '10px',
  backgroundColor: '#f0f0f0',
  padding: '15px 30px',
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)
  const forum = retrieveForumByCurrentAccommodation()

  // TODO: add ui/logic to handle non-existent accommodation
  if (!accommodation) {
    return <div>accommodation does not exits!</div>
  }

  return (
    <React.Fragment>
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '300px',
        }}
        alt="location image"
        src={location}
      />

      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Source Sans Pro',
          }}
        >
          <Typography variant="h2">{accommodation.name}</Typography>
          <Typography variant="h2">{accommodation.price}</Typography>
        </Box>

        <Typography variant="h5">{accommodation.type}</Typography>

        <Box sx={{ display: 'flex' }}>
          <Box sx={boxStyle}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography
                sx={{
                  fontSize: '40px',
                  fontFamily: 'Source Sans Pro',
                  color: '#60ce80',
                }}
              >
                4
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Source Sans Pro',
                  color: '#154360',
                  paddingBottom: '8px',
                }}
              >
                /5
              </Typography>
              <Box sx={{ paddingBottom: '6px', paddingLeft: '5px' }}>
                <div>Placeholder</div>
                <Typography>1000+ reviews</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountCircleIcon
                id="userIcon"
                sx={{ color: '#154360', width: '45px', height: '45px' }}
              />
              <Box>
                <Typography sx={{ color: '#888888', fontWeight: 'bold' }}>
                  Rodge De Luna
                </Typography>
                <Typography sx={{ fontSize: 'small' }}>
                  It is a nice place. We enjoyed our stay.
                </Typography>
              </Box>
            </Box>

            <Typography sx={boxLabel}>Review</Typography>
          </Box>

          <Box sx={boxStyle}>
            {accommodation.amenities.map((value, index) => {
              return (
                <Box key={index} sx={{ display: 'flex' }}>
                  <Box
                    component="img"
                    sx={{
                      width: '25px',
                      height: '25px',
                    }}
                    alt="check image"
                    // src={check}
                    src={''}
                  />
                  <Typography>{value}</Typography>
                </Box>
              )
            })}
            <Typography sx={boxLabel}>Facilities and Services</Typography>
          </Box>

          <Box sx={boxStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                sx={{
                  width: '50px',
                  height: '50px',
                }}
                alt="pin image"
                src={''}
              />
              <Typography>{accommodation.address}</Typography>
            </Box>

            <Typography sx={{ fontWeight: 'bold' }}>
              about
              <Typography
                sx={{ display: 'inline', fontWeight: 'bold', color: '#60ce80' }}
              >
                &nbsp;{accommodation.meters_from_uplb} meters&nbsp;
              </Typography>
              from UPLB
            </Typography>
            <Typography sx={boxLabel}>Address</Typography>
          </Box>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography sx={{ fontWeight: 'bold' }}>Description</Typography>
        </Box>
        <Box sx={unshadedTable}>
          <Typography>{accommodation.description}</Typography>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography sx={{ fontWeight: 'bold' }}>
            Apartment and Room Details
          </Typography>
        </Box>
        <Box sx={shadedTable}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography>Room Size</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{accommodation.size_sqm} square meters</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Minimum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{accommodation.min_pax}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Maximum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{accommodation.max_pax}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Number of Rooms</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{accommodation.num_rooms} rooms</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Number of Beds</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{accommodation.num_beds} beds</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography sx={{ fontWeight: 'bold' }}>
            Facilities and Services
          </Typography>
        </Box>
        <Box sx={unshadedTable}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography>Amenities</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.amenities.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Appliances</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.appliances.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Safety and Security</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.safety_and_security.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>
          </Grid>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography sx={{ fontWeight: 'bold' }}>Landmark</Typography>
        </Box>
        <Box sx={shadedTable}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography>UPLB Gate</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.meters_from_uplb} meters
            </Grid>
            <Grid item xs={4}>
              {accommodation.landmarks.map((value, index) => {
                return <Typography key={index}>{value}</Typography>
              })}
            </Grid>
          </Grid>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography sx={{ fontWeight: 'bold' }}>Policies</Typography>
        </Box>
        <Box sx={unshadedTable}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography>Cooking Rules</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.cooking_rules.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Pet Rules</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.pet_rules.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Other Rules</Typography>
            </Grid>
            <Grid item xs={8}>
              {accommodation.other_rules.map((value, index) => {
                return (
                  <Box key={index} sx={{ display: 'flex' }}>
                    <Box
                      component="img"
                      sx={{
                        width: '25px',
                        height: '25px',
                      }}
                      alt="check image"
                      // src={check}
                      src=""
                    />
                    <Typography>{value}</Typography>
                  </Box>
                )
              })}
            </Grid>
          </Grid>
        </Box>

        <Box sx={title}>
          <Box sx={greenLine} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Reviews
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            borderRadius: '5px',
            marginLeft: '10px',
            marginRight: '10px',
            backgroundColor: '#f0f0f0',
            padding: '15px 30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              sx={{
                color: '#60ce80',
                fontSize: '45px',
                fontWeight: 'bold',
              }}
            >
              4.7
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                paddingBottom: '8px',
                color: '#154360',
              }}
            >
              /5
            </Typography>
            <Box
              sx={{
                paddingBottom: '10px',
                paddingLeft: '5px',
              }}
            >
              <Typography>Placeholder</Typography>
              <Typography>1000+ reviews</Typography>
            </Box>
          </Box>
          <AddCommentToForum forumId={forum._id as string} />
        </Box>

        <Forum />

        {/* <Box sx={unshadedTable}>
          <Box sx={{ paddingBottom: '10px' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              Von Arellano
            </Typography>
            <Typography>Placeholder</Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab
              pariatur reiciendis rerum, laudantium suscipit rem natus ducimus
              totam id facilis quibusdam vero modi dolores ipsam saepe
              temporibus corporis fuga.
            </Typography>
          </Box>

          <Box sx={{ paddingBottom: '10px' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              Von Arellano
            </Typography>
            <Typography>Placeholder</Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab
              pariatur reiciendis rerum, laudantium suscipit rem natus ducimus
              totam id facilis quibusdam vero modi dolores ipsam saepe
              temporibus corporis fuga.
            </Typography>
          </Box>

          <Box sx={{ paddingBottom: '10px' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              Von Arellano
            </Typography>
            <Typography>Placeholder</Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab
              pariatur reiciendis rerum, laudantium suscipit rem natus ducimus
              totam id facilis quibusdam vero modi dolores ipsam saepe
              temporibus corporis fuga.
            </Typography>
          </Box>
        </Box> */}
      </Container>
    </React.Fragment>
  )
}

export default AccommodationDetailPage
