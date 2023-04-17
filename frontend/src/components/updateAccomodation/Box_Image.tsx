import { Box } from '@mui/material';
import '../../update.css'

interface Elements{
    image: string
    alt : string
    className: string
}

const BoxImage = (props:Elements) => {
    return(
        <Box
            component="img"
            alt={props.alt}
            src={props.image}
            className={props.className}
        />
    )
}

export default BoxImage