import React from 'react'
import DeleteCommentFromForum from './DeleteCommentFromForum'
import { TextField } from '@mui/material'
import UpdateCommentFromForum from './UpdateCommentFromForum'

interface IProps {
  children?: React.ReactNode
  forumId: string
  comment: string
  commentIndex: number
}

const ForumComment: React.FC<IProps> = ({ forumId, comment, commentIndex }) => {
  return (
    <li>
      <p>{comment}</p>
      <DeleteCommentFromForum forumId={forumId} comment={comment} />
      <UpdateCommentFromForum
        forumId={forumId}
        comment={comment}
        commentIndex={commentIndex}
      />
    </li>
  )
}

export default ForumComment
