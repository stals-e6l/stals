import { Button, FormGroup, FormLabel, TextField } from '@mui/material'
import React from 'react'
import { addCommentToForum } from '../../store/forum/actions'

interface IProps {
  children?: React.ReactNode
  forumId: string
}

const AddCommentToForum: React.FC<IProps> = ({ forumId }) => {
  // hooks
  const addCommentToForumHandler = addCommentToForum()

  // state
  const [comment, setComment] = React.useState<string>('')

  return (
    <FormGroup>
      <FormLabel>Add comment</FormLabel>
      <TextField
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Enter comment..."
        rows={4}
      />

      <Button
        variant="contained"
        onClick={() => {
          addCommentToForumHandler(forumId, comment)
          setComment('')
        }}
      >
        Add
      </Button>
    </FormGroup>
  )
}

export default AddCommentToForum
