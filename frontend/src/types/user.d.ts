interface IUserSignIn {
  userName: string
  passwordHash: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: string
}

type IUser = IUserSignUp
