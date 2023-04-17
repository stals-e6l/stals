import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Box } from '@mui/material'
import '../assets/design.css'

interface Rating {
    rating: number;
}

function StarRating(props: Rating) {

    // Rating is 0
    if (props.rating == 0) {
        return(
            <Box>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 0-0.5(included)
    else if (props.rating > 0 && props.rating <= 0.5) {
        return(
            <Box>
               <StarHalfIcon id='Star-Half'/> 
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 0.5-1.0(included)
    else if (props.rating > 0.5 && props.rating <= 1) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/> 
            </Box>
        )
    }
    // Rating is between 1-1.5(included)
    else if (props.rating > 1 && props.rating <= 1.5) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarHalfIcon id='Star-Half'/> 
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 1.5-2(included)
    else if (props.rating > 1 && props.rating <= 1.5) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 2-2.5(included)
    else if (props.rating > 2 && props.rating <= 2.5) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarHalfIcon id='Star-Half'/> 
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 2.5-3(included)
    else if (props.rating > 2.5 && props.rating <= 3) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarBorderIcon id='Star-Empty'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 3-3.5(included)
    else if (props.rating > 3 && props.rating <= 3.5) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarHalfIcon id='Star-Half'/> 
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 3.5-4(included)
    else if (props.rating > 3.5 && props.rating <= 4) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarBorderIcon id='Star-Empty'/>
            </Box>
        )
    }
    // Rating is between 4-4.5(included)
    else if (props.rating > 4 && props.rating <= 4.5) {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarHalfIcon id='Star-Half'/> 
            </Box>
        )
    }
    // Rating is between 4.5-5(included)
    else {
        return(
            <Box>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
               <StarIcon id='Star-Full'/>
            </Box>
        )
    }
}

export default StarRating