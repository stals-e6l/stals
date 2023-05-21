import React from 'react'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'
import ForumComment from '../../pages/Forum/ForumComment'
import {
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    Rating,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ForumIcon from '@mui/icons-material/Forum'
import AddCommentToForum from '../../pages/Forum/AddCommentToForum'
import COLOR from '../../theme/index'

interface IProps {
    children?: React.ReactNode
}

const Reviews: React.FC<IProps> = () => {
    const forum = retrieveForumByCurrentAccommodation()
    const theme = useTheme()

    const rating = 4.5
    const numReviews = 20

        if(!forum){
            return(
                <Box>
                    <Grid 
                        container 
                        sx={{
                            color: theme.palette.secondary.main,
                            flexDirection: 'row',
                            alignItems: 'center',
                            ml: '10px',
                            p: '15px 30px',
                        }}
                    >
                        <Grid item>
                            <ForumIcon
                                sx={{
                                    color: theme.palette.secondary.main,
                                    fontSize: '50px',
                                }}
                             />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>
                                No reviews yet.
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container>
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    ':hover': {
                                        backgroundColor: theme.palette.secondary.main,
                                    }
                                }}
                            >
                                Add Review 
                                </Button> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                  )
        }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        container
                        sx={{
                            backgroundColor: '#f0f',
                            ml: '10px',
                            p: '15px 30px',
                            alignContent: 'center',
                        }}
                    >
                        <Grid item>
                            <Typography
                            sx={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: theme.palette.secondary.main,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {rating}
                                <Typography
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: '1.75rem',
                                    ml: '5px'
                                }}>
                                    /5
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                sx={{
                                    direction: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    ml: '10px',
                                }}
                                >
                                <Grid item>
                                    <Rating 
                                        value={rating}
                                        readOnly
                                        sx={{
                                            color: theme.palette.secondary.main, 
                                        }} />
                                </Grid>

                                <Tooltip title="See more reviews" placement="bottom">
                                    <Button 
                                        variant="text"
                                        disableRipple
                                        sx={{
                                            textTransform: 'none',
                                            p: '0px 3px',
                                            mt: '-10px',
                                            ':hover': {
                                                backgroundColor: '#f0f0',
                                                color: '#000',
                                            }
                                        }}>
                                        <Typography>
                                            {numReviews} reviews
                                        </Typography>
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        <Grid item xs={9}>
                            <Grid container>
                                <AddCommentToForum forumId={forum._id as string}/>
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
            </Grid> 
        </>
           )
}

export default Reviews
