import React from 'react'
import { forumContext } from '.'

const useForum = () => React.useContext<IForumState>(forumContext)

export const retrieveForums = () => {
  const { forums } = useForum()

  return forums
}

export const setCurrentAccommodation = () => {
  const { dispatch } = useForum()

  return (id: string | undefined) =>
    dispatch({ type: 'FR_SET_CURRENT_AC', payload: id })
}

export const retrieveForumByCurrentAccommodation = () => {
  const { forums /*current_accommodation*/ } = useForum()

  // TODO: uncomment this one if ready to integrate with api
  //   const filteredForums = forums.filter(
  //     forum => forum.accommodation_id === current_accommodation
  //   )

  //   if (filteredForums.length === 0) return undefined
  return forums[0]
}

export const addCommentToForum = () => {
  const { dispatch, forums } = useForum()

  return (forumId: string, comment: string) => {
    if (!forumId || !comment) return

    const forum = forums.find(forum => forum._id === forumId)

    if (!forum) return

    forum.content.push(comment)

    dispatch({ type: 'FR_UPDATE', payload: forum })
  }
}

export const deleteCommentFromForum = () => {
  const { dispatch, forums } = useForum()

  return (forumId: string, comment: string) => {
    if (!forumId || !comment) return

    const forum = forums.find(forum => forum._id === forumId)

    if (!forum) return

    const newContent = forum.content.filter(val => val !== comment)

    dispatch({ type: 'FR_UPDATE', payload: { ...forum, content: newContent } })
  }
}

export const updateCommentFromForum = () => {
  const { dispatch, forums } = useForum()

  return (forumId: string, comment: string, commentIndex: number) => {
    if (!forumId || !comment) return

    const forum = forums.find(forum => forum._id === forumId)

    if (!forum) return

    const newContent = []
    for (let i = 0; i < forum.content.length; i++) {
      if (commentIndex === i) {
        newContent.push(comment)
      } else {
        newContent.push(forum.content[i])
      }
    }

    dispatch({ type: 'FR_UPDATE', payload: { ...forum, content: newContent } })
  }
}
