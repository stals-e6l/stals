import React from 'react'
import { forumContext } from '.'
import { apiPost, apiPut } from '../../api'

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
  const { forums, current_accommodation } = useForum()

  const filteredForums = forums.filter(
    forum => forum.accommodation_id === current_accommodation
  )

  if (filteredForums.length === 0) return undefined
  return filteredForums[0]
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

  return async (forumId: string, comment: string, commentIndex: number) => {
    if (!forumId || !comment) return

    const forum = forums.find(forum => forum._id === forumId)

    if (!forum) return

    const newContent: string[] = []
    for (let i = 0; i < forum.content.length; i++) {
      if (commentIndex === i) {
        newContent.push(comment)
      } else {
        newContent.push(forum.content[i])
      }
    }

    apiPut(`forum/${forumId}`, {
      payload: {
        ...forum,
        content: newContent,
      },
    }).then(() => {
      dispatch({
        type: 'FR_UPDATE',
        payload: { ...forum, content: newContent },
      })
    })
  }
}

export const createForum = () => {
  return async (forum: IForum) => {
    const res = await apiPost('forum', {
      payload: forum,
    })

    if (!res.success && res.messages) {
      throw new Error(res.messages[0])
    }
  }
}
