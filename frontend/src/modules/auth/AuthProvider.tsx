import React from 'react'

interface IProps {
  children?: React.ReactNode
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export default AuthProvider
