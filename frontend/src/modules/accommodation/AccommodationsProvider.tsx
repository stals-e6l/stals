import React from 'react'
import toMap from '../../utils/toMap'
import toArray from '../../utils/toArray'
import { apiDelete, apiGet, apiPost, apiPut } from '../../services/api'
import { showErrorSnackbar } from '../general/ErrorHandler'

interface IProps {
  children?: React.ReactNode
}

const AccommodationsProvider: React.FC<IProps> = ({ children }) => {
  // state
  const [state, dispatch] = React.useReducer(accommodationReducer, {
    accommodations: null,
    dispatch: null,
    globalRefresh: false,
  })

  // events

  console.log({ accommodationsState: state })

  return (
    <accommodationContext.Provider
      value={{
        accommodations: state.accommodations,
        globalRefresh: state.globalRefresh,
        dispatch,
      }}
    >
      {children}
    </accommodationContext.Provider>
  )
}

export default AccommodationsProvider

const accommodationContext = React.createContext<IAccommodationsState>({
  accommodations: null,
  dispatch: null,
  globalRefresh: false,
})

export const useAccommodation = () =>
  React.useContext<IAccommodationsState>(accommodationContext)

const accommodationReducer = (
  state: IAccommodationsState,
  action: IReducerAction<TAccommodationActionType, TAccommodationPayload>
): IAccommodationsState => {
  let temp
  let buffer
  switch (action.type) {
    case 'SET_ACCOMMODATIONS':
      return {
        ...state,
        globalRefresh: !state.globalRefresh,
        accommodations: toMap<IAccommodation>(
          action.payload as IAccommodation[],
          '_id'
        ),
      }
    case 'ADD_ACCOMMODATION':
      return {
        ...state,
        globalRefresh: !state.globalRefresh,
        accommodations: {
          ...state.accommodations,
          [(action.payload as unknown as IAccommodation)._id as string]:
            action.payload as IAccommodation,
        },
      }
    case 'DELETE_ACCOMMODATION':
      // eslint-disable-next-line no-case-declarations
      temp = { ...state.accommodations }
      delete temp[action.payload as string]
      return {
        ...state,
        globalRefresh: !state.globalRefresh,
        accommodations: temp,
      }
    case 'EDIT_ACCOMMODATION':
      // eslint-disable-next-line no-case-declarations
      temp = { ...state.accommodations }
      buffer = action.payload as IAccommodation
      temp[buffer._id as string] = buffer
      return {
        ...state,
        globalRefresh: !state.globalRefresh,
        accommodations: temp,
      }
    case 'APPEND_ACCOMMODATIONS':
      temp = { ...state.accommodations }
      for (const accommodation of action.payload as IAccommodation[]) {
        temp[accommodation._id as string] = accommodation
      }
      return {
        ...state,
        accommodations: temp,
      }

    default:
      return state
  }
}

/// ACTIONS

export const initAccommodations = async () => {
  const res = await apiGet<IAccommodation[]>('accommodation')
  if (res.data && res.success) {
    return res.data
  }

  if (res.messages) {
    throw new Error(res.messages[0])
  }
}

export const createAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return
  return async (accommodation: IAccommodation) => {
    const res = await apiPost<IAccommodation, IAccommodation>('accommodation', {
      payload: accommodation,
    })

    if (res.success && res.data) {
      dispatch({
        type: 'ADD_ACCOMMODATION',
        payload: res.data as IAccommodation,
      })
    } else {
      if (res.messages) {
        throw new Error(res.messages[0])
      }
    }
  }
}

export const retrieveAccommodations = () => {
  const { accommodations } =
    React.useContext<IAccommodationsState>(accommodationContext)
  if (!accommodations) return null
  return toArray<IAccommodation>(accommodations)
}

export const getGlobalRefresh = () => {
  const { globalRefresh } =
    React.useContext<IAccommodationsState>(accommodationContext)

  return globalRefresh
}

export const retrieveOneAccommodation = (id: string) => {
  const { accommodations } =
    React.useContext<IAccommodationsState>(accommodationContext)

  if (!id || !accommodations) return null
  return accommodations[id]
}

export const filterAccommodations = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)

  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return

  return async (qs: string) => {
    // call api
    const endpoint = encodeURI(`accommodation?${qs}`)
    const res = await apiGet<IAccommodation[]>(endpoint)

    if (res.data && res.success) {
      // dispatch
      dispatch({
        type: 'SET_ACCOMMODATIONS',
        payload: res.data,
      })
      return true
    } else {
      if (res.messages) onShowError(res.messages[0])
      return false
    }
  }
}

export const archiveAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return
  return async (payload: IArchiveAccomodationPayload) => {
    const res = await apiPut<IArchiveAccomodationPayload, IAccommodation>(
      `accommodation/${payload._id}`,
      {
        payload: payload,
      }
    )

    if (res.success && res.data) {
      dispatch({
        type: 'DELETE_ACCOMMODATION',
        payload: res.data._id as string,
      })
      return true
    } else {
      if (res.messages) onShowError(res.messages[0])
      return false
    }
  }
}

export const deleteAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return
  return async (id: string) => {
    const res = await apiDelete<string>(`accommodation/${id}`)
    if (res.success) {
      dispatch({
        type: 'DELETE_ACCOMMODATION',
        payload: id as string,
      })

      return true
    } else {
      if (res.messages) onShowError(res.messages[0])
      return false
    }
  }
}

export const editAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return

  return async (accommodation: IAccommodation) => {
    const res = await apiPut<IAccommodation, IAccommodation>(
      `accommodation/${accommodation._id as string}`,
      {
        payload: accommodation,
      }
    )

    if (res.success && res.data) {
      dispatch({ type: 'EDIT_ACCOMMODATION', payload: res.data })
    } else if (res.messages) onShowError(res.messages[0])
  }
}

export const appendAccommodations = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  const onShowError = showErrorSnackbar()
  if (!dispatch || !onShowError) return

  return (accommodations: IAccommodation[]) => {
    dispatch({ type: 'APPEND_ACCOMMODATIONS', payload: accommodations })
  }
}
