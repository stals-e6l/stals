import React from 'react'
import DeleteCommentFromForum from './DeleteCommentFromForum'
import UpdateCommentFromForum from './UpdateCommentFromForum'
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Popover,
  useTheme,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'

interface IProps {
  children?: React.ReactNode
  review: IReview
}

const Review: React.FC<IProps> = ({ review }) => {
  const [anchor, setAnchor] = useState(null)

  const getDate = new Date()
  const date = getDate.toLocaleDateString()
  const theme = useTheme()

  const openOptions = (event: any) => {
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
          mt: '1em',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <AccountCircleIcon
              sx={{ color: '#154360', fontSize: 'xxx-large' }}
            />
            <Box>
              <Typography sx={{ marginLeft: '3px' }}>
                {review.user_id}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Rating
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  sx={{ color: theme.palette.secondary.main }}
                />
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    color: '#60ce80',
                  }}
                >
                  {review.rating}
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
              {/* <ButtonGroup orientation="vertical" sx={{ backgroundColor: '#fff', p: '2px' }}>
                <DeleteCommentFromForum forumId={forumId} comment={comment} />
                <UpdateCommentFromForum
                  forumId={forumId}
                  comment={comment}
                  commentIndex={commentIndex}
                />
              </ButtonGroup> */}
            </Popover>
          </Box>
        </Box>

        <Typography
          sx={{
            marginLeft: '50px',
            paddingTop: '10px',
            maxWidth: '90%',
            textAlign: 'justify',
          }}
        >
          {review.comment}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default Review
