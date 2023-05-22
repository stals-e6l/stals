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
  useTheme
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

  const getDate = new Date()
  const date = getDate.toLocaleDateString()
  const theme = useTheme()

  const ratingVal = 4.0

  const openOptions = event => {
    setAnchor(event.currentTarget)
  }

  return (
    // TODO: everything is setup for you, maybe add the styling for it
    <React.Fragment>
      <Box
        sx={{
          borderTop: '1px solid gray',
          paddingTop: '10px',
          paddingBottom: '5px',
          mt: '1em'
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
                <Rating value={ratingVal} precision={0.5} readOnly sx={{ color: theme.palette.secondary.main }}/>
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
            <Typography>{date}</Typography>
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
              <ButtonGroup orientation="vertical" sx={{ backgroundColor: '#fff', p: '2px' }}>
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

        <Typography sx={{ marginLeft: '50px', paddingTop: '10px', maxWidth: '90%', textAlign: 'justify' }}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentumleo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortisfeugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massasapien faucibus et molestie ac.
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default Review
