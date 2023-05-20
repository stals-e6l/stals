import React from 'react'
import DeleteCommentFromForum from './DeleteCommentFromForum'
import UpdateCommentFromForum from './UpdateCommentFromForum'
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Popover,
  Button,
  ButtonGroup,
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

const ForumComment: React.FC<IProps> = ({ forumId, comment, commentIndex }) => {
  const [anchor, setAnchor] = useState(null)

  const openOptions = event => {
    setAnchor(event.currentTarget)
  }

  return (
    // TODO: everything is setup for you, maybe add the styling for it
    <React.Fragment>
      <Box
        sx={{
          borderTop: '1px solid gray',
          borderBottom: '1px solid gray',
          marginTop: '-1px',
          paddingTop: '2px',
          paddingBottom: '5px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <AccountCircleIcon
              sx={{ color: '#154360', fontSize: 'xxx-large' }}
            />
            <Box>
              <Typography sx={{ marginLeft: '3px' }}>Von Arellano</Typography>
              <Box sx={{ display: 'flex' }}>
                <Rating></Rating>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    color: '#60ce80',
                  }}
                >
                  5
                </Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                  /5
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start' }}>
            <Typography>April 25, 2023</Typography>
            <IconButton
              sx={{ marginTop: '-8px', color: '#000000' }}
              onClick={openOptions}
            >
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
                <UpdateCommentFromForum
                  forumId={forumId}
                  comment={comment}
                  commentIndex={commentIndex}
                />
              </ButtonGroup>
            </Popover>
          </Box>
        </Box>

        <Typography sx={{ marginLeft: '50px', paddingTop: '10px' }}>
          {comment}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default ForumComment
