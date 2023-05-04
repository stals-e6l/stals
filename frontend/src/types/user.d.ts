interface IUserSignIn {
  username: string
  password: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: string
}

type IUser = IUserSignUp
