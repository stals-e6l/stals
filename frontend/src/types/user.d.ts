type TUserRole = 'admin' | 'owner' | 'tenant'

interface IUserSignIn {
  username: string
  password: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: TUserRole
}

type TUserGender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say'

interface IUser extends IUserSignUp {
  _id: string
  full_name: {
    first_name: string
    middle_name?: string
    last_name: string
  }
  gender: TUserGender
  phone: {
    landline?: string
    mobile?: string
  }
  address: {
    home: string
    current: string
  }
  biography?: string
  birthday: string
  avatar: {
    url?: string
  }
  organization?: string
  createdAt?: string
  updatedAt?: string
}

interface IAuthState {
  user: IUser | null
  dispatch: React.Dispatch<
    IReducerAction<TAuthActionType, TAuthActionPayload>
  > | null
}

type TAuthActionType = 'SET_USER'
type TAuthActionPayload = IUser | null
