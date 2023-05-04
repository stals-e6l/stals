import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: undefined,
    dispatch: () => undefined,
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

export const authContext = React.createContext<IAuthState>({
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
      }

    default:
      return state
  }
}
