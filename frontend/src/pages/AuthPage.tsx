import { Box } from '@mui/material'
import React from 'react'
import SignInForm from '../modules/accommodation/SignInForm'

interface IProps {
  children?: React.ReactNode
}

const AuthPage: React.FC<IProps> = () => {
  return (
    <Box>
      <SignInForm />
    </Box>
  )
}

export default AuthPage
