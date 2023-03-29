import React from 'react'
import { accommodationContext } from '.'

const useAccommodation = () =>
  React.useContext<IAccommodationState>(accommodationContext)

export const createAccommodation = (data: IAccommodation) =>
  useAccommodation().dispatch({
    type: 'AC_CREATE',
    payload: data,
  })
export const retrieveAccommodations = () => useAccommodation().accommodations

export const retrieveAccommodationById = (id: string) =>
  useAccommodation().accommodations.filter(el => el._id === id)[0]

export const updateAccommodation = (data: IAccommodation) =>
  useAccommodation().dispatch({
    type: 'AC_UPDATE',
    payload: data,
  })

export const deleteAccommodation = (id: string) =>
  useAccommodation().dispatch({ type: 'AC_DELETE', payload: id })
