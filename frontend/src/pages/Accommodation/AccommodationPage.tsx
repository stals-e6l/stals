import React from 'react'
import Banner from '../../components/bannerElement'
import Header from '../../components/header'
import Accommodations from './Accommodations'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  return (
    <div id="retrieve-all">
      <Header />
      <Banner />

      <Accommodations />
    </div>
  )
}

export default AccommodationPage
