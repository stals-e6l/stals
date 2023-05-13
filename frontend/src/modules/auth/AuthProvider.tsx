import React from 'react'
import { saveToken, getToken, removeToken } from '../../services/localStorage'
import { useNavigate } from 'react-router-dom'

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

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // TODO: use as child RouterProvider
  const user = getMe()
  const onFetchMe = fetchMe()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (onFetchMe) onFetchMe()
  }, [onFetchMe])

  React.useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    } else {
      navigate('/app')
    }
  }, [user])

  return <React.Fragment>{children}</React.Fragment>
}

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
export const initAuth = async () => {
  const token = getToken()
  return token
}

export const signIn = () => {
  const { dispatch } = useAuth()

  if (!dispatch) return null

  return async (user: IUserSignIn) => {
    // call api

    saveToken('')

    // save token
    dispatch({ type: 'SET_TOKEN', payload: '' })
  }
}

export const signUp = async (user: IUserSignUp) => {
  // call api
}

export const signOut = () => {
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

export const fetchMe = () => {
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

export const getMe = () => {
  const { user } = useAuth()
  return user
}
