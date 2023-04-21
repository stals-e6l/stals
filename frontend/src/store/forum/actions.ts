import React from 'react'
import { forumContext } from '.'

const useForum = () => React.useContext<IForumState>(forumContext)

export const retrieveForums = () => {
  const { forums } = useForum()

  // TODO: filter forums by the current_accommodation

  return forums
}
