import React from "react";
import { Box, Typography, Button } from '@mui/material'
import Image from "../assets/Images/Ellens.jpg"
import StarRating from "./starRating";
import { useNavigate } from "react-router-dom";
import '../assets/design.css'

interface AccommDetails {
    type: string;
    rating: number
    name: string;
    price: number;
    review_num: number;
    link: string
}

function AccommodationTile(props: AccommDetails) {

    const navigate = useNavigate()
    const accommType = (props.type).charAt(0).toUpperCase() + (props.type).slice(1)
    const formattedPrice = 'Php ' + props.price
    let formattedName = (props.name)
    const link = props.link

    // Name text display will adjust depending on the size of the string
    if (formattedName.length > 25) formattedName = formattedName.slice(0, 21) + '...'


    return (
        <Button id='Accomm-Tile-Btn' onClick={() => navigate(link)}>
            <Box id='Accomm-Tile-Box'>

                <Box id="Accomm-Tile-Img" component='img' src={Image}/>

                <Typography id='Accomm-Tile-Type'>
                    {accommType}
                </Typography>

                <Typography id="Accomm-Tile-Name">
                    {formattedName}
                </Typography>

                <Box id='Accomm-Tile-Box-Rating'>
                    <StarRating rating={props.rating} />
                    <Typography id='Accomm-Tile-Rating'> {props.rating} </Typography>
                    <Typography id='Accomm-Tile-Num-Reviews'> ({props.review_num} reviews) </Typography>
                </Box>

                <Typography id='Accomm-Tile-Price'> {formattedPrice} </Typography>

            </Box>
        </Button>

    )

}

export default AccommodationTile;