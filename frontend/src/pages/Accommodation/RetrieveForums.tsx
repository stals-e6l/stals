import React from 'react'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'
import AddCommentToForum from '../Forum/AddCommentToForum'
import DeleteCommentFromForum from '../Forum/DeleteCommentFromForum'
import ForumComment from '../Forum/ForumComment'

interface IProps {
  children?: React.ReactNode
}

const RetrieveForums: React.FC<IProps> = () => {
  const forum = retrieveForumByCurrentAccommodation()

  // TODO: handle the ui when the forum is empty!
  if (!forum) {
    return <div>empty forum!</div>
  }

  // TODO: create the ui of the forum
  // TODO: please see forum.d.ts to know its contents
  return (
    <div>
      <div>below are the forum comments</div>
      <ul>
        {forum.content.map((comment, key: number) => (
          <ForumComment
            key={key}
            forumId={forum._id as string}
            comment={comment}
            commentIndex={key}
          />
        ))}
      </ul>
      <div>
        <AddCommentToForum forumId={forum._id as string} />
      </div>
    </div>
  )
}

export default RetrieveForums
