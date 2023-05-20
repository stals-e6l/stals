import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getLoaded, getUser } from '../../store/auth/action'

interface IProps {
  children?: React.ReactNode
}

const AuthWrapper: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const user = getUser()
  const authLoaded = getLoaded()

  React.useEffect(() => {
    // console.log(authLoaded, user)
    // if (authLoaded && !user) {
    //   navigate('/signin')
    // }
    if (!localStorage.getItem('token')) {
      navigate('/sign-in')
    }
  }, [user])

  return <Outlet />
}

export default AuthWrapper
