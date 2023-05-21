import React from 'react'
import DeleteCommentFromForum from '../../pages/Forum/DeleteCommentFromForum'
import UpdateCommentFromForum from '../../pages/Forum/UpdateCommentFromForum'
import {
    Box,
    Typography,
    Rating,
    IconButton,
    Popover,
    Button,
    ButtonGroup,
    Grid,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'

interface IProps {
    children?: React.ReactNode
    forumId: string
    comment: string
    commentIndex: number
}

const Review: React.FC<IProps> = ({ forumId, comment, commentIndex }) => {
    const [anchor, setAnchor] = useState(null)

    const openOptions = e => {
        setAnchor(e.currentTarget)
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item>
                    <AccountCircleIcon />
                    <Grid container>
                        <Grid item>
                            <Typography>Bing Bong</Typography>
                        </Grid>
                        <Grid item>
                            <Rating />
                            <Typography>
                                5
                            </Typography>
                            <Typography>
                                /5
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography>April 25, 2023</Typography>
                    <IconButton 
                        sx={{ mt: '-8px', color: '#000' }}
                        onClick={openOptions}>
                        <MoreHorizIcon />
                    </IconButton>
                    <Popover
                        open={Boolean(anchor)}
                        anchorEl={anchor}
                        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
                        onClose={() => setAnchor(null)}
                    >
                        <ButtonGroup orientation="vertical">
                            <DeleteCommentFromForum forumId={forumId} comment={comment} />
                            <UpdateCommentFromForum forumId={forumId} comment={comment} commentIndex={commentIndex} />
                        </ButtonGroup>
                    </Popover>
                </Grid>
                <Grid item>
                    <Typography>
                        {comment}
                    </Typography>
                </Grid>
            </Grid> 
        </React.Fragment>
           )
}

export default Review

