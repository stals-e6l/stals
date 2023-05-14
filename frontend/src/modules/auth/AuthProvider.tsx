import React from 'react'
import { saveToken, getToken, removeToken } from '../../services/localStorage'
import { useNavigate } from 'react-router-dom'
import { apiGet, apiPost } from '../../api'
import { ROUTES } from '../../app/AppRouter'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    token: null,
    loaded: false,
    dispatch: null,
  })

  React.useEffect(() => {
    initAuth().then(token => {
      dispatch({ type: 'SET_TOKEN', payload: token })
    })
  }, [])

  console.log({ authState: state })

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loaded: state.loaded,
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
  const onSetAuthLoaded = setAuthLoaded()
  const onFetchMe = fetchMe()
  const navigate = useNavigate()
  const loaded = getAuthLoaded()
  const { dispatch } = useAuth()

  React.useEffect(() => {
    if (onFetchMe && dispatch && !loaded && onSetAuthLoaded)
      onFetchMe()
        .then(() => {
          navigate(ROUTES.explore)
        })
        .catch(() => {
          navigate(ROUTES.auth)
        })
        .finally(() => {
          onSetAuthLoaded(true)
        })
  }, [onFetchMe, loaded, onSetAuthLoaded])

  return <React.Fragment>{children}</React.Fragment>
}

const authContext = React.createContext<IAuthState>({
  user: null,
  token: null,
  loaded: false,
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
    case 'SET_LOADED':
      return {
        ...state,
        loaded: action.payload as boolean,
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
    const res = await apiPost<IUserSignIn, string>('sign-in', {
      payload: user,
    })

    if (res.success && res.data) {
      saveToken(res.data)
      dispatch({ type: 'SET_TOKEN', payload: res.data })
    } else {
      if (res.messages) {
        throw new Error(res.messages[0])
      }
    }
  }
}

export const signUp = () => {
  return async (user: IUserSignUp) => {
    const res = await apiPost<IUserSignUp, IUser>('sign-up', {
      payload: user,
    })

    if (!res.success && res.messages) {
      throw new Error(res.messages[0])
    }
  }
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
    const res = await apiGet<IUser>('me', token as string)

    if (res.data && res.success) {
      dispatch({ type: 'SET_USER', payload: res.data })
    } else {
      if (res.messages) throw new Error(res.messages[0])
    }
  }
}

export const getMe = () => {
  const { user } = useAuth()
  return user
}

export const getAuthLoaded = () => {
  const { loaded } = useAuth()
  return loaded
}

export const setAuthLoaded = () => {
  const { dispatch } = useAuth()
  if (!dispatch) return null
  return (isLoaded: boolean) => {
    dispatch({ type: 'SET_LOADED', payload: isLoaded })
  }
}
