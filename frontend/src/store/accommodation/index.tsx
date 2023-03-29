import React from 'react'
import accommodationsActions from './actions'
import { mockAccommodations } from './mock'

interface IProps {
  children?: React.ReactNode
}

const AccommodationProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(accommodationReducer, {})

  // init accommodations
  React.useEffect(() => {
    dispatch({
      type: accommodationsActions.ACCOMMODATION_INIT,
      payload: mockAccommodations,
    })
  }, [])

  // selectors
  const retrieveAllAccommodations = () => state.accommodations || null
  const retrieveAccommodationById = (id: string) => {
    const res = state.accommodations?.filter(el => el._id === id)
    if (!res || res.length === 0) return null
    return res[0]
  }

  return (
    <accommodationContext.Provider
      value={{
        accommodations: state.accommodations,
        dispatch,
        retrieveAllAccommodations,
        retrieveAccommodationById,
      }}
    >
      {children}
    </accommodationContext.Provider>
  )
}

export default AccommodationProvider

const accommodationContext = React.createContext<IAccommodationState>({})

export const useAccommodation = () =>
  React.useContext<IAccommodationState>(accommodationContext)

// TODO: make action type generic
// TODO: make payload generic also
const accommodationReducer = (
  state: IAccommodationState,
  action: IReducerAction<string, any>
): IAccommodationState => {
  switch (action.type) {
    case accommodationsActions.ACCOMMODATION_INIT:
      return {
        ...state,
        accommodations: action.payload,
      }
    case accommodationsActions.ACCOMMODATION_CREATE:
    case accommodationsActions.ACCOMMODATION_UPDATE:
      return {
        ...state,
        accommodations: [...state.accommodations!, action.payload],
      }
    case accommodationsActions.ACCOMMODATION_DELETE:
      return {
        ...state,
        accommodations: state.accommodations!.filter(
          el => el._id! !== action.payload
        ),
      }
    default:
      return state
  }
}
