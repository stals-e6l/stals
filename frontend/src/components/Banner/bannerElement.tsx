// import React from "react";
import { Box, Input, Typography, Button, Grid, Divider, Stack, useMediaQuery } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import BannerPhoto from '../../assets/Images/BannerFlipped2.jpg';
// import '../Banner/bannerStyle.css'

// function Banner() {

//     const isNonMobileDevice = useMediaQuery("(min-width: 890px)")

//     return (
//         <>
//             <img id='Img' src={BannerPhoto} />
//             <Stack id="Grid-Container" rowGap={1}>
//                 <Grid item className="item"
//                     columns={1}
//                     xs={12}>
//                     <Typography id="Message" sx={{ backgroundColor: 'blue' }}>
//                         Accommodations for everyone
//                     </Typography>
//                 </Grid>
//                 <Grid className="item"
//                     item
//                     container
//                     justifyContent="center"
//                     xs={12}>
//                     {/* { */}
//                         {/* <Box id="SearchBox">
//                             <Input
//                                 id="Input"
//                                 placeholder='Search Accommodation'
//                                 disableUnderline
//                                 fullWidth
//                             />
//                             <Divider id="Divider" orientation="vertical" />
//                             <Button id="Filter-Btn" startIcon={<FilterListIcon id="Icons" />}>Filters</Button>
//                             <Button id="Search-Btn">Search</Button>
//                         </Box> */}
//                         <Grid item>
//                         <Typography>hello</Typography>
//                         </Grid>
                   
//                     {/* } */}

//                 </Grid>
//             </Stack>

//         </>
//     )
// }

// export default Banner

const Banner = (props: any) => {
    return (

        <Grid container sx={{
            height: '400px',
            background: 'green',
            paddingLeft: '100px',
            
        }}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        >

            <Grid item>
                <Typography>Accommodation for everyone</Typography>
            </Grid>

            <Grid item>
                <Typography>Search box</Typography>
            </Grid>

        </Grid>
    )
}

export default Banner