import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'
import location from '../../assets/Images/Ellens.jpg'
// import check from '../../assets/ImgaCheck Green.png'
// import pin from '../../assets/Map pin - Green.png'
import { Box, Container, Typography, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { setCurrentAccommodation } from '../../store/forum/actions'

interface IProps {
  accommodation: any
  // children?: React.ReactNode
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

interface AccommDetails {
  accommodation: IAccommodation
}

// NOTE : Linter is angry at map functions

const AccommodationFormPreview: React.FC<IProps> = (props: IProps) => {
  console.log(props.accommodation)
  // TODO: add ui/logic to handle non-existent accommodation
  if (!props.accommodation) {
    return <div>accommodation does not exist!</div>
  }

  return (
    <div>
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
          <Typography variant="h2">{props.accommodation.name}</Typography>
          <Typography variant="h2">{props.accommodation.price}</Typography>
        </Box>

        <Typography variant="h5">{props.accommodation.type}</Typography>

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
            {props.accommodation.amenities.map((e, index) => {
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
                  <Typography>{e}</Typography>
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
              <Typography>{props.accommodation.address}</Typography>
            </Box>

            <Typography sx={{ fontWeight: 'bold' }}>
              about
              <Typography
                sx={{ display: 'inline', fontWeight: 'bold', color: '#60ce80' }}
              >
                &nbsp;{props.accommodation.meters_from_uplb} meters&nbsp;
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
          <Typography>{props.accommodation.description}</Typography>
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
              <Typography>
                {props.accommodation.size_sqm} square meters
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Minimum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{props.accommodation.min_pax}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Maximum Capacity</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{props.accommodation.max_pax}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Number of Rooms</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{props.accommodation.num_rooms} rooms</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography>Number of Beds</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{props.accommodation.num_beds} beds</Typography>
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
              {props.accommodation.amenities.map((e, index) => {
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
                    <Typography>{e}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Appliances</Typography>
            </Grid>
            <Grid item xs={8}>
              {props.accommodation.appliances.map((e, index) => {
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
                    <Typography>{e}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Safety and Security</Typography>
            </Grid>
            <Grid item xs={8}>
              {props.accommodation.safety_and_security.map((e, index) => {
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
              {props.accommodation.meters_from_uplb} meters
            </Grid>
            <Grid item xs={4}>
              {props.accommodation.landmarks.map((e, index) => {
                return <Typography key={index}>{e}</Typography>
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
              {props.accommodation.cooking_rules.map((e, index) => {
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
                    <Typography>{e}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Pet Rules</Typography>
            </Grid>
            <Grid item xs={8}>
              {props.accommodation.pet_rules.map((e, index) => {
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
                    <Typography>{e}</Typography>
                  </Box>
                )
              })}
            </Grid>

            <Grid item xs={4}>
              <Typography>Other Rules</Typography>
            </Grid>
            <Grid item xs={8}>
              {props.accommodation.other_rules.map((e, index) => {
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
                    <Typography>{e}</Typography>
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
      </Container>
    </div>
  )
}

export default AccommodationFormPreview
