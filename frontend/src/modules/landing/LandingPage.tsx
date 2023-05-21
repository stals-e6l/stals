import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    Dialog,
    useMediaQuery, Card, CardContent, ImageList, ImageListItem
  } from '@mui/material'
  import React from 'react'
  import logo from '../../assets/Images/Logo_Green.png'
  import Navbar from '../general/Navbar'
  import assets from '../../assets'
import { FONT } from '../../theme'
import { COLOR } from '../../theme'
import { ForkRight, Scale } from '@mui/icons-material'


import ImageListItemBar from "@mui/material/ImageListItemBar";

interface IProps {
children?: React.ReactNode
}

const team = [
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
    {   thumbnail: {    uri: "https://picsum.photos/200",   name: "Von" , description: "BIG BOSS"}   },
  ];
const LandingPage: React.FC<IProps> = () => {
    const theme = useTheme()

    return (
        <React.Fragment>
            <Navbar />
            {/* Primary */}
            <Box  mt={2} sx={{
                    display: 'flex',
                    backgroundImage: `url(${assets.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '55% 0%',
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
                        width: '50%',
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
                                        color: "#60CE80"
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
                                        color: "#60CE80"
                                    }}
                                >
                                    ... Or create a listing of YOUR accommodation
                                </Typography>
                            </CardContent>
                        </Card>

                    </Box>
                </Box>
            </Box>
            {/* Team Members */}
            <Box sx={{
                    backgroundImage: `url(${assets.banner})`,
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat',
                    height: theme.spacing(315 / 4), 
                    }}>
                <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', marginTop: theme.spacing(5) , color: COLOR.white, font: FONT.sourceSansPro}}
                    >
                    THE TEAM
                </Typography>
                <ImageList
                    gap={150}
                    sx={{
                        marginTop:"10%",
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
                        gridAutoColumns: "minmax(160px, 1fr)"
                    }}
                    >
                    {team.map((image) => (
                        <ImageListItem>
                        <img src={image.thumbnail.uri} />
                        <ImageListItemBar 
                            title={<Typography
                                variant="h5"
                                sx={{
                                    [theme.breakpoints.down('md')]: {
                                    fontSize: theme.spacing(1.75),
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                    fontSize: theme.spacing(1.5),
                                    },
                                    textAlign: 'center',
                                    color: "#60CE80"
                                }}
                            >
                                {image.thumbnail.name}
                            </Typography>} 
                            subtitle={<span><Typography
                                variant="h5"
                                sx={{
                                    [theme.breakpoints.down('md')]: {
                                    fontSize: theme.spacing(1.75),
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                    fontSize: theme.spacing(1.5),
                                    },
                                    textAlign: 'center',
                                    color: "#60CE80"
                                }}
                            >
                                {image.thumbnail.description}
                            </Typography>
                            </span>}
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
                >
                </Box>
            </Box>
            {/* FAQS*/}

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
                        FAQS
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
                                        color: "#60CE80"
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
                                        color: "#60CE80"
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
                                        color: "#60CE80"
                                    }}
                                >
                                    MORE FAQS
                                </Typography>
                            </CardContent>
                        </Card>

                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                background: 'lime',
                color: "#60CE80",
                borderColor: 'lime',
                height: '3px',
                }}
            />
            {/*Copyright etc... */}
            <Box sx={{
                display: 'flex', }}>
                <Box
                    component="img"
                    sx={{
                    display: 'block',
                    marginLeft: theme.spacing(2),
                    width: '12%',
                    }}
                    alt="green logo"
                    src={logo}
                />
                <Typography
                    variant="h5"
                    sx={{
                        marginTop: "2%",
                        [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                        },
                        [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                        },
                        textAlign: 'left',
                        color: "#154360"
                    }}
                >
                    © 2023
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        marginTop: "2%",
                        marginLeft:"15%",
                        [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                        },
                        [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                        },
                        textAlign: 'left',
                        color: "#154360"
                    }}
                >
                    TERMS AND CONDITIONS
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        marginTop: "2%",
                        marginLeft:"15%",
                        [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                        },
                        [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                        },
                        textAlign: 'left',
                        color: "#154360"
                    }}
                >
                    PRIVACY POLICY
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        marginTop: "2%",
                        marginLeft:"15%",
                        [theme.breakpoints.down('md')]: {
                        fontSize: theme.spacing(1.75),
                        },
                        [theme.breakpoints.down('sm')]: {
                        fontSize: theme.spacing(1.5),
                        },
                        textAlign: 'left',
                        color: "#154360"
                    }}
                >
                    CONTACT NUMBER
                </Typography>
            </Box>
            
        </React.Fragment>
    )
    
}

export default LandingPage