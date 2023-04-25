import { Button, TextField } from '@mui/material'
import React from 'react'
import { updateCommentFromForum } from '../../store/forum/actions'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
  commentIndex: number
}

const UpdateCommentFromForum: React.FC<IProps> = ({
  forumId,
  comment: initComment,
  commentIndex,
}) => {
  // hooks
  const updateCommentFromForumHandler = updateCommentFromForum()
  // state
  const [editable, setEditable] = React.useState<boolean>(false)
  const [comment, setComment] = React.useState<string>(initComment)

  return (
    <div>
      {editable && (
        <TextField
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Enter comment..."
        />
      )}
      <Button
        variant="contained"
        onClick={() => {
          // first it sets the UI to editable mode
          if (!editable) setEditable(true)
          // then when the user 'Saves'...
          else {
            // use this function update comment in the forum
            updateCommentFromForumHandler(forumId, comment, commentIndex)
            setEditable(false)
          }
        }}
      >
        {!editable ? 'Update' : 'Save'}
      </Button>
    </div>
  )
}

export default UpdateCommentFromForum
