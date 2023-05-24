import React from 'react'
import {
  Box,
  Button,
  Grid,
  Rating,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ForumIcon from '@mui/icons-material/Forum'
import AddReviewModal from '../accommodation/AddReviewModal'
import Review from './Review'
import {
  averageReviewRating,
  fetchReviews,
  retrieveReviews,
} from './ReviewsProvider'
import { COLOR, FONT } from '../../theme'
import { useParams } from 'react-router-dom'

interface IProps {
  children?: React.ReactNode
}

const Reviews: React.FC<IProps> = () => {
  // hooks
  const onFetchReviews = fetchReviews()
  const params = useParams()
  const reviews = retrieveReviews()
  const theme = useTheme()
  const move = useMediaQuery(theme.breakpoints.down('sm'))
  const averageRating = averageReviewRating()

  // events

  React.useEffect(() => {
    if (onFetchReviews && params.id) {
      onFetchReviews(params.id)
    }
  }, [])

  // if there are no reviews
  if(!reviews){
      return (
        <Box>
          <Grid container sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              {/* Grey background */}
              <Grid
                container
                direction="row"
                sx={{
                  backgroundColor: COLOR.gray1,
                  padding: '15px 30px',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {/* No reviews icon */}
                <Grid item>
                    <ForumIcon 
                    sx={{
                        color: theme.palette.secondary.main,
                        fontSize: '50px',
                    }}
                    />
                </Grid>

                {/* No reviews text */}
                <Grid item>
                    <Typography 
                        variant="h6"
                        sx={{
                            width: '100%',
                            height: '100%',
                            ml: '10px'
                        }}
                    >
                        No reviews yet.
                    </Typography>
                </Grid>

                <Grid item xs>
                  {/* Add review button */}
                  <Grid
                    container
                    justifyContent={move ? 'flex-start' : 'flex-end'}
                    sx={{ width: '100%', height: '100%', alignItems: 'center' }}
                  >
                    <Grid item>
                      <AddReviewModal accommodationId={params.id || ''} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
        </Box>
             )
  }

  return (
    <Box>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          {/* Grey background */}
          <Grid
            container
            direction="row"
            sx={{
              backgroundColor: COLOR.gray1,
              padding: '15px 30px',
              alignContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Rating text */}
            <Grid item>
              <Typography
                sx={{
                  fontFamily: FONT.sourceSansPro,
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: theme.palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {Number(averageRating).toFixed(1) || 0}
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontFamily: FONT.quicksand,
                    fontSize: '1.75rem',
                    marginLeft: '5px',
                  }}
                >
                  /5
                </Typography>
              </Typography>
            </Grid>

            {/* Star rating and drawer button */}
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                  marginLeft: '10px',
                }}
              >
                {/* Star Rating */}
                <Grid item>
                  <Rating
                    value={averageRating || 0}
                    precision={0.5}
                    sx={{
                      color: theme.palette.secondary.main,
                      marginTop: '15px',
                    }}
                    readOnly
                  />
                </Grid>

                {/* Number of reviews */}
                <Tooltip title="See more reviews" placement="bottom">
                  <Button
                    variant="text"
                    disableRipple
                    sx={{
                      textTransform: 'none',
                      padding: '0px 3px',
                      marginTop: '-10px',
                      ':hover': {
                        backgroundColor: COLOR.gray1,
                        color: 'black',
                      },
                    }}
                    // onClick={toggleDrawer('right', true)}
                  >
                    <Typography
                      sx={{
                        fontFamily: FONT.quicksand,
                        textDecoration: 'underline',
                        color: 'black',
                      }}
                    >
                      {reviews && reviews.length} reviews
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item xs>
              {/* Add review button */}
              <Grid
                container
                justifyContent={move ? 'flex-start' : 'flex-end'}
                sx={{ width: '100%', height: '100%', alignItems: 'center' }}
              >
                <Grid item>
                  <AddReviewModal accommodationId={params.id || ''} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {reviews &&
            reviews.map(review => <Review key={review._id} review={review} />)}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Reviews

{
  /* <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <Box
          sx={{
            width: 600,
            paddingLeft: '5%',
          }}
        >
          {/* This is where Close button is enclosed */
}
//     <IconButton
//       onClick={toggleDrawer('right', false)}
//       sx={{ position: 'sticky' }}
//     >
//       <CloseIcon />
//     </IconButton>

//     <Grid
//       container
//       sx={{
//         paddingLeft: '2%',
//       }}
//     >
//       <Grid item xs={12}>
//         {/* This is where review header is enclosed */}
//         <Box>
//           <Typography
//             sx={{
//               display: 'flex',
//               fontFamily: FONT.sourceSansPro,
//               fontSize: '1.5rem',
//               fontWeight: 'bold',
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: 'inherit',
//                 fontWeight: 'inherit',
//                 fontFamily: 'inherit',
//                 color: theme.palette.secondary.main,
//               }}
//             >
//               |
//             </Typography>
//             Reviews
//           </Typography>
//         </Box>
//       </Grid>
//       <Grid item xs={12}>
//         {/* This is where Ratings are enclosed */}
//         <Grid
//           container
//           sx={{}}
//           direction="row"
//           justifyContent="flex-start"
//           alignItems="center"
//         >
//           {/* Rating text */}
//           <Grid item>
//             <RatingText />
//           </Grid>

//           <Grid item>
//             {/* This is where star rating and number of reviews are contained */}
//             <Grid
//               container
//               direction="column"
//               justifyContent="center"
//               alignItems="flex-start"
//               sx={{
//                 paddingLeft: '5%',
//               }}
//             >
//               {/* Star Rating */}
//               <Grid item>
//                 <Rating
//                   value={rating}
//                   precision={0.5}
//                   sx={{
//                     color: theme.palette.secondary.main,
//                     marginTop: '15px',
//                   }}
//                   readOnly
//                 />
//               </Grid>

//               {/* Number of reviews */}
//               <Grid item>
//                 <Typography
//                   sx={{
//                     fontFamily: FONT.quicksand,
//                     marginTop: '-10px',
//                     textDecoration: 'underline',
//                   }}
//                 >
//                   {numReviews} reviews
//                 </Typography>
//               </Grid>
//             </Grid>
//             {/* End of grid container for star rating and number of reviews */}
//           </Grid>

//           {/* Grid component for add review button */}
//           <Grid item xs={6}>
//             <Box display="flex" justifyContent="flex-end">
//               <AddReviewModal />
//             </Box>
//           </Grid>
//         </Grid>
//       </Grid>
//       {/* End of grid container for ratings */}

//       <Grid item xs>
//         {/* <Review />
//         <Review /> */}
//         {reviews &&
//           reviews.map(review => (
//             <Review key={review._id} review={review} />
//           ))}
//       </Grid>
//     </Grid>
//   </Box>
// </Drawer> */}
