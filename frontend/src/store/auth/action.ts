import { useAuth } from '.'
import { apiGet, apiPost } from '../../api'

export const signIn = () => {
  return async (user: IUserSignIn) => {
    const res: any = await apiPost<IUserSignIn, string>('sign-in', {
      payload: user,
    })

    if (res.success && res.data) {
      // store token
      localStorage.setItem('token', res.data)
    }
  }
}

export const getMe = () => {
  const { dispatch } = useAuth()
  return async () => {
    const res = await apiGet<IUser>('me')

    if (res.success && res.data) {
      dispatch({ type: 'ME', payload: res.data })
    }
  }
}

export const getUser = () => {
  const { user } = useAuth()
  return user
}

export const signUp = () => {
  //
}
