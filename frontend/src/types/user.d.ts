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
  user: IUser | null
  dispatch: React.Dispatch<IReducerAction<TAuthActionType, TAuthActionPayload>>
}

type TAuthActionType = 'SET_USER'
type TAuthActionPayload = IUserSignIn | IUserSignUp | IUser | undefined
