import React from 'react'
import {
    Box,
    Input,
    Typography,
    Grid,
    Slider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    children?: React.ReactNode
}

const blue = '#154360'
const green = '#60ce80'
const grey = '#f0f0f0'
const darkGrey = '#f5f5f7'
const quicksand = 'Quicksand'
const sourceSansPro = 'Source Sans Pro'

const minDistance = 0;

function FilterAccommodation() {

    // Set the maximum value
    // TODO: Must be based on the highest possible maximum value present in the database
    const maxPrice = 10000
    const maxRoomSize = 1000;
    const maxMetersFromUPLB = 5000;
    const maxPax = 10;
    const maxRoom = 10;
    const maxBed = 10;


    // Setting custom styles
    const CustomLabelStyle = {
        color: 'black',
        fontFamily: sourceSansPro,
        fontSize: '20px',
        marginTop: '10px',
    }

    const CustomCaptionStyle = {
        color: 'black',
        fontFamily: quicksand,
        fontSize: '15px',
    }

    const CustomSliderStyles = {
        '& .MuiSlider-thumb': {
            color: green
        },
        '& .MuiSlider-track': {
            color: blue
        },
        '& .MuiSlider-rail': {
            color: grey,
            border: '2px solid',
            borderColor: 'black',
        },
        '& .MuiSlider-active': {
            color: darkGrey,
        }
    };

    const CustomRadioLabelStyle = {
        fontFamily: quicksand,
        color: 'black',
    }

    const CustomRadioStyle = {
        '&.Mui-checked': {
            color: green,
        },
    }

    // Handlers for event in price range 
    const [price, setPrice] = React.useState<number[]>([2000, 4000]);

    const handlePriceChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
    };

    // Handler for event in room size
    const [roomSize, setRoomSize] = React.useState<number>(50);

    const handleRoomSizeChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        setRoomSize(newValue as number);
    }

    // Handler for change in meters from UPLB
    const [meters_from_uplb, setMetersFromUPLB] = React.useState<number>(50);

    const handleMetersFromUPLBChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        setMetersFromUPLB(newValue as number);
    }

    // Handlers for event in price range 
    const [pax, setPax] = React.useState<number[]>([2, 4]);

    const handlePaxChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPax([Math.min(newValue[0], pax[1] - minDistance), pax[1]]);
        } else {
            setPax([pax[0], Math.max(newValue[1], pax[0] + minDistance)]);
        }

    };

    // Handler for change in num of rooms
    const [num_room, setNumOfRooms] = React.useState<number>(50);

    const handleRoomNumChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        setNumOfRooms(newValue as number);
    }

    // Handlers for event in num of bed 
    const [num_beds, setBed] = React.useState<number[]>([2, 4]);

    const handleBed = (event: Event, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setBed([Math.min(newValue[0], num_beds[1] - minDistance), num_beds[1]]);
        } else {
            setBed([num_beds[0], Math.max(newValue[1], num_beds[0] + minDistance)]);
        }

    };

    return (
        <>
            <Grid container>
                {/* Search bar */}
                <Grid item xs={12}>
                    <Input placeholder='Search accommodation' fullWidth disableUnderline sx={{
                        border: '0.5px solid',
                        borderColor: blue,
                        borderRadius: '25px',
                        padding: '3px 25px',
                        fontFamily: quicksand,
                    }} 
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{color: green}}/>
                        </InputAdornment>
                    }
                    />
                </Grid>

                {/* Label: Filter */}
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            color: 'black',
                            fontFamily: sourceSansPro,
                            fontWeight: 'bold',
                            fontSize: '22px',
                            display: 'flex',
                            marginTop: '5%',
                        }}
                    >
                        {' '}
                        <Typography
                            sx={{
                                color: green,
                                fontFamily: 'inherit',
                                fontWeight: 'inherit',
                                fontSize: 'inherit',
                                marginRight: '10px',
                            }}
                        >
                            |
                        </Typography>{' '}
                        Filters
                    </Typography>
                </Grid>


                <Grid item xs={12}>
                    <Grid container direction='column' paddingLeft={"15px"} paddingRight={"15px"}>

                        <Grid item>
                            <FormControl>
                                {/* Label: Type */}
                                <FormLabel id="type"><Typography sx={CustomLabelStyle}>Type</Typography></FormLabel>

                                {/* Radio Group: Type Values */}
                                <RadioGroup
                                    aria-labelledby="hotel"
                                    defaultValue="apartment"
                                    name="type-group"
                                >
                                    <FormControlLabel
                                        value="hotel"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Hotel
                                        </Typography>} />
                                    <FormControlLabel
                                        value="apartment"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Apartment
                                        </Typography>} />
                                    <FormControlLabel
                                        value="bedspace"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Bed Space
                                        </Typography>} />
                                    <FormControlLabel
                                        value="dormitory"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Dormitory
                                        </Typography>} />
                                    <FormControlLabel
                                        value="transient"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Transient Space
                                        </Typography>} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        {/* Label: Price Range */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Price Range
                            </Typography>
                        </Grid>

                        {/* Slider: Price Range */}
                        <Grid item >
                            <Slider
                                sx={CustomSliderStyles}
                                max={maxPrice}
                                value={price}
                                onChange={handlePriceChange}
                                disableSwap
                            />
                        </Grid>

                        {/* Caption: Php X - Php Y  */}
                        <Grid item>
                            <Typography sx={CustomCaptionStyle}>
                                Php {price[0]} - Php {price[1]}
                            </Typography>
                        </Grid>


                        {/* Label: Room Size */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Room Size
                            </Typography>
                        </Grid>

                        {/* Slider: Room Size */}
                        <Grid item>
                            <Slider
                                sx={CustomSliderStyles}
                                max={maxRoomSize}
                                value={roomSize}
                                onChange={handleRoomSizeChange}
                            />
                        </Grid>

                        {/* Caption: X square meters */}
                        <Grid item>
                            <Typography sx={CustomCaptionStyle}>
                                {roomSize} square meters
                            </Typography>
                        </Grid>


                        {/* Label: Meters from UPLB */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Meters from UPLB
                            </Typography>
                        </Grid>

                        {/* Slider: Meters from UPLB */}
                        <Grid item>
                            <Slider
                                max={maxMetersFromUPLB}
                                value={meters_from_uplb}
                                onChange={handleMetersFromUPLBChange}
                                sx={CustomSliderStyles}
                            />
                        </Grid>

                        {/* Caption: X meters */}
                        <Grid item>
                            <Typography sx={CustomCaptionStyle}>
                                {meters_from_uplb} meters
                            </Typography>
                        </Grid>


                        {/* Label: Number of Occupants */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Number of Occupants
                            </Typography>
                        </Grid>

                        {/* Slider: Number of Occupants */}
                        <Grid item >
                            <Slider
                                sx={CustomSliderStyles}
                                min={1}
                                max={maxPax}
                                value={pax}
                                onChange={handlePaxChange}
                                disableSwap
                            />
                        </Grid>

                        {/* Caption: X - Y person/s */}
                        <Grid item>
                            {
                                // if both minimum and maximum are equal
                                (pax[0] === pax[1] && pax[0] != 1) ?
                                    <>
                                        <Typography sx={CustomCaptionStyle}>{pax[0]} persons</Typography>
                                    </>
                                    // if both min and max pax are equal and both 1
                                    : (pax[0] === pax[1] && pax[0] == 1) ?
                                        <>
                                            <Typography sx={CustomCaptionStyle}>{pax[0]} person</Typography>
                                        </>
                                        :
                                        // by default
                                        <>
                                            <Typography sx={CustomCaptionStyle}>{pax[0]} - {pax[1]} persons</Typography>
                                        </>
                            }
                        </Grid>


                        {/* Label: Number of Room */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Number of Room
                            </Typography>
                        </Grid>

                        {/* Slider: Number of Room */}
                        <Grid item>
                            <Slider
                                max={maxRoom}
                                min={1}
                                defaultValue={2}
                                value={num_room}
                                onChange={handleRoomNumChange}
                                sx={CustomSliderStyles}
                            />
                        </Grid>

                        {/* Caption: X rooms */}
                        <Grid item>
                            {
                                (num_room == 1) ?
                                    <>
                                        <Typography sx={CustomCaptionStyle}>
                                            {num_room} room
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <Typography sx={CustomCaptionStyle}>
                                            {num_room} rooms
                                        </Typography>
                                    </>
                            }

                        </Grid>


                        {/* Label: Number of Beds */}
                        <Grid item xs={12}>
                            <Typography sx={CustomLabelStyle}>
                                Number of Beds
                            </Typography>
                        </Grid>

                        {/* Slider: Number of Beds */}
                        <Grid item >
                            <Slider
                                sx={CustomSliderStyles}
                                min={1}
                                max={maxBed}
                                value={num_beds}
                                onChange={handleBed}
                                disableSwap
                            />
                        </Grid>

                        {/* Caption: X - Y person/s */}
                        <Grid item>
                            {
                                // if both minimum and maximum are equal
                                (num_beds[0] === pax[1] && num_beds[0] != 1) ?
                                    <>
                                        <Typography sx={CustomCaptionStyle}>{num_beds[0]} beds</Typography>
                                    </>
                                    // if both min and max bed are equal and both 1
                                    : (num_beds[0] === num_beds[1] && num_beds[0] == 1) ?
                                        <>
                                            <Typography sx={CustomCaptionStyle}>{num_beds[0]} bed</Typography>
                                        </>
                                        :
                                        // by default
                                        <>
                                            <Typography sx={CustomCaptionStyle}>{num_beds[0]} - {num_beds[1]} beds</Typography>
                                        </>
                            }
                        </Grid>


                        <Grid item>
                            <FormControl>
                                {/* Label: Furnishing */}
                                <FormLabel id="furnishing"><Typography sx={CustomLabelStyle}>Furnishing</Typography></FormLabel>

                                {/* Radio Group: Furnishing Values */}
                                <RadioGroup
                                    aria-labelledby="furnishing"
                                    defaultValue="semifurnished"
                                    name="furnishing-group"
                                >
                                    <FormControlLabel
                                        value="unfurnished"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Unfurnished
                                        </Typography>} />
                                    <FormControlLabel
                                        value="semifurnished"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Semifurnished
                                        </Typography>} />
                                    <FormControlLabel
                                        value="fully_furnished"
                                        control={<Radio sx={CustomRadioStyle} />}
                                        label={<Typography sx={CustomRadioLabelStyle}>
                                            Fully-furnished
                                        </Typography>} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid> {/* End of Grid Container for Filter Fields */}
                </Grid> {/* End of Grid Item for Filter Fields */}
            </Grid>
        </>
    )
}

export default FilterAccommodation