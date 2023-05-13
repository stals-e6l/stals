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
