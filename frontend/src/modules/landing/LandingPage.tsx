import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    Dialog,
    useMediaQuery, Card, CardContent
  } from '@mui/material'
  import React from 'react'
  import logo from '../../assets/Images/Logo_Green.png'
  import Navbar from '../general/Navbar'
  import assets from '../../assets'
import { FONT } from '../../theme'
import { COLOR } from '../../theme'

interface IProps {
children?: React.ReactNode
}

const LandingPage: React.FC<IProps> = () => {
    const theme = useTheme()

    return (
        <React.Fragment>
            <Navbar />
            {/* Primary */}
            <Box sx={{
                    display: 'flex',
                    backgroundImage: `url(${assets.banner})`,
                    backgroundSize: 'cover',
                    height: theme.spacing(315 / 4), }}>
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down('sm')]: {
                        display: 'none',
                        },
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                        display: 'block',
                        marginLeft: theme.spacing(6),
                        width: '50%',
                        }}
                        alt="green logo"
                        src={logo}
                    />
                    <Box
                        sx={{
                        display: 'block',
                        marginLeft: theme.spacing(6),
                        width: '40%',
                        }}
                    >
                        <Typography
                        variant="h6"
                        sx={{ textAlign: 'center', marginTop: theme.spacing(-5) , color: 'white'}}
                        >
                        Find your perfect place according to your preference
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                marginTop: theme.spacing(2),
                                marginLeft: theme.spacing(3),
                                marginRight: theme.spacing(2),
                                width: '40%',
                                font: theme.typography.button
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
                                marginRight: theme.spacing(2),
                                width: '40%',
                                font: theme.typography.button
                            }}
                            //   onClick={handleOpen}
                            >
                            Learn More
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: '90vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                </Box>
            </Box>

            {/* Accommodation for Everyone*/}

            <Box sx={{
                display: 'flex',
                height: theme.spacing(315 / 4), }}>
                <Box
                    sx={{
                        height: '35%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down('sm')]: {
                        display: 'none',
                        },
                    }}
                >

                    <Typography
                        variant="h2"
                        sx={{ textAlign: 'center', marginTop: theme.spacing(5) , color: theme.palette.primary.main, font: FONT.sourceSansPro}}
                        >
                        Accommodation for Everyone
                    </Typography>

                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: theme.spacing(6),
                        marginRight: theme.spacing(6),
                        marginTop: theme.spacing(5),
                        justifyContent: 'space-evenly',
                        width: '80%',
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
                            }}>
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
                                        color: COLOR.white
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
                            }}>
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
                                        color: COLOR.white
                                    }}
                                >
                                    ... Or create a listing of YOUR accommodation
                                </Typography>
                            </CardContent>
                        </Card>

                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingPage