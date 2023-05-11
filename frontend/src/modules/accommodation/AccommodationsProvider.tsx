import React from 'react'
import { mockAccommodations } from '../../store/accommodation/mock'

interface IProps {
  children?: React.ReactNode
}

const AccommodationsProvider: React.FC<IProps> = ({ children }) => {
  // state
  const [state, dispatch] = React.useReducer(accommodationReducer, {
    accommodations: null,
    dispatch: null,
  })

  // events
  const initAccommodations = async () => {
    dispatch({
      type: 'SET_ACCOMMODATIONS',
      payload: mockAccommodations, // TODO: PM's job (api call)
    })
  }
  React.useEffect(() => {
    initAccommodations()
  }, [])

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
        accommodations: action.payload as IAccommodation[],
      }

    default:
      return state
  }
}

/// ACTIONS

export const createAccommodation = () => {
  // TODO:
}

export const retrieveAccommodations = () => {
  const { accommodations } =
    React.useContext<IAccommodationsState>(accommodationContext)
  return accommodations
}

export const retrieveOneAccommodation = (id: string) => {
  // TODO:
}

export const filterAccommodations = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)

  if (!dispatch) return

  return async (filter: IAccommodationsFilter) => {
    // TODO:
    // get filters

    // call api

    // dispatch
    dispatch({
      type: 'SET_ACCOMMODATIONS',
      payload: [],
    })
  }
}

export const updateAccommodation = () => {
  // TODO:
}

export const deleteAccommodation = () => {
  // TODO:
}
