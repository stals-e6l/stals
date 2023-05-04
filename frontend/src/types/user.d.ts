interface IUserSignIn {
  username: string
  password: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: string
}

interface IUser extends IUserSignUp {
  _id: string
}

interface IAuthState {
  user?: IUser
  dispatch: React.Dispatch<IReducerAction<TAuthActionType, TAuthActionPayload>>
}

type TAuthActionType = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT' | 'ME'
type TAuthActionPayload = IUserSignIn | IUserSignUp | IUser
