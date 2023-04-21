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
