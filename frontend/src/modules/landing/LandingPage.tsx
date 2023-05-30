/* eslint-disable react/jsx-key */
import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    Dialog,
    useMediaQuery,
    Card,
    CardContent,
    ImageList,
    ImageListItem,
    Grid,
  } from '@mui/material'
  import React from 'react'
  import logo from '../../assets/Images/Logo_Green.png'
  import ellens from '../../assets/Ellens.jpg'
  import Navbar from '../general/Navbar'
  import assets from '../../assets'
  import { FONT } from '../../theme'
  import { COLOR } from '../../theme'
  import { ForkRight, Scale } from '@mui/icons-material'
  import { makeStyles, createStyles } from '@mui/styles';
  import ImageListItemBar from '@mui/material/ImageListItemBar'
  
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
  interface IProps {
    children?: React.ReactNode
  }

  const useStyles = makeStyles(() => ({
    imageList: {
        // Hide Scrollbar
        // '-ms-overflow-style': 'none',  /* IE and Edge */
        // 'scrollbar-width': 'none', /* Firefox */
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
  }));
  
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
        uri:  von,
        name: 'Von Arellano',
        description: 'TL - Frontend',
      },
    },
    {
      thumbnail: {
        uri: eikou,
        name: 'Eikou Teknomo',
        description: 'TL - Backend',
      },
    },
    {
      thumbnail: {
        uri: angel,
        name: 'Angelica Naguio',
        description: 'TL - Database',
      },
    },
    {
      thumbnail: {
        uri: joshua,
        name: 'Joshua Abarro',
        description: 'Frontend Dev',
      },
    },
    {
      thumbnail: {
        uri: jonas,
        name: 'Jonas Atienza',
        description: 'Frontend Dev',
      },
    },
    {
      thumbnail: {
        uri: rodge,
        name: 'Rodge De Luna',
        description: 'Frontend Dev',
      },
    },
    {
      thumbnail: {
        uri: josef,
        name: 'Josef Gelera',
        description: 'Frontend Dev',
      },
    },
    {
      thumbnail: {
        uri: bona,
        name: 'Mark Bonayon',
        description: 'Backend Dev',
      },
    },
    {
      thumbnail: {
        uri: av,
        name: 'A.V Castillo',
        description: 'Backend Dev',
      },
    },
    {
      thumbnail: {
        uri: elijah,
        name: 'Elijah Malazarte',
        description: 'Backend Dev',
      },
    },
    {
      thumbnail: {
        uri: nicole,
        name: 'Nicole Sorinio',
        description: 'Backend Dev',
      },
    },
    {
      thumbnail: {
        uri: rafa,
        name: 'Rafael Sunga',
        description: 'Backend Dev',
      },
    },
    {
        thumbnail: {
          uri: denzel,
          name: 'Denzel Dayrit',
          description: 'Database Dev',
        },
      },
    {
        thumbnail: {
          uri: echo,
          name: 'Jericho Dolendo',
          description: 'Database Dev',
        },
      },
    {
        thumbnail: {
        uri: lyle,
        name: 'Lyle Lacsamana',
        description: 'Database Dev',
        },
    },
    {
        thumbnail: {
            uri: bene,
            name: 'Benedict Sy',
            description: 'Database Dev',
        },
    },
  ]
  const LandingPage: React.FC<IProps> = () => {
    const theme = useTheme();
    const classes = useStyles();
  
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
                  //   onClick={handleOpen}
                >
                  Create Account
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    marginTop: theme.spacing(2),
                  }}
                  //   onClick={handleOpen}
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
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '12%',
            [theme.breakpoints.down('md')]: {
              height: '40vh',
              width: '100vw',
              overflow: 'hidden',
            },
            [theme.breakpoints.down('sm')]: {
              height: '40vh',
              paddingTop: '10%',
            },
            justifyContent: 'flex-start',
            height: '70vh',
            width: '100vw',
            overflow: 'hidden',
          }}
        >
          <Box
              sx={{
                  [theme.breakpoints.down('sm')]: {
                  height: theme.spacing(200 / 8),
                  },
                  justifyContent: 'center',
                  height: theme.spacing(315 / 8),
                  display: 'flex',
              }}
          >
              <Box
                  component="img"
                  sx={{
                  [theme.breakpoints.down('sm')]: {
                      display: 'none'
                  },
                  [theme.breakpoints.down('md')]: {
                      display: 'none'
                  },
                      height: theme.spacing(315 / 8),
                      marginTop: theme.spacing(-12),
                      marginRight: theme.spacing(15),
                  }}
                  alt="green logo"
                  src={logo}
              />
              <Grid item>
                  <Box
                      
                      sx={{
                          [theme.breakpoints.down('sm')]: {
                          height: theme.spacing(200 / 8),
                          },
                          justifyContent: 'center',
                          height: theme.spacing(315 / 8),
                      }}
                  >
                      <Grid item>
                          
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
                          Find the accommodation for YOU
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Typography
                          variant="h6"
                          sx={{
                              textAlign: 'center',
                              color: 'gray',
                              [theme.breakpoints.down('md')]: {
                              fontSize: theme.spacing(3),
                              },
                              [theme.breakpoints.down('sm')]: {
                              fontSize: theme.spacing(2),
                              },
                          }}
                          >
                          Let us take the stress out of your accommodation search, so you can focus on creating wonderful memories during your upcoming journey. Trust us to help you find the accommodation that is perfectly suited to YOU.
                          </Typography>
                      </Grid>
                  </Box>
              </Grid>
          </Box>
        </Grid>
  
        <Grid
          container
          sx={{
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingTop: '12%',
            [theme.breakpoints.down('md')]: {
              height: '40vh',
              width: '100vw',
              overflow: 'hidden',
            },
            [theme.breakpoints.down('sm')]: {
              height: '40vh',
              paddingTop: '10%',
            },
            justifyContent: 'flex-start',
            height: '70vh',
            width: '100vw',
            overflow: 'hidden',
          }}
        >
          <Box
              sx={{
                  [theme.breakpoints.down('sm')]: {
                  height: theme.spacing(200 / 8),
                  },
                  justifyContent: 'center',
                  height: theme.spacing(315 / 8),
                  display: 'flex',
              }}
          >
              <Grid item>
                  <Box
                      
                      sx={{
                          [theme.breakpoints.down('sm')]: {
                          height: theme.spacing(200 / 8),
                          },
                          justifyContent: 'center',
                          height: theme.spacing(315 / 8),
                      }}
                  >
                      <Grid item>
                          
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
                          Create a listing of YOUR accommodation
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Typography
                          variant="h6"
                          sx={{
                              textAlign: 'center',
                              color: 'gray',
                              [theme.breakpoints.down('md')]: {
                              fontSize: theme.spacing(3),
                              },
                              [theme.breakpoints.down('sm')]: {
                              fontSize: theme.spacing(2),
                              },
                          }}
                          >
                          Maximize your property's visibility and showcase its unique features, amenities, and location to entice guests to choose YOUR accommodation as their top choice for an unforgettable stay away from home.
                          </Typography>
                      </Grid>
                  </Box>
              </Grid>
              <Box
                  component="img"
                  sx={{
                      [theme.breakpoints.down('sm')]: {
                          display: 'none'
                      },
                      [theme.breakpoints.down('md')]: {
                          display: 'none'
                      },
                      height: theme.spacing(315 / 8),
                      marginTop: theme.spacing(-12),
                      marginLeft: theme.spacing(15),
                  }}
                  alt="green logo"
                  src={logo}
              />
          </Box>
        </Grid>
        <Grid item>
              <Box
                  textAlign='center'
                  sx={{
                      [theme.breakpoints.down('sm')]: {
                      height: theme.spacing(200 / 8),
                      },
                      justifyContent: 'center',
                      height: theme.spacing(200 / 8),
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
                      Your Ideal Stay Awaits
                  </Typography>
                  <Button
                      variant="contained"
                      sx={{
                          [theme.breakpoints.down('sm')]: {
                              maxWidth: '100px', maxHeight: '50px', minWidth: '100px', minHeight: '50px',
                              fontSize: '15px'
                          },
                          backgroundColor: theme.palette.primary.main,
                          marginTop: theme.spacing(2),
                          marginRight: theme.spacing(2),
                          maxWidth: '150px', maxHeight: '75px', minWidth: '150px', minHeight: '75px',
                          fontSize: '20px'
                      }}
                      //   onClick={handleOpen}
                  >
                      Join now
                  </Button>
                  <Button
                      variant="contained"
                      sx={{
                          [theme.breakpoints.down('sm')]: {
                              maxWidth: '100px', maxHeight: '50px', minWidth: '100px', minHeight: '50px',
                              fontSize: '12px'
                          },
                          backgroundColor: theme.palette.secondary.main,
                          marginTop: theme.spacing(2),
                          maxWidth: '150px', maxHeight: '75px', minWidth: '150px', minHeight: '75px',
                          fontSize: '20px'
                      }}
                      //   onClick={handleOpen}
                  >
                      Learn More
                  </Button>
              </Box>
          </Grid>
  
        {/* Team Members */}
        <Box
          sx={{
            backgroundImage: `url(${assets.banner2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: theme.spacing(315 / 4),
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              marginTop: theme.spacing(5),
              color: COLOR.white,
              font: FONT.sourceSansPro,
            }}
          >
            THE TEAM
          </Typography>
          <ImageList
            className={classes.imageList}
            gap={150}
            cols={4}
            sx={{
              marginTop: '10%',
              paddingLeft: '10%',
              paddingRight: '10%',
              gridAutoFlow: 'column',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(160px,1fr)) !important',
              gridAutoColumns: 'minmax(160px, 1fr)',
            }}
          >
            {team.map((image, key: number) => (
              <ImageListItem key={key}>
                <img src={image.thumbnail.uri} width={200} height={200} />
                <ImageListItemBar
                  title={
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
                        color: '#60CE80',
                      }}
                    >
                      {image.thumbnail.name}
                    </Typography>
                  }
                  subtitle={
                    <span>
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
                          color: '#60CE80',
                        }}
                      >
                        {image.thumbnail.description}
                      </Typography>
                    </span>
                  }
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Box
            sx={{
              height: '90vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Box>
        </Box>
        {/* FAQS*/}
  
        <Grid
          container
          sx={{
            justifyContent: 'center',
            height: theme.spacing(50),
          }}
        >
        </Grid>
        <hr
          style={{
            background: 'lime',
            color: '#60CE80',
            borderColor: 'lime',
            height: '3px',
          }}
        />
        {/*Copyright etc... */}
        <Grid
          container
          sx={{
            paddingLeft: '2%',
            [theme.breakpoints.down('md')]: {
              height: theme.spacing(100 / 10),
            },
            [theme.breakpoints.down('sm')]: {
              height: theme.spacing(50 / 8),
            },
            height: theme.spacing(315 / 20),
          }}
        >
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3rem',
                [theme.breakpoints.down('sm')]: {
                  gap: '1rem',
                },
              }}
            >
              <Box
                component="img"
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    height: theme.spacing(50 / 8),
                  },
                  justifyContent: 'center',
                  height: theme.spacing(315 / 20),
                }}
                alt="green logo"
                src={logo}
              />
              <Typography
                variant="h5"
                sx={{
                  marginTop: '2%',
                  [theme.breakpoints.down('md')]: {
                    fontSize: theme.spacing(1.75),
                  },
                  [theme.breakpoints.down('sm')]: {
                    fontSize: theme.spacing(1.25),
                  },
                  textAlign: 'center',
                  color: '#154360',
                }}
              >
                © 2023
              </Typography>
              <Button variant="text"
                  sx={{
                      marginTop: '2%',
                      [theme.breakpoints.down('sm')]: {
                          maxWidth: '60px', maxHeight: '50px', minWidth: '60px', minHeight: '50px',
                          fontSize: '12px'
                      },
                      maxWidth: '250px', maxHeight: '70px', minWidth: '250px', minHeight: '70px',
                      fontSize: '20px',
                      textAlign: 'center',
                      color: '#154360',    
                  }}
              >
                  TERMS AND CONDITIONS
              </Button>
              <Button
                variant="text"
                sx={{
                    marginTop: '2%',
                    [theme.breakpoints.down('sm')]: {
                        maxWidth: '60px', maxHeight: '50px', minWidth: '60px', minHeight: '50px',
                        fontSize: '12px'
                    },
                    maxWidth: '200px', maxHeight: '70px', minWidth: '200px', minHeight: '70px',
                    fontSize: '20px',
                    textAlign: 'center',
                    color: '#154360',    
                }}
              >
                PRIVACY POLICY
              </Button>
              <Button
                 variant="text"
                 sx={{
                     marginTop: '2%',
                     [theme.breakpoints.down('sm')]: {
                         maxWidth: '60px', maxHeight: '50px', minWidth: '60px', minHeight: '50px',
                         fontSize: '12px'
                     },
                     maxWidth: '200px', maxHeight: '70px', minWidth: '200px', minHeight: '70px',
                     fontSize: '20px',
                     textAlign: 'center',
                     color: '#154360',    
                 }}
              >
                CONTACT NUMBER
              </Button>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
  
  export default LandingPage
  