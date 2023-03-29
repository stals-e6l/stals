import React from 'react'
import { retrieveAccommodations } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationPage: React.FC<IProps> = () => {
  const accommodations = retrieveAccommodations()

  return <div>{JSON.stringify(accommodations)}</div>
}

export default AccommodationPage
