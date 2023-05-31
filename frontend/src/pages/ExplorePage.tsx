import React from 'react'
import Banner from '../modules/general/Banner'
import AccommodationResults from '../modules/accommodation/AccommodationResults'
import AccommodationFormModal from '../modules/accommodation/AccommodationFormModal'

interface IProps {
  children?: React.ReactNode
}

const ExplorePage: React.FC<IProps> = () => {
  return (
    <>
      <AccommodationFormModal />
      <Banner />
      <br />
      <AccommodationResults isPublicView={false} />
      <AccommodationResults
        isPublicView={false}
        endpoint="public_accommodation?limit=6"
        title="Hottest pick"
      />
    </>
  )
}

export default ExplorePage
