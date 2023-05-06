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
      type: 'INIT_ACCOMMODATIONS',
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
    case 'INIT_ACCOMMODATIONS':
      return {
        ...state,
        accommodations: action.payload as IAccommodation[],
      }

    default:
      return state
  }
}

export const retrieveAccommodations = () => {
  const { accommodations } =
    React.useContext<IAccommodationsState>(accommodationContext)
  return accommodations
}

export const filterAccommodations = () => {
  const { dispatch } =
    React.useContext<IAccommodationsState>(accommodationContext)

  if (!dispatch) return

  return async (filter: IAccommodationsFilter) => {
    // get filters

    // call api

    // dispatch
    dispatch({
      type: 'INIT_ACCOMMODATIONS',
      payload: [],
    })
  }
}
