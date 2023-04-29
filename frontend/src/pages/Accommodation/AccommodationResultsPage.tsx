import React from 'react'
import { retrieveAccommodationResults } from '../../store/accommodation/actions'

interface IProps {
  children?: React.ReactNode
}

const AccomodationResultsPage: React.FC<IProps> = () => {
  const accommodationResults = retrieveAccommodationResults()

  return <div>{JSON.stringify(accommodationResults)}</div>
}

export default AccomodationResultsPage
