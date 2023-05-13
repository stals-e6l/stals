import React from 'react'
import { saveToken, getToken, removeToken } from '../../services/localStorage'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    token: null,
    dispatch: null,
  })

  React.useEffect(() => {
    initAuth().then(token => {
      dispatch({ type: 'SET_TOKEN', payload: token })
    })
  }, [])

  React.useEffect(() => {
    if (!state.user) {
      // redirect to /sigin
    } else {
      // redirect to /[app]
    }
  }, [state.user])

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider

const authContext = React.createContext<IAuthState>({
  user: null,
  token: null,
  dispatch: null,
})

export const useAuth = () => React.useContext<IAuthState>(authContext)

const authReducer = (
  state: IAuthState,
  action: IReducerAction<TAuthActionType, TAuthActionPayload>
): IAuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload as IUser | null,
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload as string | null,
      }
    default:
      return state
  }
}

// ACTIONS
const initAuth = async () => {
  const token = getToken()
  return token
}

const signIn = async () => {
  const { dispatch } = useAuth()

  if (!dispatch) return null

  return async (user: IUserSignIn) => {
    // call api

    saveToken('')

    // save token
    dispatch({ type: 'SET_TOKEN', payload: '' })
  }
}

const signUp = async (user: IUserSignUp) => {
  // call api
}

const signOut = () => {
  const { dispatch, token } = useAuth()

  if (!dispatch || !token) return null

  return async () => {
    // call api

    // remove token
    removeToken()

    // remove user
    dispatch({ type: 'SET_USER', payload: null })
  }
}

const getMe = () => {
  const { dispatch, token } = useAuth()

  if (!dispatch) return null

  return async () => {
    if (!token) {
      dispatch({ type: 'SET_USER', payload: null }) // unauthenticated
    }

    // call api

    // save user me
    dispatch({ type: 'SET_USER', payload: {} as IUser })
  }
}
