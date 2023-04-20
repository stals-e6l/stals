import React from "react";
import { Box, Typography, Button, Grid, Rating } from '@mui/material'
import Image from "../assets/Images/Ellens.jpg"
import { useNavigate } from "react-router-dom";

interface AccommDetails {
    type: string;
    rating: number
    name: string;
    price: number;
    review_num: number;
    link: string
}

function AccommodationTile(props: AccommDetails) {

    const blue = "#154360";
    const green = "#60ce80";
    const grey = "#f0f0f0";
    const darkGrey = "#f5f5f7";
    const quicksand = "Quicksand"
    const sourceSansPro = "Source Sans Pro";

    const navigate = useNavigate()
    const accommType = (props.type).charAt(0).toUpperCase() + (props.type).slice(1)
    const formattedPrice = 'Php ' + props.price
    let formattedName = (props.name)
    const link = props.link

    // Name text display will adjust depending on the size of the string
    if (formattedName.length > 25) formattedName = formattedName.slice(0, 21) + '...'


    return (
        <Button onClick={() => navigate(link)}
            sx={{
                textTransform: "none",
                textAlign: "left",
            }}>
            <Box
                sx={{
                    backgroundColor: darkGrey,
                    width: "300px",
                    height: "350px",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 4px #6e6e73",
                    cursor: "pointer",
                    ":hover": {
                        boxShadow: "0px 4px 15px #6e6e73",
                    },
                    transition: '0.3s all',
                }}>

                <Box component='img' src={Image}
                    sx={{
                        width: "100%",
                        height: "200px",
                        borderRadius: "20px 20px 5px 5px",
                    }}
                />
                <Grid container
                    direction="column"
                    sx={{ paddingLeft: "15px" }}
                >
                    <Grid item>
                        <Typography
                            sx={{
                                fontFamily: quicksand,
                                color: "black",
                            }}>
                            {accommType}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{
                                fontFamily: sourceSansPro,
                                fontSize: "x-large",
                                fontWeight: "bold",
                                color: blue,
                                whiteSpace: "none",
                            }}>
                            {formattedName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{
                            display: "flex",
                            }}>
                            <Rating value={props.rating} precision={0.5} readOnly sx={{
                                color: green,
                            }}/>
                            <Typography sx={{
                                fontFamily: quicksand,
                                fontWeight: "bold",
                                color: green,
                            }}> {props.rating} </Typography>
                            <Typography sx={{
                                fontFamily: quicksand,
                                color: "black",
                                marginLeft: "1%",
                            }}>
                                 ({props.review_num} reviews) 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid>
                        <Typography sx={{
                            fontFamily: sourceSansPro,
                            color: blue,
                            fontWeight: "bold",
                            fontSize: "large",
                        }}> {formattedPrice} </Typography>
                    </Grid>
                </Grid>

            </Box>
        </Button>

    )

}

export default AccommodationTile;