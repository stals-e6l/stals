type TUserRole = 'admin' | 'owner' | 'tenant'

interface IUserSignIn {
  username: string
  password: string
}

interface IUserSignUp extends IUserSignIn {
  email: string
  role: TUserRole
  full_name: {
    first_name: string
    middle_name?: string
    last_name: string
  }
  gender: TUserGender
  address: {
    home: string
    current: string
  }
  birthday: string
}

type TUserGender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say'

interface IUser extends IUserSignUp {
  _id: string

  phone: {
    landline?: string
    mobile?: string
  }

  biography?: string

  avatar: {
    url?: string
  }
  organization?: string
  createdAt?: string
  updatedAt?: string
}

interface IAuthState {
  user: IUser | null
  token: string | null
  loaded: boolean
  dispatch: React.Dispatch<
    IReducerAction<TAuthActionType, TAuthActionPayload>
  > | null
}

type TAuthActionType = 'SET_USER' | 'SET_TOKEN' | 'SET_LOADED'
type TAuthActionPayload = IUser | null | string | boolean
