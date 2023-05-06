import React from 'react'

interface IProps {
  children?: React.ReactNode
  defaultValues?: IAccommodation
}

const AccommodationForm: React.FC<IProps> = ({ defaultValues }) => {
  return <div>{JSON.stringify(defaultValues)}</div>
}

export default AccommodationForm
