import React from 'react'
import Banner from '../../components/bannerElement'
import Header from '../../components/header'
import Accommodations from './Accommodations'
import { getMe } from '../../store/auth/action'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const getMeHandler = getMe()

  React.useEffect(() => {
    getMeHandler()
  }, [])

  return (
    <div id="retrieve-all">
      <Header />
      <Banner />

      <Accommodations />
    </div>
  )
}

export default AccommodationPage
