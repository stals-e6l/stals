import React from 'react'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'
import AddCommentToForum from './AddCommentToForum'
import ForumComment from './ForumComment'
import { Box, Button, Drawer, Grid, IconButton, Rating, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  children?: React.ReactNode
}

const Forum: React.FC<IProps> = () => {
  const forum = retrieveForumByCurrentAccommodation()

  type Anchor = "right"
  var anchor = "right"
  const blue = "#154360";
  const green = "#60ce80";
  const grey = "#f0f0f0";
  const darkGrey = "#f5f5f7";
  const quicksand = "Quicksand"
  const sourceSansPro = "Source Sans Pro";

  //Temporary static data
  const rating = 4.5
  const numReviews = 20

  const [state, setState] = React.useState({
    right: false,
  });



  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  // TODO: handle the ui when the forum is empty!
  if (!forum) {
    return <div>empty forum!</div>
  }

  // TODO: create the ui of the forum
  // TODO: please see forum.d.ts to know its contents
  return (
    <Box>
      {/* {<div>below are the forum comments</div>
      <ul>
        {forum.content.map((comment, key: number) => (
          <ForumComment
            key={key}
            forumId={forum._id as string}
            comment={comment}
            commentIndex={key}
          />
        ))}
      </ul>
      <div>
        <AddCommentToForum forumId={forum._id as string} />
      </div>} */}

      <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <Box sx={{
          width: 600,
          padding: "3%",
          paddingLeft: "5%",
        }}>

          {/* This is where Close button is enclosed */}
          <IconButton onClick={toggleDrawer("right", false)}
            sx={{ position: 'sticky', }}>
            <CloseIcon />
          </IconButton >

          <Grid container sx={{
            paddingLeft: '2%',
          }}>
            <Grid item xs={12}>
              {/* This is where review header is enclosed */}
              <Box >
                <Typography sx={{
                  display: 'flex',
                  fontFamily: sourceSansPro,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}>
                  <Typography sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    fontFamily: 'inherit',
                    color: green
                  }}>|</Typography>
                  Reviews
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* This is where Ratings are enclosed */}
              <Grid container sx={{}}
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item>
                  <Typography sx={{
                    fontFamily: quicksand,
                    fontSize: '3rem',
                    fontWeight: 'bolder',
                    color: green,
                    display: 'flex'
                  }}>
                    {rating}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{
                    color: 'black',
                    fontSize: '1.1rem',
                  }}>
                    /5
                  </Typography>
                </Grid>
                <Grid item>
                  {/* This is where star rating and number of reviews are contained */}
                  <Grid container direction="column"
                    justifyContent='center'
                    alignItems='flex-start'
                    sx={{
                      paddingLeft: '5%',
                    }}>
                    <Grid item>
                      <Rating
                        value={rating}
                        precision={0.5}
                        sx={{ color: green }}
                        readOnly />
                    </Grid>
                    <Grid item>
                      <Typography sx={{
                        fontFamily: quicksand,

                      }}>
                        ({numReviews} reviews)
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* End of grid container for star rating and number of reviews */}
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


      </Drawer >
    </Box >
  )
}

export default Forum
