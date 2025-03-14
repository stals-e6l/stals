import React from 'react'
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Popover,
  useTheme,
  ButtonGroup,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteReview from './DeleteReview'
import EditReview from './EditReview'
import useMenu from '../../hooks/useMenu'
import DateObject from 'react-date-object'
import toFullName from '../../utils/toFullName'
import { getMe } from '../auth/AuthProvider'
import censored from '../../services/censored'

interface IProps {
  children?: React.ReactNode
  review: IReview
}

const Review: React.FC<IProps> = ({ review }) => {
  // hooks
  const theme = useTheme()
  const { anchorEl: anchor, onClose, onOpen } = useMenu()
  const user = getMe()

  const date = new DateObject({
    date: review.createdAt,
    format: 'MMMM DD, YYYY',
  })

  return (
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
              sx={{ color: theme.palette.primary.main, fontSize: 'xxx-large' }}
            />
            <Box>
              <Typography
                noWrap
                sx={theme => ({
                  marginLeft: '3px',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  [theme.breakpoints.down('sm')]: {
                    maxWidth: '90%',
                  },
                })}
              >
                {toFullName((review.user_id as IUser).full_name)}
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
            <Typography sx={{ textOverflow: 'ellipsis', minWidth: '100px' }}>
              {date.format()}
            </Typography>
            {user && user._id === (review.user_id as IUser)._id && (
              <>
                <IconButton
                  sx={{ marginTop: '-8px', color: '#000000' }}
                  onClick={onOpen}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Popover
                  open={Boolean(anchor)}
                  anchorEl={anchor}
                  anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'center', horizontal: 'center' }}
                  onClose={onClose}
                >
                  <ButtonGroup
                    orientation="vertical"
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <DeleteReview
                      reviewId={review._id as string}
                      cb={onClose}
                    />
                    <EditReview review={review} cb={onClose} />
                  </ButtonGroup>
                </Popover>
              </>
            )}
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
          {censored.clean(review.comment || '')}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default Review
