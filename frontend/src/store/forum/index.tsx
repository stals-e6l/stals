import React from 'react'
import { mockForums } from './mock'
import { apiGet } from '../../api'

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

  // eventes
  const initForum = async () => {
    const res = await apiGet<IForum[]>('forum')

    if (res.data && res.success) {
      dispatch({ type: 'FR_INIT', payload: res.data })
    }
  }

  // side fx
  React.useEffect(() => {
    initForum()
  }, [])

  // immediates
  const { forums, current_accommodation } = state

  console.log({ forumState: state })

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
    case 'FR_SET_CURRENT_AC':
      return {
        ...state,
        current_accommodation: action.payload as string | undefined,
      }
    case 'FR_UPDATE':
      return {
        ...state,
        forums: [
          action.payload as IForum,
          ...state.forums.filter(
            val =>
              val.accommodation_id !==
              (action.payload as IForum).accommodation_id
          ),
        ],
      }
    default:
      return { ...state }
  }
}
