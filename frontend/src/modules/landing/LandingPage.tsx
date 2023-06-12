/* eslint-disable react/jsx-key */
import {
  Box,
  Typography,
  Button,
  useTheme,
  ImageList,
  Grid,
} from '@mui/material'
import React from 'react'
import logo from '../../assets/Images/Logo_Green.png'
import Navbar from '../general/Navbar'
import assets from '../../assets'
import { FONT } from '../../theme'
import { COLOR } from '../../theme'
import { makeStyles, createStyles } from '@mui/styles'

// imports for each profile image kasi di ko alam paano maglagay ng wala to
import bene from '../../assets/Team/bene.jpg'
import vonpm from '../../assets/Team/vonpm.jpg'
import joshua from '../../assets/Team/joshua.png'
import rodge from '../../assets/Team/rodge.png'
import bona from '../../assets/Team/bona.png'
import elijah from '../../assets/Team/elijah.png'
import nicole from '../../assets/Team/nicole.png'
import rafa from '../../assets/Team/rafa.png'
import denzel from '../../assets/Team/denzel.jpg'
import echo from '../../assets/Team/echo.png'
import lyle from '../../assets/Team/lyle.png'
import angel from '../../assets/Team/angel.jpg'
import von from '../../assets/Team/von.jpg'
import eikou from '../../assets/Team/eikou.jpg'
import jonas from '../../assets/Team/jonas.jpg'
import josef from '../../assets/Team/josef.jpg'
import av from '../../assets/Team/av.jpg'
import angcana from '../../assets/Team/Angcana.png'
import recario from '../../assets/Team/Recario.png'
import find from '../../assets/Images/Find.jpg'
import create from '../../assets/Images/Create.jpg'
import Footer from '../general/Footer'
interface IProps {
  children?: React.ReactNode
}

const useStyles = makeStyles(() => ({
  imageList: {
    // Hide Scrollbar
    // '-ms-overflow-style': 'none',  /* IE and Edge */
    // 'scrollbar-width': 'none', /* Firefox */
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
}))

const team = [
  {
    thumbnail: {
      uri: vonpm,
      name: 'Von Divino',
      description: 'Project Manager',
    },
  },
  {
    thumbnail: {
      uri: von,
      name: 'Von Arellano',
      description: 'Team Leader - Frontend',
    },
  },
  {
    thumbnail: {
      uri: eikou,
      name: 'Eikou Teknomo',
      description: 'Team Leader - Backend',
    },
  },
  {
    thumbnail: {
      uri: angel,
      name: 'Angelica Naguio',
      description: 'Team Leader - Database',
    },
  },
  {
    thumbnail: {
      uri: joshua,
      name: 'Joshua Abarro',
      description: 'Frontend Developer',
    },
  },
  {
    thumbnail: {
      uri: jonas,
      name: 'Jonas Atienza',
      description: 'Frontend Developer',
    },
  },
  {
    thumbnail: {
      uri: rodge,
      name: 'Rodge De Luna',
      description: 'Frontend Developer',
    },
  },
  {
    thumbnail: {
      uri: josef,
      name: 'Josef Gelera',
      description: 'Frontend Developer',
    },
  },
  {
    thumbnail: {
      uri: bona,
      name: 'Mark Bonayon',
      description: 'Backend Developer',
    },
  },
  {
    thumbnail: {
      uri: av,
      name: 'A.V Castillo',
      description: 'Backend Developer',
    },
  },
  {
    thumbnail: {
      uri: elijah,
      name: 'Elijah Malazarte',
      description: 'Backend Developer',
    },
  },
  {
    thumbnail: {
      uri: nicole,
      name: 'Nicole Sorinio',
      description: 'Backend Developer',
    },
  },
  {
    thumbnail: {
      uri: rafa,
      name: 'Rafael Sunga',
      description: 'Backend Developer',
    },
  },
  {
    thumbnail: {
      uri: denzel,
      name: 'Denzel Dayrit',
      description: 'Database Developer',
    },
  },
  {
    thumbnail: {
      uri: echo,
      name: 'Jericho Dolendo',
      description: 'Database Developer',
    },
  },
  {
    thumbnail: {
      uri: lyle,
      name: 'Lyle Lacsamana',
      description: 'Database Developer',
    },
  },
  {
    thumbnail: {
      uri: bene,
      name: 'Benedict Sy',
      description: 'Database Developer',
    },
  },
  {
    thumbnail: {
      uri: angcana,
      name: 'Carl Angcana',
      description: 'Mentor',
    },
  },
  {
    thumbnail: {
      uri: recario,
      name: 'Reginald Recario',
      description: 'Mentor',
    },
  },
]
const LandingPage: React.FC<IProps> = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <React.Fragment>
      <Navbar />
      {/* Primary */}
      <Grid
        container
        sx={{
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingTop: '5%',
          [theme.breakpoints.down('md')]: {
            padding: '0% 12%',
            paddingTop: '10%',
            backgroundImage: `url(${assets.banner2})`,
            overflow: 'hidden',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '0% 2%',
            paddingTop: '50%',
            backgroundImage: `url(${assets.banner2})`,
          },
          backgroundImage: `url(${assets.banner})`,
          backgroundSize: 'cover',
          // backgroundAttachment: 'fixed',
          justifyContent: 'flex-start',
          height: '70vh',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <Grid item>
          <Box
            component="img"
            sx={{
              [theme.breakpoints.down('sm')]: {
                height: theme.spacing(200 / 8),
              },
              justifyContent: 'center',
              height: theme.spacing(315 / 8),
            }}
            alt="green logo"
            src={logo}
          />
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                marginTop: theme.spacing(-6),
                color: 'white',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(3),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(2),
                },
              }}
            >
              Find your perfect place according to your preference
            </Typography>
          </Grid>
          <Grid item>
            <Box
              textAlign="center"
              sx={{
                [theme.breakpoints.down('sm')]: {
                  height: theme.spacing(200 / 8),
                },
                justifyContent: 'center',
                height: theme.spacing(315 / 8),
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  marginTop: theme.spacing(2),
                  marginRight: theme.spacing(2),
                }}
                onClick={() => {
                  window.open('https://www.airvnv.info/auth', '_blank')
                }}
              >
                Create Account
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  marginTop: theme.spacing(2),
                }}
                onClick={() => {
                  window.open('https://www.airvnv.info/public', '_blank')
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Accommodation for everyone */}
      <Grid
        container
        sx={{
          width: '100%',
        }}
        item
        xs={12}
      >
        <Grid item xs={0} md={6}>
          <Box
            component="img"
            sx={{
              [theme.breakpoints.down('sm')]: {
                display: 'none',
              },
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
              width: '100%',
            }}
            alt="find"
            src={find}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          alignItems="center"
          sx={{
            padding: theme.spacing(4),
          }}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            sx={{
              padding: theme.spacing(4),
            }}
          >
            <Typography
              variant="h3"
              sx={{
                // textAlign: 'justify',
                color: 'black',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(5),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(4),
                },
              }}
            >
              Find the accommodation for{' '}
              <span style={{ color: `${theme.palette.secondary.main}` }}>
                you
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'justify',
                color: 'gray',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(3),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(2),
                },
              }}
            >
              Let us take the stress out of your accommodation search, so you
              can focus on creating wonderful memories during your upcoming
              journey. Trust us to help you find the accommodation that is
              perfectly suited to you.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          width: '100%',
        }}
        item
        xs={12}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          alignItems="center"
          sx={{
            padding: theme.spacing(4),
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              padding: theme.spacing(4),
            }}
          >
            <Typography
              variant="h3"
              sx={{
                // textAlign: 'justify',
                color: 'black',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(5),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(4),
                },
              }}
            >
              Create a listing of{' '}
              <span style={{ color: `${theme.palette.secondary.main}` }}>
                your
              </span>{' '}
              accommodation
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'justify',
                color: 'gray',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(3),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(2),
                },
              }}
            >
              Maximize your property's visibility and showcase its unique
              features, amenities, and location to entice guests to choose YOUR
              accommodation as their top choice for an unforgettable stay away
              from home.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: theme.spacing(3),
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.spacing(2),
            },
          }}
        >
          <Box
            component="img"
            sx={{
              [theme.breakpoints.down('sm')]: {
                display: 'none',
              },
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
              width: '100%',
            }}
            alt="find"
            src={create}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Box
          textAlign="center"
          sx={{
            [theme.breakpoints.down('sm')]: {
              height: theme.spacing(200 / 8),
            },
            justifyContent: 'center',
            height: theme.spacing(200 / 8),
            marginTop: theme.spacing(5),
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: 'black',
              [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(5),
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.spacing(4),
              },
            }}
          >
            Your ideal stay awaits
          </Typography>
          <Button
            variant="contained"
            sx={{
              [theme.breakpoints.down('sm')]: {
                maxWidth: '100px',
                maxHeight: '50px',
                minWidth: '100px',
                minHeight: '50px',
                fontSize: '15px',
              },
              backgroundColor: theme.palette.primary.main,
              marginTop: theme.spacing(2),
              marginRight: theme.spacing(2),
              maxWidth: '150px',
              maxHeight: '75px',
              minWidth: '150px',
              minHeight: '75px',
              fontSize: '20px',
            }}
            onClick={() =>
              window.open('https://www.airvnv.info/public', '_blank')
            }
          >
            Try now
          </Button>
          <Button
            variant="contained"
            sx={{
              [theme.breakpoints.down('sm')]: {
                maxWidth: '100px',
                maxHeight: '50px',
                minWidth: '100px',
                minHeight: '50px',
                fontSize: '12px',
              },
              backgroundColor: theme.palette.secondary.main,
              marginTop: theme.spacing(2),
              maxWidth: '150px',
              maxHeight: '75px',
              minWidth: '150px',
              minHeight: '75px',
              fontSize: '20px',
            }}
            onClick={() =>
              window.open('https://www.airvnv.info/auth', '_blank')
            }
          >
            Join now
          </Button>
        </Box>
      </Grid>

      {/* Team Members */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginTop: '1em',
          paddingTop: '2em',
          paddingBottom: '2em',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            color: COLOR.white,
            font: FONT.sourceSansPro,
          }}
        >
          THE TEAM
        </Typography>
        <ImageList
          className={classes.imageList}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {team.map((image, key: number) => (
            <Grid container key={key} alignItems="flex-start" item xs={2}>
              {/* // <ImageListItem key={key}> */}
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="flex-start"
                sx={{ padding: theme.spacing(1) }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: '50%',
                    width: '75%',
                    objectFit: 'cover',
                    height: '75%',
                    border: `3px solid ${theme.palette.secondary.main}`,
                    margin: '0 auto',
                    padding: theme.spacing(1),
                    transition: '0.3s all',
                    '&:hover': { width: '100%' },
                  }}
                  src={image.thumbnail.uri}
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                      },
                      textAlign: 'center',
                      color: theme.palette.common.white,
                    }}
                  >
                    {image.thumbnail.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                      },
                      textAlign: 'center',
                      color: theme.palette.common.white,
                    }}
                  >
                    {image.thumbnail.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </ImageList>
        <Box
          sx={{
            // height: '90vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></Box>
      </Box>
      <hr
        style={{
          background: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          height: '3px',
        }}
      />
      {/*Copyright etc... */}
      <Footer />
      {/* <Grid
        container
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
        }}
        item
        xs={12}
      >
        <Grid item xs={3}>
          <Box
            component="img"
            sx={{
              [theme.breakpoints.down('md')]: {
                height: theme.spacing(50 / 8),
              },
              justifyContent: 'center',
              height: theme.spacing(315 / 20),
            }}
            alt="green logo"
            src={logo}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography
              variant="h5"
              sx={{
                // marginTop: '50%',
                [theme.breakpoints.down('md')]: {
                  fontSize: theme.spacing(1.75),
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.spacing(1.25),
                },
                textAlign: 'center',
                color: theme.palette.primary.main,
              }}
            >
              © 2023
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={10}
            sx={{
              [theme.breakpoints.down('md')]: {
                gap: '0.5cm',
              },
              gap: '5rem',
            }}
          >
            <Grid item xs={2}>
              <Button
                variant="text"
                sx={{
                  [theme.breakpoints.down('md')]: {
                    maxWidth: '60px',
                    maxHeight: '50px',
                    minWidth: '60px',
                    minHeight: '50px',
                    fontSize: '12px',
                  },
                  maxWidth: '250px',
                  maxHeight: '70px',
                  minWidth: '250px',
                  minHeight: '70px',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                }}
              >
                TERMS AND CONDITIONS
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="text"
                sx={{
                  [theme.breakpoints.down('md')]: {
                    maxWidth: '60px',
                    maxHeight: '50px',
                    minWidth: '60px',
                    minHeight: '50px',
                    fontSize: '12px',
                  },
                  maxWidth: '200px',
                  maxHeight: '70px',
                  minWidth: '200px',
                  minHeight: '70px',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                }}
              >
                PRIVACY POLICY
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="text"
                sx={{
                  [theme.breakpoints.down('md')]: {
                    maxWidth: '60px',
                    maxHeight: '50px',
                    minWidth: '60px',
                    minHeight: '50px',
                    fontSize: '12px',
                  },
                  maxWidth: '200px',
                  maxHeight: '70px',
                  minWidth: '200px',
                  minHeight: '70px',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                }}
              >
                CONTACT NUMBER
              </Button>
            </Grid>
          </Grid>
        </Grid> 
      </Grid>*/}
    </React.Fragment>
  )
}

export default LandingPage
