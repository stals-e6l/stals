import React from 'react'
import { useParams } from 'react-router-dom'
import { retrieveAccommodationById } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccommodationDetailPage: React.FC<IProps> = () => {
  const params = useParams()
  const accommodation = retrieveAccommodationById(params.id as string)

  return <div>{JSON.stringify(accommodation)}</div>
}

export default AccommodationDetailPage
