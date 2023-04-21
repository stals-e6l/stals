import React from 'react'
import { mockForums } from './mock'

interface IProps {
  children?: React.ReactNode
}

const ForumProvider: React.FC<IProps> = ({ children }) => {
  // state
  const [state, dispatch] = React.useReducer(forumStateReducer, {
    forums: [],
    current_accommodation: undefined,
    dispatch: () => undefined,
  })

  // immediates
  const { forums, current_accommodation } = state

  // side fx
  React.useEffect(() => {
    // TODO: maybe call the api
    dispatch({ type: 'FR_INIT', payload: mockForums })
  }, [])

  return (
    <forumContext.Provider
      value={{
        forums,
        current_accommodation,
        dispatch,
      }}
    >
      {children}
    </forumContext.Provider>
  )
}

export default ForumProvider

export const forumContext = React.createContext<IForumState>({
  forums: [],
  dispatch: () => undefined,
})

const forumStateReducer = (
  state: IForumState,
  action: IReducerAction<TForumActionType, TForumPayload>
): IForumState => {
  switch (action.type) {
    // initialize the state
    case 'FR_INIT':
      return {
        ...state,
        forums: action.payload as IForum[],
      }
    default:
      return { ...state }
  }
}
