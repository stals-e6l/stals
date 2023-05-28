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
import Navbar from '../general/Navbar'
import assets from '../../assets'
import { FONT } from '../../theme'
import { COLOR } from '../../theme'
import { ForkRight, Scale } from '@mui/icons-material'

import ImageListItemBar from '@mui/material/ImageListItemBar'

interface IProps {
  children?: React.ReactNode
}

const team = [
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
  {
    thumbnail: {
      uri: 'https://picsum.photos/200',
      name: 'Von',
      description: 'BIG BOSS',
    },
  },
]
const LandingPage: React.FC<IProps> = () => {
  const theme = useTheme()

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
            paddingTop: '25%',
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
          [theme.breakpoints.down('md')]: {},
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(850 / 8),
          },
          justifyContent: 'center',
          height: theme.spacing(315 / 4),
        }}
      >
        <Grid item>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              marginTop: theme.spacing(5),
              color: theme.palette.primary.main,
              [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(5),
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: theme.spacing(3.5),
              },
            }}
          >
            Accommodation for Everyone
          </Typography>
          <Grid item>
            <Box
              textAlign="center"
              sx={{
                flexDirection: 'row',
                marginTop: theme.spacing(5),
                justifyContent: 'space-evenly',
                display: 'flex',
              }}
            >
              <Card
                sx={{
                  backgroundColor: theme.palette.primary.main,
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
                <CardContent sx={{ wordSpacing: '10' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(2.5),
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(2),
                      },
                      textAlign: 'center',
                      color: COLOR.white,
                    }}
                  >
                    Find the accommodation for YOU
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  backgroundColor: theme.palette.primary.main,
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
                <CardContent sx={{ wordSpacing: '10' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(2.5),
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(2),
                      },
                      textAlign: 'center',
                      color: COLOR.white,
                    }}
                  >
                    ... Or create a listing of YOUR accommodation
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
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
          gap={150}
          sx={{
            marginTop: '10%',
            gridAutoFlow: 'column',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(160px,1fr)) !important',
            gridAutoColumns: 'minmax(160px, 1fr)',
          }}
        >
          {team.map((image, key: number) => (
            <ImageListItem key={key}>
              <img src={image.thumbnail.uri} />
              <ImageListItemBar
                title={
                  <Typography
                    variant="h5"
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
                      variant="h5"
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
          [theme.breakpoints.down('md')]: {},
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(850 / 8),
          },
          justifyContent: 'center',
          height: theme.spacing(315 / 4),
        }}
      >
        <Grid item>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              marginTop: theme.spacing(5),
              color: theme.palette.primary.main,
            }}
          >
            FAQS
          </Typography>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: theme.spacing(6),
                marginRight: theme.spacing(6),
                marginTop: theme.spacing(5),
                justifyContent: 'space-evenly',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
                gap: '2rem',
              }}
            >
              <Card
                sx={{
                  backgroundColor: theme.palette.primary.main,
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
                    width: theme.spacing(15),
                  },
                }}
              >
                <CardContent sx={{ wordSpacing: '10' }}>
                  <Typography
                    variant="h5"
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
                    FAQ 1
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  backgroundColor: theme.palette.primary.main,
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
                    width: theme.spacing(15),
                  },
                }}
              >
                <CardContent sx={{ wordSpacing: '10' }}>
                  <Typography
                    variant="h5"
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
                    FAQ 2
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  backgroundColor: theme.palette.primary.main,
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
                    width: theme.spacing(15),
                  },
                }}
              >
                <CardContent sx={{ wordSpacing: '10' }}>
                  <Typography
                    variant="h5"
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
                    MORE FAQS
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
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
              gap: '4rem',
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
            <Typography
              variant="h6"
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
              TERMS AND CONDITIONS
            </Typography>
            <Typography
              variant="h6"
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
              PRIVACY POLICY
            </Typography>
            <Typography
              variant="h6"
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
              CONTACT NUMBER
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default LandingPage
