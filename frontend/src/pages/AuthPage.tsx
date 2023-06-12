import { Box } from '@mui/material'
import React from 'react'
import SignInForm from '../modules/auth/SignInForm'
import Navbar from '../modules/general/Navbar'
import Footer from '../modules/general/Footer'

interface IProps {
  children?: React.ReactNode
}

const AuthPage: React.FC<IProps> = () => {
  return (
    <Box>
      <Navbar />
      <SignInForm />
      <Footer />
    </Box>
  )
}

export default AuthPage
