import React from 'react'
import { getMe } from './action'
import { apiGet } from '../../api'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: undefined,
    dispatch: () => undefined,
    loaded: false,
  })

  const init = async () => {
    try {
      const res = await apiGet<IUser>('me')

      if (res.success && res.data) {
        dispatch({ type: 'ME', payload: res.data })
      }
    } catch (err) {
      dispatch({ type: 'ME', payload: undefined })
    }
  }

  React.useEffect(() => {
    init()
  }, [])

  console.log({ authState: state })

  return (
    <authContext.Provider
      value={{
        user: state.user,
        loaded: state.loaded,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider

export const authContext = React.createContext<IAuthState>({
  loaded: false,
  user: undefined,
  dispatch: () => undefined,
})

export const useAuth = () => {
  return React.useContext<IAuthState>(authContext)
}

const authReducer = (
  state: IAuthState,
  action: IReducerAction<TAuthActionType, TAuthActionPayload>
): IAuthState => {
  switch (action.type) {
    case 'ME':
      return {
        ...state,
        user: action.payload as IUser | undefined,
        loaded: true,
      }

    default:
      return state
  }
}
