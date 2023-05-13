import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  //state
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    dispatch: null,
  })

  return (
    <authContext.Provider
      value={{
        user: state.user,
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
        user: action.payload as IUser,
      }
    default:
      return state
  }
}

// ACTIONS
const signIn = async (user: IUserSignIn) => {
  // call api
  // save token
}

const signUp = async (user: IUserSignUp) => {
  // call api
}

const signOut = () => {
  const { dispatch } = useAuth()

  if (!dispatch) return null

  return async () => {
    // call api

    // remove user
    dispatch({ type: 'SET_USER', payload: null })
  }
}

const getMe = () => {
  const { dispatch } = useAuth()

  if (!dispatch) return null

  return async () => {
    // get token in localStorage

    // call api

    // save user me
    dispatch({ type: 'SET_USER', payload: {} as IUser })
  }
}
