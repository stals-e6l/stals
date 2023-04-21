import React from 'react'
import { retrieveForumByCurrentAccommodation } from '../../store/forum/actions'
import AddCommentToForum from '../Forum/AddCommentToForum'

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
      <div>{JSON.stringify(forum)}</div>
      <div>
        <AddCommentToForum forumId={forum._id as string} />
      </div>
    </div>
  )
}

export default RetrieveForums
