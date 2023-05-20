import React from 'react'
import toMap from '../../utils/toMap'
import toArray from '../../utils/toArray'
import { apiDelete, apiGet, apiPost, apiPut } from '../../services/api'
import { getMe } from '../auth/AuthProvider'

interface IProps {
  children?: React.ReactNode
}

const AccommodationsProvider: React.FC<IProps> = ({ children }) => {
  // state
  const me = getMe()
  const [state, dispatch] = React.useReducer(accommodationReducer, {
    accommodations: null,
    dispatch: null,
  })

  // events
  React.useEffect(() => {
    if (me) {
      initAccommodations().then(data => {
        dispatch({
          type: 'SET_ACCOMMODATIONS',
          payload: data as IAccommodation[],
        })
      })
    }
  }, [me])

  console.log({ accommodationsState: state })

  return (
    <accommodationContext.Provider
      value={{
        accommodations: state.accommodations,
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
})

const accommodationReducer = (
  state: IAccommodationsState,
  action: IReducerAction<TAccommodationActionType, TAccommodationPayload>
): IAccommodationsState => {
  switch (action.type) {
    case 'SET_ACCOMMODATIONS':
      return {
        ...state,
        accommodations: toMap<IAccommodation>(
          action.payload as IAccommodation[],
          '_id'
        ),
      }
    case 'ADD_ACCOMMODATION':
      return {
        ...state,
        accommodations: {
          ...state.accommodations,
          [(action.payload as unknown as IAccommodation)._id as string]:
            action.payload as IAccommodation,
        },
      }
    case 'DELETE_ACCOMMODATION':
      // eslint-disable-next-line no-case-declarations
      const temp = { ...state.accommodations }
      delete temp[action.payload as string]
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
    throw new Error(res.messages[0]) // TODO: error snackbar
  }
}

export const createAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  if (!dispatch) return
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
      if (res.messages) throw new Error(res.messages[0]) // TODO: error snackbar
    }
  }
}

export const retrieveAccommodations = () => {
  const { accommodations } =
    React.useContext<IAccommodationsState>(accommodationContext)
  if (!accommodations) return null
  return toArray<IAccommodation>(accommodations)
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

  if (!dispatch) return

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
    } else {
      if (res.messages) throw new Error(res.messages[0])
    }
  }
}

export const archiveAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  if (!dispatch) return
  return async (payload: IArchiveAccomodationPayload) => {
    const res = await apiPut<IArchiveAccomodationPayload, IAccommodation>(
      `accommodation/${payload._id}`,
      {
        payload: payload,
      }
    )

    if (res.success && res.data) {
      // dispatch
      dispatch({
        type: 'DELETE_ACCOMMODATION',
        payload: res.data._id as string,
      })
    } else {
      if (res.messages) throw new Error(res.messages[0]) // TODO: error snackbar
    }
  }
}

export const deleteAccommodation = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)
  if (!dispatch) return
  return async (id: string) => {
    const res = await apiDelete<string>(`accommodation/${id}`)
    if (res.success) {
      dispatch({
        type: 'DELETE_ACCOMMODATION',
        payload: id as string,
      })
    } else {
      if (res.messages) throw new Error(res.messages[0]) // TODO: error snackbar
    }
  }
}
