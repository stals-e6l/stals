import React from 'react'
import { deleteCommentFromForum } from '../../store/forum/actions'
import { Button } from '@mui/material'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
}

const DeleteCommentFromForum: React.FC<IProps> = ({ forumId, comment }) => {
  // hook
  const deleteCommentFromForumHandler = deleteCommentFromForum()

  return (
    <Button
      variant="contained"
      onClick={() => {
        deleteCommentFromForumHandler(forumId, comment)
      }}
    >
      Delete
    </Button>
  )
}

export default DeleteCommentFromForum
