import React from 'react'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'
import ForumComment from './ForumComment'
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ForumIcon from '@mui/icons-material/Forum'
import AddCommentToForum from './AddCommentToForum'

interface IProps {
  children?: React.ReactNode
}

const Forum: React.FC<IProps> = () => {
  const forum = retrieveForumByCurrentAccommodation()

  type Anchor = 'right'
  const blue = '#154360'
  const green = '#60ce80'
  const grey = '#f0f0f0'
  const quicksand = 'Quicksand'
  const sourceSansPro = 'Source Sans Pro'

  //Temporary static data
  const rating = 4.5
  const numReviews = 20

  const [state, setState] = React.useState({
    right: false,
  })

  // Rating Text
  const RatingText = () => (
    <Typography
      sx={{
        fontFamily: sourceSansPro,
        fontSize: '3rem',
        fontWeight: 'bold',
        color: green,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {rating}
      <Typography
        sx={{
          color: blue,
          fontFamily: quicksand,
          fontSize: '1.75rem',
          marginLeft: '5px',
        }}
      >
        /5
      </Typography>
    </Typography>
  )

  // Add Review Button
  const AddReviewButton = () => (
    <Button
      sx={{
        backgroundColor: blue,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: sourceSansPro,
        fontSize: '1rem',
        textTransform: 'none',
        ':hover': {
          backgroundColor: grey,
          color: blue,
        },
      }}
    >
      Add Review
    </Button>
  )

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  // TODO: handle the ui when the forum is empty!
  if (!forum) {
    return (
      <Box>
        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: grey,
            marginLeft: '10px',
            padding: '15px 30px',
          }}
        >
          {/* No reviews icon. */}
          <Grid item>
            <ForumIcon
              sx={{
                color: green,
                fontSize: '50px',
              }}
            />
          </Grid>

          {/* Message: No reviews yet. */}
          <Grid item xs={2}>
            <Typography
              sx={{
                fontFamily: quicksand,
                fontSize: '1.25rem',
                marginLeft: '10%',
              }}
            >
              No reviews yet.
            </Typography>
          </Grid>

          <Grid item xs={9}>
            <Box display="flex" justifyContent="flex-end">
              <AddReviewButton />
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }

  // TODO: create the ui of the forum
  // TODO: please see forum.d.ts to know its contents
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          {/* Grey background */}
          <Grid
            container
            direction="row"
            sx={{
              backgroundColor: grey,
              marginLeft: '10px',
              padding: '15px 30px',
              alignContent: 'center',
            }}
          >
            {/* Rating text */}
            <Grid item>
              <RatingText />
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
                    value={rating}
                    precision={0.5}
                    sx={{
                      color: green,
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
                        backgroundColor: grey,
                        color: 'black',
                      },
                    }}
                    onClick={toggleDrawer('right', true)}
                  >
                    <Typography
                      sx={{
                        fontFamily: quicksand,
                        textDecoration: 'underline',
                        color: 'black',
                      }}
                    >
                      {numReviews} reviews
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item xs={9}>
              {/* Add review button */}
              <Box display="flex" justifyContent="flex-end" marginTop="20px">
                <AddCommentToForum forumId={forum._id as string} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {forum.content.map((comment, key: number) => (
            <ForumComment
              key={key}
              forumId={forum._id as string}
              comment={comment}
              commentIndex={key}
            />
          ))}
        </Grid>
      </Grid>

      {/* Drawer */}
      <Drawer
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
          {/* This is where Close button is enclosed */}
          <IconButton
            onClick={toggleDrawer('right', false)}
            sx={{ position: 'sticky' }}
          >
            <CloseIcon />
          </IconButton>

          <Grid
            container
            sx={{
              paddingLeft: '2%',
            }}
          >
            <Grid item xs={12}>
              {/* This is where review header is enclosed */}
              <Box>
                <Typography
                  sx={{
                    display: 'flex',
                    fontFamily: sourceSansPro,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      fontFamily: 'inherit',
                      color: green,
                    }}
                  >
                    |
                  </Typography>
                  Reviews
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* This is where Ratings are enclosed */}
              <Grid
                container
                sx={{}}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* Rating text */}
                <Grid item>
                  <RatingText />
                </Grid>

                <Grid item>
                  {/* This is where star rating and number of reviews are contained */}
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                      paddingLeft: '5%',
                    }}
                  >
                    {/* Star Rating */}
                    <Grid item>
                      <Rating
                        value={rating}
                        precision={0.5}
                        sx={{
                          color: green,
                          marginTop: '15px',
                        }}
                        readOnly
                      />
                    </Grid>

                    {/* Number of reviews */}
                    <Grid item>
                      <Typography
                        sx={{
                          fontFamily: quicksand,
                          marginTop: '-10px',
                          textDecoration: 'underline',
                        }}
                      >
                        {numReviews} reviews
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* End of grid container for star rating and number of reviews */}
                </Grid>

                {/* Grid component for add review button */}
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <AddCommentToForum forumId={forum._id as string} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* End of grid container for ratings */}

            <Grid item>
              {forum.content.map((comment, key: number) => (
                <ForumComment
                  key={key}
                  forumId={forum._id as string}
                  comment={comment}
                  commentIndex={key}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Forum
