interface IUserSignIn {
  username: string
  password: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: string
}

type IUser = IUserSignUp

interface IAuthState {
  user?: IUser
  dispatch: React.Dispatch<IReducerAction<TAuthActionType, TAuthActionPayload>>
}

type TAuthActionType = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT' | 'ME'
type TAuthActionPayload = IUserSignIn | IUserSignUp | IUser
